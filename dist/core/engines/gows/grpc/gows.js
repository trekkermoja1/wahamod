"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = void 0;
const pb_1 = require("google-protobuf");
const grpc_1 = require("@grpc/grpc-js");
var messages;
(function (messages) {
    var _OptionalString_one_of_decls, _OptionalUInt32_one_of_decls, _OptionalUInt64_one_of_decls, _OptionalInt64_one_of_decls, _OptionalBool_one_of_decls, _OptionalDouble_one_of_decls, _JidRequest_one_of_decls, _JidStringRequest_one_of_decls, _JidBoolRequest_one_of_decls, _EventJson_one_of_decls, _PairCodeRequest_one_of_decls, _PairCodeResponse_one_of_decls, _Empty_one_of_decls, _SessionLogConfig_one_of_decls, _SessionStoreConfig_one_of_decls, _SessionProxyConfig_one_of_decls, _SessionIgnoreJidsConfig_one_of_decls, _SessionConfig_one_of_decls, _StartSessionRequest_one_of_decls, _SessionStateResponse_one_of_decls, _Session_one_of_decls, _ProfileNameRequest_one_of_decls, _ProfileStatusRequest_one_of_decls, _SetProfilePictureRequest_one_of_decls, _CreateGroupRequest_one_of_decls, _SetPictureRequest_one_of_decls, _UpdateParticipantsRequest_one_of_decls, _GroupCodeRequest_one_of_decls, _AudioInfo_one_of_decls, _Media_one_of_decls, _LinkPreview_one_of_decls, _vCardContact_one_of_decls, _EventLocation_one_of_decls, _Location_one_of_decls, _EventMessage_one_of_decls, _MessageRequest_one_of_decls, _Row_one_of_decls, _Section_one_of_decls, _ListMessage_one_of_decls, _MessageReaction_one_of_decls, _MessageResponse_one_of_decls, _NewMessageIDResponse_one_of_decls, _ProfilePictureRequest_one_of_decls, _ProfilePictureResponse_one_of_decls, _ButtonReplyRequest_one_of_decls, _PresenceRequest_one_of_decls, _ChatPresenceRequest_one_of_decls, _SubscribePresenceRequest_one_of_decls, _MarkReadRequest_one_of_decls, _CheckPhonesRequest_one_of_decls, _ChatUnreadRequest_one_of_decls, _PhoneInfo_one_of_decls, _CheckPhonesResponse_one_of_decls, _RevokeMessageRequest_one_of_decls, _EditMessageRequest_one_of_decls, _NewsletterListRequest_one_of_decls, _Newsletter_one_of_decls, _NewsletterList_one_of_decls, _NewsletterInfoRequest_one_of_decls, _GetNewsletterMessagesByInviteRequest_one_of_decls, _SearchPage_one_of_decls, _SearchNewslettersByViewRequest_one_of_decls, _SearchNewslettersByTextRequest_one_of_decls, _SearchPageResult_one_of_decls, _NewsletterSearchPageResult_one_of_decls, _CreateNewsletterRequest_one_of_decls, _NewsletterToggleMuteRequest_one_of_decls, _NewsletterToggleFollowRequest_one_of_decls, _DownloadMediaRequest_one_of_decls, _DownloadMediaResponse_one_of_decls, _EntityByIdRequest_one_of_decls, _Json_one_of_decls, _JsonList_one_of_decls, _Pagination_one_of_decls, _SortBy_one_of_decls, _MessageFilters_one_of_decls, _GetMessagesRequest_one_of_decls, _UpdateContactRequest_one_of_decls, _GetContactsRequest_one_of_decls, _ChatFilter_one_of_decls, _GetChatsRequest_one_of_decls, _GetLabelsRequest_one_of_decls, _Label_one_of_decls, _UpsertLabelRequest_one_of_decls, _DeleteLabelRequest_one_of_decls, _ChatLabelRequest_one_of_decls, _CancelEventMessageRequest_one_of_decls, _GetLidsRequest_one_of_decls, _RejectCallRequest_one_of_decls, _PollMessage_one_of_decls, _PollVoteMessage_one_of_decls;
    let LogLevel;
    (function (LogLevel) {
        LogLevel[LogLevel["TRACE"] = 0] = "TRACE";
        LogLevel[LogLevel["DEBUG"] = 1] = "DEBUG";
        LogLevel[LogLevel["INFO"] = 2] = "INFO";
        LogLevel[LogLevel["WARN"] = 3] = "WARN";
        LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
    })(LogLevel = messages.LogLevel || (messages.LogLevel = {}));
    let ParticipantAction;
    (function (ParticipantAction) {
        ParticipantAction[ParticipantAction["ADD"] = 0] = "ADD";
        ParticipantAction[ParticipantAction["REMOVE"] = 1] = "REMOVE";
        ParticipantAction[ParticipantAction["PROMOTE"] = 2] = "PROMOTE";
        ParticipantAction[ParticipantAction["DEMOTE"] = 3] = "DEMOTE";
    })(ParticipantAction = messages.ParticipantAction || (messages.ParticipantAction = {}));
    let MediaType;
    (function (MediaType) {
        MediaType[MediaType["IMAGE"] = 0] = "IMAGE";
        MediaType[MediaType["AUDIO"] = 1] = "AUDIO";
        MediaType[MediaType["VIDEO"] = 2] = "VIDEO";
        MediaType[MediaType["DOCUMENT"] = 3] = "DOCUMENT";
    })(MediaType = messages.MediaType || (messages.MediaType = {}));
    let Presence;
    (function (Presence) {
        Presence[Presence["AVAILABLE"] = 0] = "AVAILABLE";
        Presence[Presence["UNAVAILABLE"] = 1] = "UNAVAILABLE";
    })(Presence = messages.Presence || (messages.Presence = {}));
    let ChatPresence;
    (function (ChatPresence) {
        ChatPresence[ChatPresence["TYPING"] = 0] = "TYPING";
        ChatPresence[ChatPresence["RECORDING"] = 1] = "RECORDING";
        ChatPresence[ChatPresence["PAUSED"] = 2] = "PAUSED";
    })(ChatPresence = messages.ChatPresence || (messages.ChatPresence = {}));
    let ReceiptType;
    (function (ReceiptType) {
        ReceiptType[ReceiptType["READ"] = 0] = "READ";
        ReceiptType[ReceiptType["PLAYED"] = 1] = "PLAYED";
    })(ReceiptType = messages.ReceiptType || (messages.ReceiptType = {}));
    class OptionalString extends pb_1.Message {
        constructor(data) {
            super();
            _OptionalString_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _OptionalString_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("value" in data && data.value != undefined) {
                    this.value = data.value;
                }
            }
        }
        get value() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set value(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new OptionalString({});
            if (data.value != null) {
                message.value = data.value;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.value != null) {
                data.value = this.value;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.value.length)
                writer.writeString(1, this.value);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new OptionalString();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.value = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return OptionalString.deserialize(bytes);
        }
    }
    _OptionalString_one_of_decls = new WeakMap();
    messages.OptionalString = OptionalString;
    class OptionalUInt32 extends pb_1.Message {
        constructor(data) {
            super();
            _OptionalUInt32_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _OptionalUInt32_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("value" in data && data.value != undefined) {
                    this.value = data.value;
                }
            }
        }
        get value() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0);
        }
        set value(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new OptionalUInt32({});
            if (data.value != null) {
                message.value = data.value;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.value != null) {
                data.value = this.value;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.value != 0)
                writer.writeUint32(1, this.value);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new OptionalUInt32();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.value = reader.readUint32();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return OptionalUInt32.deserialize(bytes);
        }
    }
    _OptionalUInt32_one_of_decls = new WeakMap();
    messages.OptionalUInt32 = OptionalUInt32;
    class OptionalUInt64 extends pb_1.Message {
        constructor(data) {
            super();
            _OptionalUInt64_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _OptionalUInt64_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("value" in data && data.value != undefined) {
                    this.value = data.value;
                }
            }
        }
        get value() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0);
        }
        set value(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new OptionalUInt64({});
            if (data.value != null) {
                message.value = data.value;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.value != null) {
                data.value = this.value;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.value != 0)
                writer.writeUint64(1, this.value);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new OptionalUInt64();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.value = reader.readUint64();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return OptionalUInt64.deserialize(bytes);
        }
    }
    _OptionalUInt64_one_of_decls = new WeakMap();
    messages.OptionalUInt64 = OptionalUInt64;
    class OptionalInt64 extends pb_1.Message {
        constructor(data) {
            super();
            _OptionalInt64_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _OptionalInt64_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("value" in data && data.value != undefined) {
                    this.value = data.value;
                }
            }
        }
        get value() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0);
        }
        set value(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new OptionalInt64({});
            if (data.value != null) {
                message.value = data.value;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.value != null) {
                data.value = this.value;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.value != 0)
                writer.writeInt64(1, this.value);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new OptionalInt64();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.value = reader.readInt64();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return OptionalInt64.deserialize(bytes);
        }
    }
    _OptionalInt64_one_of_decls = new WeakMap();
    messages.OptionalInt64 = OptionalInt64;
    class OptionalBool extends pb_1.Message {
        constructor(data) {
            super();
            _OptionalBool_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _OptionalBool_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("value" in data && data.value != undefined) {
                    this.value = data.value;
                }
            }
        }
        get value() {
            return pb_1.Message.getFieldWithDefault(this, 1, false);
        }
        set value(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new OptionalBool({});
            if (data.value != null) {
                message.value = data.value;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.value != null) {
                data.value = this.value;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.value != false)
                writer.writeBool(1, this.value);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new OptionalBool();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.value = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return OptionalBool.deserialize(bytes);
        }
    }
    _OptionalBool_one_of_decls = new WeakMap();
    messages.OptionalBool = OptionalBool;
    class OptionalDouble extends pb_1.Message {
        constructor(data) {
            super();
            _OptionalDouble_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _OptionalDouble_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("value" in data && data.value != undefined) {
                    this.value = data.value;
                }
            }
        }
        get value() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0);
        }
        set value(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new OptionalDouble({});
            if (data.value != null) {
                message.value = data.value;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.value != null) {
                data.value = this.value;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.value != 0)
                writer.writeDouble(1, this.value);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new OptionalDouble();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.value = reader.readDouble();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return OptionalDouble.deserialize(bytes);
        }
    }
    _OptionalDouble_one_of_decls = new WeakMap();
    messages.OptionalDouble = OptionalDouble;
    class JidRequest extends pb_1.Message {
        constructor(data) {
            super();
            _JidRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _JidRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new JidRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new JidRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return JidRequest.deserialize(bytes);
        }
    }
    _JidRequest_one_of_decls = new WeakMap();
    messages.JidRequest = JidRequest;
    class JidStringRequest extends pb_1.Message {
        constructor(data) {
            super();
            _JidStringRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _JidStringRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("value" in data && data.value != undefined) {
                    this.value = data.value;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get value() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set value(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new JidStringRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.value != null) {
                message.value = data.value;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.value != null) {
                data.value = this.value;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.value.length)
                writer.writeString(3, this.value);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new JidStringRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.value = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return JidStringRequest.deserialize(bytes);
        }
    }
    _JidStringRequest_one_of_decls = new WeakMap();
    messages.JidStringRequest = JidStringRequest;
    class JidBoolRequest extends pb_1.Message {
        constructor(data) {
            super();
            _JidBoolRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _JidBoolRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("value" in data && data.value != undefined) {
                    this.value = data.value;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get value() {
            return pb_1.Message.getFieldWithDefault(this, 3, false);
        }
        set value(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new JidBoolRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.value != null) {
                message.value = data.value;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.value != null) {
                data.value = this.value;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.value != false)
                writer.writeBool(3, this.value);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new JidBoolRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.value = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return JidBoolRequest.deserialize(bytes);
        }
    }
    _JidBoolRequest_one_of_decls = new WeakMap();
    messages.JidBoolRequest = JidBoolRequest;
    class EventJson extends pb_1.Message {
        constructor(data) {
            super();
            _EventJson_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _EventJson_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("event" in data && data.event != undefined) {
                    this.event = data.event;
                }
                if ("data" in data && data.data != undefined) {
                    this.data = data.data;
                }
            }
        }
        get session() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set session(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get event() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set event(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get data() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set data(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new EventJson({});
            if (data.session != null) {
                message.session = data.session;
            }
            if (data.event != null) {
                message.event = data.event;
            }
            if (data.data != null) {
                message.data = data.data;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session;
            }
            if (this.event != null) {
                data.event = this.event;
            }
            if (this.data != null) {
                data.data = this.data;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.session.length)
                writer.writeString(2, this.session);
            if (this.event.length)
                writer.writeString(1, this.event);
            if (this.data.length)
                writer.writeString(3, this.data);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EventJson();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 2:
                        message.session = reader.readString();
                        break;
                    case 1:
                        message.event = reader.readString();
                        break;
                    case 3:
                        message.data = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return EventJson.deserialize(bytes);
        }
    }
    _EventJson_one_of_decls = new WeakMap();
    messages.EventJson = EventJson;
    class PairCodeRequest extends pb_1.Message {
        constructor(data) {
            super();
            _PairCodeRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _PairCodeRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("phone" in data && data.phone != undefined) {
                    this.phone = data.phone;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get phone() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set phone(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new PairCodeRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.phone != null) {
                message.phone = data.phone;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.phone != null) {
                data.phone = this.phone;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.phone.length)
                writer.writeString(2, this.phone);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PairCodeRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.phone = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return PairCodeRequest.deserialize(bytes);
        }
    }
    _PairCodeRequest_one_of_decls = new WeakMap();
    messages.PairCodeRequest = PairCodeRequest;
    class PairCodeResponse extends pb_1.Message {
        constructor(data) {
            super();
            _PairCodeResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _PairCodeResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("code" in data && data.code != undefined) {
                    this.code = data.code;
                }
            }
        }
        get code() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set code(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new PairCodeResponse({});
            if (data.code != null) {
                message.code = data.code;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.code != null) {
                data.code = this.code;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.code.length)
                writer.writeString(1, this.code);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PairCodeResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.code = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return PairCodeResponse.deserialize(bytes);
        }
    }
    _PairCodeResponse_one_of_decls = new WeakMap();
    messages.PairCodeResponse = PairCodeResponse;
    class Empty extends pb_1.Message {
        constructor(data) {
            super();
            _Empty_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Empty_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") { }
        }
        static fromObject(data) {
            const message = new Empty({});
            return message;
        }
        toObject() {
            const data = {};
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Empty();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return Empty.deserialize(bytes);
        }
    }
    _Empty_one_of_decls = new WeakMap();
    messages.Empty = Empty;
    class SessionLogConfig extends pb_1.Message {
        constructor(data) {
            super();
            _SessionLogConfig_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _SessionLogConfig_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("level" in data && data.level != undefined) {
                    this.level = data.level;
                }
            }
        }
        get level() {
            return pb_1.Message.getFieldWithDefault(this, 1, LogLevel.TRACE);
        }
        set level(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new SessionLogConfig({});
            if (data.level != null) {
                message.level = data.level;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.level != null) {
                data.level = this.level;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.level != LogLevel.TRACE)
                writer.writeEnum(1, this.level);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SessionLogConfig();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.level = reader.readEnum();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SessionLogConfig.deserialize(bytes);
        }
    }
    _SessionLogConfig_one_of_decls = new WeakMap();
    messages.SessionLogConfig = SessionLogConfig;
    class SessionStoreConfig extends pb_1.Message {
        constructor(data) {
            super();
            _SessionStoreConfig_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _SessionStoreConfig_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("dialect" in data && data.dialect != undefined) {
                    this.dialect = data.dialect;
                }
                if ("address" in data && data.address != undefined) {
                    this.address = data.address;
                }
            }
        }
        get dialect() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set dialect(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get address() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set address(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new SessionStoreConfig({});
            if (data.dialect != null) {
                message.dialect = data.dialect;
            }
            if (data.address != null) {
                message.address = data.address;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.dialect != null) {
                data.dialect = this.dialect;
            }
            if (this.address != null) {
                data.address = this.address;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.dialect.length)
                writer.writeString(2, this.dialect);
            if (this.address.length)
                writer.writeString(3, this.address);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SessionStoreConfig();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 2:
                        message.dialect = reader.readString();
                        break;
                    case 3:
                        message.address = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SessionStoreConfig.deserialize(bytes);
        }
    }
    _SessionStoreConfig_one_of_decls = new WeakMap();
    messages.SessionStoreConfig = SessionStoreConfig;
    class SessionProxyConfig extends pb_1.Message {
        constructor(data) {
            super();
            _SessionProxyConfig_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _SessionProxyConfig_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("url" in data && data.url != undefined) {
                    this.url = data.url;
                }
            }
        }
        get url() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set url(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new SessionProxyConfig({});
            if (data.url != null) {
                message.url = data.url;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.url != null) {
                data.url = this.url;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.url.length)
                writer.writeString(1, this.url);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SessionProxyConfig();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.url = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SessionProxyConfig.deserialize(bytes);
        }
    }
    _SessionProxyConfig_one_of_decls = new WeakMap();
    messages.SessionProxyConfig = SessionProxyConfig;
    class SessionIgnoreJidsConfig extends pb_1.Message {
        constructor(data) {
            super();
            _SessionIgnoreJidsConfig_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _SessionIgnoreJidsConfig_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("status" in data && data.status != undefined) {
                    this.status = data.status;
                }
                if ("groups" in data && data.groups != undefined) {
                    this.groups = data.groups;
                }
                if ("newsletters" in data && data.newsletters != undefined) {
                    this.newsletters = data.newsletters;
                }
                if ("broadcast" in data && data.broadcast != undefined) {
                    this.broadcast = data.broadcast;
                }
            }
        }
        get status() {
            return pb_1.Message.getFieldWithDefault(this, 1, false);
        }
        set status(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get groups() {
            return pb_1.Message.getFieldWithDefault(this, 2, false);
        }
        set groups(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get newsletters() {
            return pb_1.Message.getFieldWithDefault(this, 3, false);
        }
        set newsletters(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get broadcast() {
            return pb_1.Message.getFieldWithDefault(this, 4, false);
        }
        set broadcast(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new SessionIgnoreJidsConfig({});
            if (data.status != null) {
                message.status = data.status;
            }
            if (data.groups != null) {
                message.groups = data.groups;
            }
            if (data.newsletters != null) {
                message.newsletters = data.newsletters;
            }
            if (data.broadcast != null) {
                message.broadcast = data.broadcast;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.status != null) {
                data.status = this.status;
            }
            if (this.groups != null) {
                data.groups = this.groups;
            }
            if (this.newsletters != null) {
                data.newsletters = this.newsletters;
            }
            if (this.broadcast != null) {
                data.broadcast = this.broadcast;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.status != false)
                writer.writeBool(1, this.status);
            if (this.groups != false)
                writer.writeBool(2, this.groups);
            if (this.newsletters != false)
                writer.writeBool(3, this.newsletters);
            if (this.broadcast != false)
                writer.writeBool(4, this.broadcast);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SessionIgnoreJidsConfig();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.status = reader.readBool();
                        break;
                    case 2:
                        message.groups = reader.readBool();
                        break;
                    case 3:
                        message.newsletters = reader.readBool();
                        break;
                    case 4:
                        message.broadcast = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SessionIgnoreJidsConfig.deserialize(bytes);
        }
    }
    _SessionIgnoreJidsConfig_one_of_decls = new WeakMap();
    messages.SessionIgnoreJidsConfig = SessionIgnoreJidsConfig;
    class SessionConfig extends pb_1.Message {
        constructor(data) {
            super();
            _SessionConfig_one_of_decls.set(this, [[4]]);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _SessionConfig_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("store" in data && data.store != undefined) {
                    this.store = data.store;
                }
                if ("log" in data && data.log != undefined) {
                    this.log = data.log;
                }
                if ("proxy" in data && data.proxy != undefined) {
                    this.proxy = data.proxy;
                }
                if ("ignore" in data && data.ignore != undefined) {
                    this.ignore = data.ignore;
                }
            }
        }
        get store() {
            return pb_1.Message.getWrapperField(this, SessionStoreConfig, 1);
        }
        set store(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_store() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get log() {
            return pb_1.Message.getWrapperField(this, SessionLogConfig, 2);
        }
        set log(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_log() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get proxy() {
            return pb_1.Message.getWrapperField(this, SessionProxyConfig, 3);
        }
        set proxy(value) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        get has_proxy() {
            return pb_1.Message.getField(this, 3) != null;
        }
        get ignore() {
            return pb_1.Message.getWrapperField(this, SessionIgnoreJidsConfig, 4);
        }
        set ignore(value) {
            pb_1.Message.setOneofWrapperField(this, 4, __classPrivateFieldGet(this, _SessionConfig_one_of_decls, "f")[0], value);
        }
        get has_ignore() {
            return pb_1.Message.getField(this, 4) != null;
        }
        get _ignore() {
            const cases = {
                0: "none",
                4: "ignore"
            };
            return cases[pb_1.Message.computeOneofCase(this, [4])];
        }
        static fromObject(data) {
            const message = new SessionConfig({});
            if (data.store != null) {
                message.store = SessionStoreConfig.fromObject(data.store);
            }
            if (data.log != null) {
                message.log = SessionLogConfig.fromObject(data.log);
            }
            if (data.proxy != null) {
                message.proxy = SessionProxyConfig.fromObject(data.proxy);
            }
            if (data.ignore != null) {
                message.ignore = SessionIgnoreJidsConfig.fromObject(data.ignore);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.store != null) {
                data.store = this.store.toObject();
            }
            if (this.log != null) {
                data.log = this.log.toObject();
            }
            if (this.proxy != null) {
                data.proxy = this.proxy.toObject();
            }
            if (this.ignore != null) {
                data.ignore = this.ignore.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_store)
                writer.writeMessage(1, this.store, () => this.store.serialize(writer));
            if (this.has_log)
                writer.writeMessage(2, this.log, () => this.log.serialize(writer));
            if (this.has_proxy)
                writer.writeMessage(3, this.proxy, () => this.proxy.serialize(writer));
            if (this.has_ignore)
                writer.writeMessage(4, this.ignore, () => this.ignore.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SessionConfig();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.store, () => message.store = SessionStoreConfig.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.log, () => message.log = SessionLogConfig.deserialize(reader));
                        break;
                    case 3:
                        reader.readMessage(message.proxy, () => message.proxy = SessionProxyConfig.deserialize(reader));
                        break;
                    case 4:
                        reader.readMessage(message.ignore, () => message.ignore = SessionIgnoreJidsConfig.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SessionConfig.deserialize(bytes);
        }
    }
    _SessionConfig_one_of_decls = new WeakMap();
    messages.SessionConfig = SessionConfig;
    class StartSessionRequest extends pb_1.Message {
        constructor(data) {
            super();
            _StartSessionRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _StartSessionRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
                if ("config" in data && data.config != undefined) {
                    this.config = data.config;
                }
            }
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get config() {
            return pb_1.Message.getWrapperField(this, SessionConfig, 2);
        }
        set config(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_config() {
            return pb_1.Message.getField(this, 2) != null;
        }
        static fromObject(data) {
            const message = new StartSessionRequest({});
            if (data.id != null) {
                message.id = data.id;
            }
            if (data.config != null) {
                message.config = SessionConfig.fromObject(data.config);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.id != null) {
                data.id = this.id;
            }
            if (this.config != null) {
                data.config = this.config.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id.length)
                writer.writeString(1, this.id);
            if (this.has_config)
                writer.writeMessage(2, this.config, () => this.config.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new StartSessionRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readString();
                        break;
                    case 2:
                        reader.readMessage(message.config, () => message.config = SessionConfig.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return StartSessionRequest.deserialize(bytes);
        }
    }
    _StartSessionRequest_one_of_decls = new WeakMap();
    messages.StartSessionRequest = StartSessionRequest;
    class SessionStateResponse extends pb_1.Message {
        constructor(data) {
            super();
            _SessionStateResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _SessionStateResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("found" in data && data.found != undefined) {
                    this.found = data.found;
                }
                if ("connected" in data && data.connected != undefined) {
                    this.connected = data.connected;
                }
            }
        }
        get found() {
            return pb_1.Message.getFieldWithDefault(this, 1, false);
        }
        set found(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get connected() {
            return pb_1.Message.getFieldWithDefault(this, 2, false);
        }
        set connected(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new SessionStateResponse({});
            if (data.found != null) {
                message.found = data.found;
            }
            if (data.connected != null) {
                message.connected = data.connected;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.found != null) {
                data.found = this.found;
            }
            if (this.connected != null) {
                data.connected = this.connected;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.found != false)
                writer.writeBool(1, this.found);
            if (this.connected != false)
                writer.writeBool(2, this.connected);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SessionStateResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.found = reader.readBool();
                        break;
                    case 2:
                        message.connected = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SessionStateResponse.deserialize(bytes);
        }
    }
    _SessionStateResponse_one_of_decls = new WeakMap();
    messages.SessionStateResponse = SessionStateResponse;
    class Session extends pb_1.Message {
        constructor(data) {
            super();
            _Session_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Session_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
            }
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new Session({});
            if (data.id != null) {
                message.id = data.id;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.id != null) {
                data.id = this.id;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id.length)
                writer.writeString(1, this.id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Session();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return Session.deserialize(bytes);
        }
    }
    _Session_one_of_decls = new WeakMap();
    messages.Session = Session;
    class ProfileNameRequest extends pb_1.Message {
        constructor(data) {
            super();
            _ProfileNameRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _ProfileNameRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get name() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set name(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new ProfileNameRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.name != null) {
                message.name = data.name;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.name != null) {
                data.name = this.name;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.name.length)
                writer.writeString(2, this.name);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ProfileNameRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.name = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return ProfileNameRequest.deserialize(bytes);
        }
    }
    _ProfileNameRequest_one_of_decls = new WeakMap();
    messages.ProfileNameRequest = ProfileNameRequest;
    class ProfileStatusRequest extends pb_1.Message {
        constructor(data) {
            super();
            _ProfileStatusRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _ProfileStatusRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("status" in data && data.status != undefined) {
                    this.status = data.status;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get status() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set status(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new ProfileStatusRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.status != null) {
                message.status = data.status;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.status != null) {
                data.status = this.status;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.status.length)
                writer.writeString(2, this.status);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ProfileStatusRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.status = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return ProfileStatusRequest.deserialize(bytes);
        }
    }
    _ProfileStatusRequest_one_of_decls = new WeakMap();
    messages.ProfileStatusRequest = ProfileStatusRequest;
    class SetProfilePictureRequest extends pb_1.Message {
        constructor(data) {
            super();
            _SetProfilePictureRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _SetProfilePictureRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("picture" in data && data.picture != undefined) {
                    this.picture = data.picture;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get picture() {
            return pb_1.Message.getFieldWithDefault(this, 2, new Uint8Array(0));
        }
        set picture(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new SetProfilePictureRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.picture != null) {
                message.picture = data.picture;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.picture != null) {
                data.picture = this.picture;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.picture.length)
                writer.writeBytes(2, this.picture);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SetProfilePictureRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.picture = reader.readBytes();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SetProfilePictureRequest.deserialize(bytes);
        }
    }
    _SetProfilePictureRequest_one_of_decls = new WeakMap();
    messages.SetProfilePictureRequest = SetProfilePictureRequest;
    class CreateGroupRequest extends pb_1.Message {
        constructor(data) {
            super();
            _CreateGroupRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], __classPrivateFieldGet(this, _CreateGroupRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("participants" in data && data.participants != undefined) {
                    this.participants = data.participants;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get name() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set name(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get participants() {
            return pb_1.Message.getFieldWithDefault(this, 3, []);
        }
        set participants(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new CreateGroupRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.name != null) {
                message.name = data.name;
            }
            if (data.participants != null) {
                message.participants = data.participants;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.participants != null) {
                data.participants = this.participants;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.name.length)
                writer.writeString(2, this.name);
            if (this.participants.length)
                writer.writeRepeatedString(3, this.participants);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CreateGroupRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.name = reader.readString();
                        break;
                    case 3:
                        pb_1.Message.addToRepeatedField(message, 3, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return CreateGroupRequest.deserialize(bytes);
        }
    }
    _CreateGroupRequest_one_of_decls = new WeakMap();
    messages.CreateGroupRequest = CreateGroupRequest;
    class SetPictureRequest extends pb_1.Message {
        constructor(data) {
            super();
            _SetPictureRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _SetPictureRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("picture" in data && data.picture != undefined) {
                    this.picture = data.picture;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get picture() {
            return pb_1.Message.getFieldWithDefault(this, 3, new Uint8Array(0));
        }
        set picture(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new SetPictureRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.picture != null) {
                message.picture = data.picture;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.picture != null) {
                data.picture = this.picture;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.picture.length)
                writer.writeBytes(3, this.picture);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SetPictureRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.picture = reader.readBytes();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SetPictureRequest.deserialize(bytes);
        }
    }
    _SetPictureRequest_one_of_decls = new WeakMap();
    messages.SetPictureRequest = SetPictureRequest;
    class UpdateParticipantsRequest extends pb_1.Message {
        constructor(data) {
            super();
            _UpdateParticipantsRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], __classPrivateFieldGet(this, _UpdateParticipantsRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("participants" in data && data.participants != undefined) {
                    this.participants = data.participants;
                }
                if ("action" in data && data.action != undefined) {
                    this.action = data.action;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get participants() {
            return pb_1.Message.getFieldWithDefault(this, 3, []);
        }
        set participants(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get action() {
            return pb_1.Message.getFieldWithDefault(this, 4, ParticipantAction.ADD);
        }
        set action(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new UpdateParticipantsRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.participants != null) {
                message.participants = data.participants;
            }
            if (data.action != null) {
                message.action = data.action;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.participants != null) {
                data.participants = this.participants;
            }
            if (this.action != null) {
                data.action = this.action;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.participants.length)
                writer.writeRepeatedString(3, this.participants);
            if (this.action != ParticipantAction.ADD)
                writer.writeEnum(4, this.action);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UpdateParticipantsRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        pb_1.Message.addToRepeatedField(message, 3, reader.readString());
                        break;
                    case 4:
                        message.action = reader.readEnum();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return UpdateParticipantsRequest.deserialize(bytes);
        }
    }
    _UpdateParticipantsRequest_one_of_decls = new WeakMap();
    messages.UpdateParticipantsRequest = UpdateParticipantsRequest;
    class GroupCodeRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GroupCodeRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GroupCodeRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("code" in data && data.code != undefined) {
                    this.code = data.code;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get code() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set code(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new GroupCodeRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.code != null) {
                message.code = data.code;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.code != null) {
                data.code = this.code;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.code.length)
                writer.writeString(2, this.code);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GroupCodeRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.code = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return GroupCodeRequest.deserialize(bytes);
        }
    }
    _GroupCodeRequest_one_of_decls = new WeakMap();
    messages.GroupCodeRequest = GroupCodeRequest;
    class AudioInfo extends pb_1.Message {
        constructor(data) {
            super();
            _AudioInfo_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _AudioInfo_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("duration" in data && data.duration != undefined) {
                    this.duration = data.duration;
                }
                if ("waveform" in data && data.waveform != undefined) {
                    this.waveform = data.waveform;
                }
            }
        }
        get duration() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0);
        }
        set duration(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get waveform() {
            return pb_1.Message.getFieldWithDefault(this, 2, new Uint8Array(0));
        }
        set waveform(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new AudioInfo({});
            if (data.duration != null) {
                message.duration = data.duration;
            }
            if (data.waveform != null) {
                message.waveform = data.waveform;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.duration != null) {
                data.duration = this.duration;
            }
            if (this.waveform != null) {
                data.waveform = this.waveform;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.duration != 0)
                writer.writeFloat(1, this.duration);
            if (this.waveform.length)
                writer.writeBytes(2, this.waveform);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new AudioInfo();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.duration = reader.readFloat();
                        break;
                    case 2:
                        message.waveform = reader.readBytes();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return AudioInfo.deserialize(bytes);
        }
    }
    _AudioInfo_one_of_decls = new WeakMap();
    messages.AudioInfo = AudioInfo;
    class Media extends pb_1.Message {
        constructor(data) {
            super();
            _Media_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Media_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("content" in data && data.content != undefined) {
                    this.content = data.content;
                }
                if ("type" in data && data.type != undefined) {
                    this.type = data.type;
                }
                if ("mimetype" in data && data.mimetype != undefined) {
                    this.mimetype = data.mimetype;
                }
                if ("audio" in data && data.audio != undefined) {
                    this.audio = data.audio;
                }
                if ("filename" in data && data.filename != undefined) {
                    this.filename = data.filename;
                }
                if ("contentPath" in data && data.contentPath != undefined) {
                    this.contentPath = data.contentPath;
                }
            }
        }
        get content() {
            return pb_1.Message.getFieldWithDefault(this, 1, new Uint8Array(0));
        }
        set content(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get type() {
            return pb_1.Message.getFieldWithDefault(this, 2, MediaType.IMAGE);
        }
        set type(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get mimetype() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set mimetype(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get audio() {
            return pb_1.Message.getWrapperField(this, AudioInfo, 4);
        }
        set audio(value) {
            pb_1.Message.setWrapperField(this, 4, value);
        }
        get has_audio() {
            return pb_1.Message.getField(this, 4) != null;
        }
        get filename() {
            return pb_1.Message.getFieldWithDefault(this, 5, "");
        }
        set filename(value) {
            pb_1.Message.setField(this, 5, value);
        }
        get contentPath() {
            return pb_1.Message.getFieldWithDefault(this, 6, "");
        }
        set contentPath(value) {
            pb_1.Message.setField(this, 6, value);
        }
        static fromObject(data) {
            const message = new Media({});
            if (data.content != null) {
                message.content = data.content;
            }
            if (data.type != null) {
                message.type = data.type;
            }
            if (data.mimetype != null) {
                message.mimetype = data.mimetype;
            }
            if (data.audio != null) {
                message.audio = AudioInfo.fromObject(data.audio);
            }
            if (data.filename != null) {
                message.filename = data.filename;
            }
            if (data.contentPath != null) {
                message.contentPath = data.contentPath;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.content != null) {
                data.content = this.content;
            }
            if (this.type != null) {
                data.type = this.type;
            }
            if (this.mimetype != null) {
                data.mimetype = this.mimetype;
            }
            if (this.audio != null) {
                data.audio = this.audio.toObject();
            }
            if (this.filename != null) {
                data.filename = this.filename;
            }
            if (this.contentPath != null) {
                data.contentPath = this.contentPath;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.content.length)
                writer.writeBytes(1, this.content);
            if (this.type != MediaType.IMAGE)
                writer.writeEnum(2, this.type);
            if (this.mimetype.length)
                writer.writeString(3, this.mimetype);
            if (this.has_audio)
                writer.writeMessage(4, this.audio, () => this.audio.serialize(writer));
            if (this.filename.length)
                writer.writeString(5, this.filename);
            if (this.contentPath.length)
                writer.writeString(6, this.contentPath);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Media();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.content = reader.readBytes();
                        break;
                    case 2:
                        message.type = reader.readEnum();
                        break;
                    case 3:
                        message.mimetype = reader.readString();
                        break;
                    case 4:
                        reader.readMessage(message.audio, () => message.audio = AudioInfo.deserialize(reader));
                        break;
                    case 5:
                        message.filename = reader.readString();
                        break;
                    case 6:
                        message.contentPath = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return Media.deserialize(bytes);
        }
    }
    _Media_one_of_decls = new WeakMap();
    messages.Media = Media;
    class LinkPreview extends pb_1.Message {
        constructor(data) {
            super();
            _LinkPreview_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _LinkPreview_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("url" in data && data.url != undefined) {
                    this.url = data.url;
                }
                if ("title" in data && data.title != undefined) {
                    this.title = data.title;
                }
                if ("description" in data && data.description != undefined) {
                    this.description = data.description;
                }
                if ("image" in data && data.image != undefined) {
                    this.image = data.image;
                }
            }
        }
        get url() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set url(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get title() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set title(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get description() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set description(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get image() {
            return pb_1.Message.getFieldWithDefault(this, 4, new Uint8Array(0));
        }
        set image(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new LinkPreview({});
            if (data.url != null) {
                message.url = data.url;
            }
            if (data.title != null) {
                message.title = data.title;
            }
            if (data.description != null) {
                message.description = data.description;
            }
            if (data.image != null) {
                message.image = data.image;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.url != null) {
                data.url = this.url;
            }
            if (this.title != null) {
                data.title = this.title;
            }
            if (this.description != null) {
                data.description = this.description;
            }
            if (this.image != null) {
                data.image = this.image;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.url.length)
                writer.writeString(1, this.url);
            if (this.title.length)
                writer.writeString(2, this.title);
            if (this.description.length)
                writer.writeString(3, this.description);
            if (this.image.length)
                writer.writeBytes(4, this.image);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new LinkPreview();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.url = reader.readString();
                        break;
                    case 2:
                        message.title = reader.readString();
                        break;
                    case 3:
                        message.description = reader.readString();
                        break;
                    case 4:
                        message.image = reader.readBytes();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return LinkPreview.deserialize(bytes);
        }
    }
    _LinkPreview_one_of_decls = new WeakMap();
    messages.LinkPreview = LinkPreview;
    class vCardContact extends pb_1.Message {
        constructor(data) {
            super();
            _vCardContact_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _vCardContact_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("displayName" in data && data.displayName != undefined) {
                    this.displayName = data.displayName;
                }
                if ("vcard" in data && data.vcard != undefined) {
                    this.vcard = data.vcard;
                }
            }
        }
        get displayName() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set displayName(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get vcard() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set vcard(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new vCardContact({});
            if (data.displayName != null) {
                message.displayName = data.displayName;
            }
            if (data.vcard != null) {
                message.vcard = data.vcard;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.displayName != null) {
                data.displayName = this.displayName;
            }
            if (this.vcard != null) {
                data.vcard = this.vcard;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.displayName.length)
                writer.writeString(1, this.displayName);
            if (this.vcard.length)
                writer.writeString(3, this.vcard);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new vCardContact();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.displayName = reader.readString();
                        break;
                    case 3:
                        message.vcard = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return vCardContact.deserialize(bytes);
        }
    }
    _vCardContact_one_of_decls = new WeakMap();
    messages.vCardContact = vCardContact;
    class EventLocation extends pb_1.Message {
        constructor(data) {
            super();
            _EventLocation_one_of_decls.set(this, [[2], [3]]);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _EventLocation_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("degreesLongitude" in data && data.degreesLongitude != undefined) {
                    this.degreesLongitude = data.degreesLongitude;
                }
                if ("degreesLatitude" in data && data.degreesLatitude != undefined) {
                    this.degreesLatitude = data.degreesLatitude;
                }
            }
        }
        get name() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set name(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get degreesLongitude() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0);
        }
        set degreesLongitude(value) {
            pb_1.Message.setOneofField(this, 2, __classPrivateFieldGet(this, _EventLocation_one_of_decls, "f")[0], value);
        }
        get has_degreesLongitude() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get degreesLatitude() {
            return pb_1.Message.getFieldWithDefault(this, 3, 0);
        }
        set degreesLatitude(value) {
            pb_1.Message.setOneofField(this, 3, __classPrivateFieldGet(this, _EventLocation_one_of_decls, "f")[1], value);
        }
        get has_degreesLatitude() {
            return pb_1.Message.getField(this, 3) != null;
        }
        get _degreesLongitude() {
            const cases = {
                0: "none",
                2: "degreesLongitude"
            };
            return cases[pb_1.Message.computeOneofCase(this, [2])];
        }
        get _degreesLatitude() {
            const cases = {
                0: "none",
                3: "degreesLatitude"
            };
            return cases[pb_1.Message.computeOneofCase(this, [3])];
        }
        static fromObject(data) {
            const message = new EventLocation({});
            if (data.name != null) {
                message.name = data.name;
            }
            if (data.degreesLongitude != null) {
                message.degreesLongitude = data.degreesLongitude;
            }
            if (data.degreesLatitude != null) {
                message.degreesLatitude = data.degreesLatitude;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.degreesLongitude != null) {
                data.degreesLongitude = this.degreesLongitude;
            }
            if (this.degreesLatitude != null) {
                data.degreesLatitude = this.degreesLatitude;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.name.length)
                writer.writeString(1, this.name);
            if (this.has_degreesLongitude)
                writer.writeDouble(2, this.degreesLongitude);
            if (this.has_degreesLatitude)
                writer.writeDouble(3, this.degreesLatitude);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EventLocation();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.name = reader.readString();
                        break;
                    case 2:
                        message.degreesLongitude = reader.readDouble();
                        break;
                    case 3:
                        message.degreesLatitude = reader.readDouble();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return EventLocation.deserialize(bytes);
        }
    }
    _EventLocation_one_of_decls = new WeakMap();
    messages.EventLocation = EventLocation;
    class Location extends pb_1.Message {
        constructor(data) {
            super();
            _Location_one_of_decls.set(this, [[1]]);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Location_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("degreesLongitude" in data && data.degreesLongitude != undefined) {
                    this.degreesLongitude = data.degreesLongitude;
                }
                if ("degreesLatitude" in data && data.degreesLatitude != undefined) {
                    this.degreesLatitude = data.degreesLatitude;
                }
            }
        }
        get name() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set name(value) {
            pb_1.Message.setOneofField(this, 1, __classPrivateFieldGet(this, _Location_one_of_decls, "f")[0], value);
        }
        get has_name() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get degreesLongitude() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0);
        }
        set degreesLongitude(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get degreesLatitude() {
            return pb_1.Message.getFieldWithDefault(this, 3, 0);
        }
        set degreesLatitude(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get _name() {
            const cases = {
                0: "none",
                1: "name"
            };
            return cases[pb_1.Message.computeOneofCase(this, [1])];
        }
        static fromObject(data) {
            const message = new Location({});
            if (data.name != null) {
                message.name = data.name;
            }
            if (data.degreesLongitude != null) {
                message.degreesLongitude = data.degreesLongitude;
            }
            if (data.degreesLatitude != null) {
                message.degreesLatitude = data.degreesLatitude;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.degreesLongitude != null) {
                data.degreesLongitude = this.degreesLongitude;
            }
            if (this.degreesLatitude != null) {
                data.degreesLatitude = this.degreesLatitude;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_name)
                writer.writeString(1, this.name);
            if (this.degreesLongitude != 0)
                writer.writeDouble(2, this.degreesLongitude);
            if (this.degreesLatitude != 0)
                writer.writeDouble(3, this.degreesLatitude);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Location();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.name = reader.readString();
                        break;
                    case 2:
                        message.degreesLongitude = reader.readDouble();
                        break;
                    case 3:
                        message.degreesLatitude = reader.readDouble();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return Location.deserialize(bytes);
        }
    }
    _Location_one_of_decls = new WeakMap();
    messages.Location = Location;
    class EventMessage extends pb_1.Message {
        constructor(data) {
            super();
            _EventMessage_one_of_decls.set(this, [[2], [4]]);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _EventMessage_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("description" in data && data.description != undefined) {
                    this.description = data.description;
                }
                if ("startTime" in data && data.startTime != undefined) {
                    this.startTime = data.startTime;
                }
                if ("endTime" in data && data.endTime != undefined) {
                    this.endTime = data.endTime;
                }
                if ("extraGuestsAllowed" in data && data.extraGuestsAllowed != undefined) {
                    this.extraGuestsAllowed = data.extraGuestsAllowed;
                }
                if ("location" in data && data.location != undefined) {
                    this.location = data.location;
                }
            }
        }
        get name() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set name(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get description() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set description(value) {
            pb_1.Message.setOneofField(this, 2, __classPrivateFieldGet(this, _EventMessage_one_of_decls, "f")[0], value);
        }
        get has_description() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get startTime() {
            return pb_1.Message.getFieldWithDefault(this, 3, 0);
        }
        set startTime(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get endTime() {
            return pb_1.Message.getFieldWithDefault(this, 4, 0);
        }
        set endTime(value) {
            pb_1.Message.setOneofField(this, 4, __classPrivateFieldGet(this, _EventMessage_one_of_decls, "f")[1], value);
        }
        get has_endTime() {
            return pb_1.Message.getField(this, 4) != null;
        }
        get extraGuestsAllowed() {
            return pb_1.Message.getFieldWithDefault(this, 5, false);
        }
        set extraGuestsAllowed(value) {
            pb_1.Message.setField(this, 5, value);
        }
        get location() {
            return pb_1.Message.getWrapperField(this, EventLocation, 6);
        }
        set location(value) {
            pb_1.Message.setWrapperField(this, 6, value);
        }
        get has_location() {
            return pb_1.Message.getField(this, 6) != null;
        }
        get _description() {
            const cases = {
                0: "none",
                2: "description"
            };
            return cases[pb_1.Message.computeOneofCase(this, [2])];
        }
        get _endTime() {
            const cases = {
                0: "none",
                4: "endTime"
            };
            return cases[pb_1.Message.computeOneofCase(this, [4])];
        }
        static fromObject(data) {
            const message = new EventMessage({});
            if (data.name != null) {
                message.name = data.name;
            }
            if (data.description != null) {
                message.description = data.description;
            }
            if (data.startTime != null) {
                message.startTime = data.startTime;
            }
            if (data.endTime != null) {
                message.endTime = data.endTime;
            }
            if (data.extraGuestsAllowed != null) {
                message.extraGuestsAllowed = data.extraGuestsAllowed;
            }
            if (data.location != null) {
                message.location = EventLocation.fromObject(data.location);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.description != null) {
                data.description = this.description;
            }
            if (this.startTime != null) {
                data.startTime = this.startTime;
            }
            if (this.endTime != null) {
                data.endTime = this.endTime;
            }
            if (this.extraGuestsAllowed != null) {
                data.extraGuestsAllowed = this.extraGuestsAllowed;
            }
            if (this.location != null) {
                data.location = this.location.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.name.length)
                writer.writeString(1, this.name);
            if (this.has_description)
                writer.writeString(2, this.description);
            if (this.startTime != 0)
                writer.writeInt64(3, this.startTime);
            if (this.has_endTime)
                writer.writeInt64(4, this.endTime);
            if (this.extraGuestsAllowed != false)
                writer.writeBool(5, this.extraGuestsAllowed);
            if (this.has_location)
                writer.writeMessage(6, this.location, () => this.location.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EventMessage();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.name = reader.readString();
                        break;
                    case 2:
                        message.description = reader.readString();
                        break;
                    case 3:
                        message.startTime = reader.readInt64();
                        break;
                    case 4:
                        message.endTime = reader.readInt64();
                        break;
                    case 5:
                        message.extraGuestsAllowed = reader.readBool();
                        break;
                    case 6:
                        reader.readMessage(message.location, () => message.location = EventLocation.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return EventMessage.deserialize(bytes);
        }
    }
    _EventMessage_one_of_decls = new WeakMap();
    messages.EventMessage = EventMessage;
    class MessageRequest extends pb_1.Message {
        constructor(data) {
            super();
            _MessageRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [11, 13, 19], __classPrivateFieldGet(this, _MessageRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("text" in data && data.text != undefined) {
                    this.text = data.text;
                }
                if ("media" in data && data.media != undefined) {
                    this.media = data.media;
                }
                if ("backgroundColor" in data && data.backgroundColor != undefined) {
                    this.backgroundColor = data.backgroundColor;
                }
                if ("font" in data && data.font != undefined) {
                    this.font = data.font;
                }
                if ("linkPreview" in data && data.linkPreview != undefined) {
                    this.linkPreview = data.linkPreview;
                }
                if ("linkPreviewHighQuality" in data && data.linkPreviewHighQuality != undefined) {
                    this.linkPreviewHighQuality = data.linkPreviewHighQuality;
                }
                if ("replyTo" in data && data.replyTo != undefined) {
                    this.replyTo = data.replyTo;
                }
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
                if ("participants" in data && data.participants != undefined) {
                    this.participants = data.participants;
                }
                if ("preview" in data && data.preview != undefined) {
                    this.preview = data.preview;
                }
                if ("contacts" in data && data.contacts != undefined) {
                    this.contacts = data.contacts;
                }
                if ("event" in data && data.event != undefined) {
                    this.event = data.event;
                }
                if ("poll" in data && data.poll != undefined) {
                    this.poll = data.poll;
                }
                if ("list" in data && data.list != undefined) {
                    this.list = data.list;
                }
                if ("location" in data && data.location != undefined) {
                    this.location = data.location;
                }
                if ("pollVote" in data && data.pollVote != undefined) {
                    this.pollVote = data.pollVote;
                }
                if ("mentions" in data && data.mentions != undefined) {
                    this.mentions = data.mentions;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get text() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set text(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get media() {
            return pb_1.Message.getWrapperField(this, Media, 4);
        }
        set media(value) {
            pb_1.Message.setWrapperField(this, 4, value);
        }
        get has_media() {
            return pb_1.Message.getField(this, 4) != null;
        }
        get backgroundColor() {
            return pb_1.Message.getWrapperField(this, OptionalString, 5);
        }
        set backgroundColor(value) {
            pb_1.Message.setWrapperField(this, 5, value);
        }
        get has_backgroundColor() {
            return pb_1.Message.getField(this, 5) != null;
        }
        get font() {
            return pb_1.Message.getWrapperField(this, OptionalUInt32, 6);
        }
        set font(value) {
            pb_1.Message.setWrapperField(this, 6, value);
        }
        get has_font() {
            return pb_1.Message.getField(this, 6) != null;
        }
        get linkPreview() {
            return pb_1.Message.getFieldWithDefault(this, 7, false);
        }
        set linkPreview(value) {
            pb_1.Message.setField(this, 7, value);
        }
        get linkPreviewHighQuality() {
            return pb_1.Message.getFieldWithDefault(this, 8, false);
        }
        set linkPreviewHighQuality(value) {
            pb_1.Message.setField(this, 8, value);
        }
        get replyTo() {
            return pb_1.Message.getFieldWithDefault(this, 9, "");
        }
        set replyTo(value) {
            pb_1.Message.setField(this, 9, value);
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 10, "");
        }
        set id(value) {
            pb_1.Message.setField(this, 10, value);
        }
        get participants() {
            return pb_1.Message.getFieldWithDefault(this, 11, []);
        }
        set participants(value) {
            pb_1.Message.setField(this, 11, value);
        }
        get preview() {
            return pb_1.Message.getWrapperField(this, LinkPreview, 12);
        }
        set preview(value) {
            pb_1.Message.setWrapperField(this, 12, value);
        }
        get has_preview() {
            return pb_1.Message.getField(this, 12) != null;
        }
        get contacts() {
            return pb_1.Message.getRepeatedWrapperField(this, vCardContact, 13);
        }
        set contacts(value) {
            pb_1.Message.setRepeatedWrapperField(this, 13, value);
        }
        get event() {
            return pb_1.Message.getWrapperField(this, EventMessage, 14);
        }
        set event(value) {
            pb_1.Message.setWrapperField(this, 14, value);
        }
        get has_event() {
            return pb_1.Message.getField(this, 14) != null;
        }
        get poll() {
            return pb_1.Message.getWrapperField(this, PollMessage, 15);
        }
        set poll(value) {
            pb_1.Message.setWrapperField(this, 15, value);
        }
        get has_poll() {
            return pb_1.Message.getField(this, 15) != null;
        }
        get list() {
            return pb_1.Message.getWrapperField(this, ListMessage, 16);
        }
        set list(value) {
            pb_1.Message.setWrapperField(this, 16, value);
        }
        get has_list() {
            return pb_1.Message.getField(this, 16) != null;
        }
        get location() {
            return pb_1.Message.getWrapperField(this, Location, 17);
        }
        set location(value) {
            pb_1.Message.setWrapperField(this, 17, value);
        }
        get has_location() {
            return pb_1.Message.getField(this, 17) != null;
        }
        get pollVote() {
            return pb_1.Message.getWrapperField(this, PollVoteMessage, 18);
        }
        set pollVote(value) {
            pb_1.Message.setWrapperField(this, 18, value);
        }
        get has_pollVote() {
            return pb_1.Message.getField(this, 18) != null;
        }
        get mentions() {
            return pb_1.Message.getFieldWithDefault(this, 19, []);
        }
        set mentions(value) {
            pb_1.Message.setField(this, 19, value);
        }
        static fromObject(data) {
            const message = new MessageRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.text != null) {
                message.text = data.text;
            }
            if (data.media != null) {
                message.media = Media.fromObject(data.media);
            }
            if (data.backgroundColor != null) {
                message.backgroundColor = OptionalString.fromObject(data.backgroundColor);
            }
            if (data.font != null) {
                message.font = OptionalUInt32.fromObject(data.font);
            }
            if (data.linkPreview != null) {
                message.linkPreview = data.linkPreview;
            }
            if (data.linkPreviewHighQuality != null) {
                message.linkPreviewHighQuality = data.linkPreviewHighQuality;
            }
            if (data.replyTo != null) {
                message.replyTo = data.replyTo;
            }
            if (data.id != null) {
                message.id = data.id;
            }
            if (data.participants != null) {
                message.participants = data.participants;
            }
            if (data.preview != null) {
                message.preview = LinkPreview.fromObject(data.preview);
            }
            if (data.contacts != null) {
                message.contacts = data.contacts.map(item => vCardContact.fromObject(item));
            }
            if (data.event != null) {
                message.event = EventMessage.fromObject(data.event);
            }
            if (data.poll != null) {
                message.poll = PollMessage.fromObject(data.poll);
            }
            if (data.list != null) {
                message.list = ListMessage.fromObject(data.list);
            }
            if (data.location != null) {
                message.location = Location.fromObject(data.location);
            }
            if (data.pollVote != null) {
                message.pollVote = PollVoteMessage.fromObject(data.pollVote);
            }
            if (data.mentions != null) {
                message.mentions = data.mentions;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.text != null) {
                data.text = this.text;
            }
            if (this.media != null) {
                data.media = this.media.toObject();
            }
            if (this.backgroundColor != null) {
                data.backgroundColor = this.backgroundColor.toObject();
            }
            if (this.font != null) {
                data.font = this.font.toObject();
            }
            if (this.linkPreview != null) {
                data.linkPreview = this.linkPreview;
            }
            if (this.linkPreviewHighQuality != null) {
                data.linkPreviewHighQuality = this.linkPreviewHighQuality;
            }
            if (this.replyTo != null) {
                data.replyTo = this.replyTo;
            }
            if (this.id != null) {
                data.id = this.id;
            }
            if (this.participants != null) {
                data.participants = this.participants;
            }
            if (this.preview != null) {
                data.preview = this.preview.toObject();
            }
            if (this.contacts != null) {
                data.contacts = this.contacts.map((item) => item.toObject());
            }
            if (this.event != null) {
                data.event = this.event.toObject();
            }
            if (this.poll != null) {
                data.poll = this.poll.toObject();
            }
            if (this.list != null) {
                data.list = this.list.toObject();
            }
            if (this.location != null) {
                data.location = this.location.toObject();
            }
            if (this.pollVote != null) {
                data.pollVote = this.pollVote.toObject();
            }
            if (this.mentions != null) {
                data.mentions = this.mentions;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.text.length)
                writer.writeString(3, this.text);
            if (this.has_media)
                writer.writeMessage(4, this.media, () => this.media.serialize(writer));
            if (this.has_backgroundColor)
                writer.writeMessage(5, this.backgroundColor, () => this.backgroundColor.serialize(writer));
            if (this.has_font)
                writer.writeMessage(6, this.font, () => this.font.serialize(writer));
            if (this.linkPreview != false)
                writer.writeBool(7, this.linkPreview);
            if (this.linkPreviewHighQuality != false)
                writer.writeBool(8, this.linkPreviewHighQuality);
            if (this.replyTo.length)
                writer.writeString(9, this.replyTo);
            if (this.id.length)
                writer.writeString(10, this.id);
            if (this.participants.length)
                writer.writeRepeatedString(11, this.participants);
            if (this.has_preview)
                writer.writeMessage(12, this.preview, () => this.preview.serialize(writer));
            if (this.contacts.length)
                writer.writeRepeatedMessage(13, this.contacts, (item) => item.serialize(writer));
            if (this.has_event)
                writer.writeMessage(14, this.event, () => this.event.serialize(writer));
            if (this.has_poll)
                writer.writeMessage(15, this.poll, () => this.poll.serialize(writer));
            if (this.has_list)
                writer.writeMessage(16, this.list, () => this.list.serialize(writer));
            if (this.has_location)
                writer.writeMessage(17, this.location, () => this.location.serialize(writer));
            if (this.has_pollVote)
                writer.writeMessage(18, this.pollVote, () => this.pollVote.serialize(writer));
            if (this.mentions.length)
                writer.writeRepeatedString(19, this.mentions);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MessageRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.text = reader.readString();
                        break;
                    case 4:
                        reader.readMessage(message.media, () => message.media = Media.deserialize(reader));
                        break;
                    case 5:
                        reader.readMessage(message.backgroundColor, () => message.backgroundColor = OptionalString.deserialize(reader));
                        break;
                    case 6:
                        reader.readMessage(message.font, () => message.font = OptionalUInt32.deserialize(reader));
                        break;
                    case 7:
                        message.linkPreview = reader.readBool();
                        break;
                    case 8:
                        message.linkPreviewHighQuality = reader.readBool();
                        break;
                    case 9:
                        message.replyTo = reader.readString();
                        break;
                    case 10:
                        message.id = reader.readString();
                        break;
                    case 11:
                        pb_1.Message.addToRepeatedField(message, 11, reader.readString());
                        break;
                    case 12:
                        reader.readMessage(message.preview, () => message.preview = LinkPreview.deserialize(reader));
                        break;
                    case 13:
                        reader.readMessage(message.contacts, () => pb_1.Message.addToRepeatedWrapperField(message, 13, vCardContact.deserialize(reader), vCardContact));
                        break;
                    case 14:
                        reader.readMessage(message.event, () => message.event = EventMessage.deserialize(reader));
                        break;
                    case 15:
                        reader.readMessage(message.poll, () => message.poll = PollMessage.deserialize(reader));
                        break;
                    case 16:
                        reader.readMessage(message.list, () => message.list = ListMessage.deserialize(reader));
                        break;
                    case 17:
                        reader.readMessage(message.location, () => message.location = Location.deserialize(reader));
                        break;
                    case 18:
                        reader.readMessage(message.pollVote, () => message.pollVote = PollVoteMessage.deserialize(reader));
                        break;
                    case 19:
                        pb_1.Message.addToRepeatedField(message, 19, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return MessageRequest.deserialize(bytes);
        }
    }
    _MessageRequest_one_of_decls = new WeakMap();
    messages.MessageRequest = MessageRequest;
    class Row extends pb_1.Message {
        constructor(data) {
            super();
            _Row_one_of_decls.set(this, [[2]]);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Row_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("title" in data && data.title != undefined) {
                    this.title = data.title;
                }
                if ("description" in data && data.description != undefined) {
                    this.description = data.description;
                }
                if ("rowId" in data && data.rowId != undefined) {
                    this.rowId = data.rowId;
                }
            }
        }
        get title() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set title(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get description() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set description(value) {
            pb_1.Message.setOneofField(this, 2, __classPrivateFieldGet(this, _Row_one_of_decls, "f")[0], value);
        }
        get has_description() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get rowId() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set rowId(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get _description() {
            const cases = {
                0: "none",
                2: "description"
            };
            return cases[pb_1.Message.computeOneofCase(this, [2])];
        }
        static fromObject(data) {
            const message = new Row({});
            if (data.title != null) {
                message.title = data.title;
            }
            if (data.description != null) {
                message.description = data.description;
            }
            if (data.rowId != null) {
                message.rowId = data.rowId;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.title != null) {
                data.title = this.title;
            }
            if (this.description != null) {
                data.description = this.description;
            }
            if (this.rowId != null) {
                data.rowId = this.rowId;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.title.length)
                writer.writeString(1, this.title);
            if (this.has_description)
                writer.writeString(2, this.description);
            if (this.rowId.length)
                writer.writeString(3, this.rowId);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Row();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.title = reader.readString();
                        break;
                    case 2:
                        message.description = reader.readString();
                        break;
                    case 3:
                        message.rowId = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return Row.deserialize(bytes);
        }
    }
    _Row_one_of_decls = new WeakMap();
    messages.Row = Row;
    class Section extends pb_1.Message {
        constructor(data) {
            super();
            _Section_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], __classPrivateFieldGet(this, _Section_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("title" in data && data.title != undefined) {
                    this.title = data.title;
                }
                if ("rows" in data && data.rows != undefined) {
                    this.rows = data.rows;
                }
            }
        }
        get title() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set title(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get rows() {
            return pb_1.Message.getRepeatedWrapperField(this, Row, 2);
        }
        set rows(value) {
            pb_1.Message.setRepeatedWrapperField(this, 2, value);
        }
        static fromObject(data) {
            const message = new Section({});
            if (data.title != null) {
                message.title = data.title;
            }
            if (data.rows != null) {
                message.rows = data.rows.map(item => Row.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.title != null) {
                data.title = this.title;
            }
            if (this.rows != null) {
                data.rows = this.rows.map((item) => item.toObject());
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.title.length)
                writer.writeString(1, this.title);
            if (this.rows.length)
                writer.writeRepeatedMessage(2, this.rows, (item) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Section();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.title = reader.readString();
                        break;
                    case 2:
                        reader.readMessage(message.rows, () => pb_1.Message.addToRepeatedWrapperField(message, 2, Row.deserialize(reader), Row));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return Section.deserialize(bytes);
        }
    }
    _Section_one_of_decls = new WeakMap();
    messages.Section = Section;
    class ListMessage extends pb_1.Message {
        constructor(data) {
            super();
            _ListMessage_one_of_decls.set(this, [[2], [3]]);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [5], __classPrivateFieldGet(this, _ListMessage_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("title" in data && data.title != undefined) {
                    this.title = data.title;
                }
                if ("description" in data && data.description != undefined) {
                    this.description = data.description;
                }
                if ("footer" in data && data.footer != undefined) {
                    this.footer = data.footer;
                }
                if ("button" in data && data.button != undefined) {
                    this.button = data.button;
                }
                if ("sections" in data && data.sections != undefined) {
                    this.sections = data.sections;
                }
            }
        }
        get title() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set title(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get description() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set description(value) {
            pb_1.Message.setOneofField(this, 2, __classPrivateFieldGet(this, _ListMessage_one_of_decls, "f")[0], value);
        }
        get has_description() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get footer() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set footer(value) {
            pb_1.Message.setOneofField(this, 3, __classPrivateFieldGet(this, _ListMessage_one_of_decls, "f")[1], value);
        }
        get has_footer() {
            return pb_1.Message.getField(this, 3) != null;
        }
        get button() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set button(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get sections() {
            return pb_1.Message.getRepeatedWrapperField(this, Section, 5);
        }
        set sections(value) {
            pb_1.Message.setRepeatedWrapperField(this, 5, value);
        }
        get _description() {
            const cases = {
                0: "none",
                2: "description"
            };
            return cases[pb_1.Message.computeOneofCase(this, [2])];
        }
        get _footer() {
            const cases = {
                0: "none",
                3: "footer"
            };
            return cases[pb_1.Message.computeOneofCase(this, [3])];
        }
        static fromObject(data) {
            const message = new ListMessage({});
            if (data.title != null) {
                message.title = data.title;
            }
            if (data.description != null) {
                message.description = data.description;
            }
            if (data.footer != null) {
                message.footer = data.footer;
            }
            if (data.button != null) {
                message.button = data.button;
            }
            if (data.sections != null) {
                message.sections = data.sections.map(item => Section.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.title != null) {
                data.title = this.title;
            }
            if (this.description != null) {
                data.description = this.description;
            }
            if (this.footer != null) {
                data.footer = this.footer;
            }
            if (this.button != null) {
                data.button = this.button;
            }
            if (this.sections != null) {
                data.sections = this.sections.map((item) => item.toObject());
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.title.length)
                writer.writeString(1, this.title);
            if (this.has_description)
                writer.writeString(2, this.description);
            if (this.has_footer)
                writer.writeString(3, this.footer);
            if (this.button.length)
                writer.writeString(4, this.button);
            if (this.sections.length)
                writer.writeRepeatedMessage(5, this.sections, (item) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ListMessage();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.title = reader.readString();
                        break;
                    case 2:
                        message.description = reader.readString();
                        break;
                    case 3:
                        message.footer = reader.readString();
                        break;
                    case 4:
                        message.button = reader.readString();
                        break;
                    case 5:
                        reader.readMessage(message.sections, () => pb_1.Message.addToRepeatedWrapperField(message, 5, Section.deserialize(reader), Section));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return ListMessage.deserialize(bytes);
        }
    }
    _ListMessage_one_of_decls = new WeakMap();
    messages.ListMessage = ListMessage;
    class MessageReaction extends pb_1.Message {
        constructor(data) {
            super();
            _MessageReaction_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _MessageReaction_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("sender" in data && data.sender != undefined) {
                    this.sender = data.sender;
                }
                if ("messageId" in data && data.messageId != undefined) {
                    this.messageId = data.messageId;
                }
                if ("reaction" in data && data.reaction != undefined) {
                    this.reaction = data.reaction;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get sender() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set sender(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get messageId() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set messageId(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get reaction() {
            return pb_1.Message.getFieldWithDefault(this, 5, "");
        }
        set reaction(value) {
            pb_1.Message.setField(this, 5, value);
        }
        static fromObject(data) {
            const message = new MessageReaction({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.sender != null) {
                message.sender = data.sender;
            }
            if (data.messageId != null) {
                message.messageId = data.messageId;
            }
            if (data.reaction != null) {
                message.reaction = data.reaction;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.sender != null) {
                data.sender = this.sender;
            }
            if (this.messageId != null) {
                data.messageId = this.messageId;
            }
            if (this.reaction != null) {
                data.reaction = this.reaction;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.sender.length)
                writer.writeString(3, this.sender);
            if (this.messageId.length)
                writer.writeString(4, this.messageId);
            if (this.reaction.length)
                writer.writeString(5, this.reaction);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MessageReaction();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.sender = reader.readString();
                        break;
                    case 4:
                        message.messageId = reader.readString();
                        break;
                    case 5:
                        message.reaction = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return MessageReaction.deserialize(bytes);
        }
    }
    _MessageReaction_one_of_decls = new WeakMap();
    messages.MessageReaction = MessageReaction;
    class MessageResponse extends pb_1.Message {
        constructor(data) {
            super();
            _MessageResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _MessageResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
                if ("timestamp" in data && data.timestamp != undefined) {
                    this.timestamp = data.timestamp;
                }
                if ("message" in data && data.message != undefined) {
                    this.message = data.message;
                }
            }
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get timestamp() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0);
        }
        set timestamp(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get message() {
            return pb_1.Message.getWrapperField(this, Json, 3);
        }
        set message(value) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        get has_message() {
            return pb_1.Message.getField(this, 3) != null;
        }
        static fromObject(data) {
            const message = new MessageResponse({});
            if (data.id != null) {
                message.id = data.id;
            }
            if (data.timestamp != null) {
                message.timestamp = data.timestamp;
            }
            if (data.message != null) {
                message.message = Json.fromObject(data.message);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.id != null) {
                data.id = this.id;
            }
            if (this.timestamp != null) {
                data.timestamp = this.timestamp;
            }
            if (this.message != null) {
                data.message = this.message.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id.length)
                writer.writeString(1, this.id);
            if (this.timestamp != 0)
                writer.writeInt64(2, this.timestamp);
            if (this.has_message)
                writer.writeMessage(3, this.message, () => this.message.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MessageResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readString();
                        break;
                    case 2:
                        message.timestamp = reader.readInt64();
                        break;
                    case 3:
                        reader.readMessage(message.message, () => message.message = Json.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return MessageResponse.deserialize(bytes);
        }
    }
    _MessageResponse_one_of_decls = new WeakMap();
    messages.MessageResponse = MessageResponse;
    class NewMessageIDResponse extends pb_1.Message {
        constructor(data) {
            super();
            _NewMessageIDResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _NewMessageIDResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
            }
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new NewMessageIDResponse({});
            if (data.id != null) {
                message.id = data.id;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.id != null) {
                data.id = this.id;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id.length)
                writer.writeString(1, this.id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new NewMessageIDResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return NewMessageIDResponse.deserialize(bytes);
        }
    }
    _NewMessageIDResponse_one_of_decls = new WeakMap();
    messages.NewMessageIDResponse = NewMessageIDResponse;
    class ProfilePictureRequest extends pb_1.Message {
        constructor(data) {
            super();
            _ProfilePictureRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _ProfilePictureRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new ProfilePictureRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ProfilePictureRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return ProfilePictureRequest.deserialize(bytes);
        }
    }
    _ProfilePictureRequest_one_of_decls = new WeakMap();
    messages.ProfilePictureRequest = ProfilePictureRequest;
    class ProfilePictureResponse extends pb_1.Message {
        constructor(data) {
            super();
            _ProfilePictureResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _ProfilePictureResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("url" in data && data.url != undefined) {
                    this.url = data.url;
                }
            }
        }
        get url() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set url(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new ProfilePictureResponse({});
            if (data.url != null) {
                message.url = data.url;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.url != null) {
                data.url = this.url;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.url.length)
                writer.writeString(2, this.url);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ProfilePictureResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 2:
                        message.url = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return ProfilePictureResponse.deserialize(bytes);
        }
    }
    _ProfilePictureResponse_one_of_decls = new WeakMap();
    messages.ProfilePictureResponse = ProfilePictureResponse;
    class ButtonReplyRequest extends pb_1.Message {
        constructor(data) {
            super();
            _ButtonReplyRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _ButtonReplyRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("selectedDisplayText" in data && data.selectedDisplayText != undefined) {
                    this.selectedDisplayText = data.selectedDisplayText;
                }
                if ("selectedButtonID" in data && data.selectedButtonID != undefined) {
                    this.selectedButtonID = data.selectedButtonID;
                }
                if ("replyTo" in data && data.replyTo != undefined) {
                    this.replyTo = data.replyTo;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get selectedDisplayText() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set selectedDisplayText(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get selectedButtonID() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set selectedButtonID(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get replyTo() {
            return pb_1.Message.getFieldWithDefault(this, 5, "");
        }
        set replyTo(value) {
            pb_1.Message.setField(this, 5, value);
        }
        static fromObject(data) {
            const message = new ButtonReplyRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.selectedDisplayText != null) {
                message.selectedDisplayText = data.selectedDisplayText;
            }
            if (data.selectedButtonID != null) {
                message.selectedButtonID = data.selectedButtonID;
            }
            if (data.replyTo != null) {
                message.replyTo = data.replyTo;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.selectedDisplayText != null) {
                data.selectedDisplayText = this.selectedDisplayText;
            }
            if (this.selectedButtonID != null) {
                data.selectedButtonID = this.selectedButtonID;
            }
            if (this.replyTo != null) {
                data.replyTo = this.replyTo;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.selectedDisplayText.length)
                writer.writeString(3, this.selectedDisplayText);
            if (this.selectedButtonID.length)
                writer.writeString(4, this.selectedButtonID);
            if (this.replyTo.length)
                writer.writeString(5, this.replyTo);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ButtonReplyRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.selectedDisplayText = reader.readString();
                        break;
                    case 4:
                        message.selectedButtonID = reader.readString();
                        break;
                    case 5:
                        message.replyTo = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return ButtonReplyRequest.deserialize(bytes);
        }
    }
    _ButtonReplyRequest_one_of_decls = new WeakMap();
    messages.ButtonReplyRequest = ButtonReplyRequest;
    class PresenceRequest extends pb_1.Message {
        constructor(data) {
            super();
            _PresenceRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _PresenceRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("status" in data && data.status != undefined) {
                    this.status = data.status;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get status() {
            return pb_1.Message.getFieldWithDefault(this, 2, Presence.AVAILABLE);
        }
        set status(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new PresenceRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.status != null) {
                message.status = data.status;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.status != null) {
                data.status = this.status;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.status != Presence.AVAILABLE)
                writer.writeEnum(2, this.status);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PresenceRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.status = reader.readEnum();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return PresenceRequest.deserialize(bytes);
        }
    }
    _PresenceRequest_one_of_decls = new WeakMap();
    messages.PresenceRequest = PresenceRequest;
    class ChatPresenceRequest extends pb_1.Message {
        constructor(data) {
            super();
            _ChatPresenceRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _ChatPresenceRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("status" in data && data.status != undefined) {
                    this.status = data.status;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get status() {
            return pb_1.Message.getFieldWithDefault(this, 3, ChatPresence.TYPING);
        }
        set status(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new ChatPresenceRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.status != null) {
                message.status = data.status;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.status != null) {
                data.status = this.status;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.status != ChatPresence.TYPING)
                writer.writeEnum(3, this.status);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ChatPresenceRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.status = reader.readEnum();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return ChatPresenceRequest.deserialize(bytes);
        }
    }
    _ChatPresenceRequest_one_of_decls = new WeakMap();
    messages.ChatPresenceRequest = ChatPresenceRequest;
    class SubscribePresenceRequest extends pb_1.Message {
        constructor(data) {
            super();
            _SubscribePresenceRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _SubscribePresenceRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new SubscribePresenceRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SubscribePresenceRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SubscribePresenceRequest.deserialize(bytes);
        }
    }
    _SubscribePresenceRequest_one_of_decls = new WeakMap();
    messages.SubscribePresenceRequest = SubscribePresenceRequest;
    class MarkReadRequest extends pb_1.Message {
        constructor(data) {
            super();
            _MarkReadRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [6], __classPrivateFieldGet(this, _MarkReadRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("sender" in data && data.sender != undefined) {
                    this.sender = data.sender;
                }
                if ("messageId" in data && data.messageId != undefined) {
                    this.messageId = data.messageId;
                }
                if ("type" in data && data.type != undefined) {
                    this.type = data.type;
                }
                if ("messageIds" in data && data.messageIds != undefined) {
                    this.messageIds = data.messageIds;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get sender() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set sender(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get messageId() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set messageId(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get type() {
            return pb_1.Message.getFieldWithDefault(this, 5, ReceiptType.READ);
        }
        set type(value) {
            pb_1.Message.setField(this, 5, value);
        }
        get messageIds() {
            return pb_1.Message.getFieldWithDefault(this, 6, []);
        }
        set messageIds(value) {
            pb_1.Message.setField(this, 6, value);
        }
        static fromObject(data) {
            const message = new MarkReadRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.sender != null) {
                message.sender = data.sender;
            }
            if (data.messageId != null) {
                message.messageId = data.messageId;
            }
            if (data.type != null) {
                message.type = data.type;
            }
            if (data.messageIds != null) {
                message.messageIds = data.messageIds;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.sender != null) {
                data.sender = this.sender;
            }
            if (this.messageId != null) {
                data.messageId = this.messageId;
            }
            if (this.type != null) {
                data.type = this.type;
            }
            if (this.messageIds != null) {
                data.messageIds = this.messageIds;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.sender.length)
                writer.writeString(3, this.sender);
            if (this.messageId.length)
                writer.writeString(4, this.messageId);
            if (this.type != ReceiptType.READ)
                writer.writeEnum(5, this.type);
            if (this.messageIds.length)
                writer.writeRepeatedString(6, this.messageIds);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MarkReadRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.sender = reader.readString();
                        break;
                    case 4:
                        message.messageId = reader.readString();
                        break;
                    case 5:
                        message.type = reader.readEnum();
                        break;
                    case 6:
                        pb_1.Message.addToRepeatedField(message, 6, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return MarkReadRequest.deserialize(bytes);
        }
    }
    _MarkReadRequest_one_of_decls = new WeakMap();
    messages.MarkReadRequest = MarkReadRequest;
    class CheckPhonesRequest extends pb_1.Message {
        constructor(data) {
            super();
            _CheckPhonesRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], __classPrivateFieldGet(this, _CheckPhonesRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("phones" in data && data.phones != undefined) {
                    this.phones = data.phones;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get phones() {
            return pb_1.Message.getFieldWithDefault(this, 2, []);
        }
        set phones(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new CheckPhonesRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.phones != null) {
                message.phones = data.phones;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.phones != null) {
                data.phones = this.phones;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.phones.length)
                writer.writeRepeatedString(2, this.phones);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CheckPhonesRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        pb_1.Message.addToRepeatedField(message, 2, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return CheckPhonesRequest.deserialize(bytes);
        }
    }
    _CheckPhonesRequest_one_of_decls = new WeakMap();
    messages.CheckPhonesRequest = CheckPhonesRequest;
    class ChatUnreadRequest extends pb_1.Message {
        constructor(data) {
            super();
            _ChatUnreadRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _ChatUnreadRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("read" in data && data.read != undefined) {
                    this.read = data.read;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get read() {
            return pb_1.Message.getFieldWithDefault(this, 3, false);
        }
        set read(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new ChatUnreadRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.read != null) {
                message.read = data.read;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.read != null) {
                data.read = this.read;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.read != false)
                writer.writeBool(3, this.read);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ChatUnreadRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.read = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return ChatUnreadRequest.deserialize(bytes);
        }
    }
    _ChatUnreadRequest_one_of_decls = new WeakMap();
    messages.ChatUnreadRequest = ChatUnreadRequest;
    class PhoneInfo extends pb_1.Message {
        constructor(data) {
            super();
            _PhoneInfo_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _PhoneInfo_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("phone" in data && data.phone != undefined) {
                    this.phone = data.phone;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("registered" in data && data.registered != undefined) {
                    this.registered = data.registered;
                }
            }
        }
        get phone() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set phone(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get registered() {
            return pb_1.Message.getFieldWithDefault(this, 3, false);
        }
        set registered(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new PhoneInfo({});
            if (data.phone != null) {
                message.phone = data.phone;
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.registered != null) {
                message.registered = data.registered;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.phone != null) {
                data.phone = this.phone;
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.registered != null) {
                data.registered = this.registered;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.phone.length)
                writer.writeString(1, this.phone);
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.registered != false)
                writer.writeBool(3, this.registered);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PhoneInfo();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.phone = reader.readString();
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.registered = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return PhoneInfo.deserialize(bytes);
        }
    }
    _PhoneInfo_one_of_decls = new WeakMap();
    messages.PhoneInfo = PhoneInfo;
    class CheckPhonesResponse extends pb_1.Message {
        constructor(data) {
            super();
            _CheckPhonesResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], __classPrivateFieldGet(this, _CheckPhonesResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("infos" in data && data.infos != undefined) {
                    this.infos = data.infos;
                }
            }
        }
        get infos() {
            return pb_1.Message.getRepeatedWrapperField(this, PhoneInfo, 1);
        }
        set infos(value) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        static fromObject(data) {
            const message = new CheckPhonesResponse({});
            if (data.infos != null) {
                message.infos = data.infos.map(item => PhoneInfo.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.infos != null) {
                data.infos = this.infos.map((item) => item.toObject());
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.infos.length)
                writer.writeRepeatedMessage(1, this.infos, (item) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CheckPhonesResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.infos, () => pb_1.Message.addToRepeatedWrapperField(message, 1, PhoneInfo.deserialize(reader), PhoneInfo));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return CheckPhonesResponse.deserialize(bytes);
        }
    }
    _CheckPhonesResponse_one_of_decls = new WeakMap();
    messages.CheckPhonesResponse = CheckPhonesResponse;
    class RevokeMessageRequest extends pb_1.Message {
        constructor(data) {
            super();
            _RevokeMessageRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [5], __classPrivateFieldGet(this, _RevokeMessageRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("sender" in data && data.sender != undefined) {
                    this.sender = data.sender;
                }
                if ("messageId" in data && data.messageId != undefined) {
                    this.messageId = data.messageId;
                }
                if ("participants" in data && data.participants != undefined) {
                    this.participants = data.participants;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get sender() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set sender(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get messageId() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set messageId(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get participants() {
            return pb_1.Message.getFieldWithDefault(this, 5, []);
        }
        set participants(value) {
            pb_1.Message.setField(this, 5, value);
        }
        static fromObject(data) {
            const message = new RevokeMessageRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.sender != null) {
                message.sender = data.sender;
            }
            if (data.messageId != null) {
                message.messageId = data.messageId;
            }
            if (data.participants != null) {
                message.participants = data.participants;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.sender != null) {
                data.sender = this.sender;
            }
            if (this.messageId != null) {
                data.messageId = this.messageId;
            }
            if (this.participants != null) {
                data.participants = this.participants;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.sender.length)
                writer.writeString(3, this.sender);
            if (this.messageId.length)
                writer.writeString(4, this.messageId);
            if (this.participants.length)
                writer.writeRepeatedString(5, this.participants);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RevokeMessageRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.sender = reader.readString();
                        break;
                    case 4:
                        message.messageId = reader.readString();
                        break;
                    case 5:
                        pb_1.Message.addToRepeatedField(message, 5, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return RevokeMessageRequest.deserialize(bytes);
        }
    }
    _RevokeMessageRequest_one_of_decls = new WeakMap();
    messages.RevokeMessageRequest = RevokeMessageRequest;
    class EditMessageRequest extends pb_1.Message {
        constructor(data) {
            super();
            _EditMessageRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _EditMessageRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("messageId" in data && data.messageId != undefined) {
                    this.messageId = data.messageId;
                }
                if ("text" in data && data.text != undefined) {
                    this.text = data.text;
                }
                if ("linkPreview" in data && data.linkPreview != undefined) {
                    this.linkPreview = data.linkPreview;
                }
                if ("linkPreviewHighQuality" in data && data.linkPreviewHighQuality != undefined) {
                    this.linkPreviewHighQuality = data.linkPreviewHighQuality;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get messageId() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set messageId(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get text() {
            return pb_1.Message.getFieldWithDefault(this, 5, "");
        }
        set text(value) {
            pb_1.Message.setField(this, 5, value);
        }
        get linkPreview() {
            return pb_1.Message.getFieldWithDefault(this, 6, false);
        }
        set linkPreview(value) {
            pb_1.Message.setField(this, 6, value);
        }
        get linkPreviewHighQuality() {
            return pb_1.Message.getFieldWithDefault(this, 7, false);
        }
        set linkPreviewHighQuality(value) {
            pb_1.Message.setField(this, 7, value);
        }
        static fromObject(data) {
            const message = new EditMessageRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.messageId != null) {
                message.messageId = data.messageId;
            }
            if (data.text != null) {
                message.text = data.text;
            }
            if (data.linkPreview != null) {
                message.linkPreview = data.linkPreview;
            }
            if (data.linkPreviewHighQuality != null) {
                message.linkPreviewHighQuality = data.linkPreviewHighQuality;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.messageId != null) {
                data.messageId = this.messageId;
            }
            if (this.text != null) {
                data.text = this.text;
            }
            if (this.linkPreview != null) {
                data.linkPreview = this.linkPreview;
            }
            if (this.linkPreviewHighQuality != null) {
                data.linkPreviewHighQuality = this.linkPreviewHighQuality;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.messageId.length)
                writer.writeString(4, this.messageId);
            if (this.text.length)
                writer.writeString(5, this.text);
            if (this.linkPreview != false)
                writer.writeBool(6, this.linkPreview);
            if (this.linkPreviewHighQuality != false)
                writer.writeBool(7, this.linkPreviewHighQuality);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EditMessageRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 4:
                        message.messageId = reader.readString();
                        break;
                    case 5:
                        message.text = reader.readString();
                        break;
                    case 6:
                        message.linkPreview = reader.readBool();
                        break;
                    case 7:
                        message.linkPreviewHighQuality = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return EditMessageRequest.deserialize(bytes);
        }
    }
    _EditMessageRequest_one_of_decls = new WeakMap();
    messages.EditMessageRequest = EditMessageRequest;
    class NewsletterListRequest extends pb_1.Message {
        constructor(data) {
            super();
            _NewsletterListRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _NewsletterListRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        static fromObject(data) {
            const message = new NewsletterListRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new NewsletterListRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return NewsletterListRequest.deserialize(bytes);
        }
    }
    _NewsletterListRequest_one_of_decls = new WeakMap();
    messages.NewsletterListRequest = NewsletterListRequest;
    class Newsletter extends pb_1.Message {
        constructor(data) {
            super();
            _Newsletter_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Newsletter_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("description" in data && data.description != undefined) {
                    this.description = data.description;
                }
                if ("invite" in data && data.invite != undefined) {
                    this.invite = data.invite;
                }
                if ("preview" in data && data.preview != undefined) {
                    this.preview = data.preview;
                }
                if ("picture" in data && data.picture != undefined) {
                    this.picture = data.picture;
                }
                if ("verified" in data && data.verified != undefined) {
                    this.verified = data.verified;
                }
                if ("role" in data && data.role != undefined) {
                    this.role = data.role;
                }
                if ("subscriberCount" in data && data.subscriberCount != undefined) {
                    this.subscriberCount = data.subscriberCount;
                }
            }
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get name() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set name(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get description() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set description(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get invite() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set invite(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get preview() {
            return pb_1.Message.getFieldWithDefault(this, 6, "");
        }
        set preview(value) {
            pb_1.Message.setField(this, 6, value);
        }
        get picture() {
            return pb_1.Message.getFieldWithDefault(this, 5, "");
        }
        set picture(value) {
            pb_1.Message.setField(this, 5, value);
        }
        get verified() {
            return pb_1.Message.getFieldWithDefault(this, 7, false);
        }
        set verified(value) {
            pb_1.Message.setField(this, 7, value);
        }
        get role() {
            return pb_1.Message.getFieldWithDefault(this, 8, "");
        }
        set role(value) {
            pb_1.Message.setField(this, 8, value);
        }
        get subscriberCount() {
            return pb_1.Message.getFieldWithDefault(this, 9, 0);
        }
        set subscriberCount(value) {
            pb_1.Message.setField(this, 9, value);
        }
        static fromObject(data) {
            const message = new Newsletter({});
            if (data.id != null) {
                message.id = data.id;
            }
            if (data.name != null) {
                message.name = data.name;
            }
            if (data.description != null) {
                message.description = data.description;
            }
            if (data.invite != null) {
                message.invite = data.invite;
            }
            if (data.preview != null) {
                message.preview = data.preview;
            }
            if (data.picture != null) {
                message.picture = data.picture;
            }
            if (data.verified != null) {
                message.verified = data.verified;
            }
            if (data.role != null) {
                message.role = data.role;
            }
            if (data.subscriberCount != null) {
                message.subscriberCount = data.subscriberCount;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.id != null) {
                data.id = this.id;
            }
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.description != null) {
                data.description = this.description;
            }
            if (this.invite != null) {
                data.invite = this.invite;
            }
            if (this.preview != null) {
                data.preview = this.preview;
            }
            if (this.picture != null) {
                data.picture = this.picture;
            }
            if (this.verified != null) {
                data.verified = this.verified;
            }
            if (this.role != null) {
                data.role = this.role;
            }
            if (this.subscriberCount != null) {
                data.subscriberCount = this.subscriberCount;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id.length)
                writer.writeString(1, this.id);
            if (this.name.length)
                writer.writeString(2, this.name);
            if (this.description.length)
                writer.writeString(3, this.description);
            if (this.invite.length)
                writer.writeString(4, this.invite);
            if (this.preview.length)
                writer.writeString(6, this.preview);
            if (this.picture.length)
                writer.writeString(5, this.picture);
            if (this.verified != false)
                writer.writeBool(7, this.verified);
            if (this.role.length)
                writer.writeString(8, this.role);
            if (this.subscriberCount != 0)
                writer.writeInt64(9, this.subscriberCount);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Newsletter();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readString();
                        break;
                    case 2:
                        message.name = reader.readString();
                        break;
                    case 3:
                        message.description = reader.readString();
                        break;
                    case 4:
                        message.invite = reader.readString();
                        break;
                    case 6:
                        message.preview = reader.readString();
                        break;
                    case 5:
                        message.picture = reader.readString();
                        break;
                    case 7:
                        message.verified = reader.readBool();
                        break;
                    case 8:
                        message.role = reader.readString();
                        break;
                    case 9:
                        message.subscriberCount = reader.readInt64();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return Newsletter.deserialize(bytes);
        }
    }
    _Newsletter_one_of_decls = new WeakMap();
    messages.Newsletter = Newsletter;
    class NewsletterList extends pb_1.Message {
        constructor(data) {
            super();
            _NewsletterList_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], __classPrivateFieldGet(this, _NewsletterList_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("newsletters" in data && data.newsletters != undefined) {
                    this.newsletters = data.newsletters;
                }
            }
        }
        get newsletters() {
            return pb_1.Message.getRepeatedWrapperField(this, Newsletter, 1);
        }
        set newsletters(value) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        static fromObject(data) {
            const message = new NewsletterList({});
            if (data.newsletters != null) {
                message.newsletters = data.newsletters.map(item => Newsletter.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.newsletters != null) {
                data.newsletters = this.newsletters.map((item) => item.toObject());
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.newsletters.length)
                writer.writeRepeatedMessage(1, this.newsletters, (item) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new NewsletterList();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.newsletters, () => pb_1.Message.addToRepeatedWrapperField(message, 1, Newsletter.deserialize(reader), Newsletter));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return NewsletterList.deserialize(bytes);
        }
    }
    _NewsletterList_one_of_decls = new WeakMap();
    messages.NewsletterList = NewsletterList;
    class NewsletterInfoRequest extends pb_1.Message {
        constructor(data) {
            super();
            _NewsletterInfoRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _NewsletterInfoRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set id(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new NewsletterInfoRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.id != null) {
                message.id = data.id;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.id != null) {
                data.id = this.id;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.id.length)
                writer.writeString(2, this.id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new NewsletterInfoRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.id = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return NewsletterInfoRequest.deserialize(bytes);
        }
    }
    _NewsletterInfoRequest_one_of_decls = new WeakMap();
    messages.NewsletterInfoRequest = NewsletterInfoRequest;
    class GetNewsletterMessagesByInviteRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetNewsletterMessagesByInviteRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetNewsletterMessagesByInviteRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("invite" in data && data.invite != undefined) {
                    this.invite = data.invite;
                }
                if ("limit" in data && data.limit != undefined) {
                    this.limit = data.limit;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get invite() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set invite(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get limit() {
            return pb_1.Message.getFieldWithDefault(this, 3, 0);
        }
        set limit(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new GetNewsletterMessagesByInviteRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.invite != null) {
                message.invite = data.invite;
            }
            if (data.limit != null) {
                message.limit = data.limit;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.invite != null) {
                data.invite = this.invite;
            }
            if (this.limit != null) {
                data.limit = this.limit;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.invite.length)
                writer.writeString(2, this.invite);
            if (this.limit != 0)
                writer.writeInt64(3, this.limit);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetNewsletterMessagesByInviteRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.invite = reader.readString();
                        break;
                    case 3:
                        message.limit = reader.readInt64();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return GetNewsletterMessagesByInviteRequest.deserialize(bytes);
        }
    }
    _GetNewsletterMessagesByInviteRequest_one_of_decls = new WeakMap();
    messages.GetNewsletterMessagesByInviteRequest = GetNewsletterMessagesByInviteRequest;
    class SearchPage extends pb_1.Message {
        constructor(data) {
            super();
            _SearchPage_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _SearchPage_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("limit" in data && data.limit != undefined) {
                    this.limit = data.limit;
                }
                if ("startCursor" in data && data.startCursor != undefined) {
                    this.startCursor = data.startCursor;
                }
            }
        }
        get limit() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0);
        }
        set limit(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get startCursor() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set startCursor(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new SearchPage({});
            if (data.limit != null) {
                message.limit = data.limit;
            }
            if (data.startCursor != null) {
                message.startCursor = data.startCursor;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.limit != null) {
                data.limit = this.limit;
            }
            if (this.startCursor != null) {
                data.startCursor = this.startCursor;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.limit != 0)
                writer.writeUint64(2, this.limit);
            if (this.startCursor.length)
                writer.writeString(3, this.startCursor);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SearchPage();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 2:
                        message.limit = reader.readUint64();
                        break;
                    case 3:
                        message.startCursor = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SearchPage.deserialize(bytes);
        }
    }
    _SearchPage_one_of_decls = new WeakMap();
    messages.SearchPage = SearchPage;
    class SearchNewslettersByViewRequest extends pb_1.Message {
        constructor(data) {
            super();
            _SearchNewslettersByViewRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4, 5], __classPrivateFieldGet(this, _SearchNewslettersByViewRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("page" in data && data.page != undefined) {
                    this.page = data.page;
                }
                if ("view" in data && data.view != undefined) {
                    this.view = data.view;
                }
                if ("categories" in data && data.categories != undefined) {
                    this.categories = data.categories;
                }
                if ("countries" in data && data.countries != undefined) {
                    this.countries = data.countries;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get page() {
            return pb_1.Message.getWrapperField(this, SearchPage, 2);
        }
        set page(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_page() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get view() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set view(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get categories() {
            return pb_1.Message.getFieldWithDefault(this, 4, []);
        }
        set categories(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get countries() {
            return pb_1.Message.getFieldWithDefault(this, 5, []);
        }
        set countries(value) {
            pb_1.Message.setField(this, 5, value);
        }
        static fromObject(data) {
            const message = new SearchNewslettersByViewRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.page != null) {
                message.page = SearchPage.fromObject(data.page);
            }
            if (data.view != null) {
                message.view = data.view;
            }
            if (data.categories != null) {
                message.categories = data.categories;
            }
            if (data.countries != null) {
                message.countries = data.countries;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.page != null) {
                data.page = this.page.toObject();
            }
            if (this.view != null) {
                data.view = this.view;
            }
            if (this.categories != null) {
                data.categories = this.categories;
            }
            if (this.countries != null) {
                data.countries = this.countries;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.has_page)
                writer.writeMessage(2, this.page, () => this.page.serialize(writer));
            if (this.view.length)
                writer.writeString(3, this.view);
            if (this.categories.length)
                writer.writeRepeatedString(4, this.categories);
            if (this.countries.length)
                writer.writeRepeatedString(5, this.countries);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SearchNewslettersByViewRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.page, () => message.page = SearchPage.deserialize(reader));
                        break;
                    case 3:
                        message.view = reader.readString();
                        break;
                    case 4:
                        pb_1.Message.addToRepeatedField(message, 4, reader.readString());
                        break;
                    case 5:
                        pb_1.Message.addToRepeatedField(message, 5, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SearchNewslettersByViewRequest.deserialize(bytes);
        }
    }
    _SearchNewslettersByViewRequest_one_of_decls = new WeakMap();
    messages.SearchNewslettersByViewRequest = SearchNewslettersByViewRequest;
    class SearchNewslettersByTextRequest extends pb_1.Message {
        constructor(data) {
            super();
            _SearchNewslettersByTextRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], __classPrivateFieldGet(this, _SearchNewslettersByTextRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("page" in data && data.page != undefined) {
                    this.page = data.page;
                }
                if ("text" in data && data.text != undefined) {
                    this.text = data.text;
                }
                if ("categories" in data && data.categories != undefined) {
                    this.categories = data.categories;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get page() {
            return pb_1.Message.getWrapperField(this, SearchPage, 2);
        }
        set page(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_page() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get text() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set text(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get categories() {
            return pb_1.Message.getFieldWithDefault(this, 4, []);
        }
        set categories(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new SearchNewslettersByTextRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.page != null) {
                message.page = SearchPage.fromObject(data.page);
            }
            if (data.text != null) {
                message.text = data.text;
            }
            if (data.categories != null) {
                message.categories = data.categories;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.page != null) {
                data.page = this.page.toObject();
            }
            if (this.text != null) {
                data.text = this.text;
            }
            if (this.categories != null) {
                data.categories = this.categories;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.has_page)
                writer.writeMessage(2, this.page, () => this.page.serialize(writer));
            if (this.text.length)
                writer.writeString(3, this.text);
            if (this.categories.length)
                writer.writeRepeatedString(4, this.categories);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SearchNewslettersByTextRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.page, () => message.page = SearchPage.deserialize(reader));
                        break;
                    case 3:
                        message.text = reader.readString();
                        break;
                    case 4:
                        pb_1.Message.addToRepeatedField(message, 4, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SearchNewslettersByTextRequest.deserialize(bytes);
        }
    }
    _SearchNewslettersByTextRequest_one_of_decls = new WeakMap();
    messages.SearchNewslettersByTextRequest = SearchNewslettersByTextRequest;
    class SearchPageResult extends pb_1.Message {
        constructor(data) {
            super();
            _SearchPageResult_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _SearchPageResult_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("startCursor" in data && data.startCursor != undefined) {
                    this.startCursor = data.startCursor;
                }
                if ("endCursor" in data && data.endCursor != undefined) {
                    this.endCursor = data.endCursor;
                }
                if ("hasNextPage" in data && data.hasNextPage != undefined) {
                    this.hasNextPage = data.hasNextPage;
                }
                if ("hasPreviousPage" in data && data.hasPreviousPage != undefined) {
                    this.hasPreviousPage = data.hasPreviousPage;
                }
            }
        }
        get startCursor() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set startCursor(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get endCursor() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set endCursor(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get hasNextPage() {
            return pb_1.Message.getFieldWithDefault(this, 3, false);
        }
        set hasNextPage(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get hasPreviousPage() {
            return pb_1.Message.getFieldWithDefault(this, 4, false);
        }
        set hasPreviousPage(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new SearchPageResult({});
            if (data.startCursor != null) {
                message.startCursor = data.startCursor;
            }
            if (data.endCursor != null) {
                message.endCursor = data.endCursor;
            }
            if (data.hasNextPage != null) {
                message.hasNextPage = data.hasNextPage;
            }
            if (data.hasPreviousPage != null) {
                message.hasPreviousPage = data.hasPreviousPage;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.startCursor != null) {
                data.startCursor = this.startCursor;
            }
            if (this.endCursor != null) {
                data.endCursor = this.endCursor;
            }
            if (this.hasNextPage != null) {
                data.hasNextPage = this.hasNextPage;
            }
            if (this.hasPreviousPage != null) {
                data.hasPreviousPage = this.hasPreviousPage;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.startCursor.length)
                writer.writeString(1, this.startCursor);
            if (this.endCursor.length)
                writer.writeString(2, this.endCursor);
            if (this.hasNextPage != false)
                writer.writeBool(3, this.hasNextPage);
            if (this.hasPreviousPage != false)
                writer.writeBool(4, this.hasPreviousPage);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SearchPageResult();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.startCursor = reader.readString();
                        break;
                    case 2:
                        message.endCursor = reader.readString();
                        break;
                    case 3:
                        message.hasNextPage = reader.readBool();
                        break;
                    case 4:
                        message.hasPreviousPage = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SearchPageResult.deserialize(bytes);
        }
    }
    _SearchPageResult_one_of_decls = new WeakMap();
    messages.SearchPageResult = SearchPageResult;
    class NewsletterSearchPageResult extends pb_1.Message {
        constructor(data) {
            super();
            _NewsletterSearchPageResult_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _NewsletterSearchPageResult_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("page" in data && data.page != undefined) {
                    this.page = data.page;
                }
                if ("newsletters" in data && data.newsletters != undefined) {
                    this.newsletters = data.newsletters;
                }
            }
        }
        get page() {
            return pb_1.Message.getWrapperField(this, SearchPageResult, 1);
        }
        set page(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_page() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get newsletters() {
            return pb_1.Message.getWrapperField(this, NewsletterList, 2);
        }
        set newsletters(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_newsletters() {
            return pb_1.Message.getField(this, 2) != null;
        }
        static fromObject(data) {
            const message = new NewsletterSearchPageResult({});
            if (data.page != null) {
                message.page = SearchPageResult.fromObject(data.page);
            }
            if (data.newsletters != null) {
                message.newsletters = NewsletterList.fromObject(data.newsletters);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.page != null) {
                data.page = this.page.toObject();
            }
            if (this.newsletters != null) {
                data.newsletters = this.newsletters.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_page)
                writer.writeMessage(1, this.page, () => this.page.serialize(writer));
            if (this.has_newsletters)
                writer.writeMessage(2, this.newsletters, () => this.newsletters.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new NewsletterSearchPageResult();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.page, () => message.page = SearchPageResult.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.newsletters, () => message.newsletters = NewsletterList.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return NewsletterSearchPageResult.deserialize(bytes);
        }
    }
    _NewsletterSearchPageResult_one_of_decls = new WeakMap();
    messages.NewsletterSearchPageResult = NewsletterSearchPageResult;
    class CreateNewsletterRequest extends pb_1.Message {
        constructor(data) {
            super();
            _CreateNewsletterRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _CreateNewsletterRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("description" in data && data.description != undefined) {
                    this.description = data.description;
                }
                if ("picture" in data && data.picture != undefined) {
                    this.picture = data.picture;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get name() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set name(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get description() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set description(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get picture() {
            return pb_1.Message.getFieldWithDefault(this, 4, new Uint8Array(0));
        }
        set picture(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new CreateNewsletterRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.name != null) {
                message.name = data.name;
            }
            if (data.description != null) {
                message.description = data.description;
            }
            if (data.picture != null) {
                message.picture = data.picture;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.description != null) {
                data.description = this.description;
            }
            if (this.picture != null) {
                data.picture = this.picture;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.name.length)
                writer.writeString(2, this.name);
            if (this.description.length)
                writer.writeString(3, this.description);
            if (this.picture.length)
                writer.writeBytes(4, this.picture);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CreateNewsletterRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.name = reader.readString();
                        break;
                    case 3:
                        message.description = reader.readString();
                        break;
                    case 4:
                        message.picture = reader.readBytes();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return CreateNewsletterRequest.deserialize(bytes);
        }
    }
    _CreateNewsletterRequest_one_of_decls = new WeakMap();
    messages.CreateNewsletterRequest = CreateNewsletterRequest;
    class NewsletterToggleMuteRequest extends pb_1.Message {
        constructor(data) {
            super();
            _NewsletterToggleMuteRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _NewsletterToggleMuteRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("mute" in data && data.mute != undefined) {
                    this.mute = data.mute;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get mute() {
            return pb_1.Message.getFieldWithDefault(this, 3, false);
        }
        set mute(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new NewsletterToggleMuteRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.mute != null) {
                message.mute = data.mute;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.mute != null) {
                data.mute = this.mute;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.mute != false)
                writer.writeBool(3, this.mute);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new NewsletterToggleMuteRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.mute = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return NewsletterToggleMuteRequest.deserialize(bytes);
        }
    }
    _NewsletterToggleMuteRequest_one_of_decls = new WeakMap();
    messages.NewsletterToggleMuteRequest = NewsletterToggleMuteRequest;
    class NewsletterToggleFollowRequest extends pb_1.Message {
        constructor(data) {
            super();
            _NewsletterToggleFollowRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _NewsletterToggleFollowRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("follow" in data && data.follow != undefined) {
                    this.follow = data.follow;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get follow() {
            return pb_1.Message.getFieldWithDefault(this, 3, false);
        }
        set follow(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new NewsletterToggleFollowRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.follow != null) {
                message.follow = data.follow;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.follow != null) {
                data.follow = this.follow;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.follow != false)
                writer.writeBool(3, this.follow);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new NewsletterToggleFollowRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.follow = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return NewsletterToggleFollowRequest.deserialize(bytes);
        }
    }
    _NewsletterToggleFollowRequest_one_of_decls = new WeakMap();
    messages.NewsletterToggleFollowRequest = NewsletterToggleFollowRequest;
    class DownloadMediaRequest extends pb_1.Message {
        constructor(data) {
            super();
            _DownloadMediaRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _DownloadMediaRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("message" in data && data.message != undefined) {
                    this.message = data.message;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("messageId" in data && data.messageId != undefined) {
                    this.messageId = data.messageId;
                }
                if ("contentPath" in data && data.contentPath != undefined) {
                    this.contentPath = data.contentPath;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get message() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set message(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get messageId() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set messageId(value) {
            pb_1.Message.setField(this, 4, value);
        }
        get contentPath() {
            return pb_1.Message.getFieldWithDefault(this, 5, "");
        }
        set contentPath(value) {
            pb_1.Message.setField(this, 5, value);
        }
        static fromObject(data) {
            const message = new DownloadMediaRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.message != null) {
                message.message = data.message;
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.messageId != null) {
                message.messageId = data.messageId;
            }
            if (data.contentPath != null) {
                message.contentPath = data.contentPath;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.message != null) {
                data.message = this.message;
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.messageId != null) {
                data.messageId = this.messageId;
            }
            if (this.contentPath != null) {
                data.contentPath = this.contentPath;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.message.length)
                writer.writeString(2, this.message);
            if (this.jid.length)
                writer.writeString(3, this.jid);
            if (this.messageId.length)
                writer.writeString(4, this.messageId);
            if (this.contentPath.length)
                writer.writeString(5, this.contentPath);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DownloadMediaRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.message = reader.readString();
                        break;
                    case 3:
                        message.jid = reader.readString();
                        break;
                    case 4:
                        message.messageId = reader.readString();
                        break;
                    case 5:
                        message.contentPath = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return DownloadMediaRequest.deserialize(bytes);
        }
    }
    _DownloadMediaRequest_one_of_decls = new WeakMap();
    messages.DownloadMediaRequest = DownloadMediaRequest;
    class DownloadMediaResponse extends pb_1.Message {
        constructor(data) {
            super();
            _DownloadMediaResponse_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _DownloadMediaResponse_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("content" in data && data.content != undefined) {
                    this.content = data.content;
                }
                if ("contentPath" in data && data.contentPath != undefined) {
                    this.contentPath = data.contentPath;
                }
            }
        }
        get content() {
            return pb_1.Message.getFieldWithDefault(this, 1, new Uint8Array(0));
        }
        set content(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get contentPath() {
            return pb_1.Message.getFieldWithDefault(this, 5, "");
        }
        set contentPath(value) {
            pb_1.Message.setField(this, 5, value);
        }
        static fromObject(data) {
            const message = new DownloadMediaResponse({});
            if (data.content != null) {
                message.content = data.content;
            }
            if (data.contentPath != null) {
                message.contentPath = data.contentPath;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.content != null) {
                data.content = this.content;
            }
            if (this.contentPath != null) {
                data.contentPath = this.contentPath;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.content.length)
                writer.writeBytes(1, this.content);
            if (this.contentPath.length)
                writer.writeString(5, this.contentPath);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DownloadMediaResponse();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.content = reader.readBytes();
                        break;
                    case 5:
                        message.contentPath = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return DownloadMediaResponse.deserialize(bytes);
        }
    }
    _DownloadMediaResponse_one_of_decls = new WeakMap();
    messages.DownloadMediaResponse = DownloadMediaResponse;
    class EntityByIdRequest extends pb_1.Message {
        constructor(data) {
            super();
            _EntityByIdRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _EntityByIdRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set id(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new EntityByIdRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.id != null) {
                message.id = data.id;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.id != null) {
                data.id = this.id;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.id.length)
                writer.writeString(2, this.id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new EntityByIdRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.id = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return EntityByIdRequest.deserialize(bytes);
        }
    }
    _EntityByIdRequest_one_of_decls = new WeakMap();
    messages.EntityByIdRequest = EntityByIdRequest;
    class Json extends pb_1.Message {
        constructor(data) {
            super();
            _Json_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Json_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("data" in data && data.data != undefined) {
                    this.data = data.data;
                }
            }
        }
        get data() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set data(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new Json({});
            if (data.data != null) {
                message.data = data.data;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.data != null) {
                data.data = this.data;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.data.length)
                writer.writeString(1, this.data);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Json();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.data = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return Json.deserialize(bytes);
        }
    }
    _Json_one_of_decls = new WeakMap();
    messages.Json = Json;
    class JsonList extends pb_1.Message {
        constructor(data) {
            super();
            _JsonList_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], __classPrivateFieldGet(this, _JsonList_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("elements" in data && data.elements != undefined) {
                    this.elements = data.elements;
                }
            }
        }
        get elements() {
            return pb_1.Message.getRepeatedWrapperField(this, Json, 1);
        }
        set elements(value) {
            pb_1.Message.setRepeatedWrapperField(this, 1, value);
        }
        static fromObject(data) {
            const message = new JsonList({});
            if (data.elements != null) {
                message.elements = data.elements.map(item => Json.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.elements != null) {
                data.elements = this.elements.map((item) => item.toObject());
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.elements.length)
                writer.writeRepeatedMessage(1, this.elements, (item) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new JsonList();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.elements, () => pb_1.Message.addToRepeatedWrapperField(message, 1, Json.deserialize(reader), Json));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return JsonList.deserialize(bytes);
        }
    }
    _JsonList_one_of_decls = new WeakMap();
    messages.JsonList = JsonList;
    class Pagination extends pb_1.Message {
        constructor(data) {
            super();
            _Pagination_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Pagination_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("limit" in data && data.limit != undefined) {
                    this.limit = data.limit;
                }
                if ("offset" in data && data.offset != undefined) {
                    this.offset = data.offset;
                }
            }
        }
        get limit() {
            return pb_1.Message.getFieldWithDefault(this, 1, 0);
        }
        set limit(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get offset() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0);
        }
        set offset(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new Pagination({});
            if (data.limit != null) {
                message.limit = data.limit;
            }
            if (data.offset != null) {
                message.offset = data.offset;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.limit != null) {
                data.limit = this.limit;
            }
            if (this.offset != null) {
                data.offset = this.offset;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.limit != 0)
                writer.writeUint64(1, this.limit);
            if (this.offset != 0)
                writer.writeUint64(2, this.offset);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Pagination();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.limit = reader.readUint64();
                        break;
                    case 2:
                        message.offset = reader.readUint64();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return Pagination.deserialize(bytes);
        }
    }
    _Pagination_one_of_decls = new WeakMap();
    messages.Pagination = Pagination;
    class SortBy extends pb_1.Message {
        constructor(data) {
            super();
            _SortBy_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _SortBy_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("field" in data && data.field != undefined) {
                    this.field = data.field;
                }
                if ("order" in data && data.order != undefined) {
                    this.order = data.order;
                }
            }
        }
        get field() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set field(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get order() {
            return pb_1.Message.getFieldWithDefault(this, 2, SortBy.Order.ASC);
        }
        set order(value) {
            pb_1.Message.setField(this, 2, value);
        }
        static fromObject(data) {
            const message = new SortBy({});
            if (data.field != null) {
                message.field = data.field;
            }
            if (data.order != null) {
                message.order = data.order;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.field != null) {
                data.field = this.field;
            }
            if (this.order != null) {
                data.order = this.order;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.field.length)
                writer.writeString(1, this.field);
            if (this.order != SortBy.Order.ASC)
                writer.writeEnum(2, this.order);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new SortBy();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.field = reader.readString();
                        break;
                    case 2:
                        message.order = reader.readEnum();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return SortBy.deserialize(bytes);
        }
    }
    _SortBy_one_of_decls = new WeakMap();
    messages.SortBy = SortBy;
    (function (SortBy) {
        let Order;
        (function (Order) {
            Order[Order["ASC"] = 0] = "ASC";
            Order[Order["DESC"] = 1] = "DESC";
        })(Order = SortBy.Order || (SortBy.Order = {}));
    })(SortBy = messages.SortBy || (messages.SortBy = {}));
    class MessageFilters extends pb_1.Message {
        constructor(data) {
            super();
            _MessageFilters_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _MessageFilters_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("timestampGte" in data && data.timestampGte != undefined) {
                    this.timestampGte = data.timestampGte;
                }
                if ("timestampLte" in data && data.timestampLte != undefined) {
                    this.timestampLte = data.timestampLte;
                }
                if ("fromMe" in data && data.fromMe != undefined) {
                    this.fromMe = data.fromMe;
                }
                if ("status" in data && data.status != undefined) {
                    this.status = data.status;
                }
            }
        }
        get jid() {
            return pb_1.Message.getWrapperField(this, OptionalString, 1);
        }
        set jid(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_jid() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get timestampGte() {
            return pb_1.Message.getWrapperField(this, OptionalUInt64, 2);
        }
        set timestampGte(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_timestampGte() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get timestampLte() {
            return pb_1.Message.getWrapperField(this, OptionalUInt64, 3);
        }
        set timestampLte(value) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        get has_timestampLte() {
            return pb_1.Message.getField(this, 3) != null;
        }
        get fromMe() {
            return pb_1.Message.getWrapperField(this, OptionalBool, 4);
        }
        set fromMe(value) {
            pb_1.Message.setWrapperField(this, 4, value);
        }
        get has_fromMe() {
            return pb_1.Message.getField(this, 4) != null;
        }
        get status() {
            return pb_1.Message.getWrapperField(this, OptionalUInt32, 5);
        }
        set status(value) {
            pb_1.Message.setWrapperField(this, 5, value);
        }
        get has_status() {
            return pb_1.Message.getField(this, 5) != null;
        }
        static fromObject(data) {
            const message = new MessageFilters({});
            if (data.jid != null) {
                message.jid = OptionalString.fromObject(data.jid);
            }
            if (data.timestampGte != null) {
                message.timestampGte = OptionalUInt64.fromObject(data.timestampGte);
            }
            if (data.timestampLte != null) {
                message.timestampLte = OptionalUInt64.fromObject(data.timestampLte);
            }
            if (data.fromMe != null) {
                message.fromMe = OptionalBool.fromObject(data.fromMe);
            }
            if (data.status != null) {
                message.status = OptionalUInt32.fromObject(data.status);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.jid != null) {
                data.jid = this.jid.toObject();
            }
            if (this.timestampGte != null) {
                data.timestampGte = this.timestampGte.toObject();
            }
            if (this.timestampLte != null) {
                data.timestampLte = this.timestampLte.toObject();
            }
            if (this.fromMe != null) {
                data.fromMe = this.fromMe.toObject();
            }
            if (this.status != null) {
                data.status = this.status.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_jid)
                writer.writeMessage(1, this.jid, () => this.jid.serialize(writer));
            if (this.has_timestampGte)
                writer.writeMessage(2, this.timestampGte, () => this.timestampGte.serialize(writer));
            if (this.has_timestampLte)
                writer.writeMessage(3, this.timestampLte, () => this.timestampLte.serialize(writer));
            if (this.has_fromMe)
                writer.writeMessage(4, this.fromMe, () => this.fromMe.serialize(writer));
            if (this.has_status)
                writer.writeMessage(5, this.status, () => this.status.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new MessageFilters();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.jid, () => message.jid = OptionalString.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.timestampGte, () => message.timestampGte = OptionalUInt64.deserialize(reader));
                        break;
                    case 3:
                        reader.readMessage(message.timestampLte, () => message.timestampLte = OptionalUInt64.deserialize(reader));
                        break;
                    case 4:
                        reader.readMessage(message.fromMe, () => message.fromMe = OptionalBool.deserialize(reader));
                        break;
                    case 5:
                        reader.readMessage(message.status, () => message.status = OptionalUInt32.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return MessageFilters.deserialize(bytes);
        }
    }
    _MessageFilters_one_of_decls = new WeakMap();
    messages.MessageFilters = MessageFilters;
    class GetMessagesRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetMessagesRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetMessagesRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("filters" in data && data.filters != undefined) {
                    this.filters = data.filters;
                }
                if ("pagination" in data && data.pagination != undefined) {
                    this.pagination = data.pagination;
                }
                if ("sortBy" in data && data.sortBy != undefined) {
                    this.sortBy = data.sortBy;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get filters() {
            return pb_1.Message.getWrapperField(this, MessageFilters, 2);
        }
        set filters(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_filters() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get pagination() {
            return pb_1.Message.getWrapperField(this, Pagination, 3);
        }
        set pagination(value) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        get has_pagination() {
            return pb_1.Message.getField(this, 3) != null;
        }
        get sortBy() {
            return pb_1.Message.getWrapperField(this, SortBy, 4);
        }
        set sortBy(value) {
            pb_1.Message.setWrapperField(this, 4, value);
        }
        get has_sortBy() {
            return pb_1.Message.getField(this, 4) != null;
        }
        static fromObject(data) {
            const message = new GetMessagesRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.filters != null) {
                message.filters = MessageFilters.fromObject(data.filters);
            }
            if (data.pagination != null) {
                message.pagination = Pagination.fromObject(data.pagination);
            }
            if (data.sortBy != null) {
                message.sortBy = SortBy.fromObject(data.sortBy);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.filters != null) {
                data.filters = this.filters.toObject();
            }
            if (this.pagination != null) {
                data.pagination = this.pagination.toObject();
            }
            if (this.sortBy != null) {
                data.sortBy = this.sortBy.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.has_filters)
                writer.writeMessage(2, this.filters, () => this.filters.serialize(writer));
            if (this.has_pagination)
                writer.writeMessage(3, this.pagination, () => this.pagination.serialize(writer));
            if (this.has_sortBy)
                writer.writeMessage(4, this.sortBy, () => this.sortBy.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetMessagesRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.filters, () => message.filters = MessageFilters.deserialize(reader));
                        break;
                    case 3:
                        reader.readMessage(message.pagination, () => message.pagination = Pagination.deserialize(reader));
                        break;
                    case 4:
                        reader.readMessage(message.sortBy, () => message.sortBy = SortBy.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return GetMessagesRequest.deserialize(bytes);
        }
    }
    _GetMessagesRequest_one_of_decls = new WeakMap();
    messages.GetMessagesRequest = GetMessagesRequest;
    class UpdateContactRequest extends pb_1.Message {
        constructor(data) {
            super();
            _UpdateContactRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _UpdateContactRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("firstName" in data && data.firstName != undefined) {
                    this.firstName = data.firstName;
                }
                if ("lastName" in data && data.lastName != undefined) {
                    this.lastName = data.lastName;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get firstName() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set firstName(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get lastName() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set lastName(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new UpdateContactRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.firstName != null) {
                message.firstName = data.firstName;
            }
            if (data.lastName != null) {
                message.lastName = data.lastName;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.firstName != null) {
                data.firstName = this.firstName;
            }
            if (this.lastName != null) {
                data.lastName = this.lastName;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.firstName.length)
                writer.writeString(3, this.firstName);
            if (this.lastName.length)
                writer.writeString(4, this.lastName);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UpdateContactRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 3:
                        message.firstName = reader.readString();
                        break;
                    case 4:
                        message.lastName = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return UpdateContactRequest.deserialize(bytes);
        }
    }
    _UpdateContactRequest_one_of_decls = new WeakMap();
    messages.UpdateContactRequest = UpdateContactRequest;
    class GetContactsRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetContactsRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetContactsRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("sortBy" in data && data.sortBy != undefined) {
                    this.sortBy = data.sortBy;
                }
                if ("pagination" in data && data.pagination != undefined) {
                    this.pagination = data.pagination;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get sortBy() {
            return pb_1.Message.getWrapperField(this, SortBy, 2);
        }
        set sortBy(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_sortBy() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get pagination() {
            return pb_1.Message.getWrapperField(this, Pagination, 3);
        }
        set pagination(value) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        get has_pagination() {
            return pb_1.Message.getField(this, 3) != null;
        }
        static fromObject(data) {
            const message = new GetContactsRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.sortBy != null) {
                message.sortBy = SortBy.fromObject(data.sortBy);
            }
            if (data.pagination != null) {
                message.pagination = Pagination.fromObject(data.pagination);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.sortBy != null) {
                data.sortBy = this.sortBy.toObject();
            }
            if (this.pagination != null) {
                data.pagination = this.pagination.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.has_sortBy)
                writer.writeMessage(2, this.sortBy, () => this.sortBy.serialize(writer));
            if (this.has_pagination)
                writer.writeMessage(3, this.pagination, () => this.pagination.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetContactsRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.sortBy, () => message.sortBy = SortBy.deserialize(reader));
                        break;
                    case 3:
                        reader.readMessage(message.pagination, () => message.pagination = Pagination.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return GetContactsRequest.deserialize(bytes);
        }
    }
    _GetContactsRequest_one_of_decls = new WeakMap();
    messages.GetContactsRequest = GetContactsRequest;
    class ChatFilter extends pb_1.Message {
        constructor(data) {
            super();
            _ChatFilter_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [1], __classPrivateFieldGet(this, _ChatFilter_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("jids" in data && data.jids != undefined) {
                    this.jids = data.jids;
                }
            }
        }
        get jids() {
            return pb_1.Message.getFieldWithDefault(this, 1, []);
        }
        set jids(value) {
            pb_1.Message.setField(this, 1, value);
        }
        static fromObject(data) {
            const message = new ChatFilter({});
            if (data.jids != null) {
                message.jids = data.jids;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.jids != null) {
                data.jids = this.jids;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.jids.length)
                writer.writeRepeatedString(1, this.jids);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ChatFilter();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        pb_1.Message.addToRepeatedField(message, 1, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return ChatFilter.deserialize(bytes);
        }
    }
    _ChatFilter_one_of_decls = new WeakMap();
    messages.ChatFilter = ChatFilter;
    class GetChatsRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetChatsRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetChatsRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("sortBy" in data && data.sortBy != undefined) {
                    this.sortBy = data.sortBy;
                }
                if ("pagination" in data && data.pagination != undefined) {
                    this.pagination = data.pagination;
                }
                if ("filter" in data && data.filter != undefined) {
                    this.filter = data.filter;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get sortBy() {
            return pb_1.Message.getWrapperField(this, SortBy, 2);
        }
        set sortBy(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_sortBy() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get pagination() {
            return pb_1.Message.getWrapperField(this, Pagination, 3);
        }
        set pagination(value) {
            pb_1.Message.setWrapperField(this, 3, value);
        }
        get has_pagination() {
            return pb_1.Message.getField(this, 3) != null;
        }
        get filter() {
            return pb_1.Message.getWrapperField(this, ChatFilter, 4);
        }
        set filter(value) {
            pb_1.Message.setWrapperField(this, 4, value);
        }
        get has_filter() {
            return pb_1.Message.getField(this, 4) != null;
        }
        static fromObject(data) {
            const message = new GetChatsRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.sortBy != null) {
                message.sortBy = SortBy.fromObject(data.sortBy);
            }
            if (data.pagination != null) {
                message.pagination = Pagination.fromObject(data.pagination);
            }
            if (data.filter != null) {
                message.filter = ChatFilter.fromObject(data.filter);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.sortBy != null) {
                data.sortBy = this.sortBy.toObject();
            }
            if (this.pagination != null) {
                data.pagination = this.pagination.toObject();
            }
            if (this.filter != null) {
                data.filter = this.filter.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.has_sortBy)
                writer.writeMessage(2, this.sortBy, () => this.sortBy.serialize(writer));
            if (this.has_pagination)
                writer.writeMessage(3, this.pagination, () => this.pagination.serialize(writer));
            if (this.has_filter)
                writer.writeMessage(4, this.filter, () => this.filter.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetChatsRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.sortBy, () => message.sortBy = SortBy.deserialize(reader));
                        break;
                    case 3:
                        reader.readMessage(message.pagination, () => message.pagination = Pagination.deserialize(reader));
                        break;
                    case 4:
                        reader.readMessage(message.filter, () => message.filter = ChatFilter.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return GetChatsRequest.deserialize(bytes);
        }
    }
    _GetChatsRequest_one_of_decls = new WeakMap();
    messages.GetChatsRequest = GetChatsRequest;
    class GetLabelsRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetLabelsRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetLabelsRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        static fromObject(data) {
            const message = new GetLabelsRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetLabelsRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return GetLabelsRequest.deserialize(bytes);
        }
    }
    _GetLabelsRequest_one_of_decls = new WeakMap();
    messages.GetLabelsRequest = GetLabelsRequest;
    class Label extends pb_1.Message {
        constructor(data) {
            super();
            _Label_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _Label_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("color" in data && data.color != undefined) {
                    this.color = data.color;
                }
            }
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set id(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get name() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set name(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get color() {
            return pb_1.Message.getFieldWithDefault(this, 4, 0);
        }
        set color(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new Label({});
            if (data.id != null) {
                message.id = data.id;
            }
            if (data.name != null) {
                message.name = data.name;
            }
            if (data.color != null) {
                message.color = data.color;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.id != null) {
                data.id = this.id;
            }
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.color != null) {
                data.color = this.color;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id.length)
                writer.writeString(1, this.id);
            if (this.name.length)
                writer.writeString(2, this.name);
            if (this.color != 0)
                writer.writeInt32(4, this.color);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Label();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readString();
                        break;
                    case 2:
                        message.name = reader.readString();
                        break;
                    case 4:
                        message.color = reader.readInt32();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return Label.deserialize(bytes);
        }
    }
    _Label_one_of_decls = new WeakMap();
    messages.Label = Label;
    class UpsertLabelRequest extends pb_1.Message {
        constructor(data) {
            super();
            _UpsertLabelRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _UpsertLabelRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("label" in data && data.label != undefined) {
                    this.label = data.label;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get label() {
            return pb_1.Message.getWrapperField(this, Label, 2);
        }
        set label(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_label() {
            return pb_1.Message.getField(this, 2) != null;
        }
        static fromObject(data) {
            const message = new UpsertLabelRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.label != null) {
                message.label = Label.fromObject(data.label);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.label != null) {
                data.label = this.label.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.has_label)
                writer.writeMessage(2, this.label, () => this.label.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new UpsertLabelRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.label, () => message.label = Label.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return UpsertLabelRequest.deserialize(bytes);
        }
    }
    _UpsertLabelRequest_one_of_decls = new WeakMap();
    messages.UpsertLabelRequest = UpsertLabelRequest;
    class DeleteLabelRequest extends pb_1.Message {
        constructor(data) {
            super();
            _DeleteLabelRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _DeleteLabelRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("label" in data && data.label != undefined) {
                    this.label = data.label;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get label() {
            return pb_1.Message.getWrapperField(this, Label, 2);
        }
        set label(value) {
            pb_1.Message.setWrapperField(this, 2, value);
        }
        get has_label() {
            return pb_1.Message.getField(this, 2) != null;
        }
        static fromObject(data) {
            const message = new DeleteLabelRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.label != null) {
                message.label = Label.fromObject(data.label);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.label != null) {
                data.label = this.label.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.has_label)
                writer.writeMessage(2, this.label, () => this.label.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new DeleteLabelRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        reader.readMessage(message.label, () => message.label = Label.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return DeleteLabelRequest.deserialize(bytes);
        }
    }
    _DeleteLabelRequest_one_of_decls = new WeakMap();
    messages.DeleteLabelRequest = DeleteLabelRequest;
    class ChatLabelRequest extends pb_1.Message {
        constructor(data) {
            super();
            _ChatLabelRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _ChatLabelRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("chatId" in data && data.chatId != undefined) {
                    this.chatId = data.chatId;
                }
                if ("labelId" in data && data.labelId != undefined) {
                    this.labelId = data.labelId;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get chatId() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set chatId(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get labelId() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set labelId(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new ChatLabelRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.chatId != null) {
                message.chatId = data.chatId;
            }
            if (data.labelId != null) {
                message.labelId = data.labelId;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.chatId != null) {
                data.chatId = this.chatId;
            }
            if (this.labelId != null) {
                data.labelId = this.labelId;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.chatId.length)
                writer.writeString(2, this.chatId);
            if (this.labelId.length)
                writer.writeString(3, this.labelId);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new ChatLabelRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.chatId = reader.readString();
                        break;
                    case 3:
                        message.labelId = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return ChatLabelRequest.deserialize(bytes);
        }
    }
    _ChatLabelRequest_one_of_decls = new WeakMap();
    messages.ChatLabelRequest = ChatLabelRequest;
    class CancelEventMessageRequest extends pb_1.Message {
        constructor(data) {
            super();
            _CancelEventMessageRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _CancelEventMessageRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("jid" in data && data.jid != undefined) {
                    this.jid = data.jid;
                }
                if ("messageId" in data && data.messageId != undefined) {
                    this.messageId = data.messageId;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get jid() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set jid(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get messageId() {
            return pb_1.Message.getFieldWithDefault(this, 4, "");
        }
        set messageId(value) {
            pb_1.Message.setField(this, 4, value);
        }
        static fromObject(data) {
            const message = new CancelEventMessageRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.jid != null) {
                message.jid = data.jid;
            }
            if (data.messageId != null) {
                message.messageId = data.messageId;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.jid != null) {
                data.jid = this.jid;
            }
            if (this.messageId != null) {
                data.messageId = this.messageId;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.jid.length)
                writer.writeString(2, this.jid);
            if (this.messageId.length)
                writer.writeString(4, this.messageId);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new CancelEventMessageRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.jid = reader.readString();
                        break;
                    case 4:
                        message.messageId = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return CancelEventMessageRequest.deserialize(bytes);
        }
    }
    _CancelEventMessageRequest_one_of_decls = new WeakMap();
    messages.CancelEventMessageRequest = CancelEventMessageRequest;
    class GetLidsRequest extends pb_1.Message {
        constructor(data) {
            super();
            _GetLidsRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _GetLidsRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        static fromObject(data) {
            const message = new GetLidsRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new GetLidsRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return GetLidsRequest.deserialize(bytes);
        }
    }
    _GetLidsRequest_one_of_decls = new WeakMap();
    messages.GetLidsRequest = GetLidsRequest;
    class RejectCallRequest extends pb_1.Message {
        constructor(data) {
            super();
            _RejectCallRequest_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], __classPrivateFieldGet(this, _RejectCallRequest_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("session" in data && data.session != undefined) {
                    this.session = data.session;
                }
                if ("from" in data && data.from != undefined) {
                    this.from = data.from;
                }
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
            }
        }
        get session() {
            return pb_1.Message.getWrapperField(this, Session, 1);
        }
        set session(value) {
            pb_1.Message.setWrapperField(this, 1, value);
        }
        get has_session() {
            return pb_1.Message.getField(this, 1) != null;
        }
        get from() {
            return pb_1.Message.getFieldWithDefault(this, 2, "");
        }
        set from(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get id() {
            return pb_1.Message.getFieldWithDefault(this, 3, "");
        }
        set id(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new RejectCallRequest({});
            if (data.session != null) {
                message.session = Session.fromObject(data.session);
            }
            if (data.from != null) {
                message.from = data.from;
            }
            if (data.id != null) {
                message.id = data.id;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.session != null) {
                data.session = this.session.toObject();
            }
            if (this.from != null) {
                data.from = this.from;
            }
            if (this.id != null) {
                data.id = this.id;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.has_session)
                writer.writeMessage(1, this.session, () => this.session.serialize(writer));
            if (this.from.length)
                writer.writeString(2, this.from);
            if (this.id.length)
                writer.writeString(3, this.id);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new RejectCallRequest();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        reader.readMessage(message.session, () => message.session = Session.deserialize(reader));
                        break;
                    case 2:
                        message.from = reader.readString();
                        break;
                    case 3:
                        message.id = reader.readString();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return RejectCallRequest.deserialize(bytes);
        }
    }
    _RejectCallRequest_one_of_decls = new WeakMap();
    messages.RejectCallRequest = RejectCallRequest;
    class PollMessage extends pb_1.Message {
        constructor(data) {
            super();
            _PollMessage_one_of_decls.set(this, []);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], __classPrivateFieldGet(this, _PollMessage_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("options" in data && data.options != undefined) {
                    this.options = data.options;
                }
                if ("multipleAnswers" in data && data.multipleAnswers != undefined) {
                    this.multipleAnswers = data.multipleAnswers;
                }
            }
        }
        get name() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set name(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get options() {
            return pb_1.Message.getFieldWithDefault(this, 2, []);
        }
        set options(value) {
            pb_1.Message.setField(this, 2, value);
        }
        get multipleAnswers() {
            return pb_1.Message.getFieldWithDefault(this, 3, false);
        }
        set multipleAnswers(value) {
            pb_1.Message.setField(this, 3, value);
        }
        static fromObject(data) {
            const message = new PollMessage({});
            if (data.name != null) {
                message.name = data.name;
            }
            if (data.options != null) {
                message.options = data.options;
            }
            if (data.multipleAnswers != null) {
                message.multipleAnswers = data.multipleAnswers;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.options != null) {
                data.options = this.options;
            }
            if (this.multipleAnswers != null) {
                data.multipleAnswers = this.multipleAnswers;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.name.length)
                writer.writeString(1, this.name);
            if (this.options.length)
                writer.writeRepeatedString(2, this.options);
            if (this.multipleAnswers != false)
                writer.writeBool(3, this.multipleAnswers);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PollMessage();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.name = reader.readString();
                        break;
                    case 2:
                        pb_1.Message.addToRepeatedField(message, 2, reader.readString());
                        break;
                    case 3:
                        message.multipleAnswers = reader.readBool();
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return PollMessage.deserialize(bytes);
        }
    }
    _PollMessage_one_of_decls = new WeakMap();
    messages.PollMessage = PollMessage;
    class PollVoteMessage extends pb_1.Message {
        constructor(data) {
            super();
            _PollVoteMessage_one_of_decls.set(this, [[2]]);
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [3], __classPrivateFieldGet(this, _PollVoteMessage_one_of_decls, "f"));
            if (!Array.isArray(data) && typeof data == "object") {
                if ("pollMessageId" in data && data.pollMessageId != undefined) {
                    this.pollMessageId = data.pollMessageId;
                }
                if ("pollServerId" in data && data.pollServerId != undefined) {
                    this.pollServerId = data.pollServerId;
                }
                if ("options" in data && data.options != undefined) {
                    this.options = data.options;
                }
            }
        }
        get pollMessageId() {
            return pb_1.Message.getFieldWithDefault(this, 1, "");
        }
        set pollMessageId(value) {
            pb_1.Message.setField(this, 1, value);
        }
        get pollServerId() {
            return pb_1.Message.getFieldWithDefault(this, 2, 0);
        }
        set pollServerId(value) {
            pb_1.Message.setOneofField(this, 2, __classPrivateFieldGet(this, _PollVoteMessage_one_of_decls, "f")[0], value);
        }
        get has_pollServerId() {
            return pb_1.Message.getField(this, 2) != null;
        }
        get options() {
            return pb_1.Message.getFieldWithDefault(this, 3, []);
        }
        set options(value) {
            pb_1.Message.setField(this, 3, value);
        }
        get _pollServerId() {
            const cases = {
                0: "none",
                2: "pollServerId"
            };
            return cases[pb_1.Message.computeOneofCase(this, [2])];
        }
        static fromObject(data) {
            const message = new PollVoteMessage({});
            if (data.pollMessageId != null) {
                message.pollMessageId = data.pollMessageId;
            }
            if (data.pollServerId != null) {
                message.pollServerId = data.pollServerId;
            }
            if (data.options != null) {
                message.options = data.options;
            }
            return message;
        }
        toObject() {
            const data = {};
            if (this.pollMessageId != null) {
                data.pollMessageId = this.pollMessageId;
            }
            if (this.pollServerId != null) {
                data.pollServerId = this.pollServerId;
            }
            if (this.options != null) {
                data.options = this.options;
            }
            return data;
        }
        serialize(w) {
            const writer = w || new pb_1.BinaryWriter();
            if (this.pollMessageId.length)
                writer.writeString(1, this.pollMessageId);
            if (this.has_pollServerId)
                writer.writeInt64(2, this.pollServerId);
            if (this.options.length)
                writer.writeRepeatedString(3, this.options);
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes) {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PollVoteMessage();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.pollMessageId = reader.readString();
                        break;
                    case 2:
                        message.pollServerId = reader.readInt64();
                        break;
                    case 3:
                        pb_1.Message.addToRepeatedField(message, 3, reader.readString());
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary() {
            return this.serialize();
        }
        static deserializeBinary(bytes) {
            return PollVoteMessage.deserialize(bytes);
        }
    }
    _PollVoteMessage_one_of_decls = new WeakMap();
    messages.PollVoteMessage = PollVoteMessage;
    class UnimplementedEventStreamService {
    }
    UnimplementedEventStreamService.definition = {
        StreamEvents: {
            path: "/messages.EventStream/StreamEvents",
            requestStream: false,
            responseStream: true,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => Session.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => EventJson.deserialize(new Uint8Array(bytes))
        }
    };
    messages.UnimplementedEventStreamService = UnimplementedEventStreamService;
    class EventStreamClient extends grpc_1.makeGenericClientConstructor(UnimplementedEventStreamService.definition, "EventStream", {}) {
        constructor(address, credentials, options) {
            super(address, credentials, options);
            this.StreamEvents = (message, metadata, options) => {
                return super.StreamEvents(message, metadata, options);
            };
        }
    }
    messages.EventStreamClient = EventStreamClient;
    class UnimplementedMessageServiceService {
    }
    UnimplementedMessageServiceService.definition = {
        StartSession: {
            path: "/messages.MessageService/StartSession",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => StartSessionRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        StopSession: {
            path: "/messages.MessageService/StopSession",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => Session.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        GetSessionState: {
            path: "/messages.MessageService/GetSessionState",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => Session.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => SessionStateResponse.deserialize(new Uint8Array(bytes))
        },
        RequestCode: {
            path: "/messages.MessageService/RequestCode",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => PairCodeRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => PairCodeResponse.deserialize(new Uint8Array(bytes))
        },
        Logout: {
            path: "/messages.MessageService/Logout",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => Session.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        SetProfileName: {
            path: "/messages.MessageService/SetProfileName",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => ProfileNameRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        SetProfileStatus: {
            path: "/messages.MessageService/SetProfileStatus",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => ProfileStatusRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        SetProfilePicture: {
            path: "/messages.MessageService/SetProfilePicture",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => SetProfilePictureRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        GetAllLids: {
            path: "/messages.MessageService/GetAllLids",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetLidsRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => JsonList.deserialize(new Uint8Array(bytes))
        },
        GetLidsCount: {
            path: "/messages.MessageService/GetLidsCount",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => Session.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => OptionalUInt64.deserialize(new Uint8Array(bytes))
        },
        FindPNByLid: {
            path: "/messages.MessageService/FindPNByLid",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => EntityByIdRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => OptionalString.deserialize(new Uint8Array(bytes))
        },
        FindLIDByPhoneNumber: {
            path: "/messages.MessageService/FindLIDByPhoneNumber",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => EntityByIdRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => OptionalString.deserialize(new Uint8Array(bytes))
        },
        FetchGroups: {
            path: "/messages.MessageService/FetchGroups",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => Session.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        GetGroups: {
            path: "/messages.MessageService/GetGroups",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => Session.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => JsonList.deserialize(new Uint8Array(bytes))
        },
        GetGroupInfo: {
            path: "/messages.MessageService/GetGroupInfo",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => JidRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Json.deserialize(new Uint8Array(bytes))
        },
        CreateGroup: {
            path: "/messages.MessageService/CreateGroup",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => CreateGroupRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Json.deserialize(new Uint8Array(bytes))
        },
        LeaveGroup: {
            path: "/messages.MessageService/LeaveGroup",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => JidRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        GetGroupInviteLink: {
            path: "/messages.MessageService/GetGroupInviteLink",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => JidRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => OptionalString.deserialize(new Uint8Array(bytes))
        },
        RevokeGroupInviteLink: {
            path: "/messages.MessageService/RevokeGroupInviteLink",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => JidRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => OptionalString.deserialize(new Uint8Array(bytes))
        },
        GetGroupInfoFromLink: {
            path: "/messages.MessageService/GetGroupInfoFromLink",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GroupCodeRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Json.deserialize(new Uint8Array(bytes))
        },
        JoinGroupWithLink: {
            path: "/messages.MessageService/JoinGroupWithLink",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GroupCodeRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Json.deserialize(new Uint8Array(bytes))
        },
        SetGroupName: {
            path: "/messages.MessageService/SetGroupName",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => JidStringRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        SetGroupDescription: {
            path: "/messages.MessageService/SetGroupDescription",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => JidStringRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        SetGroupPicture: {
            path: "/messages.MessageService/SetGroupPicture",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => SetPictureRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        SetGroupLocked: {
            path: "/messages.MessageService/SetGroupLocked",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => JidBoolRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        SetGroupAnnounce: {
            path: "/messages.MessageService/SetGroupAnnounce",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => JidBoolRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        UpdateGroupParticipants: {
            path: "/messages.MessageService/UpdateGroupParticipants",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => UpdateParticipantsRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => JsonList.deserialize(new Uint8Array(bytes))
        },
        GetProfilePicture: {
            path: "/messages.MessageService/GetProfilePicture",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => ProfilePictureRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => ProfilePictureResponse.deserialize(new Uint8Array(bytes))
        },
        SendPresence: {
            path: "/messages.MessageService/SendPresence",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => PresenceRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        SendChatPresence: {
            path: "/messages.MessageService/SendChatPresence",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => ChatPresenceRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        SubscribePresence: {
            path: "/messages.MessageService/SubscribePresence",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => SubscribePresenceRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        CheckPhones: {
            path: "/messages.MessageService/CheckPhones",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => CheckPhonesRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => CheckPhonesResponse.deserialize(new Uint8Array(bytes))
        },
        MarkChatUnread: {
            path: "/messages.MessageService/MarkChatUnread",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => ChatUnreadRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        GenerateNewMessageID: {
            path: "/messages.MessageService/GenerateNewMessageID",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => Session.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => NewMessageIDResponse.deserialize(new Uint8Array(bytes))
        },
        SendMessage: {
            path: "/messages.MessageService/SendMessage",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => MessageRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => MessageResponse.deserialize(new Uint8Array(bytes))
        },
        SendReaction: {
            path: "/messages.MessageService/SendReaction",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => MessageReaction.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => MessageResponse.deserialize(new Uint8Array(bytes))
        },
        MarkRead: {
            path: "/messages.MessageService/MarkRead",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => MarkReadRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        EditMessage: {
            path: "/messages.MessageService/EditMessage",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => EditMessageRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => MessageResponse.deserialize(new Uint8Array(bytes))
        },
        RevokeMessage: {
            path: "/messages.MessageService/RevokeMessage",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => RevokeMessageRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => MessageResponse.deserialize(new Uint8Array(bytes))
        },
        SendButtonReply: {
            path: "/messages.MessageService/SendButtonReply",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => ButtonReplyRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => MessageResponse.deserialize(new Uint8Array(bytes))
        },
        GetSubscribedNewsletters: {
            path: "/messages.MessageService/GetSubscribedNewsletters",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => NewsletterListRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => NewsletterList.deserialize(new Uint8Array(bytes))
        },
        GetNewsletterInfo: {
            path: "/messages.MessageService/GetNewsletterInfo",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => NewsletterInfoRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Newsletter.deserialize(new Uint8Array(bytes))
        },
        GetNewsletterMessagesByInvite: {
            path: "/messages.MessageService/GetNewsletterMessagesByInvite",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetNewsletterMessagesByInviteRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Json.deserialize(new Uint8Array(bytes))
        },
        SearchNewslettersByView: {
            path: "/messages.MessageService/SearchNewslettersByView",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => SearchNewslettersByViewRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => NewsletterSearchPageResult.deserialize(new Uint8Array(bytes))
        },
        SearchNewslettersByText: {
            path: "/messages.MessageService/SearchNewslettersByText",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => SearchNewslettersByTextRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => NewsletterSearchPageResult.deserialize(new Uint8Array(bytes))
        },
        CreateNewsletter: {
            path: "/messages.MessageService/CreateNewsletter",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => CreateNewsletterRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Newsletter.deserialize(new Uint8Array(bytes))
        },
        NewsletterToggleMute: {
            path: "/messages.MessageService/NewsletterToggleMute",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => NewsletterToggleMuteRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        NewsletterToggleFollow: {
            path: "/messages.MessageService/NewsletterToggleFollow",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => NewsletterToggleFollowRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        GetLabels: {
            path: "/messages.MessageService/GetLabels",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetLabelsRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => JsonList.deserialize(new Uint8Array(bytes))
        },
        UpsertLabel: {
            path: "/messages.MessageService/UpsertLabel",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => UpsertLabelRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        DeleteLabel: {
            path: "/messages.MessageService/DeleteLabel",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => DeleteLabelRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        AddChatLabel: {
            path: "/messages.MessageService/AddChatLabel",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => ChatLabelRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        RemoveChatLabel: {
            path: "/messages.MessageService/RemoveChatLabel",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => ChatLabelRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        GetLabelsByJid: {
            path: "/messages.MessageService/GetLabelsByJid",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => EntityByIdRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => JsonList.deserialize(new Uint8Array(bytes))
        },
        GetChatsByLabelId: {
            path: "/messages.MessageService/GetChatsByLabelId",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => EntityByIdRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => JsonList.deserialize(new Uint8Array(bytes))
        },
        UpdateContact: {
            path: "/messages.MessageService/UpdateContact",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => UpdateContactRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        GetContacts: {
            path: "/messages.MessageService/GetContacts",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetContactsRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => JsonList.deserialize(new Uint8Array(bytes))
        },
        GetContactById: {
            path: "/messages.MessageService/GetContactById",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => EntityByIdRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Json.deserialize(new Uint8Array(bytes))
        },
        CancelEventMessage: {
            path: "/messages.MessageService/CancelEventMessage",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => CancelEventMessageRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => MessageResponse.deserialize(new Uint8Array(bytes))
        },
        DownloadMedia: {
            path: "/messages.MessageService/DownloadMedia",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => DownloadMediaRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => DownloadMediaResponse.deserialize(new Uint8Array(bytes))
        },
        RejectCall: {
            path: "/messages.MessageService/RejectCall",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => RejectCallRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Empty.deserialize(new Uint8Array(bytes))
        },
        GetMessageById: {
            path: "/messages.MessageService/GetMessageById",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => EntityByIdRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => Json.deserialize(new Uint8Array(bytes))
        },
        GetMessages: {
            path: "/messages.MessageService/GetMessages",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetMessagesRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => JsonList.deserialize(new Uint8Array(bytes))
        },
        GetChats: {
            path: "/messages.MessageService/GetChats",
            requestStream: false,
            responseStream: false,
            requestSerialize: (message) => Buffer.from(message.serialize()),
            requestDeserialize: (bytes) => GetChatsRequest.deserialize(new Uint8Array(bytes)),
            responseSerialize: (message) => Buffer.from(message.serialize()),
            responseDeserialize: (bytes) => JsonList.deserialize(new Uint8Array(bytes))
        }
    };
    messages.UnimplementedMessageServiceService = UnimplementedMessageServiceService;
    class MessageServiceClient extends grpc_1.makeGenericClientConstructor(UnimplementedMessageServiceService.definition, "MessageService", {}) {
        constructor(address, credentials, options) {
            super(address, credentials, options);
            this.StartSession = (message, metadata, options, callback) => {
                return super.StartSession(message, metadata, options, callback);
            };
            this.StopSession = (message, metadata, options, callback) => {
                return super.StopSession(message, metadata, options, callback);
            };
            this.GetSessionState = (message, metadata, options, callback) => {
                return super.GetSessionState(message, metadata, options, callback);
            };
            this.RequestCode = (message, metadata, options, callback) => {
                return super.RequestCode(message, metadata, options, callback);
            };
            this.Logout = (message, metadata, options, callback) => {
                return super.Logout(message, metadata, options, callback);
            };
            this.SetProfileName = (message, metadata, options, callback) => {
                return super.SetProfileName(message, metadata, options, callback);
            };
            this.SetProfileStatus = (message, metadata, options, callback) => {
                return super.SetProfileStatus(message, metadata, options, callback);
            };
            this.SetProfilePicture = (message, metadata, options, callback) => {
                return super.SetProfilePicture(message, metadata, options, callback);
            };
            this.GetAllLids = (message, metadata, options, callback) => {
                return super.GetAllLids(message, metadata, options, callback);
            };
            this.GetLidsCount = (message, metadata, options, callback) => {
                return super.GetLidsCount(message, metadata, options, callback);
            };
            this.FindPNByLid = (message, metadata, options, callback) => {
                return super.FindPNByLid(message, metadata, options, callback);
            };
            this.FindLIDByPhoneNumber = (message, metadata, options, callback) => {
                return super.FindLIDByPhoneNumber(message, metadata, options, callback);
            };
            this.FetchGroups = (message, metadata, options, callback) => {
                return super.FetchGroups(message, metadata, options, callback);
            };
            this.GetGroups = (message, metadata, options, callback) => {
                return super.GetGroups(message, metadata, options, callback);
            };
            this.GetGroupInfo = (message, metadata, options, callback) => {
                return super.GetGroupInfo(message, metadata, options, callback);
            };
            this.CreateGroup = (message, metadata, options, callback) => {
                return super.CreateGroup(message, metadata, options, callback);
            };
            this.LeaveGroup = (message, metadata, options, callback) => {
                return super.LeaveGroup(message, metadata, options, callback);
            };
            this.GetGroupInviteLink = (message, metadata, options, callback) => {
                return super.GetGroupInviteLink(message, metadata, options, callback);
            };
            this.RevokeGroupInviteLink = (message, metadata, options, callback) => {
                return super.RevokeGroupInviteLink(message, metadata, options, callback);
            };
            this.GetGroupInfoFromLink = (message, metadata, options, callback) => {
                return super.GetGroupInfoFromLink(message, metadata, options, callback);
            };
            this.JoinGroupWithLink = (message, metadata, options, callback) => {
                return super.JoinGroupWithLink(message, metadata, options, callback);
            };
            this.SetGroupName = (message, metadata, options, callback) => {
                return super.SetGroupName(message, metadata, options, callback);
            };
            this.SetGroupDescription = (message, metadata, options, callback) => {
                return super.SetGroupDescription(message, metadata, options, callback);
            };
            this.SetGroupPicture = (message, metadata, options, callback) => {
                return super.SetGroupPicture(message, metadata, options, callback);
            };
            this.SetGroupLocked = (message, metadata, options, callback) => {
                return super.SetGroupLocked(message, metadata, options, callback);
            };
            this.SetGroupAnnounce = (message, metadata, options, callback) => {
                return super.SetGroupAnnounce(message, metadata, options, callback);
            };
            this.UpdateGroupParticipants = (message, metadata, options, callback) => {
                return super.UpdateGroupParticipants(message, metadata, options, callback);
            };
            this.GetProfilePicture = (message, metadata, options, callback) => {
                return super.GetProfilePicture(message, metadata, options, callback);
            };
            this.SendPresence = (message, metadata, options, callback) => {
                return super.SendPresence(message, metadata, options, callback);
            };
            this.SendChatPresence = (message, metadata, options, callback) => {
                return super.SendChatPresence(message, metadata, options, callback);
            };
            this.SubscribePresence = (message, metadata, options, callback) => {
                return super.SubscribePresence(message, metadata, options, callback);
            };
            this.CheckPhones = (message, metadata, options, callback) => {
                return super.CheckPhones(message, metadata, options, callback);
            };
            this.MarkChatUnread = (message, metadata, options, callback) => {
                return super.MarkChatUnread(message, metadata, options, callback);
            };
            this.GenerateNewMessageID = (message, metadata, options, callback) => {
                return super.GenerateNewMessageID(message, metadata, options, callback);
            };
            this.SendMessage = (message, metadata, options, callback) => {
                return super.SendMessage(message, metadata, options, callback);
            };
            this.SendReaction = (message, metadata, options, callback) => {
                return super.SendReaction(message, metadata, options, callback);
            };
            this.MarkRead = (message, metadata, options, callback) => {
                return super.MarkRead(message, metadata, options, callback);
            };
            this.EditMessage = (message, metadata, options, callback) => {
                return super.EditMessage(message, metadata, options, callback);
            };
            this.RevokeMessage = (message, metadata, options, callback) => {
                return super.RevokeMessage(message, metadata, options, callback);
            };
            this.SendButtonReply = (message, metadata, options, callback) => {
                return super.SendButtonReply(message, metadata, options, callback);
            };
            this.GetSubscribedNewsletters = (message, metadata, options, callback) => {
                return super.GetSubscribedNewsletters(message, metadata, options, callback);
            };
            this.GetNewsletterInfo = (message, metadata, options, callback) => {
                return super.GetNewsletterInfo(message, metadata, options, callback);
            };
            this.GetNewsletterMessagesByInvite = (message, metadata, options, callback) => {
                return super.GetNewsletterMessagesByInvite(message, metadata, options, callback);
            };
            this.SearchNewslettersByView = (message, metadata, options, callback) => {
                return super.SearchNewslettersByView(message, metadata, options, callback);
            };
            this.SearchNewslettersByText = (message, metadata, options, callback) => {
                return super.SearchNewslettersByText(message, metadata, options, callback);
            };
            this.CreateNewsletter = (message, metadata, options, callback) => {
                return super.CreateNewsletter(message, metadata, options, callback);
            };
            this.NewsletterToggleMute = (message, metadata, options, callback) => {
                return super.NewsletterToggleMute(message, metadata, options, callback);
            };
            this.NewsletterToggleFollow = (message, metadata, options, callback) => {
                return super.NewsletterToggleFollow(message, metadata, options, callback);
            };
            this.GetLabels = (message, metadata, options, callback) => {
                return super.GetLabels(message, metadata, options, callback);
            };
            this.UpsertLabel = (message, metadata, options, callback) => {
                return super.UpsertLabel(message, metadata, options, callback);
            };
            this.DeleteLabel = (message, metadata, options, callback) => {
                return super.DeleteLabel(message, metadata, options, callback);
            };
            this.AddChatLabel = (message, metadata, options, callback) => {
                return super.AddChatLabel(message, metadata, options, callback);
            };
            this.RemoveChatLabel = (message, metadata, options, callback) => {
                return super.RemoveChatLabel(message, metadata, options, callback);
            };
            this.GetLabelsByJid = (message, metadata, options, callback) => {
                return super.GetLabelsByJid(message, metadata, options, callback);
            };
            this.GetChatsByLabelId = (message, metadata, options, callback) => {
                return super.GetChatsByLabelId(message, metadata, options, callback);
            };
            this.UpdateContact = (message, metadata, options, callback) => {
                return super.UpdateContact(message, metadata, options, callback);
            };
            this.GetContacts = (message, metadata, options, callback) => {
                return super.GetContacts(message, metadata, options, callback);
            };
            this.GetContactById = (message, metadata, options, callback) => {
                return super.GetContactById(message, metadata, options, callback);
            };
            this.CancelEventMessage = (message, metadata, options, callback) => {
                return super.CancelEventMessage(message, metadata, options, callback);
            };
            this.DownloadMedia = (message, metadata, options, callback) => {
                return super.DownloadMedia(message, metadata, options, callback);
            };
            this.RejectCall = (message, metadata, options, callback) => {
                return super.RejectCall(message, metadata, options, callback);
            };
            this.GetMessageById = (message, metadata, options, callback) => {
                return super.GetMessageById(message, metadata, options, callback);
            };
            this.GetMessages = (message, metadata, options, callback) => {
                return super.GetMessages(message, metadata, options, callback);
            };
            this.GetChats = (message, metadata, options, callback) => {
                return super.GetChats(message, metadata, options, callback);
            };
        }
    }
    messages.MessageServiceClient = MessageServiceClient;
})(messages || (exports.messages = messages = {}));
//# sourceMappingURL=gows.js.map