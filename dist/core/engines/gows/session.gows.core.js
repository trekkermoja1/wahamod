"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GOWSEngineMediaProcessor = exports.WhatsappSessionGoWSCore = void 0;
exports.getMessageIdFromSerialized = getMessageIdFromSerialized;
const baileys_1 = require("@adiwajshing/baileys");
const grpc = require("@grpc/grpc-js");
const grpc_js_1 = require("@grpc/grpc-js");
const common_1 = require("@nestjs/common");
const session_abc_1 = require("../../abc/session.abc");
const const_1 = require("../const");
const EventsFromObservable_1 = require("./EventsFromObservable");
const GowsEventStreamObservable_1 = require("./GowsEventStreamObservable");
const groups_gows_1 = require("./groups.gows");
const gows_1 = require("./grpc/gows");
const helpers_1 = require("./helpers");
const GowsAuthFactoryCore_1 = require("./store/GowsAuthFactoryCore");
const session_noweb_core_1 = require("../noweb/session.noweb.core");
const utils_1 = require("../noweb/utils");
const exceptions_1 = require("../../exceptions");
const QR_1 = require("../../QR");
const convertors_1 = require("../../utils/convertors");
const ids_1 = require("../../utils/ids");
const jids_1 = require("../../utils/jids");
const channels_dto_1 = require("../../../structures/channels.dto");
const chats_dto_1 = require("../../../structures/chats.dto");
const chatting_dto_1 = require("../../../structures/chatting.dto");
const contacts_dto_1 = require("../../../structures/contacts.dto");
const enums_dto_1 = require("../../../structures/enums.dto");
const events_dto_1 = require("../../../structures/events.dto");
const groups_dto_1 = require("../../../structures/groups.dto");
const pagination_dto_1 = require("../../../structures/pagination.dto");
const responses_dto_1 = require("../../../structures/responses.dto");
const status_dto_1 = require("../../../structures/status.dto");
const Paginator_1 = require("../../../utils/Paginator");
const promiseTimeout_1 = require("../../../utils/promiseTimeout");
const onlyEvent_1 = require("../../../utils/reactive/ops/onlyEvent");
const NodeCache = require("node-cache");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const util_1 = require("util");
const gows = require("./types");
const types_1 = require("./types");
const appstate_1 = require("./appstate");
const vcard_1 = require("../../vcard");
const acks_1 = require("../../utils/acks");
const events_1 = require("../../utils/events");
const reactive_1 = require("../../utils/reactive");
const labels_dto_1 = require("../../../structures/labels.dto");
const exclude_1 = require("../../../utils/reactive/ops/exclude");
const lodash = require("lodash");
const labels_gows_1 = require("./labels.gows");
const clients_1 = require("./clients");
const esm_1 = require("../../../vendor/esm");
const pwa_1 = require("../../utils/pwa");
const waproto_1 = require("./waproto");
const locaiton_1 = require("../waproto/locaiton");
const vcards_1 = require("../waproto/vcards");
const activity_1 = require("../../abc/activity");
const tmpdir_1 = require("../../../utils/tmpdir");
const path = require("path");
const fsp = require("fs/promises");
var WhatsMeowEvent;
(function (WhatsMeowEvent) {
    WhatsMeowEvent["CONNECTED"] = "gows.ConnectedEventData";
    WhatsMeowEvent["DISCONNECTED"] = "events.Disconnected";
    WhatsMeowEvent["KEEP_ALIVE_TIMEOUT"] = "events.KeepAliveTimeout";
    WhatsMeowEvent["KEEP_ALIVE_RESTORED"] = "events.KeepAliveRestored";
    WhatsMeowEvent["QR_CHANNEL_ITEM"] = "whatsmeow.QRChannelItem";
    WhatsMeowEvent["MESSAGE"] = "events.Message";
    WhatsMeowEvent["RECEIPT"] = "events.Receipt";
    WhatsMeowEvent["PRESENCE"] = "events.Presence";
    WhatsMeowEvent["CHAT_PRESENCE"] = "events.ChatPresence";
    WhatsMeowEvent["PUSH_NAME_SETTING"] = "events.PushNameSetting";
    WhatsMeowEvent["LOGGED_OUT"] = "events.LoggedOut";
    WhatsMeowEvent["GROUP_INFO"] = "events.GroupInfo";
    WhatsMeowEvent["JOINED_GROUP"] = "events.JoinedGroup";
    WhatsMeowEvent["LABEL_EDIT"] = "events.LabelEdit";
    WhatsMeowEvent["LABEL_ASSOCIATION_CHAT"] = "events.LabelAssociationChat";
    WhatsMeowEvent["EVENT_MESSAGE_RESPONSE"] = "gows.EventMessageResponse";
    WhatsMeowEvent["POLL_VOTE_EVENT"] = "gows.PollVoteEvent";
    WhatsMeowEvent["CALL_OFFER"] = "events.CallOffer";
    WhatsMeowEvent["CALL_ACCEPT"] = "events.CallAccept";
    WhatsMeowEvent["CALL_REJECT"] = "events.CallReject";
    WhatsMeowEvent["CALL_TERMINATE"] = "events.CallTerminate";
    WhatsMeowEvent["CALL_OFFER_NOTICE"] = "events.CallOfferNotice";
})(WhatsMeowEvent || (WhatsMeowEvent = {}));
class WhatsappSessionGoWSCore extends session_abc_1.WhatsappSession {
    constructor(config) {
        super(config);
        this.authFactory = new GowsAuthFactoryCore_1.GowsAuthFactoryCore();
        this.local$ = new rxjs_1.Subject();
        this.qr = new QR_1.QR();
        this.session = new gows_1.messages.Session({ id: this.name });
        this.presences = new NodeCache({
            stdTTL: 60 * 60,
            useClones: false,
        });
    }
    async start() {
        this.status = enums_dto_1.WAHASessionStatus.STARTING;
        this.buildStreams();
        this.subscribeEvents();
        this.subscribeEngineEvents2();
        if (this.isDebugEnabled()) {
            this.listenEngineEventsInDebugMode();
        }
        const auth = await this.authFactory.buildAuth(this.sessionStore, this.name);
        const level = gows_1.messages.LogLevel[this.logger.level.toUpperCase()];
        const request = new gows_1.messages.StartSessionRequest({
            id: this.name,
            config: new gows_1.messages.SessionConfig({
                store: new gows_1.messages.SessionStoreConfig({
                    address: auth.address(),
                    dialect: auth.dialect(),
                }),
                log: new gows_1.messages.SessionLogConfig({
                    level: level !== null && level !== void 0 ? level : gows_1.messages.LogLevel.INFO,
                }),
                proxy: new gows_1.messages.SessionProxyConfig({
                    url: this.getProxyUrl(this.proxyConfig),
                }),
                ignore: new gows_1.messages.SessionIgnoreJidsConfig({
                    status: this.jids.ignore.status,
                    groups: this.jids.ignore.groups,
                    newsletters: this.jids.ignore.channels,
                    broadcast: this.jids.ignore.broadcast,
                }),
            }),
        });
        this.client = (0, clients_1.GetMessageServiceClient)(this.name, this.engineConfig.connection, grpc.credentials.createInsecure());
        try {
            await (0, util_1.promisify)(this.client.StartSession)(request);
        }
        catch (err) {
            this.logger.error('Failed to start the client');
            this.logger.error({ err }, err.stack);
            this.status = enums_dto_1.WAHASessionStatus.FAILED;
            throw err;
        }
    }
    getProxyUrl(config) {
        if (!config || !config.server) {
            return '';
        }
        const { server, username, password } = config;
        const auth = username && password ? `${username}:${password}@` : '';
        const schema = 'http';
        return `${schema}://${auth}${server}`;
    }
    buildStreams() {
        this.stream$ = new GowsEventStreamObservable_1.GowsEventStreamObservable(this.loggerBuilder.child({ grpc: 'stream' }), () => {
            const client = (0, clients_1.GetEventStreamClient)(this.name, this.engineConfig.connection, grpc.credentials.createInsecure());
            const stream = client.StreamEvents(this.session);
            return { client, stream };
        });
        this.all$ = (0, rxjs_1.merge)(this.stream$, this.local$).pipe((0, rxjs_1.retry)({ delay: 2000 }), (0, rxjs_1.share)());
    }
    subscribeEvents() {
        this.events = new EventsFromObservable_1.EventsFromObservable(this.all$);
        const events = this.events;
        events.on(WhatsMeowEvent.CONNECTED, (data) => {
            this.status = enums_dto_1.WAHASessionStatus.WORKING;
            this.me = {
                id: (0, jids_1.toCusFormat)(esm_1.default.b.jidNormalizedUser(data.ID)),
                pushName: data.PushName,
                lid: esm_1.default.b.jidNormalizedUser(data.LID),
            };
            this.me.jid = data.ID;
        });
        events.on(WhatsMeowEvent.DISCONNECTED, () => {
            if (this.status != enums_dto_1.WAHASessionStatus.STARTING) {
                this.cleanupPresenceTimeout();
                this.presence = null;
                this.status = enums_dto_1.WAHASessionStatus.STARTING;
            }
        });
        events.on(WhatsMeowEvent.KEEP_ALIVE_TIMEOUT, () => {
            if (this.status != enums_dto_1.WAHASessionStatus.STARTING) {
                this.cleanupPresenceTimeout();
                this.presence = null;
                this.status = enums_dto_1.WAHASessionStatus.STARTING;
            }
        });
        events.on(WhatsMeowEvent.KEEP_ALIVE_RESTORED, () => {
            if (this.status != enums_dto_1.WAHASessionStatus.WORKING) {
                this.status = enums_dto_1.WAHASessionStatus.WORKING;
            }
        });
        events.on(WhatsMeowEvent.QR_CHANNEL_ITEM, async (data) => {
            if (!data.Event) {
                return;
            }
            if (data.Event == 'success') {
                return;
            }
            if (data.Event != 'code') {
                this.logger.warn({ data }, 'Failed QR item event');
                this.status = enums_dto_1.WAHASessionStatus.FAILED;
                return;
            }
            const qr = data.Code;
            if (!qr) {
                return;
            }
            this.qr.save(qr);
            this.printQR(this.qr);
            this.status = enums_dto_1.WAHASessionStatus.SCAN_QR_CODE;
        });
        events.on(WhatsMeowEvent.PUSH_NAME_SETTING, (data) => {
            this.me = Object.assign(Object.assign({}, this.me), { pushName: data.Action.name });
        });
        events.on(WhatsMeowEvent.LOGGED_OUT, () => {
            this.logger.error('Logged out');
            this.status = enums_dto_1.WAHASessionStatus.FAILED;
        });
        events.on(WhatsMeowEvent.PRESENCE, (event) => {
            if ((0, jids_1.isJidGroup)(event.From)) {
                return;
            }
            const Chat = event.From;
            const Sender = event.From;
            const stored = this.presences.get(Chat) || [];
            const filtered = stored.filter((p) => p.Sender !== Sender && p.From !== Sender);
            this.presences.set(Chat, [...filtered, event]);
        });
        events.on(WhatsMeowEvent.CHAT_PRESENCE, (event) => {
            const Chat = event.Chat;
            const Sender = event.Sender;
            const stored = this.presences.get(Chat) || [];
            const filtered = stored.filter((p) => p.Sender !== Sender && p.From !== Sender);
            this.presences.set(Chat, [...filtered, event]);
        });
        events.on(WhatsMeowEvent.MESSAGE, (message) => {
            var _a, _b, _c, _d;
            const chat = (_a = message === null || message === void 0 ? void 0 : message.Info) === null || _a === void 0 ? void 0 : _a.Chat;
            if (!this.jids.include(chat)) {
                return;
            }
            if ((_b = message === null || message === void 0 ? void 0 : message.Info) === null || _b === void 0 ? void 0 : _b.IsFromMe) {
                return;
            }
            const sender = ((_c = message === null || message === void 0 ? void 0 : message.Info) === null || _c === void 0 ? void 0 : _c.Sender) || chat;
            if (!chat || !sender) {
                return;
            }
            const stored = this.presences.get(chat) || [];
            const composing = stored.find((presence) => ((presence === null || presence === void 0 ? void 0 : presence.Sender) === sender || (presence === null || presence === void 0 ? void 0 : presence.From) === sender) &&
                (presence === null || presence === void 0 ? void 0 : presence.State) === gows.ChatPresenceState.COMPOSING);
            if (!composing) {
                return;
            }
            const presence = {
                Chat: chat,
                Sender: sender,
                IsFromMe: false,
                IsGroup: !!(0, jids_1.isJidGroup)(chat),
                State: gows.ChatPresenceState.PAUSED,
                Media: (_d = composing === null || composing === void 0 ? void 0 : composing.Media) !== null && _d !== void 0 ? _d : gows.ChatPresenceMedia.TEXT,
            };
            this.local$.next({
                event: WhatsMeowEvent.CHAT_PRESENCE,
                data: presence,
            });
        });
        events.start();
    }
    subscribeEngineEvents2() {
        const all$ = this.all$;
        this.events2.get(enums_dto_1.WAHAEvents.ENGINE_EVENT).switch(all$);
        const messages$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.MESSAGE), (0, rxjs_1.filter)((msg) => { var _a; return this.jids.include((_a = msg === null || msg === void 0 ? void 0 : msg.Info) === null || _a === void 0 ? void 0 : _a.Chat); }), (0, rxjs_1.share)());
        let [messagesFromMe$, messagesFromOthers$] = (0, rxjs_1.partition)(messages$, isMine);
        messagesFromMe$ = messagesFromMe$.pipe((0, operators_1.map)((msg) => {
            msg.Status = types_1.MessageStatus.ServerAck;
            return msg;
        }), (0, rxjs_1.mergeMap)((msg) => this.processIncomingMessage(msg, true)), (0, rxjs_1.filter)(Boolean), (0, reactive_1.DistinctMessages)(), (0, rxjs_1.share)());
        messagesFromOthers$ = messagesFromOthers$.pipe((0, operators_1.map)((msg) => {
            msg.Status = types_1.MessageStatus.DeliveryAck;
            return msg;
        }), (0, rxjs_1.mergeMap)((msg) => this.processIncomingMessage(msg, true)), (0, rxjs_1.filter)(Boolean), (0, reactive_1.DistinctMessages)(), (0, rxjs_1.share)());
        const messagesFromAll$ = (0, rxjs_1.merge)(messagesFromMe$, messagesFromOthers$);
        this.events2.get(enums_dto_1.WAHAEvents.MESSAGE).switch(messagesFromOthers$);
        this.events2.get(enums_dto_1.WAHAEvents.MESSAGE_ANY).switch(messagesFromAll$);
        const messagesRevoked$ = messages$.pipe((0, rxjs_1.filter)((msg) => {
            var _a, _b, _c, _d;
            return (((_b = (_a = msg === null || msg === void 0 ? void 0 : msg.Message) === null || _a === void 0 ? void 0 : _a.protocolMessage) === null || _b === void 0 ? void 0 : _b.type) === 0 &&
                ((_d = (_c = msg === null || msg === void 0 ? void 0 : msg.Message) === null || _c === void 0 ? void 0 : _c.protocolMessage) === null || _d === void 0 ? void 0 : _d.key) !== undefined);
        }), (0, rxjs_1.mergeMap)(async (message) => {
            var _a;
            const afterMessage = await this.toWAMessage(message);
            const revokedMessageId = (_a = message.Message.protocolMessage.key) === null || _a === void 0 ? void 0 : _a.ID;
            return {
                after: afterMessage,
                before: null,
                revokedMessageId: revokedMessageId,
                _data: message,
            };
        }));
        this.events2.get(enums_dto_1.WAHAEvents.MESSAGE_REVOKED).switch(messagesRevoked$);
        const messagesEdited$ = messages$.pipe((0, rxjs_1.filter)((message) => (0, pwa_1.IsEditedMessage)(message.Message)), (0, rxjs_1.mergeMap)(async (message) => {
            var _a;
            const waMessage = await this.toWAMessage(message);
            const content = (0, baileys_1.normalizeMessageContent)(message.Message);
            const body = (0, session_noweb_core_1.extractBody)(content.protocolMessage.editedMessage) || '';
            const editedMessageId = (_a = content.protocolMessage.key) === null || _a === void 0 ? void 0 : _a.ID;
            return Object.assign(Object.assign({}, waMessage), { body: body, editedMessageId: editedMessageId, _data: message });
        }));
        this.events2.get(enums_dto_1.WAHAEvents.MESSAGE_EDITED).switch(messagesEdited$);
        const receipt$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.RECEIPT), (0, rxjs_1.filter)((r) => this.jids.include(r === null || r === void 0 ? void 0 : r.Chat)));
        const [receiptGroups$, receiptContacts$] = (0, rxjs_1.partition)(receipt$, (r) => { var _a; return (0, jids_1.isJidGroup)((r === null || r === void 0 ? void 0 : r.Chat) || ((_a = r === null || r === void 0 ? void 0 : r.Info) === null || _a === void 0 ? void 0 : _a.Chat)); });
        const messageAckGroups$ = receiptGroups$.pipe((0, rxjs_1.mergeMap)(this.receiptToMessageAck.bind(this)), (0, reactive_1.DistinctAck)());
        const messageAckContacts$ = receiptContacts$.pipe((0, rxjs_1.mergeMap)(this.receiptToMessageAck.bind(this)), (0, reactive_1.DistinctAck)());
        this.events2.get(enums_dto_1.WAHAEvents.MESSAGE_ACK_GROUP).switch(messageAckGroups$);
        this.events2.get(enums_dto_1.WAHAEvents.MESSAGE_ACK).switch(messageAckContacts$);
        const messageReactions$ = messages$.pipe((0, rxjs_1.filter)((msg) => { var _a; return !!((_a = msg === null || msg === void 0 ? void 0 : msg.Message) === null || _a === void 0 ? void 0 : _a.reactionMessage); }), (0, operators_1.map)(this.processMessageReaction.bind(this)));
        this.events2.get(enums_dto_1.WAHAEvents.MESSAGE_REACTION).switch(messageReactions$);
        const callOffer$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.CALL_OFFER), (0, rxjs_1.filter)(this.shouldProcessCallEvent.bind(this)), (0, operators_1.map)(this.toCallData.bind(this)));
        const callOfferNotice$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.CALL_OFFER_NOTICE), (0, rxjs_1.filter)(this.shouldProcessCallEvent.bind(this)), (0, operators_1.map)(this.toCallData.bind(this)));
        this.events2
            .get(enums_dto_1.WAHAEvents.CALL_RECEIVED)
            .switch((0, rxjs_1.merge)(callOffer$, callOfferNotice$));
        const callAccept$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.CALL_ACCEPT), (0, rxjs_1.filter)(this.shouldProcessCallEvent.bind(this)), (0, operators_1.map)(this.toCallData.bind(this)));
        this.events2.get(enums_dto_1.WAHAEvents.CALL_ACCEPTED).switch(callAccept$);
        const callReject$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.CALL_REJECT), (0, rxjs_1.filter)(this.shouldProcessCallEvent.bind(this)));
        const callTerminate$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.CALL_TERMINATE), (0, rxjs_1.filter)(this.shouldProcessCallEvent.bind(this)), (0, rxjs_1.filter)((call) => (call === null || call === void 0 ? void 0 : call.Reason) !== 'accepted_elsewhere' &&
            (call === null || call === void 0 ? void 0 : call.Reason) !== 'rejected_elsewhere'));
        const callRejected$ = (0, rxjs_1.merge)(callReject$, callTerminate$).pipe((0, rxjs_1.groupBy)((call) => this.getCallId(call) || 'unknown'), (0, rxjs_1.mergeMap)((group$) => group$.pipe((0, operators_1.debounceTime)(1000))), (0, operators_1.map)(this.toCallData.bind(this)));
        this.events2.get(enums_dto_1.WAHAEvents.CALL_REJECTED).switch(callRejected$);
        const presence$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.PRESENCE), (0, rxjs_1.filter)((event) => this.jids.include(event === null || event === void 0 ? void 0 : event.From)), (0, rxjs_1.filter)((event) => !(0, jids_1.isJidGroup)(event.From)));
        const chatPresence$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.CHAT_PRESENCE), (0, rxjs_1.filter)((event) => this.jids.include(event === null || event === void 0 ? void 0 : event.Chat)));
        const presenceUpdates$ = (0, rxjs_1.merge)(presence$, chatPresence$).pipe((0, operators_1.map)((event) => this.toWahaPresences(event.From || event.Chat, [event])));
        this.events2.get(enums_dto_1.WAHAEvents.PRESENCE_UPDATE).switch(presenceUpdates$);
        const joinedGroup$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.JOINED_GROUP));
        const groupV2Join$ = joinedGroup$.pipe((0, operators_1.map)(groups_gows_1.ToGroupV2JoinEvent));
        this.events2.get(enums_dto_1.WAHAEvents.GROUP_V2_JOIN).switch(groupV2Join$);
        const groupInfo$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.GROUP_INFO));
        const groupV2Leave$ = groupInfo$.pipe((0, operators_1.map)((event) => (0, groups_gows_1.ToGroupV2LeaveEvent)(this.me, event)), (0, rxjs_1.filter)(Boolean));
        this.events2.get(enums_dto_1.WAHAEvents.GROUP_V2_LEAVE).switch(groupV2Leave$);
        const groupV2Participants$ = groupInfo$.pipe((0, operators_1.map)(groups_gows_1.ToGroupV2ParticipantsEvents), (0, rxjs_1.mergeMap)((events) => events));
        this.events2
            .get(enums_dto_1.WAHAEvents.GROUP_V2_PARTICIPANTS)
            .switch(groupV2Participants$);
        const groupV2Update$ = groupInfo$.pipe((0, operators_1.map)(groups_gows_1.ToGroupV2UpdateEvent), (0, rxjs_1.filter)(Boolean));
        this.events2.get(enums_dto_1.WAHAEvents.GROUP_V2_UPDATE).switch(groupV2Update$);
        const labelEditEvents$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.LABEL_EDIT), (0, exclude_1.exclude)(appstate_1.isFromFullSync));
        const [labelUpsertEvents$, labelDeletedEvents$] = (0, rxjs_1.partition)(labelEditEvents$, labels_gows_1.isLabelUpsertEvent);
        const labelUpsert$ = labelUpsertEvents$.pipe((0, operators_1.map)(labels_gows_1.eventToLabelDTO));
        const labelDeleted$ = labelDeletedEvents$.pipe((0, operators_1.map)(labels_gows_1.eventToLabelDTO));
        this.events2.get(enums_dto_1.WAHAEvents.LABEL_UPSERT).switch(labelUpsert$);
        this.events2.get(enums_dto_1.WAHAEvents.LABEL_DELETED).switch(labelDeleted$);
        const pollVoteEvent$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.POLL_VOTE_EVENT), (0, rxjs_1.filter)((event) => { var _a; return this.jids.include((_a = event === null || event === void 0 ? void 0 : event.Info) === null || _a === void 0 ? void 0 : _a.Chat); }), (0, operators_1.map)(this.toPollVotePayload.bind(this)), (0, rxjs_1.filter)(Boolean), (0, rxjs_1.share)());
        const [pollVoteSuccess$, pollVoteFailed$] = (0, rxjs_1.partition)(pollVoteEvent$, (payload) => !!payload.vote.selectedOptions);
        this.events2.get(enums_dto_1.WAHAEvents.POLL_VOTE).switch(pollVoteSuccess$);
        this.events2.get(enums_dto_1.WAHAEvents.POLL_VOTE_FAILED).switch(pollVoteFailed$);
        const eventMessageResponse$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.EVENT_MESSAGE_RESPONSE), (0, rxjs_1.filter)((event) => { var _a; return this.jids.include((_a = event === null || event === void 0 ? void 0 : event.Info) === null || _a === void 0 ? void 0 : _a.Chat); }), (0, operators_1.map)(this.toEventResponsePayload.bind(this)), (0, rxjs_1.filter)(Boolean));
        const [eventResponseSuccess$, eventResponseFailed$] = (0, rxjs_1.partition)(eventMessageResponse$, (payload) => !!payload.eventResponse);
        this.events2.get(enums_dto_1.WAHAEvents.EVENT_RESPONSE).switch(eventResponseSuccess$);
        this.events2
            .get(enums_dto_1.WAHAEvents.EVENT_RESPONSE_FAILED)
            .switch(eventResponseFailed$);
        const labelAssociationEvents$ = all$.pipe((0, onlyEvent_1.onlyEvent)(WhatsMeowEvent.LABEL_ASSOCIATION_CHAT), (0, exclude_1.exclude)(appstate_1.isFromFullSync));
        const [labelChatAddedEvents$, labelChatDeletedEvents$] = (0, rxjs_1.partition)(labelAssociationEvents$, labels_gows_1.isLabelChatAddedEvent);
        const labelChatAdded$ = labelChatAddedEvents$.pipe((0, operators_1.map)(labels_gows_1.eventToLabelChatAssociationDTO));
        const labelChatDeleted$ = labelChatDeletedEvents$.pipe((0, operators_1.map)(labels_gows_1.eventToLabelChatAssociationDTO));
        this.events2.get(enums_dto_1.WAHAEvents.LABEL_CHAT_ADDED).switch(labelChatAdded$);
        this.events2.get(enums_dto_1.WAHAEvents.LABEL_CHAT_DELETED).switch(labelChatDeleted$);
    }
    async fetchContactProfilePicture(id) {
        const jid = (0, jids_1.toJID)(this.ensureSuffix(id));
        const request = new gows_1.messages.ProfilePictureRequest({
            jid: jid,
            session: this.session,
        });
        const response = await (0, util_1.promisify)(this.client.GetProfilePicture)(request);
        const url = response.toObject().url;
        return url;
    }
    listenEngineEventsInDebugMode() {
        this.events2.get(enums_dto_1.WAHAEvents.ENGINE_EVENT).subscribe((data) => {
            this.logger.debug({ events: data }, `GOWS event`);
        });
    }
    async stop() {
        var _a, _b;
        this.cleanupPresenceTimeout();
        if (this.client) {
            const response = await (0, util_1.promisify)(this.client.StopSession)(this.session);
            response.toObject();
        }
        this.status = enums_dto_1.WAHASessionStatus.STOPPED;
        (_a = this.events) === null || _a === void 0 ? void 0 : _a.stop();
        this.stopEvents();
        (_b = this.client) === null || _b === void 0 ? void 0 : _b.close();
        this.mediaManager.close();
    }
    async requestCode(phoneNumber, method, params) {
        if (this.status == enums_dto_1.WAHASessionStatus.STARTING) {
            this.logger.debug('Waiting for connection update...');
            await (0, promiseTimeout_1.waitUntil)(async () => this.status === enums_dto_1.WAHASessionStatus.SCAN_QR_CODE, 100, 2000);
        }
        if (this.status != enums_dto_1.WAHASessionStatus.SCAN_QR_CODE) {
            const err = `Can request code only in SCAN_QR_CODE status. The current status is ${this.status}`;
            throw new common_1.UnprocessableEntityException(err);
        }
        const request = new gows_1.messages.PairCodeRequest({
            session: this.session,
            phone: phoneNumber,
        });
        const response = await (0, util_1.promisify)(this.client.RequestCode)(request);
        const code = response.toObject().code;
        this.logger.info(`Your code: ${code}`);
        return { code: code };
    }
    async unpair() {
        await (0, util_1.promisify)(this.client.Logout)(this.session);
    }
    getSessionMeInfo() {
        return this.me;
    }
    getQR() {
        return this.qr;
    }
    async getScreenshot() {
        if (this.status === enums_dto_1.WAHASessionStatus.STARTING) {
            throw new common_1.UnprocessableEntityException(`The session is starting, please try again after few seconds`);
        }
        else if (this.status === enums_dto_1.WAHASessionStatus.SCAN_QR_CODE) {
            return this.qr.get();
        }
        else if (this.status === enums_dto_1.WAHASessionStatus.WORKING) {
            throw new common_1.UnprocessableEntityException(`Can not get screenshot for non chrome based engine.`);
        }
        else {
            throw new common_1.UnprocessableEntityException(`Unknown status - ${this.status}`);
        }
    }
    async setProfileName(name) {
        const request = new gows_1.messages.ProfileNameRequest({
            session: this.session,
            name: name,
        });
        const response = await (0, util_1.promisify)(this.client.SetProfileName)(request);
        response.toObject();
        return true;
    }
    async setProfileStatus(status) {
        const request = new gows_1.messages.ProfileStatusRequest({
            session: this.session,
            status: status,
        });
        const response = await (0, util_1.promisify)(this.client.SetProfileStatus)(request);
        response.toObject();
        return true;
    }
    setProfilePicture(file) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    deleteProfilePicture() {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    async generateNewMessageId() {
        const response = await (0, util_1.promisify)(this.client.GenerateNewMessageID)(this.session);
        const data = response.toObject();
        return data.id;
    }
    async rejectCall(from, id) {
        const request = new gows_1.messages.RejectCallRequest({
            session: this.session,
            from: (0, jids_1.toJID)(this.ensureSuffix(from)),
            id: id,
        });
        await (0, util_1.promisify)(this.client.RejectCall)(request);
    }
    async sendText(request) {
        var _a, _b;
        const jid = (0, jids_1.toJID)(this.ensureSuffix(request.chatId));
        const message = new gows_1.messages.MessageRequest({
            jid: jid,
            text: request.text,
            session: this.session,
            linkPreview: (_a = request.linkPreview) !== null && _a !== void 0 ? _a : true,
            linkPreviewHighQuality: request.linkPreviewHighQuality,
            replyTo: getMessageIdFromSerialized(request.reply_to),
            mentions: (_b = request.mentions) === null || _b === void 0 ? void 0 : _b.map((mention) => (0, jids_1.toJID)(mention)),
        });
        const response = await (0, util_1.promisify)(this.client.SendMessage)(message);
        const data = response.toObject();
        return this.messageResponse(jid, data);
    }
    async editMessage(chatId, messageId, request) {
        var _a;
        const jid = (0, jids_1.toJID)(this.ensureSuffix(chatId));
        const key = (0, ids_1.parseMessageIdSerialized)(messageId, true);
        const message = new gows_1.messages.EditMessageRequest({
            session: this.session,
            jid: jid,
            messageId: key.id,
            text: request.text,
            linkPreview: (_a = request.linkPreview) !== null && _a !== void 0 ? _a : true,
            linkPreviewHighQuality: request.linkPreviewHighQuality,
        });
        const response = await (0, util_1.promisify)(this.client.EditMessage)(message);
        const data = response.toObject();
        return this.messageResponse(jid, data);
    }
    async sendContactVCard(request) {
        const jid = (0, jids_1.toJID)(this.ensureSuffix(request.chatId));
        const contacts = request.contacts.map((el) => ({ vcard: (0, vcard_1.toVcardV3)(el) }));
        const message = new gows_1.messages.MessageRequest({
            jid: jid,
            session: this.session,
            replyTo: getMessageIdFromSerialized(request.reply_to),
            contacts: contacts.map((contact) => new gows_1.messages.vCardContact(contact)),
        });
        const response = await (0, util_1.promisify)(this.client.SendMessage)(message);
        const data = response.toObject();
        return this.messageResponse(jid, data);
    }
    async sendPoll(request) {
        const jid = (0, jids_1.toJID)(request.chatId);
        const message = new gows_1.messages.MessageRequest({
            jid: jid,
            session: this.session,
            replyTo: getMessageIdFromSerialized(request.reply_to),
            poll: new gows_1.messages.PollMessage({
                name: request.poll.name,
                options: request.poll.options,
                multipleAnswers: request.poll.multipleAnswers,
            }),
        });
        const response = await (0, util_1.promisify)(this.client.SendMessage)(message);
        const data = response.toObject();
        return this.messageResponse(jid, data);
    }
    sendPollVote(request) {
        throw new exceptions_1.AvailableInPlusVersion('Poll voting');
    }
    sendList(request) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    async deleteMessage(chatId, messageId) {
        const jid = (0, jids_1.toJID)(this.ensureSuffix(chatId));
        const key = (0, ids_1.parseMessageIdSerialized)(messageId);
        const message = new gows_1.messages.RevokeMessageRequest({
            session: this.session,
            jid: jid,
            sender: key.participant || '',
            messageId: key.id,
        });
        const response = await (0, util_1.promisify)(this.client.RevokeMessage)(message);
        const data = response.toObject();
        return this.messageResponse(jid, data);
    }
    async prepareJidsForStatus(contacts) {
        if (!contacts || contacts.length == 0) {
            return [];
        }
        return contacts.map(jids_1.toJID);
    }
    async sendTextStatus(status) {
        var _a;
        const participants = await this.prepareJidsForStatus(status.contacts);
        const message = new gows_1.messages.MessageRequest({
            id: status.id,
            jid: const_1.Jid.BROADCAST,
            participants: participants,
            text: status.text,
            session: this.session,
            backgroundColor: new gows_1.messages.OptionalString({
                value: status.backgroundColor,
            }),
            font: new gows_1.messages.OptionalUInt32({
                value: status.font,
            }),
            linkPreview: (_a = status.linkPreview) !== null && _a !== void 0 ? _a : true,
            linkPreviewHighQuality: status.linkPreviewHighQuality,
        });
        const response = await (0, util_1.promisify)(this.client.SendMessage)(message);
        const data = response.toObject();
        return this.messageResponse(const_1.Jid.BROADCAST, data);
    }
    async deleteStatus(request) {
        const participants = await this.prepareJidsForStatus(request.contacts);
        const key = (0, ids_1.parseMessageIdSerialized)(request.id, true);
        const message = new gows_1.messages.RevokeMessageRequest({
            session: this.session,
            jid: status_dto_1.BROADCAST_ID,
            sender: '',
            messageId: key.id,
            participants: participants,
        });
        const response = await (0, util_1.promisify)(this.client.RevokeMessage)(message);
        const data = response.toObject();
        return this.messageResponse(status_dto_1.BROADCAST_ID, data);
    }
    messageResponse(jid, data) {
        const message = data.message ? (0, helpers_1.parseJson)(data.message) : null;
        const id = buildMessageId({
            ID: data.id,
            IsFromMe: true,
            IsGroup: (0, jids_1.isJidGroup)(jid) || (0, jids_1.isJidBroadcast)(jid),
            Chat: jid,
            Sender: this.me.id,
        });
        return {
            id: id,
            _data: message,
        };
    }
    async checkNumberStatus(request) {
        let phone = request.phone.replace(/\+/g, '');
        const req = new gows_1.messages.CheckPhonesRequest({
            session: this.session,
            phones: [phone],
        });
        const response = await (0, util_1.promisify)(this.client.CheckPhones)(req);
        const data = response.toObject();
        const info = data.infos[0];
        return {
            numberExists: (info === null || info === void 0 ? void 0 : info.registered) || false,
            chatId: (0, jids_1.toCusFormat)((info === null || info === void 0 ? void 0 : info.jid) || null),
        };
    }
    async sendLocation(request) {
        const jid = (0, jids_1.toJID)(this.ensureSuffix(request.chatId));
        const message = new gows_1.messages.MessageRequest({
            jid: jid,
            session: this.session,
            replyTo: getMessageIdFromSerialized(request.reply_to),
            location: new gows_1.messages.Location({
                name: request.title,
                degreesLatitude: request.latitude,
                degreesLongitude: request.longitude,
            }),
        });
        const response = await (0, util_1.promisify)(this.client.SendMessage)(message);
        const data = response.toObject();
        return this.messageResponse(jid, data);
    }
    forwardMessage(request) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    sendImage(request) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    sendFile(request) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    sendVoice(request) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    sendLinkCustomPreview(request) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    reply(request) {
        return this.sendText(request);
    }
    async sendSeen(request) {
        const keys = (0, convertors_1.ExtractMessageKeysForRead)(request);
        if (keys.length === 0) {
            return;
        }
        const receipts = esm_1.default.b.aggregateMessageKeysNotFromMe(keys);
        for (const receipt of receipts) {
            if (receipt.messageIds.length === 0) {
                return;
            }
            const req = new gows_1.messages.MarkReadRequest({
                session: this.session,
                jid: receipt.jid,
                messageIds: receipt.messageIds,
                sender: receipt.participant,
            });
            const response = await (0, util_1.promisify)(this.client.MarkRead)(req);
            response.toObject();
        }
        return;
    }
    async startTyping(chat) {
        await this.setPresence(enums_dto_1.WAHAPresenceStatus.TYPING, chat.chatId);
    }
    stopTyping(chat) {
        return this.setPresence(enums_dto_1.WAHAPresenceStatus.PAUSED, chat.chatId);
    }
    async createGroup(request) {
        const req = new gows_1.messages.CreateGroupRequest({
            session: this.session,
            name: request.name,
            participants: request.participants.map((p) => (0, jids_1.toJID)(p.id)),
        });
        const response = await (0, util_1.promisify)(this.client.CreateGroup)(req);
        const data = (0, helpers_1.parseJson)(response);
        return data;
    }
    async joinInfoGroup(code) {
        const req = new gows_1.messages.GroupCodeRequest({
            session: this.session,
            code: code,
        });
        const response = await (0, util_1.promisify)(this.client.GetGroupInfoFromLink)(req);
        const data = (0, helpers_1.parseJson)(response);
        return data;
    }
    async joinGroup(code) {
        const req = new gows_1.messages.GroupCodeRequest({
            session: this.session,
            code: code,
        });
        const response = await (0, util_1.promisify)(this.client.JoinGroupWithLink)(req);
        const data = (0, helpers_1.parseJson)(response);
        return data.jid;
    }
    async getGroups(pagination) {
        const req = this.session;
        const response = await (0, util_1.promisify)(this.client.GetGroups)(req);
        const data = (0, helpers_1.parseJsonList)(response);
        switch (pagination.sortBy) {
            case groups_dto_1.GroupSortField.ID:
                pagination.sortBy = 'JID';
                break;
            case groups_dto_1.GroupSortField.SUBJECT:
                pagination.sortBy = 'Name';
                break;
        }
        const paginator = new Paginator_1.PaginatorInMemory(pagination);
        return paginator.apply(data);
    }
    removeGroupsFieldParticipant(group) {
        delete group.Participants;
    }
    async refreshGroups() {
        const req = this.session;
        await (0, util_1.promisify)(this.client.FetchGroups)(req);
        return true;
    }
    async getGroup(id) {
        const req = new gows_1.messages.JidRequest({
            session: this.session,
            jid: id,
        });
        const response = await (0, util_1.promisify)(this.client.GetGroupInfo)(req);
        const data = (0, helpers_1.parseJson)(response);
        return data;
    }
    async getGroupParticipants(id) {
        var _a;
        const group = await this.getGroup(id);
        if (!((_a = group === null || group === void 0 ? void 0 : group.Participants) === null || _a === void 0 ? void 0 : _a.length)) {
            return [];
        }
        return (0, groups_gows_1.ToGroupParticipants)(group.Participants);
    }
    async getInfoAdminsOnly(id) {
        const group = await this.getGroup(id);
        return {
            adminsOnly: group.IsLocked,
        };
    }
    async setInfoAdminsOnly(id, value) {
        const req = new gows_1.messages.JidBoolRequest({
            session: this.session,
            jid: id,
            value: value,
        });
        await (0, util_1.promisify)(this.client.SetGroupLocked)(req);
        return;
    }
    async getMessagesAdminsOnly(id) {
        const group = await this.getGroup(id);
        return {
            adminsOnly: group.IsAnnounce,
        };
    }
    async setMessagesAdminsOnly(id, value) {
        const req = new gows_1.messages.JidBoolRequest({
            session: this.session,
            jid: id,
            value: value,
        });
        await (0, util_1.promisify)(this.client.SetGroupAnnounce)(req);
        return;
    }
    deleteGroup(id) {
        throw new exceptions_1.NotImplementedByEngineError();
    }
    async leaveGroup(id) {
        const req = new gows_1.messages.JidRequest({
            session: this.session,
            jid: id,
        });
        await (0, util_1.promisify)(this.client.LeaveGroup)(req);
    }
    async setDescription(id, description) {
        const req = new gows_1.messages.JidStringRequest({
            session: this.session,
            jid: id,
            value: description,
        });
        await (0, util_1.promisify)(this.client.SetGroupDescription)(req);
    }
    async setSubject(id, description) {
        const req = new gows_1.messages.JidStringRequest({
            session: this.session,
            jid: id,
            value: description,
        });
        await (0, util_1.promisify)(this.client.SetGroupName)(req);
    }
    async getInviteCode(id) {
        const req = new gows_1.messages.JidRequest({
            session: this.session,
            jid: id,
        });
        const response = await (0, util_1.promisify)(this.client.GetGroupInviteLink)(req);
        const data = response.toObject();
        return data.value;
    }
    async revokeInviteCode(id) {
        const req = new gows_1.messages.JidRequest({
            session: this.session,
            jid: id,
        });
        const response = await (0, util_1.promisify)(this.client.RevokeGroupInviteLink)(req);
        const data = response.toObject();
        return data.value;
    }
    async getParticipants(id) {
        const group = await this.getGroup(id);
        return group.Participants;
    }
    async updateParticipants(id, participants, action) {
        const jids = participants.map((p) => (0, jids_1.toJID)(p.id));
        const req = new gows_1.messages.UpdateParticipantsRequest({
            session: this.session,
            jid: id,
            participants: jids,
            action: action,
        });
        const response = await (0, util_1.promisify)(this.client.UpdateGroupParticipants)(req);
        const data = (0, helpers_1.parseJsonList)(response);
        return data;
    }
    addParticipants(id, request) {
        const action = gows_1.messages.ParticipantAction.ADD;
        return this.updateParticipants(id, request.participants, action);
    }
    removeParticipants(id, request) {
        const action = gows_1.messages.ParticipantAction.REMOVE;
        return this.updateParticipants(id, request.participants, action);
    }
    promoteParticipantsToAdmin(id, request) {
        const action = gows_1.messages.ParticipantAction.PROMOTE;
        return this.updateParticipants(id, request.participants, action);
    }
    demoteParticipantsToUser(id, request) {
        const action = gows_1.messages.ParticipantAction.DEMOTE;
        return this.updateParticipants(id, request.participants, action);
    }
    async setReaction(request) {
        const key = (0, ids_1.parseMessageIdSerialized)(request.messageId);
        const message = new gows_1.messages.MessageReaction({
            session: this.session,
            jid: key.remoteJid,
            messageId: key.id,
            reaction: request.reaction,
            sender: key.fromMe ? this.me.id : key.participant || key.remoteJid,
        });
        const response = await (0, util_1.promisify)(this.client.SendReaction)(message);
        const data = response.toObject();
        return this.messageResponse(key.remoteJid, data);
    }
    async sendEvent(request) {
        const jid = (0, jids_1.toJID)(this.ensureSuffix(request.chatId));
        const event = request.event;
        let location = null;
        if (event.location) {
            location = new gows_1.messages.EventLocation({
                name: event.location.name,
                degreesLatitude: 0,
                degreesLongitude: 0,
            });
        }
        const eventMessage = new gows_1.messages.EventMessage({
            name: event.name,
            description: event.description,
            startTime: event.startTime,
            endTime: event.endTime,
            location: location,
            extraGuestsAllowed: event.extraGuestsAllowed,
        });
        const message = new gows_1.messages.MessageRequest({
            jid: jid,
            session: this.session,
            event: eventMessage,
            replyTo: getMessageIdFromSerialized(request.reply_to),
        });
        const response = await (0, util_1.promisify)(this.client.SendMessage)(message);
        const data = response.toObject();
        return this.messageResponse(jid, data);
    }
    async cancelEvent(eventId) {
        throw new Error('Method not implemented.');
        const key = (0, ids_1.parseMessageIdSerialized)(eventId, false);
        const jid = key.remoteJid;
        const request = new gows_1.messages.CancelEventMessageRequest({
            session: this.session,
            jid: jid,
            messageId: key.id,
        });
        const response = await (0, util_1.promisify)(this.client.CancelEventMessage)(request);
        const data = response.toObject();
        return this.messageResponse(jid, data);
    }
    async setPresence(presence, chatId) {
        let request;
        let method;
        const jid = chatId ? (0, jids_1.toJID)(this.ensureSuffix(chatId)) : null;
        switch (presence) {
            case enums_dto_1.WAHAPresenceStatus.ONLINE:
                request = new gows_1.messages.PresenceRequest({
                    session: this.session,
                    status: gows_1.messages.Presence.AVAILABLE,
                });
                method = this.client.SendPresence;
                break;
            case enums_dto_1.WAHAPresenceStatus.OFFLINE:
                request = new gows_1.messages.PresenceRequest({
                    session: this.session,
                    status: gows_1.messages.Presence.UNAVAILABLE,
                });
                method = this.client.SendPresence;
                break;
            case enums_dto_1.WAHAPresenceStatus.TYPING:
                await this.maintainPresenceOnline();
                request = new gows_1.messages.ChatPresenceRequest({
                    session: this.session,
                    jid: jid,
                    status: gows_1.messages.ChatPresence.TYPING,
                });
                method = this.client.SendChatPresence;
                break;
            case enums_dto_1.WAHAPresenceStatus.RECORDING:
                await this.maintainPresenceOnline();
                request = new gows_1.messages.ChatPresenceRequest({
                    session: this.session,
                    jid: jid,
                    status: gows_1.messages.ChatPresence.RECORDING,
                });
                method = this.client.SendChatPresence;
                break;
            case enums_dto_1.WAHAPresenceStatus.PAUSED:
                await this.maintainPresenceOnline();
                request = new gows_1.messages.ChatPresenceRequest({
                    session: this.session,
                    jid: jid,
                    status: gows_1.messages.ChatPresence.PAUSED,
                });
                method = this.client.SendChatPresence;
                break;
            default:
                throw new Error('Invalid presence status');
        }
        await (0, util_1.promisify)(method)(request);
        this.presence = presence;
    }
    async getPresences() {
        const result = [];
        for (const remoteJid in this.presences.keys()) {
            const storedPresences = this.presences.get(remoteJid);
            result.push(this.toWahaPresences(remoteJid, storedPresences));
        }
        return result;
    }
    async getPresence(chatId) {
        const jid = (0, jids_1.toJID)(chatId);
        await this.subscribePresence(jid);
        if (!(jid in this.presences.keys())) {
            await (0, promiseTimeout_1.sleep)(1000);
        }
        const result = this.presences.get(jid) || [];
        return this.toWahaPresences(jid, result);
    }
    async subscribePresence(chatId) {
        const jid = (0, jids_1.toJID)(chatId);
        const req = new gows_1.messages.SubscribePresenceRequest({
            session: this.session,
            jid: jid,
        });
        const response = await (0, util_1.promisify)(this.client.SubscribePresence)(req);
        return response.toObject();
    }
    toWahaPresenceData(data) {
        if ('From' in data) {
            data = data;
            const lastKnownPresence = data.Unavailable
                ? enums_dto_1.WAHAPresenceStatus.OFFLINE
                : enums_dto_1.WAHAPresenceStatus.ONLINE;
            return {
                participant: (0, jids_1.toCusFormat)(data.From),
                lastKnownPresence: lastKnownPresence,
                lastSeen: parseTimestampToSeconds(data.LastSeen),
            };
        }
        data = data;
        let lastKnownPresence;
        if (data.State === gows.ChatPresenceState.PAUSED) {
            lastKnownPresence = enums_dto_1.WAHAPresenceStatus.PAUSED;
        }
        else if (data.State === gows.ChatPresenceState.COMPOSING &&
            data.Media === gows.ChatPresenceMedia.TEXT) {
            lastKnownPresence = enums_dto_1.WAHAPresenceStatus.TYPING;
        }
        else if (data.State === gows.ChatPresenceState.COMPOSING &&
            data.Media === gows.ChatPresenceMedia.AUDIO) {
            lastKnownPresence = enums_dto_1.WAHAPresenceStatus.RECORDING;
        }
        return {
            participant: (0, jids_1.toCusFormat)(data.Sender),
            lastKnownPresence: lastKnownPresence,
            lastSeen: null,
        };
    }
    toWahaPresences(jid, result) {
        const chatId = (0, jids_1.toCusFormat)(jid);
        return {
            id: chatId,
            presences: result === null || result === void 0 ? void 0 : result.map(this.toWahaPresenceData.bind(this)),
        };
    }
    searchChannelsByView(query) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    searchChannelsByText(query) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    async previewChannelMessages(inviteCode, query) {
        throw new exceptions_1.AvailableInPlusVersion();
    }
    toChannel(newsletter) {
        var _a;
        const role = ((_a = newsletter.role) === null || _a === void 0 ? void 0 : _a.toUpperCase()) || channels_dto_1.ChannelRole.GUEST;
        let picture = newsletter.picture;
        if (picture.startsWith('/')) {
            picture = esm_1.default.b.getUrlFromDirectPath(picture);
        }
        let preview = newsletter.preview;
        if (preview.startsWith('/')) {
            preview = esm_1.default.b.getUrlFromDirectPath(preview);
        }
        return {
            id: newsletter.id,
            name: newsletter.name,
            description: newsletter.description,
            invite: (0, session_abc_1.getChannelInviteLink)(newsletter.invite),
            picture: picture,
            preview: preview,
            verified: newsletter.verified,
            role: role,
            subscribersCount: newsletter.subscriberCount,
        };
    }
    async channelsList(query) {
        const request = new gows_1.messages.NewsletterListRequest({
            session: this.session,
        });
        const response = await (0, util_1.promisify)(this.client.GetSubscribedNewsletters)(request);
        const data = response.toObject();
        const newsletters = data.newsletters;
        let channels = newsletters.map(this.toChannel.bind(this));
        if (query.role) {
            channels = channels.filter((channel) => channel.role === query.role);
        }
        return channels;
    }
    async channelsCreateChannel(request) {
        const req = new gows_1.messages.CreateNewsletterRequest({
            session: this.session,
            name: request.name,
            description: request.description,
        });
        const response = await (0, util_1.promisify)(this.client.CreateNewsletter)(req);
        const newsletter = response.toObject();
        return this.toChannel(newsletter);
    }
    async channelsGetChannel(id) {
        return await this.channelsGetChannelByInviteCode(id);
    }
    async channelsGetChannelByInviteCode(inviteCode) {
        const request = new gows_1.messages.NewsletterInfoRequest({
            session: this.session,
            id: inviteCode,
        });
        const response = await (0, util_1.promisify)(this.client.GetNewsletterInfo)(request);
        const newsletter = response.toObject();
        return this.toChannel(newsletter);
    }
    channelsFollowChannel(id) {
        return this.channelsToggleFollow(id, true);
    }
    channelsUnfollowChannel(id) {
        return this.channelsToggleFollow(id, false);
    }
    async channelsToggleFollow(id, follow) {
        const request = new gows_1.messages.NewsletterToggleFollowRequest({
            session: this.session,
            jid: id,
            follow: follow,
        });
        const response = await (0, util_1.promisify)(this.client.NewsletterToggleFollow)(request);
        return response.toObject();
    }
    channelsMuteChannel(id) {
        return this.channelsToggleMute(id, true);
    }
    channelsUnmuteChannel(id) {
        return this.channelsToggleMute(id, false);
    }
    async channelsToggleMute(id, mute) {
        const request = new gows_1.messages.NewsletterToggleMuteRequest({
            session: this.session,
            jid: id,
            mute: mute,
        });
        const response = await (0, util_1.promisify)(this.client.NewsletterToggleMute)(request);
        return response.toObject();
    }
    async upsertContact(chatId, body) {
        const jid = (0, jids_1.toJID)(chatId);
        const request = new gows_1.messages.UpdateContactRequest({
            session: this.session,
            jid: jid,
            firstName: body.firstName || '',
            lastName: body.lastName || '',
        });
        const response = await (0, util_1.promisify)(this.client.UpdateContact)(request);
        response.toObject();
    }
    toWAContact(contact) {
        return {
            id: (0, jids_1.toCusFormat)(contact.Jid),
            name: contact.Name,
            pushname: contact.PushName,
        };
    }
    async getContact(query) {
        const jid = (0, jids_1.toJID)(query.contactId);
        const request = new gows_1.messages.EntityByIdRequest({
            session: this.session,
            id: jid,
        });
        const response = await (0, util_1.promisify)(this.client.GetContactById)(request);
        const data = (0, helpers_1.parseJson)(response);
        return this.toWAContact(data);
    }
    async getContacts(pagination) {
        const request = new gows_1.messages.GetContactsRequest({
            session: this.session,
            pagination: new gows_1.messages.Pagination({
                limit: pagination.limit,
                offset: pagination.offset,
            }),
            sortBy: new gows_1.messages.SortBy({
                field: pagination.sortBy || 'id',
                order: pagination.sortOrder === pagination_dto_1.SortOrder.DESC
                    ? gows_1.messages.SortBy.Order.DESC
                    : gows_1.messages.SortBy.Order.ASC,
            }),
        });
        const response = await (0, util_1.promisify)(this.client.GetContacts)(request);
        const data = (0, helpers_1.parseJsonList)(response);
        return data.map(this.toWAContact.bind(this));
    }
    async getAllLids(pagination) {
        const request = new gows_1.messages.GetLidsRequest({
            session: this.session,
        });
        const response = await (0, util_1.promisify)(this.client.GetAllLids)(request);
        const data = (0, helpers_1.parseJsonList)(response);
        const lids = data.map((item) => ({
            lid: item.lid,
            pn: (0, jids_1.toCusFormat)(item.pn),
        }));
        const paginator = new Paginator_1.PaginatorInMemory(pagination);
        return paginator.apply(lids);
    }
    async getLidsCount() {
        const response = await (0, util_1.promisify)(this.client.GetLidsCount)(this.session);
        return response === null || response === void 0 ? void 0 : response.value;
    }
    async findPNByLid(lid) {
        const request = new gows_1.messages.EntityByIdRequest({
            session: this.session,
            id: lid,
        });
        const response = await (0, util_1.promisify)(this.client.FindPNByLid)(request);
        const phoneNumber = response === null || response === void 0 ? void 0 : response.value;
        return {
            lid: lid,
            pn: phoneNumber ? (0, jids_1.toCusFormat)(phoneNumber) : null,
        };
    }
    async findLIDByPhoneNumber(phoneNumber) {
        const pn = (0, jids_1.toJID)(phoneNumber);
        const request = new gows_1.messages.EntityByIdRequest({
            session: this.session,
            id: pn,
        });
        const response = await (0, util_1.promisify)(this.client.FindLIDByPhoneNumber)(request);
        const lid = response.value;
        return {
            lid: lid || null,
            pn: (0, jids_1.toCusFormat)(pn),
        };
    }
    async getChatsOverview(pagination, filter) {
        if (!pagination.sortBy) {
            pagination.sortBy = 'timestamp';
        }
        if (!pagination.sortOrder) {
            pagination.sortOrder = pagination_dto_1.SortOrder.DESC;
        }
        const chats = await this.getChats(pagination, filter);
        const promises = [];
        for (const chat of chats) {
            promises.push(this.fetchChatSummary(chat));
        }
        const result = await Promise.all(promises);
        return result;
    }
    async fetchChatSummary(chat) {
        const id = (0, jids_1.toCusFormat)(chat.id);
        const name = chat.name;
        const picture = await this.getContactProfilePicture(chat.id, false);
        const messages = await this.getChatMessages(chat.id, { limit: 1, offset: 0, downloadMedia: false }, {});
        const message = messages.length > 0 ? messages[0] : null;
        return {
            id: id,
            name: name || null,
            picture: picture,
            lastMessage: message,
            _chat: chat,
        };
    }
    toWAChat(chat) {
        return {
            id: (0, jids_1.toCusFormat)(chat.Jid),
            name: chat.Name,
            conversationTimestamp: parseTimestampToSeconds(chat.ConversationTimestamp),
        };
    }
    async getChats(pagination, filter = null) {
        if (pagination.sortBy === chats_dto_1.ChatSortField.CONVERSATION_TIMESTAMP) {
            pagination.sortBy = 'timestamp';
        }
        let jids = [];
        if ((filter === null || filter === void 0 ? void 0 : filter.ids) && filter.ids.length > 0) {
            jids = filter.ids.map((id) => (0, jids_1.toJID)(id));
        }
        const request = new gows_1.messages.GetChatsRequest({
            session: this.session,
            pagination: new gows_1.messages.Pagination({
                limit: pagination.limit,
                offset: pagination.offset,
            }),
            sortBy: new gows_1.messages.SortBy({
                field: pagination.sortBy || 'id',
                order: pagination.sortOrder === pagination_dto_1.SortOrder.DESC
                    ? gows_1.messages.SortBy.Order.DESC
                    : gows_1.messages.SortBy.Order.ASC,
            }),
            filter: new gows_1.messages.ChatFilter({
                jids: jids,
            }),
        });
        const response = await (0, util_1.promisify)(this.client.GetChats)(request);
        const data = (0, helpers_1.parseJsonList)(response);
        return data.map(this.toWAChat.bind(this));
    }
    async getChatMessages(chatId, query, filter) {
        const downloadMedia = query.downloadMedia;
        let jid;
        if (chatId === 'all') {
            jid = null;
        }
        else {
            jid = new gows_1.messages.OptionalString({
                value: (0, jids_1.toJID)(this.ensureSuffix(chatId)),
            });
        }
        const status = filter['filter.ack'] != null ? (0, acks_1.AckToStatus)(filter['filter.ack']) : null;
        const request = new gows_1.messages.GetMessagesRequest({
            session: this.session,
            filters: new gows_1.messages.MessageFilters({
                jid: jid,
                timestampGte: (0, helpers_1.optional)(filter['filter.timestamp.gte'], gows_1.messages.OptionalUInt64),
                timestampLte: (0, helpers_1.optional)(filter['filter.timestamp.lte'], gows_1.messages.OptionalUInt64),
                fromMe: (0, helpers_1.optional)(filter['filter.fromMe'], gows_1.messages.OptionalBool),
                status: (0, helpers_1.optional)(status, gows_1.messages.OptionalUInt32),
            }),
            sortBy: new gows_1.messages.SortBy({
                field: query.sortBy || chats_dto_1.MessageSortField.TIMESTAMP,
                order: query.sortOrder === pagination_dto_1.SortOrder.ASC
                    ? gows_1.messages.SortBy.Order.ASC
                    : gows_1.messages.SortBy.Order.DESC,
            }),
            pagination: new gows_1.messages.Pagination({
                limit: query.limit,
                offset: query.offset,
            }),
        });
        const response = await (0, util_1.promisify)(this.client.GetMessages)(request);
        const msgs = (0, helpers_1.parseJsonList)(response);
        const promises = [];
        for (const msg of msgs) {
            promises.push(this.processIncomingMessage(msg, downloadMedia));
        }
        let result = await Promise.all(promises);
        result = result.filter(Boolean);
        return result;
    }
    readChatMessages(chatId, request) {
        return this.readChatMessagesWSImpl(chatId, request);
    }
    async getChatMessage(chatId, messageId, query) {
        const key = (0, ids_1.parseMessageIdSerialized)(messageId, true);
        const request = new gows_1.messages.EntityByIdRequest({
            session: this.session,
            id: key.id,
        });
        const response = await (0, util_1.promisify)(this.client.GetMessageById)(request);
        const msg = (0, helpers_1.parseJson)(response);
        return this.processIncomingMessage(msg, query.downloadMedia);
    }
    async getLabels() {
        const request = new gows_1.messages.GetLabelsRequest({
            session: this.session,
        });
        const response = await (0, util_1.promisify)(this.client.GetLabels)(request);
        const labels = (0, helpers_1.parseJsonList)(response);
        return labels.map(this.toLabel);
    }
    async createLabel(labelDto) {
        const labels = await this.getLabels();
        const highestLabelId = lodash.max(labels.map((label) => parseInt(label.id)));
        const labelId = highestLabelId ? highestLabelId + 1 : 1;
        const label = {
            id: labelId.toString(),
            name: labelDto.name,
            color: labelDto.color,
            colorHex: labels_dto_1.Label.toHex(labelDto.color),
        };
        return this.updateLabel(label);
    }
    toLabel(label) {
        const color = label.color;
        return {
            id: label.id,
            name: label.name,
            color: color,
            colorHex: labels_dto_1.Label.toHex(color),
        };
    }
    async updateLabel(label) {
        const request = new gows_1.messages.UpsertLabelRequest({
            session: this.session,
            label: new gows_1.messages.Label({
                id: label.id,
                name: label.name,
                color: label.color,
            }),
        });
        await (0, util_1.promisify)(this.client.UpsertLabel)(request);
        return label;
    }
    async deleteLabel(label) {
        const request = new gows_1.messages.DeleteLabelRequest({
            session: this.session,
            label: new gows_1.messages.Label({
                id: label.id,
                name: label.name,
                color: label.color,
            }),
        });
        await (0, util_1.promisify)(this.client.DeleteLabel)(request);
    }
    async getChatsByLabelId(labelId) {
        const request = new gows_1.messages.EntityByIdRequest({
            session: this.session,
            id: labelId,
        });
        const response = await (0, util_1.promisify)(this.client.GetChatsByLabelId)(request);
        const ids = (0, helpers_1.parseJsonList)(response);
        return ids.map((jid) => {
            return {
                id: (0, jids_1.toCusFormat)(jid),
            };
        });
    }
    async getChatLabels(chatId) {
        const jid = (0, jids_1.toJID)(chatId);
        const request = new gows_1.messages.EntityByIdRequest({
            session: this.session,
            id: jid,
        });
        const response = await (0, util_1.promisify)(this.client.GetLabelsByJid)(request);
        const labels = (0, helpers_1.parseJsonList)(response);
        return labels.map(this.toLabel);
    }
    async chatsUnreadChat(chatId) {
        const jid = (0, jids_1.toJID)(this.ensureSuffix(chatId));
        const request = new gows_1.messages.ChatUnreadRequest({
            session: this.session,
            jid: jid,
            read: false,
        });
        await (0, util_1.promisify)(this.client.MarkChatUnread)(request);
        return { success: true };
    }
    async putLabelsToChat(chatId, labels) {
        const jid = (0, jids_1.toJID)(chatId);
        const labelsIds = labels.map((label) => label.id);
        const currentLabels = await this.getChatLabels(jid);
        const currentLabelsIds = currentLabels.map((label) => label.id);
        const addLabelsIds = lodash.difference(labelsIds, currentLabelsIds);
        const removeLabelsIds = lodash.difference(currentLabelsIds, labelsIds);
        for (const labelId of addLabelsIds) {
            const request = new gows_1.messages.ChatLabelRequest({
                session: this.session,
                labelId: labelId,
                chatId: jid,
            });
            await (0, util_1.promisify)(this.client.AddChatLabel)(request);
        }
        for (const labelId of removeLabelsIds) {
            const request = new gows_1.messages.ChatLabelRequest({
                session: this.session,
                labelId: labelId,
                chatId: jid,
            });
            await (0, util_1.promisify)(this.client.RemoveChatLabel)(request);
        }
    }
    shouldProcessIncomingMessage(message) {
        var _a;
        if (!message)
            return;
        if (!message.Message)
            return;
        const content = esm_1.default.b.normalizeMessageContent(message.Message);
        if (content.reactionMessage)
            return;
        if (content.pollUpdateMessage)
            return;
        if (content.encEventResponseMessage)
            return;
        if (content.protocolMessage)
            return;
        const contentType = esm_1.default.b.getContentType(content);
        if (contentType == 'deviceSentMessage') {
            return;
        }
        const hasSomeContent = !!contentType;
        if (!hasSomeContent) {
            if ((_a = message === null || message === void 0 ? void 0 : message.Message) === null || _a === void 0 ? void 0 : _a.senderKeyDistributionMessage)
                return;
        }
        return true;
    }
    async processIncomingMessage(message, downloadMedia = true) {
        if (!this.shouldProcessIncomingMessage(message)) {
            return null;
        }
        const wamessage = this.toWAMessage(message);
        if (downloadMedia) {
            const media = await this.downloadMediaSafe(message);
            wamessage.media = media;
        }
        return wamessage;
    }
    async downloadMediaSafe(message) {
        try {
            return await this.downloadMedia(message);
        }
        catch (e) {
            this.logger.error('Failed when tried to download media for a message');
            this.logger.error({ err: e }, e.stack);
            return null;
        }
    }
    async downloadMedia(message) {
        const processor = new GOWSEngineMediaProcessor(this);
        const media = await this.mediaManager.processMedia(processor, message, this.name);
        return media;
    }
    toWAMessage(message) {
        var _a;
        const fromToParticipant = getFromToParticipant(message);
        const id = buildMessageId(message);
        const body = (0, session_noweb_core_1.extractBody)(message.Message);
        const replyTo = this.extractReplyTo(message.Message);
        let ack = (0, helpers_1.statusToAck)(message.Status);
        if (ack === enums_dto_1.WAMessageAck.ERROR) {
            ack = null;
        }
        const mediaContent = (0, utils_1.extractMediaContent)(message.Message);
        const source = this.getSourceDeviceByMsg(message);
        let waproto = null;
        try {
            waproto = (0, waproto_1.GoToJSWAProto)(message.Message);
        }
        catch (e) {
            this.logger.error('Failed to resolve proto message from GOWS to JS format');
            this.logger.error({ err: e }, e.stack);
        }
        return {
            id: id,
            timestamp: parseTimestampToSeconds(message.Info.Timestamp),
            from: (0, jids_1.toCusFormat)(fromToParticipant.from),
            fromMe: message.Info.IsFromMe,
            source: source,
            body: body,
            to: (0, jids_1.toCusFormat)(fromToParticipant.to),
            participant: (0, jids_1.toCusFormat)(fromToParticipant.participant),
            hasMedia: Boolean(mediaContent),
            media: null,
            mediaUrl: (_a = message.media) === null || _a === void 0 ? void 0 : _a.url,
            ack: ack,
            location: (0, locaiton_1.extractWALocation)(waproto),
            vCards: (0, vcards_1.extractVCards)(waproto),
            ackName: enums_dto_1.WAMessageAck[ack] || enums_dto_1.ACK_UNKNOWN,
            replyTo: replyTo,
            _data: message,
        };
    }
    toPollVotePayload(event) {
        var _a;
        const creationKey = (_a = event.Message) === null || _a === void 0 ? void 0 : _a.pollUpdateMessage.pollCreationMessageKey;
        const pollKey = {
            remoteJid: creationKey.remoteJID,
            fromMe: creationKey.fromMe,
            id: creationKey.ID,
            participant: creationKey.participant,
        };
        const voteKey = {
            id: event.Info.ID,
            remoteJid: event.Info.Chat,
            participant: event.IsGroup ? event.Info.Sender : null,
            fromMe: event.IsFromMe,
        };
        const key = fixPollCreationKey(voteKey, pollKey, this.me);
        const fromToParticipant = getFromToParticipant(event);
        const pollCreationKey = (0, session_noweb_core_1.getDestination)(key);
        return {
            poll: pollCreationKey,
            vote: {
                id: buildMessageId(event),
                from: (0, jids_1.toCusFormat)(fromToParticipant.from),
                fromMe: event.Info.IsFromMe,
                to: (0, jids_1.toCusFormat)(fromToParticipant.to),
                participant: (0, jids_1.toCusFormat)(fromToParticipant.participant),
                selectedOptions: event.Votes,
                timestamp: event.Message.pollUpdateMessage.senderTimestampMS,
            },
            _data: event,
        };
    }
    getCallId(call) {
        var _a, _b;
        return (call === null || call === void 0 ? void 0 : call.CallID) || ((_b = (_a = call === null || call === void 0 ? void 0 : call.Data) === null || _a === void 0 ? void 0 : _a.Attrs) === null || _b === void 0 ? void 0 : _b['call-id']) || null;
    }
    shouldProcessCallEvent(call) {
        if (!call) {
            return false;
        }
        if (call.GroupJID && this.jids.include(call.GroupJID)) {
            return true;
        }
        return this.jids.include(call.From);
    }
    toCallData(call) {
        const date = (call === null || call === void 0 ? void 0 : call.Timestamp) ? new Date(call.Timestamp) : new Date();
        const timestamp = date.getTime() / 1000;
        const isVideo = this.isVideoCall(call);
        const isGroup = this.isGroupCall(call);
        const from = (call === null || call === void 0 ? void 0 : call.From) || (call === null || call === void 0 ? void 0 : call.GroupJID);
        return {
            id: this.getCallId(call),
            from: from ? (0, jids_1.toCusFormat)(from) : undefined,
            timestamp: timestamp,
            isVideo: Boolean(isVideo),
            isGroup: isGroup,
            _data: call,
        };
    }
    isVideoCall(call) {
        var _a, _b, _c, _d, _e;
        if (!call)
            return false;
        if ((call === null || call === void 0 ? void 0 : call.Media) === 'video')
            return true;
        const attrsMedia = ((_b = (_a = call === null || call === void 0 ? void 0 : call.Data) === null || _a === void 0 ? void 0 : _a.Attrs) === null || _b === void 0 ? void 0 : _b.media) || ((_d = (_c = call === null || call === void 0 ? void 0 : call.Data) === null || _c === void 0 ? void 0 : _c.Attrs) === null || _d === void 0 ? void 0 : _d.type);
        if (attrsMedia === 'video')
            return true;
        const content = (_e = call === null || call === void 0 ? void 0 : call.Data) === null || _e === void 0 ? void 0 : _e.Content;
        if (Array.isArray(content)) {
            const hasVideoTag = content.some((item) => (item === null || item === void 0 ? void 0 : item.Tag) === 'video');
            if (hasVideoTag) {
                return true;
            }
        }
        return false;
    }
    isGroupCall(call) {
        var _a;
        if (!call)
            return false;
        if (call === null || call === void 0 ? void 0 : call.GroupJID)
            return true;
        const attrs = (_a = call === null || call === void 0 ? void 0 : call.Data) === null || _a === void 0 ? void 0 : _a.Attrs;
        if (!attrs)
            return false;
        return attrs.type === 'group' || Boolean(attrs['group-jid']);
    }
    toEventResponsePayload(event) {
        var _a;
        const msg = this.toWAMessage(event);
        let response = null;
        if (event.EventResponse) {
            response = {
                response: (0, events_1.ParseEventResponseType)(event.EventResponse.response),
                timestampMs: event.EventResponse.timestampMS,
                extraGuestCount: event.EventResponse.extraGuestCount || 0,
            };
        }
        const message = event.Message || event.message;
        const eventCreationMessageKey = (_a = message === null || message === void 0 ? void 0 : message.encEventResponseMessage) === null || _a === void 0 ? void 0 : _a.eventCreationMessageKey;
        const key = {
            remoteJid: eventCreationMessageKey.remoteJID,
            fromMe: eventCreationMessageKey.fromMe,
            id: eventCreationMessageKey.ID,
            participant: eventCreationMessageKey.participant,
        };
        const eventCreationKey = (0, session_noweb_core_1.getDestination)(key);
        return Object.assign(Object.assign({}, msg), { eventCreationKey: eventCreationKey, eventResponse: response, _data: event });
    }
    getSourceDeviceByMsg(message) {
        if (!message.Info.IsFromMe) {
            return responses_dto_1.MessageSource.APP;
        }
        const myJid = this.me.jid;
        const myDeviceId = (0, session_abc_1.extractDeviceId)(myJid);
        const sentDeviceId = (0, session_abc_1.extractDeviceId)(message.Info.Sender);
        return sentDeviceId === myDeviceId ? responses_dto_1.MessageSource.API : responses_dto_1.MessageSource.APP;
    }
    extractReplyTo(message) {
        var _a;
        const msgType = esm_1.default.b.getContentType(message);
        const contextInfo = (_a = message[msgType]) === null || _a === void 0 ? void 0 : _a.contextInfo;
        if (!contextInfo) {
            return null;
        }
        const quotedMessage = contextInfo.quotedMessage;
        if (!quotedMessage) {
            return null;
        }
        const body = (0, session_noweb_core_1.extractBody)(quotedMessage);
        return {
            id: contextInfo.stanzaID,
            participant: (0, jids_1.toCusFormat)(contextInfo.participant),
            body: body,
            _data: quotedMessage,
        };
    }
    async getEngineInfo() {
        var _a, _b, _c;
        const clientState = (_a = this.client) === null || _a === void 0 ? void 0 : _a.getChannel().getConnectivityState(false);
        const streamState = (_c = (_b = this.stream$) === null || _b === void 0 ? void 0 : _b.client) === null || _c === void 0 ? void 0 : _c.getChannel().getConnectivityState(false);
        const grpc = {
            client: grpc_js_1.connectivityState[clientState] || 'NO_CLIENT',
            stream: grpc_js_1.connectivityState[streamState] || 'NO_STREAM',
        };
        if (!this.client) {
            return {
                grpc: grpc,
            };
        }
        let gows;
        try {
            const response = await (0, util_1.promisify)(this.client.GetSessionState)(this.session);
            const info = response.toObject();
            gows = Object.assign({}, info);
        }
        catch (err) {
            gows = { error: err };
        }
        return {
            grpc: grpc,
            gows: gows,
        };
    }
    receiptToMessageAck(receipt) {
        var _a;
        const fromToParticipant = getFromToParticipant(receipt);
        let ack;
        switch (receipt.Type) {
            case '':
                ack = enums_dto_1.WAMessageAck.DEVICE;
                break;
            case 'server-error':
                ack = enums_dto_1.WAMessageAck.ERROR;
                break;
            case 'inactive':
                ack = enums_dto_1.WAMessageAck.DEVICE;
                break;
            case 'active':
                ack = enums_dto_1.WAMessageAck.DEVICE;
                break;
            case 'read':
                ack = enums_dto_1.WAMessageAck.READ;
                break;
            case 'played':
                ack = enums_dto_1.WAMessageAck.PLAYED;
                break;
            default:
                return [];
        }
        const acks = [];
        for (const messageId of receipt.MessageIDs) {
            const msg = Object.assign(Object.assign({}, receipt), { ID: messageId, IsFromMe: !receipt.IsFromMe, Sender: receipt.MessageSender || ((_a = this.me) === null || _a === void 0 ? void 0 : _a.id) });
            const id = buildMessageId(msg);
            const body = {
                id: id,
                from: (0, jids_1.toCusFormat)(fromToParticipant.from),
                to: (0, jids_1.toCusFormat)(fromToParticipant.to),
                participant: (0, jids_1.toCusFormat)(fromToParticipant.participant),
                fromMe: msg.IsFromMe,
                ack: ack,
                ackName: enums_dto_1.WAMessageAck[ack] || enums_dto_1.ACK_UNKNOWN,
                _data: receipt,
            };
            acks.push(body);
        }
        return acks;
    }
    processMessageReaction(message) {
        if (!message)
            return null;
        if (!message.Message)
            return null;
        if (!message.Message.reactionMessage)
            return null;
        const id = buildMessageId(message);
        const fromToParticipant = getFromToParticipant(message);
        const reactionMessage = message.Message.reactionMessage;
        const messageId = this.buildMessageIdFromKey(reactionMessage.key);
        const source = this.getSourceDeviceByMsg(message);
        const reaction = {
            id: id,
            timestamp: parseTimestampToSeconds(message.Info.Timestamp),
            from: (0, jids_1.toCusFormat)(fromToParticipant.from),
            fromMe: message.Info.IsFromMe,
            source: source,
            to: (0, jids_1.toCusFormat)(fromToParticipant.to),
            participant: (0, jids_1.toCusFormat)(fromToParticipant.participant),
            reaction: {
                text: reactionMessage.text,
                messageId: messageId,
            },
        };
        return reaction;
    }
    buildMessageIdFromKey(key) {
        const sender = key.fromMe ? this.me.id : key.participant || key.remoteJID;
        const info = {
            Chat: key.remoteJID,
            Sender: sender,
            ID: key.ID,
            IsFromMe: key.fromMe,
            IsGroup: (0, jids_1.isJidGroup)(key.remoteJID),
        };
        return buildMessageId(info);
    }
}
exports.WhatsappSessionGoWSCore = WhatsappSessionGoWSCore;
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "fetchContactProfilePicture", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "setProfileName", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "setProfileStatus", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageTextRequest]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "sendText", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, chatting_dto_1.EditMessageRequest]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "editMessage", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageContactVcardRequest]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "sendContactVCard", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessagePollRequest]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "sendPoll", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "deleteMessage", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [status_dto_1.TextStatus]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "sendTextStatus", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageLocationRequest]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "sendLocation", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageReplyRequest]),
    __metadata("design:returntype", void 0)
], WhatsappSessionGoWSCore.prototype, "reply", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.SendSeenRequest]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "sendSeen", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.ChatRequest]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "startTyping", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.ChatRequest]),
    __metadata("design:returntype", void 0)
], WhatsappSessionGoWSCore.prototype, "stopTyping", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [groups_dto_1.CreateGroupRequest]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "createGroup", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "joinInfoGroup", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "joinGroup", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "refreshGroups", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "setInfoAdminsOnly", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "setMessagesAdminsOnly", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "leaveGroup", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "setDescription", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "setSubject", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "getInviteCode", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "revokeInviteCode", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, groups_dto_1.ParticipantsRequest]),
    __metadata("design:returntype", void 0)
], WhatsappSessionGoWSCore.prototype, "addParticipants", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, groups_dto_1.ParticipantsRequest]),
    __metadata("design:returntype", void 0)
], WhatsappSessionGoWSCore.prototype, "removeParticipants", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, groups_dto_1.ParticipantsRequest]),
    __metadata("design:returntype", void 0)
], WhatsappSessionGoWSCore.prototype, "promoteParticipantsToAdmin", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, groups_dto_1.ParticipantsRequest]),
    __metadata("design:returntype", void 0)
], WhatsappSessionGoWSCore.prototype, "demoteParticipantsToUser", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [chatting_dto_1.MessageReactionRequest]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "setReaction", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [events_dto_1.EventMessageRequest]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "sendEvent", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "cancelEvent", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "subscribePresence", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [channels_dto_1.CreateChannelRequest]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "channelsCreateChannel", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "channelsGetChannel", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "channelsGetChannelByInviteCode", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "channelsFollowChannel", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "channelsUnfollowChannel", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "channelsMuteChannel", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "channelsUnmuteChannel", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, contacts_dto_1.ContactUpdateBody]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "upsertContact", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, chats_dto_1.ReadChatMessagesQuery]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "readChatMessages", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [labels_dto_1.LabelDTO]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "createLabel", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [labels_dto_1.Label]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "updateLabel", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [labels_dto_1.Label]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "deleteLabel", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "chatsUnreadChat", null);
__decorate([
    (0, activity_1.Activity)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], WhatsappSessionGoWSCore.prototype, "putLabelsToChat", null);
class GOWSEngineMediaProcessor {
    constructor(session) {
        this.session = session;
    }
    hasMedia(message) {
        return Boolean((0, utils_1.extractMediaContent)(message.Message));
    }
    getChatId(message) {
        return (0, jids_1.toCusFormat)(message.Info.Chat);
    }
    getMessageId(message) {
        return message.Info.ID;
    }
    getMimetype(message) {
        const content = (0, utils_1.extractMediaContent)(message.Message);
        return content.mimetype;
    }
    async getMediaBuffer(message) {
        const mediaDownloadTimeoutMs = 600000;
        const data = JSON.stringify(message.Message);
        const tmpdir = new tmpdir_1.TmpDir(this.session.logger, `waha-media-${this.session.name}-`);
        return await tmpdir.use(async (dir) => {
            var _a;
            const file = path.join(dir, 'content.tmp');
            const request = new gows_1.messages.DownloadMediaRequest({
                session: this.session.session,
                message: data,
                jid: message.Info.Chat,
                messageId: message.Info.ID,
                contentPath: file,
            });
            const opts = {
                deadline: new Date(Date.now() + mediaDownloadTimeoutMs),
            };
            const call = (0, util_1.promisify)(this.session.client.DownloadMedia.bind(this.session.client));
            try {
                const response = await call(request, opts);
                const obj = response.toObject();
                if (!obj.contentPath) {
                    return Buffer.from(obj.content);
                }
                else {
                    return await fsp.readFile(obj.contentPath);
                }
            }
            catch (err) {
                if ((err === null || err === void 0 ? void 0 : err.code) === grpc.status.DEADLINE_EXCEEDED) {
                    err.message = `DownloadMedia timed out after ${mediaDownloadTimeoutMs}ms for message '${(_a = message === null || message === void 0 ? void 0 : message.Info) === null || _a === void 0 ? void 0 : _a.ID}'`;
                }
                throw err;
            }
        });
    }
    getFilename(message) {
        const content = (0, utils_1.extractMediaContent)(message.Message);
        return content === null || content === void 0 ? void 0 : content.fileName;
    }
}
exports.GOWSEngineMediaProcessor = GOWSEngineMediaProcessor;
function isMine(message) {
    return !!message.Info.IsFromMe;
}
function getFromToParticipant(message) {
    const info = message.Info || message;
    return {
        from: info.Chat,
        to: info.IsGroup ? info.Sender : null,
        participant: info.IsGroup ? info.Sender : null,
        fromMe: info.IsFromMe,
    };
}
function buildMessageId(message) {
    const info = message.Info || message;
    const chatId = (0, jids_1.toCusFormat)(info.Chat);
    const participant = (0, jids_1.toCusFormat)(info.Sender);
    if (info.IsGroup) {
        return `${info.IsFromMe}_${chatId}_${info.ID}_${participant}`;
    }
    return `${info.IsFromMe}_${chatId}_${info.ID}`;
}
function parseTimestamp(timestamp) {
    if (timestamp.startsWith('0001')) {
        return null;
    }
    return new Date(timestamp).getTime();
}
function parseTimestampToSeconds(timestamp) {
    const ms = parseTimestamp(timestamp);
    if (!ms) {
        return ms;
    }
    return Math.floor(ms / 1000);
}
function getMessageIdFromSerialized(serialized) {
    if (!serialized) {
        return null;
    }
    const key = (0, ids_1.parseMessageIdSerialized)(serialized, true);
    return key.id;
}
function fixPollCreationKey(vote, poll, me) {
    if (vote === null || vote === void 0 ? void 0 : vote.fromMe) {
        return poll;
    }
    if (!me) {
        return poll;
    }
    if (!poll) {
        return poll;
    }
    if ((0, jids_1.toCusFormat)(poll.remoteJid) == (0, jids_1.toCusFormat)(me.id) ||
        (0, jids_1.toCusFormat)(poll.remoteJid) == (0, jids_1.toCusFormat)(me.lid)) {
        return {
            id: poll.id,
            remoteJid: vote.remoteJid,
            fromMe: true,
            participant: undefined,
        };
    }
    if ((0, jids_1.toCusFormat)(poll.participant) == (0, jids_1.toCusFormat)(me.id) ||
        (0, jids_1.toCusFormat)(poll.participant) == (0, jids_1.toCusFormat)(me.lid)) {
        return {
            id: poll.id,
            remoteJid: vote.remoteJid,
            fromMe: true,
            participant: me.id,
        };
    }
    return poll;
}
//# sourceMappingURL=session.gows.core.js.map