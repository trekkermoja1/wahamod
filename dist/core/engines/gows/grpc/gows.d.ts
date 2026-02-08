import * as pb_1 from "google-protobuf";
import * as grpc_1 from "@grpc/grpc-js";
export declare namespace messages {
    export enum LogLevel {
        TRACE = 0,
        DEBUG = 1,
        INFO = 2,
        WARN = 3,
        ERROR = 4
    }
    export enum ParticipantAction {
        ADD = 0,
        REMOVE = 1,
        PROMOTE = 2,
        DEMOTE = 3
    }
    export enum MediaType {
        IMAGE = 0,
        AUDIO = 1,
        VIDEO = 2,
        DOCUMENT = 3
    }
    export enum Presence {
        AVAILABLE = 0,
        UNAVAILABLE = 1
    }
    export enum ChatPresence {
        TYPING = 0,
        RECORDING = 1,
        PAUSED = 2
    }
    export enum ReceiptType {
        READ = 0,
        PLAYED = 1
    }
    export class OptionalString extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            value?: string;
        });
        get value(): string;
        set value(value: string);
        static fromObject(data: {
            value?: string;
        }): OptionalString;
        toObject(): {
            value?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): OptionalString;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): OptionalString;
    }
    export class OptionalUInt32 extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            value?: number;
        });
        get value(): number;
        set value(value: number);
        static fromObject(data: {
            value?: number;
        }): OptionalUInt32;
        toObject(): {
            value?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): OptionalUInt32;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): OptionalUInt32;
    }
    export class OptionalUInt64 extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            value?: number;
        });
        get value(): number;
        set value(value: number);
        static fromObject(data: {
            value?: number;
        }): OptionalUInt64;
        toObject(): {
            value?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): OptionalUInt64;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): OptionalUInt64;
    }
    export class OptionalInt64 extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            value?: number;
        });
        get value(): number;
        set value(value: number);
        static fromObject(data: {
            value?: number;
        }): OptionalInt64;
        toObject(): {
            value?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): OptionalInt64;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): OptionalInt64;
    }
    export class OptionalBool extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            value?: boolean;
        });
        get value(): boolean;
        set value(value: boolean);
        static fromObject(data: {
            value?: boolean;
        }): OptionalBool;
        toObject(): {
            value?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): OptionalBool;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): OptionalBool;
    }
    export class OptionalDouble extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            value?: number;
        });
        get value(): number;
        set value(value: number);
        static fromObject(data: {
            value?: number;
        }): OptionalDouble;
        toObject(): {
            value?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): OptionalDouble;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): OptionalDouble;
    }
    export class JidRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
        }): JidRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): JidRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): JidRequest;
    }
    export class JidStringRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            value?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get value(): string;
        set value(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            value?: string;
        }): JidStringRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            value?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): JidStringRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): JidStringRequest;
    }
    export class JidBoolRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            value?: boolean;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get value(): boolean;
        set value(value: boolean);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            value?: boolean;
        }): JidBoolRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            value?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): JidBoolRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): JidBoolRequest;
    }
    export class EventJson extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: string;
            event?: string;
            data?: string;
        });
        get session(): string;
        set session(value: string);
        get event(): string;
        set event(value: string);
        get data(): string;
        set data(value: string);
        static fromObject(data: {
            session?: string;
            event?: string;
            data?: string;
        }): EventJson;
        toObject(): {
            session?: string;
            event?: string;
            data?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EventJson;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): EventJson;
    }
    export class PairCodeRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            phone?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get phone(): string;
        set phone(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            phone?: string;
        }): PairCodeRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            phone?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PairCodeRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PairCodeRequest;
    }
    export class PairCodeResponse extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            code?: string;
        });
        get code(): string;
        set code(value: string);
        static fromObject(data: {
            code?: string;
        }): PairCodeResponse;
        toObject(): {
            code?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PairCodeResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PairCodeResponse;
    }
    export class Empty extends pb_1.Message {
        #private;
        constructor(data?: any[] | {});
        static fromObject(data: {}): Empty;
        toObject(): {};
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Empty;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Empty;
    }
    export class SessionLogConfig extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            level?: LogLevel;
        });
        get level(): LogLevel;
        set level(value: LogLevel);
        static fromObject(data: {
            level?: LogLevel;
        }): SessionLogConfig;
        toObject(): {
            level?: LogLevel;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SessionLogConfig;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SessionLogConfig;
    }
    export class SessionStoreConfig extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            dialect?: string;
            address?: string;
        });
        get dialect(): string;
        set dialect(value: string);
        get address(): string;
        set address(value: string);
        static fromObject(data: {
            dialect?: string;
            address?: string;
        }): SessionStoreConfig;
        toObject(): {
            dialect?: string;
            address?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SessionStoreConfig;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SessionStoreConfig;
    }
    export class SessionProxyConfig extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            url?: string;
        });
        get url(): string;
        set url(value: string);
        static fromObject(data: {
            url?: string;
        }): SessionProxyConfig;
        toObject(): {
            url?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SessionProxyConfig;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SessionProxyConfig;
    }
    export class SessionIgnoreJidsConfig extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            status?: boolean;
            groups?: boolean;
            newsletters?: boolean;
            broadcast?: boolean;
        });
        get status(): boolean;
        set status(value: boolean);
        get groups(): boolean;
        set groups(value: boolean);
        get newsletters(): boolean;
        set newsletters(value: boolean);
        get broadcast(): boolean;
        set broadcast(value: boolean);
        static fromObject(data: {
            status?: boolean;
            groups?: boolean;
            newsletters?: boolean;
            broadcast?: boolean;
        }): SessionIgnoreJidsConfig;
        toObject(): {
            status?: boolean;
            groups?: boolean;
            newsletters?: boolean;
            broadcast?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SessionIgnoreJidsConfig;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SessionIgnoreJidsConfig;
    }
    export class SessionConfig extends pb_1.Message {
        #private;
        constructor(data?: any[] | ({
            store?: SessionStoreConfig;
            log?: SessionLogConfig;
            proxy?: SessionProxyConfig;
        } & (({
            ignore?: SessionIgnoreJidsConfig;
        }))));
        get store(): SessionStoreConfig;
        set store(value: SessionStoreConfig);
        get has_store(): boolean;
        get log(): SessionLogConfig;
        set log(value: SessionLogConfig);
        get has_log(): boolean;
        get proxy(): SessionProxyConfig;
        set proxy(value: SessionProxyConfig);
        get has_proxy(): boolean;
        get ignore(): SessionIgnoreJidsConfig;
        set ignore(value: SessionIgnoreJidsConfig);
        get has_ignore(): boolean;
        get _ignore(): "ignore" | "none";
        static fromObject(data: {
            store?: ReturnType<typeof SessionStoreConfig.prototype.toObject>;
            log?: ReturnType<typeof SessionLogConfig.prototype.toObject>;
            proxy?: ReturnType<typeof SessionProxyConfig.prototype.toObject>;
            ignore?: ReturnType<typeof SessionIgnoreJidsConfig.prototype.toObject>;
        }): SessionConfig;
        toObject(): {
            store?: ReturnType<typeof SessionStoreConfig.prototype.toObject>;
            log?: ReturnType<typeof SessionLogConfig.prototype.toObject>;
            proxy?: ReturnType<typeof SessionProxyConfig.prototype.toObject>;
            ignore?: ReturnType<typeof SessionIgnoreJidsConfig.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SessionConfig;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SessionConfig;
    }
    export class StartSessionRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            id?: string;
            config?: SessionConfig;
        });
        get id(): string;
        set id(value: string);
        get config(): SessionConfig;
        set config(value: SessionConfig);
        get has_config(): boolean;
        static fromObject(data: {
            id?: string;
            config?: ReturnType<typeof SessionConfig.prototype.toObject>;
        }): StartSessionRequest;
        toObject(): {
            id?: string;
            config?: ReturnType<typeof SessionConfig.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): StartSessionRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): StartSessionRequest;
    }
    export class SessionStateResponse extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            found?: boolean;
            connected?: boolean;
        });
        get found(): boolean;
        set found(value: boolean);
        get connected(): boolean;
        set connected(value: boolean);
        static fromObject(data: {
            found?: boolean;
            connected?: boolean;
        }): SessionStateResponse;
        toObject(): {
            found?: boolean;
            connected?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SessionStateResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SessionStateResponse;
    }
    export class Session extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            id?: string;
        });
        get id(): string;
        set id(value: string);
        static fromObject(data: {
            id?: string;
        }): Session;
        toObject(): {
            id?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Session;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Session;
    }
    export class ProfileNameRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            name?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get name(): string;
        set name(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            name?: string;
        }): ProfileNameRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            name?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProfileNameRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ProfileNameRequest;
    }
    export class ProfileStatusRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            status?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get status(): string;
        set status(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            status?: string;
        }): ProfileStatusRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            status?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProfileStatusRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ProfileStatusRequest;
    }
    export class SetProfilePictureRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            picture?: Uint8Array;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get picture(): Uint8Array;
        set picture(value: Uint8Array);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            picture?: Uint8Array;
        }): SetProfilePictureRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            picture?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SetProfilePictureRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SetProfilePictureRequest;
    }
    export class CreateGroupRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            name?: string;
            participants?: string[];
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get name(): string;
        set name(value: string);
        get participants(): string[];
        set participants(value: string[]);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            name?: string;
            participants?: string[];
        }): CreateGroupRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            name?: string;
            participants?: string[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CreateGroupRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CreateGroupRequest;
    }
    export class SetPictureRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            picture?: Uint8Array;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get picture(): Uint8Array;
        set picture(value: Uint8Array);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            picture?: Uint8Array;
        }): SetPictureRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            picture?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SetPictureRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SetPictureRequest;
    }
    export class UpdateParticipantsRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            participants?: string[];
            action?: ParticipantAction;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get participants(): string[];
        set participants(value: string[]);
        get action(): ParticipantAction;
        set action(value: ParticipantAction);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            participants?: string[];
            action?: ParticipantAction;
        }): UpdateParticipantsRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            participants?: string[];
            action?: ParticipantAction;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UpdateParticipantsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): UpdateParticipantsRequest;
    }
    export class GroupCodeRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            code?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get code(): string;
        set code(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            code?: string;
        }): GroupCodeRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            code?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GroupCodeRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GroupCodeRequest;
    }
    export class AudioInfo extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            duration?: number;
            waveform?: Uint8Array;
        });
        get duration(): number;
        set duration(value: number);
        get waveform(): Uint8Array;
        set waveform(value: Uint8Array);
        static fromObject(data: {
            duration?: number;
            waveform?: Uint8Array;
        }): AudioInfo;
        toObject(): {
            duration?: number;
            waveform?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AudioInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): AudioInfo;
    }
    export class Media extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            content?: Uint8Array;
            type?: MediaType;
            mimetype?: string;
            audio?: AudioInfo;
            filename?: string;
            contentPath?: string;
        });
        get content(): Uint8Array;
        set content(value: Uint8Array);
        get type(): MediaType;
        set type(value: MediaType);
        get mimetype(): string;
        set mimetype(value: string);
        get audio(): AudioInfo;
        set audio(value: AudioInfo);
        get has_audio(): boolean;
        get filename(): string;
        set filename(value: string);
        get contentPath(): string;
        set contentPath(value: string);
        static fromObject(data: {
            content?: Uint8Array;
            type?: MediaType;
            mimetype?: string;
            audio?: ReturnType<typeof AudioInfo.prototype.toObject>;
            filename?: string;
            contentPath?: string;
        }): Media;
        toObject(): {
            content?: Uint8Array;
            type?: MediaType;
            mimetype?: string;
            audio?: ReturnType<typeof AudioInfo.prototype.toObject>;
            filename?: string;
            contentPath?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Media;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Media;
    }
    export class LinkPreview extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            url?: string;
            title?: string;
            description?: string;
            image?: Uint8Array;
        });
        get url(): string;
        set url(value: string);
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        get image(): Uint8Array;
        set image(value: Uint8Array);
        static fromObject(data: {
            url?: string;
            title?: string;
            description?: string;
            image?: Uint8Array;
        }): LinkPreview;
        toObject(): {
            url?: string;
            title?: string;
            description?: string;
            image?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): LinkPreview;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): LinkPreview;
    }
    export class vCardContact extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            displayName?: string;
            vcard?: string;
        });
        get displayName(): string;
        set displayName(value: string);
        get vcard(): string;
        set vcard(value: string);
        static fromObject(data: {
            displayName?: string;
            vcard?: string;
        }): vCardContact;
        toObject(): {
            displayName?: string;
            vcard?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): vCardContact;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): vCardContact;
    }
    export class EventLocation extends pb_1.Message {
        #private;
        constructor(data?: any[] | ({
            name?: string;
        } & (({
            degreesLongitude?: number;
        }) | ({
            degreesLatitude?: number;
        }))));
        get name(): string;
        set name(value: string);
        get degreesLongitude(): number;
        set degreesLongitude(value: number);
        get has_degreesLongitude(): boolean;
        get degreesLatitude(): number;
        set degreesLatitude(value: number);
        get has_degreesLatitude(): boolean;
        get _degreesLongitude(): "none" | "degreesLongitude";
        get _degreesLatitude(): "none" | "degreesLatitude";
        static fromObject(data: {
            name?: string;
            degreesLongitude?: number;
            degreesLatitude?: number;
        }): EventLocation;
        toObject(): {
            name?: string;
            degreesLongitude?: number;
            degreesLatitude?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EventLocation;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): EventLocation;
    }
    export class Location extends pb_1.Message {
        #private;
        constructor(data?: any[] | ({
            degreesLongitude?: number;
            degreesLatitude?: number;
        } & (({
            name?: string;
        }))));
        get name(): string;
        set name(value: string);
        get has_name(): boolean;
        get degreesLongitude(): number;
        set degreesLongitude(value: number);
        get degreesLatitude(): number;
        set degreesLatitude(value: number);
        get _name(): "name" | "none";
        static fromObject(data: {
            name?: string;
            degreesLongitude?: number;
            degreesLatitude?: number;
        }): Location;
        toObject(): {
            name?: string;
            degreesLongitude?: number;
            degreesLatitude?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Location;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Location;
    }
    export class EventMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | ({
            name?: string;
            startTime?: number;
            extraGuestsAllowed?: boolean;
            location?: EventLocation;
        } & (({
            description?: string;
        }) | ({
            endTime?: number;
        }))));
        get name(): string;
        set name(value: string);
        get description(): string;
        set description(value: string);
        get has_description(): boolean;
        get startTime(): number;
        set startTime(value: number);
        get endTime(): number;
        set endTime(value: number);
        get has_endTime(): boolean;
        get extraGuestsAllowed(): boolean;
        set extraGuestsAllowed(value: boolean);
        get location(): EventLocation;
        set location(value: EventLocation);
        get has_location(): boolean;
        get _description(): "description" | "none";
        get _endTime(): "endTime" | "none";
        static fromObject(data: {
            name?: string;
            description?: string;
            startTime?: number;
            endTime?: number;
            extraGuestsAllowed?: boolean;
            location?: ReturnType<typeof EventLocation.prototype.toObject>;
        }): EventMessage;
        toObject(): {
            name?: string;
            description?: string;
            startTime?: number;
            endTime?: number;
            extraGuestsAllowed?: boolean;
            location?: ReturnType<typeof EventLocation.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EventMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): EventMessage;
    }
    export class MessageRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            text?: string;
            media?: Media;
            backgroundColor?: OptionalString;
            font?: OptionalUInt32;
            linkPreview?: boolean;
            linkPreviewHighQuality?: boolean;
            replyTo?: string;
            id?: string;
            participants?: string[];
            preview?: LinkPreview;
            contacts?: vCardContact[];
            event?: EventMessage;
            poll?: PollMessage;
            list?: ListMessage;
            location?: Location;
            pollVote?: PollVoteMessage;
            mentions?: string[];
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get text(): string;
        set text(value: string);
        get media(): Media;
        set media(value: Media);
        get has_media(): boolean;
        get backgroundColor(): OptionalString;
        set backgroundColor(value: OptionalString);
        get has_backgroundColor(): boolean;
        get font(): OptionalUInt32;
        set font(value: OptionalUInt32);
        get has_font(): boolean;
        get linkPreview(): boolean;
        set linkPreview(value: boolean);
        get linkPreviewHighQuality(): boolean;
        set linkPreviewHighQuality(value: boolean);
        get replyTo(): string;
        set replyTo(value: string);
        get id(): string;
        set id(value: string);
        get participants(): string[];
        set participants(value: string[]);
        get preview(): LinkPreview;
        set preview(value: LinkPreview);
        get has_preview(): boolean;
        get contacts(): vCardContact[];
        set contacts(value: vCardContact[]);
        get event(): EventMessage;
        set event(value: EventMessage);
        get has_event(): boolean;
        get poll(): PollMessage;
        set poll(value: PollMessage);
        get has_poll(): boolean;
        get list(): ListMessage;
        set list(value: ListMessage);
        get has_list(): boolean;
        get location(): Location;
        set location(value: Location);
        get has_location(): boolean;
        get pollVote(): PollVoteMessage;
        set pollVote(value: PollVoteMessage);
        get has_pollVote(): boolean;
        get mentions(): string[];
        set mentions(value: string[]);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            text?: string;
            media?: ReturnType<typeof Media.prototype.toObject>;
            backgroundColor?: ReturnType<typeof OptionalString.prototype.toObject>;
            font?: ReturnType<typeof OptionalUInt32.prototype.toObject>;
            linkPreview?: boolean;
            linkPreviewHighQuality?: boolean;
            replyTo?: string;
            id?: string;
            participants?: string[];
            preview?: ReturnType<typeof LinkPreview.prototype.toObject>;
            contacts?: ReturnType<typeof vCardContact.prototype.toObject>[];
            event?: ReturnType<typeof EventMessage.prototype.toObject>;
            poll?: ReturnType<typeof PollMessage.prototype.toObject>;
            list?: ReturnType<typeof ListMessage.prototype.toObject>;
            location?: ReturnType<typeof Location.prototype.toObject>;
            pollVote?: ReturnType<typeof PollVoteMessage.prototype.toObject>;
            mentions?: string[];
        }): MessageRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            text?: string;
            media?: ReturnType<typeof Media.prototype.toObject>;
            backgroundColor?: ReturnType<typeof OptionalString.prototype.toObject>;
            font?: ReturnType<typeof OptionalUInt32.prototype.toObject>;
            linkPreview?: boolean;
            linkPreviewHighQuality?: boolean;
            replyTo?: string;
            id?: string;
            participants?: string[];
            preview?: ReturnType<typeof LinkPreview.prototype.toObject>;
            contacts?: ReturnType<typeof vCardContact.prototype.toObject>[];
            event?: ReturnType<typeof EventMessage.prototype.toObject>;
            poll?: ReturnType<typeof PollMessage.prototype.toObject>;
            list?: ReturnType<typeof ListMessage.prototype.toObject>;
            location?: ReturnType<typeof Location.prototype.toObject>;
            pollVote?: ReturnType<typeof PollVoteMessage.prototype.toObject>;
            mentions?: string[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MessageRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MessageRequest;
    }
    export class Row extends pb_1.Message {
        #private;
        constructor(data?: any[] | ({
            title?: string;
            rowId?: string;
        } & (({
            description?: string;
        }))));
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        get has_description(): boolean;
        get rowId(): string;
        set rowId(value: string);
        get _description(): "description" | "none";
        static fromObject(data: {
            title?: string;
            description?: string;
            rowId?: string;
        }): Row;
        toObject(): {
            title?: string;
            description?: string;
            rowId?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Row;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Row;
    }
    export class Section extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            title?: string;
            rows?: Row[];
        });
        get title(): string;
        set title(value: string);
        get rows(): Row[];
        set rows(value: Row[]);
        static fromObject(data: {
            title?: string;
            rows?: ReturnType<typeof Row.prototype.toObject>[];
        }): Section;
        toObject(): {
            title?: string;
            rows?: ReturnType<typeof Row.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Section;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Section;
    }
    export class ListMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | ({
            title?: string;
            button?: string;
            sections?: Section[];
        } & (({
            description?: string;
        }) | ({
            footer?: string;
        }))));
        get title(): string;
        set title(value: string);
        get description(): string;
        set description(value: string);
        get has_description(): boolean;
        get footer(): string;
        set footer(value: string);
        get has_footer(): boolean;
        get button(): string;
        set button(value: string);
        get sections(): Section[];
        set sections(value: Section[]);
        get _description(): "description" | "none";
        get _footer(): "footer" | "none";
        static fromObject(data: {
            title?: string;
            description?: string;
            footer?: string;
            button?: string;
            sections?: ReturnType<typeof Section.prototype.toObject>[];
        }): ListMessage;
        toObject(): {
            title?: string;
            description?: string;
            footer?: string;
            button?: string;
            sections?: ReturnType<typeof Section.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ListMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ListMessage;
    }
    export class MessageReaction extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            sender?: string;
            messageId?: string;
            reaction?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get sender(): string;
        set sender(value: string);
        get messageId(): string;
        set messageId(value: string);
        get reaction(): string;
        set reaction(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            sender?: string;
            messageId?: string;
            reaction?: string;
        }): MessageReaction;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            sender?: string;
            messageId?: string;
            reaction?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MessageReaction;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MessageReaction;
    }
    export class MessageResponse extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            id?: string;
            timestamp?: number;
            message?: Json;
        });
        get id(): string;
        set id(value: string);
        get timestamp(): number;
        set timestamp(value: number);
        get message(): Json;
        set message(value: Json);
        get has_message(): boolean;
        static fromObject(data: {
            id?: string;
            timestamp?: number;
            message?: ReturnType<typeof Json.prototype.toObject>;
        }): MessageResponse;
        toObject(): {
            id?: string;
            timestamp?: number;
            message?: ReturnType<typeof Json.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MessageResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MessageResponse;
    }
    export class NewMessageIDResponse extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            id?: string;
        });
        get id(): string;
        set id(value: string);
        static fromObject(data: {
            id?: string;
        }): NewMessageIDResponse;
        toObject(): {
            id?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NewMessageIDResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NewMessageIDResponse;
    }
    export class ProfilePictureRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
        }): ProfilePictureRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProfilePictureRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ProfilePictureRequest;
    }
    export class ProfilePictureResponse extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            url?: string;
        });
        get url(): string;
        set url(value: string);
        static fromObject(data: {
            url?: string;
        }): ProfilePictureResponse;
        toObject(): {
            url?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ProfilePictureResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ProfilePictureResponse;
    }
    export class ButtonReplyRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            selectedDisplayText?: string;
            selectedButtonID?: string;
            replyTo?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get selectedDisplayText(): string;
        set selectedDisplayText(value: string);
        get selectedButtonID(): string;
        set selectedButtonID(value: string);
        get replyTo(): string;
        set replyTo(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            selectedDisplayText?: string;
            selectedButtonID?: string;
            replyTo?: string;
        }): ButtonReplyRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            selectedDisplayText?: string;
            selectedButtonID?: string;
            replyTo?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ButtonReplyRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ButtonReplyRequest;
    }
    export class PresenceRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            status?: Presence;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get status(): Presence;
        set status(value: Presence);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            status?: Presence;
        }): PresenceRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            status?: Presence;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PresenceRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PresenceRequest;
    }
    export class ChatPresenceRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            status?: ChatPresence;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get status(): ChatPresence;
        set status(value: ChatPresence);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            status?: ChatPresence;
        }): ChatPresenceRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            status?: ChatPresence;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ChatPresenceRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ChatPresenceRequest;
    }
    export class SubscribePresenceRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
        }): SubscribePresenceRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SubscribePresenceRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SubscribePresenceRequest;
    }
    export class MarkReadRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            sender?: string;
            messageId?: string;
            type?: ReceiptType;
            messageIds?: string[];
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get sender(): string;
        set sender(value: string);
        get messageId(): string;
        set messageId(value: string);
        get type(): ReceiptType;
        set type(value: ReceiptType);
        get messageIds(): string[];
        set messageIds(value: string[]);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            sender?: string;
            messageId?: string;
            type?: ReceiptType;
            messageIds?: string[];
        }): MarkReadRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            sender?: string;
            messageId?: string;
            type?: ReceiptType;
            messageIds?: string[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MarkReadRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MarkReadRequest;
    }
    export class CheckPhonesRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            phones?: string[];
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get phones(): string[];
        set phones(value: string[]);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            phones?: string[];
        }): CheckPhonesRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            phones?: string[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CheckPhonesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CheckPhonesRequest;
    }
    export class ChatUnreadRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            read?: boolean;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get read(): boolean;
        set read(value: boolean);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            read?: boolean;
        }): ChatUnreadRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            read?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ChatUnreadRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ChatUnreadRequest;
    }
    export class PhoneInfo extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            phone?: string;
            jid?: string;
            registered?: boolean;
        });
        get phone(): string;
        set phone(value: string);
        get jid(): string;
        set jid(value: string);
        get registered(): boolean;
        set registered(value: boolean);
        static fromObject(data: {
            phone?: string;
            jid?: string;
            registered?: boolean;
        }): PhoneInfo;
        toObject(): {
            phone?: string;
            jid?: string;
            registered?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PhoneInfo;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PhoneInfo;
    }
    export class CheckPhonesResponse extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            infos?: PhoneInfo[];
        });
        get infos(): PhoneInfo[];
        set infos(value: PhoneInfo[]);
        static fromObject(data: {
            infos?: ReturnType<typeof PhoneInfo.prototype.toObject>[];
        }): CheckPhonesResponse;
        toObject(): {
            infos?: ReturnType<typeof PhoneInfo.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CheckPhonesResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CheckPhonesResponse;
    }
    export class RevokeMessageRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            sender?: string;
            messageId?: string;
            participants?: string[];
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get sender(): string;
        set sender(value: string);
        get messageId(): string;
        set messageId(value: string);
        get participants(): string[];
        set participants(value: string[]);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            sender?: string;
            messageId?: string;
            participants?: string[];
        }): RevokeMessageRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            sender?: string;
            messageId?: string;
            participants?: string[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RevokeMessageRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RevokeMessageRequest;
    }
    export class EditMessageRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            messageId?: string;
            text?: string;
            linkPreview?: boolean;
            linkPreviewHighQuality?: boolean;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get messageId(): string;
        set messageId(value: string);
        get text(): string;
        set text(value: string);
        get linkPreview(): boolean;
        set linkPreview(value: boolean);
        get linkPreviewHighQuality(): boolean;
        set linkPreviewHighQuality(value: boolean);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            messageId?: string;
            text?: string;
            linkPreview?: boolean;
            linkPreviewHighQuality?: boolean;
        }): EditMessageRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            messageId?: string;
            text?: string;
            linkPreview?: boolean;
            linkPreviewHighQuality?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EditMessageRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): EditMessageRequest;
    }
    export class NewsletterListRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
        }): NewsletterListRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NewsletterListRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NewsletterListRequest;
    }
    export class Newsletter extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            id?: string;
            name?: string;
            description?: string;
            invite?: string;
            preview?: string;
            picture?: string;
            verified?: boolean;
            role?: string;
            subscriberCount?: number;
        });
        get id(): string;
        set id(value: string);
        get name(): string;
        set name(value: string);
        get description(): string;
        set description(value: string);
        get invite(): string;
        set invite(value: string);
        get preview(): string;
        set preview(value: string);
        get picture(): string;
        set picture(value: string);
        get verified(): boolean;
        set verified(value: boolean);
        get role(): string;
        set role(value: string);
        get subscriberCount(): number;
        set subscriberCount(value: number);
        static fromObject(data: {
            id?: string;
            name?: string;
            description?: string;
            invite?: string;
            preview?: string;
            picture?: string;
            verified?: boolean;
            role?: string;
            subscriberCount?: number;
        }): Newsletter;
        toObject(): {
            id?: string;
            name?: string;
            description?: string;
            invite?: string;
            preview?: string;
            picture?: string;
            verified?: boolean;
            role?: string;
            subscriberCount?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Newsletter;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Newsletter;
    }
    export class NewsletterList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            newsletters?: Newsletter[];
        });
        get newsletters(): Newsletter[];
        set newsletters(value: Newsletter[]);
        static fromObject(data: {
            newsletters?: ReturnType<typeof Newsletter.prototype.toObject>[];
        }): NewsletterList;
        toObject(): {
            newsletters?: ReturnType<typeof Newsletter.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NewsletterList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NewsletterList;
    }
    export class NewsletterInfoRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            id?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get id(): string;
        set id(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            id?: string;
        }): NewsletterInfoRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            id?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NewsletterInfoRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NewsletterInfoRequest;
    }
    export class GetNewsletterMessagesByInviteRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            invite?: string;
            limit?: number;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get invite(): string;
        set invite(value: string);
        get limit(): number;
        set limit(value: number);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            invite?: string;
            limit?: number;
        }): GetNewsletterMessagesByInviteRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            invite?: string;
            limit?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetNewsletterMessagesByInviteRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetNewsletterMessagesByInviteRequest;
    }
    export class SearchPage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            limit?: number;
            startCursor?: string;
        });
        get limit(): number;
        set limit(value: number);
        get startCursor(): string;
        set startCursor(value: string);
        static fromObject(data: {
            limit?: number;
            startCursor?: string;
        }): SearchPage;
        toObject(): {
            limit?: number;
            startCursor?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SearchPage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SearchPage;
    }
    export class SearchNewslettersByViewRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            page?: SearchPage;
            view?: string;
            categories?: string[];
            countries?: string[];
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get page(): SearchPage;
        set page(value: SearchPage);
        get has_page(): boolean;
        get view(): string;
        set view(value: string);
        get categories(): string[];
        set categories(value: string[]);
        get countries(): string[];
        set countries(value: string[]);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            page?: ReturnType<typeof SearchPage.prototype.toObject>;
            view?: string;
            categories?: string[];
            countries?: string[];
        }): SearchNewslettersByViewRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            page?: ReturnType<typeof SearchPage.prototype.toObject>;
            view?: string;
            categories?: string[];
            countries?: string[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SearchNewslettersByViewRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SearchNewslettersByViewRequest;
    }
    export class SearchNewslettersByTextRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            page?: SearchPage;
            text?: string;
            categories?: string[];
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get page(): SearchPage;
        set page(value: SearchPage);
        get has_page(): boolean;
        get text(): string;
        set text(value: string);
        get categories(): string[];
        set categories(value: string[]);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            page?: ReturnType<typeof SearchPage.prototype.toObject>;
            text?: string;
            categories?: string[];
        }): SearchNewslettersByTextRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            page?: ReturnType<typeof SearchPage.prototype.toObject>;
            text?: string;
            categories?: string[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SearchNewslettersByTextRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SearchNewslettersByTextRequest;
    }
    export class SearchPageResult extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            startCursor?: string;
            endCursor?: string;
            hasNextPage?: boolean;
            hasPreviousPage?: boolean;
        });
        get startCursor(): string;
        set startCursor(value: string);
        get endCursor(): string;
        set endCursor(value: string);
        get hasNextPage(): boolean;
        set hasNextPage(value: boolean);
        get hasPreviousPage(): boolean;
        set hasPreviousPage(value: boolean);
        static fromObject(data: {
            startCursor?: string;
            endCursor?: string;
            hasNextPage?: boolean;
            hasPreviousPage?: boolean;
        }): SearchPageResult;
        toObject(): {
            startCursor?: string;
            endCursor?: string;
            hasNextPage?: boolean;
            hasPreviousPage?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SearchPageResult;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SearchPageResult;
    }
    export class NewsletterSearchPageResult extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            page?: SearchPageResult;
            newsletters?: NewsletterList;
        });
        get page(): SearchPageResult;
        set page(value: SearchPageResult);
        get has_page(): boolean;
        get newsletters(): NewsletterList;
        set newsletters(value: NewsletterList);
        get has_newsletters(): boolean;
        static fromObject(data: {
            page?: ReturnType<typeof SearchPageResult.prototype.toObject>;
            newsletters?: ReturnType<typeof NewsletterList.prototype.toObject>;
        }): NewsletterSearchPageResult;
        toObject(): {
            page?: ReturnType<typeof SearchPageResult.prototype.toObject>;
            newsletters?: ReturnType<typeof NewsletterList.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NewsletterSearchPageResult;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NewsletterSearchPageResult;
    }
    export class CreateNewsletterRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            name?: string;
            description?: string;
            picture?: Uint8Array;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get name(): string;
        set name(value: string);
        get description(): string;
        set description(value: string);
        get picture(): Uint8Array;
        set picture(value: Uint8Array);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            name?: string;
            description?: string;
            picture?: Uint8Array;
        }): CreateNewsletterRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            name?: string;
            description?: string;
            picture?: Uint8Array;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CreateNewsletterRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CreateNewsletterRequest;
    }
    export class NewsletterToggleMuteRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            mute?: boolean;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get mute(): boolean;
        set mute(value: boolean);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            mute?: boolean;
        }): NewsletterToggleMuteRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            mute?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NewsletterToggleMuteRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NewsletterToggleMuteRequest;
    }
    export class NewsletterToggleFollowRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            follow?: boolean;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get follow(): boolean;
        set follow(value: boolean);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            follow?: boolean;
        }): NewsletterToggleFollowRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            follow?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): NewsletterToggleFollowRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): NewsletterToggleFollowRequest;
    }
    export class DownloadMediaRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            message?: string;
            jid?: string;
            messageId?: string;
            contentPath?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get message(): string;
        set message(value: string);
        get jid(): string;
        set jid(value: string);
        get messageId(): string;
        set messageId(value: string);
        get contentPath(): string;
        set contentPath(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            message?: string;
            jid?: string;
            messageId?: string;
            contentPath?: string;
        }): DownloadMediaRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            message?: string;
            jid?: string;
            messageId?: string;
            contentPath?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DownloadMediaRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DownloadMediaRequest;
    }
    export class DownloadMediaResponse extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            content?: Uint8Array;
            contentPath?: string;
        });
        get content(): Uint8Array;
        set content(value: Uint8Array);
        get contentPath(): string;
        set contentPath(value: string);
        static fromObject(data: {
            content?: Uint8Array;
            contentPath?: string;
        }): DownloadMediaResponse;
        toObject(): {
            content?: Uint8Array;
            contentPath?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DownloadMediaResponse;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DownloadMediaResponse;
    }
    export class EntityByIdRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            id?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get id(): string;
        set id(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            id?: string;
        }): EntityByIdRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            id?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): EntityByIdRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): EntityByIdRequest;
    }
    export class Json extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            data?: string;
        });
        get data(): string;
        set data(value: string);
        static fromObject(data: {
            data?: string;
        }): Json;
        toObject(): {
            data?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Json;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Json;
    }
    export class JsonList extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            elements?: Json[];
        });
        get elements(): Json[];
        set elements(value: Json[]);
        static fromObject(data: {
            elements?: ReturnType<typeof Json.prototype.toObject>[];
        }): JsonList;
        toObject(): {
            elements?: ReturnType<typeof Json.prototype.toObject>[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): JsonList;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): JsonList;
    }
    export class Pagination extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            limit?: number;
            offset?: number;
        });
        get limit(): number;
        set limit(value: number);
        get offset(): number;
        set offset(value: number);
        static fromObject(data: {
            limit?: number;
            offset?: number;
        }): Pagination;
        toObject(): {
            limit?: number;
            offset?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Pagination;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Pagination;
    }
    export class SortBy extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            field?: string;
            order?: SortBy.Order;
        });
        get field(): string;
        set field(value: string);
        get order(): SortBy.Order;
        set order(value: SortBy.Order);
        static fromObject(data: {
            field?: string;
            order?: SortBy.Order;
        }): SortBy;
        toObject(): {
            field?: string;
            order?: SortBy.Order;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): SortBy;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): SortBy;
    }
    export namespace SortBy {
        enum Order {
            ASC = 0,
            DESC = 1
        }
    }
    export class MessageFilters extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            jid?: OptionalString;
            timestampGte?: OptionalUInt64;
            timestampLte?: OptionalUInt64;
            fromMe?: OptionalBool;
            status?: OptionalUInt32;
        });
        get jid(): OptionalString;
        set jid(value: OptionalString);
        get has_jid(): boolean;
        get timestampGte(): OptionalUInt64;
        set timestampGte(value: OptionalUInt64);
        get has_timestampGte(): boolean;
        get timestampLte(): OptionalUInt64;
        set timestampLte(value: OptionalUInt64);
        get has_timestampLte(): boolean;
        get fromMe(): OptionalBool;
        set fromMe(value: OptionalBool);
        get has_fromMe(): boolean;
        get status(): OptionalUInt32;
        set status(value: OptionalUInt32);
        get has_status(): boolean;
        static fromObject(data: {
            jid?: ReturnType<typeof OptionalString.prototype.toObject>;
            timestampGte?: ReturnType<typeof OptionalUInt64.prototype.toObject>;
            timestampLte?: ReturnType<typeof OptionalUInt64.prototype.toObject>;
            fromMe?: ReturnType<typeof OptionalBool.prototype.toObject>;
            status?: ReturnType<typeof OptionalUInt32.prototype.toObject>;
        }): MessageFilters;
        toObject(): {
            jid?: ReturnType<typeof OptionalString.prototype.toObject>;
            timestampGte?: ReturnType<typeof OptionalUInt64.prototype.toObject>;
            timestampLte?: ReturnType<typeof OptionalUInt64.prototype.toObject>;
            fromMe?: ReturnType<typeof OptionalBool.prototype.toObject>;
            status?: ReturnType<typeof OptionalUInt32.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): MessageFilters;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): MessageFilters;
    }
    export class GetMessagesRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            filters?: MessageFilters;
            pagination?: Pagination;
            sortBy?: SortBy;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get filters(): MessageFilters;
        set filters(value: MessageFilters);
        get has_filters(): boolean;
        get pagination(): Pagination;
        set pagination(value: Pagination);
        get has_pagination(): boolean;
        get sortBy(): SortBy;
        set sortBy(value: SortBy);
        get has_sortBy(): boolean;
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            filters?: ReturnType<typeof MessageFilters.prototype.toObject>;
            pagination?: ReturnType<typeof Pagination.prototype.toObject>;
            sortBy?: ReturnType<typeof SortBy.prototype.toObject>;
        }): GetMessagesRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            filters?: ReturnType<typeof MessageFilters.prototype.toObject>;
            pagination?: ReturnType<typeof Pagination.prototype.toObject>;
            sortBy?: ReturnType<typeof SortBy.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetMessagesRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetMessagesRequest;
    }
    export class UpdateContactRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            firstName?: string;
            lastName?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get firstName(): string;
        set firstName(value: string);
        get lastName(): string;
        set lastName(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            firstName?: string;
            lastName?: string;
        }): UpdateContactRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            firstName?: string;
            lastName?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UpdateContactRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): UpdateContactRequest;
    }
    export class GetContactsRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            sortBy?: SortBy;
            pagination?: Pagination;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get sortBy(): SortBy;
        set sortBy(value: SortBy);
        get has_sortBy(): boolean;
        get pagination(): Pagination;
        set pagination(value: Pagination);
        get has_pagination(): boolean;
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            sortBy?: ReturnType<typeof SortBy.prototype.toObject>;
            pagination?: ReturnType<typeof Pagination.prototype.toObject>;
        }): GetContactsRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            sortBy?: ReturnType<typeof SortBy.prototype.toObject>;
            pagination?: ReturnType<typeof Pagination.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetContactsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetContactsRequest;
    }
    export class ChatFilter extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            jids?: string[];
        });
        get jids(): string[];
        set jids(value: string[]);
        static fromObject(data: {
            jids?: string[];
        }): ChatFilter;
        toObject(): {
            jids?: string[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ChatFilter;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ChatFilter;
    }
    export class GetChatsRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            sortBy?: SortBy;
            pagination?: Pagination;
            filter?: ChatFilter;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get sortBy(): SortBy;
        set sortBy(value: SortBy);
        get has_sortBy(): boolean;
        get pagination(): Pagination;
        set pagination(value: Pagination);
        get has_pagination(): boolean;
        get filter(): ChatFilter;
        set filter(value: ChatFilter);
        get has_filter(): boolean;
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            sortBy?: ReturnType<typeof SortBy.prototype.toObject>;
            pagination?: ReturnType<typeof Pagination.prototype.toObject>;
            filter?: ReturnType<typeof ChatFilter.prototype.toObject>;
        }): GetChatsRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            sortBy?: ReturnType<typeof SortBy.prototype.toObject>;
            pagination?: ReturnType<typeof Pagination.prototype.toObject>;
            filter?: ReturnType<typeof ChatFilter.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetChatsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetChatsRequest;
    }
    export class GetLabelsRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
        }): GetLabelsRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetLabelsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetLabelsRequest;
    }
    export class Label extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            id?: string;
            name?: string;
            color?: number;
        });
        get id(): string;
        set id(value: string);
        get name(): string;
        set name(value: string);
        get color(): number;
        set color(value: number);
        static fromObject(data: {
            id?: string;
            name?: string;
            color?: number;
        }): Label;
        toObject(): {
            id?: string;
            name?: string;
            color?: number;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Label;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): Label;
    }
    export class UpsertLabelRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            label?: Label;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get label(): Label;
        set label(value: Label);
        get has_label(): boolean;
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            label?: ReturnType<typeof Label.prototype.toObject>;
        }): UpsertLabelRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            label?: ReturnType<typeof Label.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): UpsertLabelRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): UpsertLabelRequest;
    }
    export class DeleteLabelRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            label?: Label;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get label(): Label;
        set label(value: Label);
        get has_label(): boolean;
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            label?: ReturnType<typeof Label.prototype.toObject>;
        }): DeleteLabelRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            label?: ReturnType<typeof Label.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): DeleteLabelRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): DeleteLabelRequest;
    }
    export class ChatLabelRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            chatId?: string;
            labelId?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get chatId(): string;
        set chatId(value: string);
        get labelId(): string;
        set labelId(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            chatId?: string;
            labelId?: string;
        }): ChatLabelRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            chatId?: string;
            labelId?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): ChatLabelRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): ChatLabelRequest;
    }
    export class CancelEventMessageRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            jid?: string;
            messageId?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get jid(): string;
        set jid(value: string);
        get messageId(): string;
        set messageId(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            messageId?: string;
        }): CancelEventMessageRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            jid?: string;
            messageId?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): CancelEventMessageRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): CancelEventMessageRequest;
    }
    export class GetLidsRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
        }): GetLidsRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): GetLidsRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): GetLidsRequest;
    }
    export class RejectCallRequest extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            session?: Session;
            from?: string;
            id?: string;
        });
        get session(): Session;
        set session(value: Session);
        get has_session(): boolean;
        get from(): string;
        set from(value: string);
        get id(): string;
        set id(value: string);
        static fromObject(data: {
            session?: ReturnType<typeof Session.prototype.toObject>;
            from?: string;
            id?: string;
        }): RejectCallRequest;
        toObject(): {
            session?: ReturnType<typeof Session.prototype.toObject>;
            from?: string;
            id?: string;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): RejectCallRequest;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): RejectCallRequest;
    }
    export class PollMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | {
            name?: string;
            options?: string[];
            multipleAnswers?: boolean;
        });
        get name(): string;
        set name(value: string);
        get options(): string[];
        set options(value: string[]);
        get multipleAnswers(): boolean;
        set multipleAnswers(value: boolean);
        static fromObject(data: {
            name?: string;
            options?: string[];
            multipleAnswers?: boolean;
        }): PollMessage;
        toObject(): {
            name?: string;
            options?: string[];
            multipleAnswers?: boolean;
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PollMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PollMessage;
    }
    export class PollVoteMessage extends pb_1.Message {
        #private;
        constructor(data?: any[] | ({
            pollMessageId?: string;
            options?: string[];
        } & (({
            pollServerId?: number;
        }))));
        get pollMessageId(): string;
        set pollMessageId(value: string);
        get pollServerId(): number;
        set pollServerId(value: number);
        get has_pollServerId(): boolean;
        get options(): string[];
        set options(value: string[]);
        get _pollServerId(): "pollServerId" | "none";
        static fromObject(data: {
            pollMessageId?: string;
            pollServerId?: number;
            options?: string[];
        }): PollVoteMessage;
        toObject(): {
            pollMessageId?: string;
            pollServerId?: number;
            options?: string[];
        };
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PollVoteMessage;
        serializeBinary(): Uint8Array;
        static deserializeBinary(bytes: Uint8Array): PollVoteMessage;
    }
    interface GrpcUnaryServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, metadata: grpc_1.Metadata, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, options: grpc_1.CallOptions, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
        (message: P, callback: grpc_1.requestCallback<R>): grpc_1.ClientUnaryCall;
    }
    interface GrpcStreamServiceInterface<P, R> {
        (message: P, metadata: grpc_1.Metadata, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
        (message: P, options?: grpc_1.CallOptions): grpc_1.ClientReadableStream<R>;
    }
    export abstract class UnimplementedEventStreamService {
        static definition: {
            StreamEvents: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: Session) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => Session;
                responseSerialize: (message: EventJson) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => EventJson;
            };
        };
        [method: string]: grpc_1.UntypedHandleCall;
        abstract StreamEvents(call: grpc_1.ServerWritableStream<Session, EventJson>): void;
    }
    const EventStreamClient_base: grpc_1.ServiceClientConstructor;
    export class EventStreamClient extends EventStreamClient_base {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>);
        StreamEvents: GrpcStreamServiceInterface<Session, EventJson>;
    }
    export abstract class UnimplementedMessageServiceService {
        static definition: {
            StartSession: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: StartSessionRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => StartSessionRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            StopSession: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: Session) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => Session;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            GetSessionState: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: Session) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => Session;
                responseSerialize: (message: SessionStateResponse) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => SessionStateResponse;
            };
            RequestCode: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: PairCodeRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => PairCodeRequest;
                responseSerialize: (message: PairCodeResponse) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => PairCodeResponse;
            };
            Logout: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: Session) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => Session;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            SetProfileName: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: ProfileNameRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => ProfileNameRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            SetProfileStatus: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: ProfileStatusRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => ProfileStatusRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            SetProfilePicture: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: SetProfilePictureRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => SetProfilePictureRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            GetAllLids: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: GetLidsRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => GetLidsRequest;
                responseSerialize: (message: JsonList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => JsonList;
            };
            GetLidsCount: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: Session) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => Session;
                responseSerialize: (message: OptionalUInt64) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => OptionalUInt64;
            };
            FindPNByLid: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EntityByIdRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EntityByIdRequest;
                responseSerialize: (message: OptionalString) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => OptionalString;
            };
            FindLIDByPhoneNumber: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EntityByIdRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EntityByIdRequest;
                responseSerialize: (message: OptionalString) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => OptionalString;
            };
            FetchGroups: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: Session) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => Session;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            GetGroups: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: Session) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => Session;
                responseSerialize: (message: JsonList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => JsonList;
            };
            GetGroupInfo: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: JidRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => JidRequest;
                responseSerialize: (message: Json) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Json;
            };
            CreateGroup: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: CreateGroupRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => CreateGroupRequest;
                responseSerialize: (message: Json) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Json;
            };
            LeaveGroup: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: JidRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => JidRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            GetGroupInviteLink: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: JidRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => JidRequest;
                responseSerialize: (message: OptionalString) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => OptionalString;
            };
            RevokeGroupInviteLink: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: JidRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => JidRequest;
                responseSerialize: (message: OptionalString) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => OptionalString;
            };
            GetGroupInfoFromLink: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: GroupCodeRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => GroupCodeRequest;
                responseSerialize: (message: Json) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Json;
            };
            JoinGroupWithLink: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: GroupCodeRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => GroupCodeRequest;
                responseSerialize: (message: Json) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Json;
            };
            SetGroupName: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: JidStringRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => JidStringRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            SetGroupDescription: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: JidStringRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => JidStringRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            SetGroupPicture: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: SetPictureRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => SetPictureRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            SetGroupLocked: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: JidBoolRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => JidBoolRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            SetGroupAnnounce: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: JidBoolRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => JidBoolRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            UpdateGroupParticipants: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: UpdateParticipantsRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => UpdateParticipantsRequest;
                responseSerialize: (message: JsonList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => JsonList;
            };
            GetProfilePicture: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: ProfilePictureRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => ProfilePictureRequest;
                responseSerialize: (message: ProfilePictureResponse) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => ProfilePictureResponse;
            };
            SendPresence: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: PresenceRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => PresenceRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            SendChatPresence: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: ChatPresenceRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => ChatPresenceRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            SubscribePresence: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: SubscribePresenceRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => SubscribePresenceRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            CheckPhones: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: CheckPhonesRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => CheckPhonesRequest;
                responseSerialize: (message: CheckPhonesResponse) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => CheckPhonesResponse;
            };
            MarkChatUnread: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: ChatUnreadRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => ChatUnreadRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            GenerateNewMessageID: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: Session) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => Session;
                responseSerialize: (message: NewMessageIDResponse) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NewMessageIDResponse;
            };
            SendMessage: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: MessageRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => MessageRequest;
                responseSerialize: (message: MessageResponse) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => MessageResponse;
            };
            SendReaction: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: MessageReaction) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => MessageReaction;
                responseSerialize: (message: MessageResponse) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => MessageResponse;
            };
            MarkRead: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: MarkReadRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => MarkReadRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            EditMessage: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EditMessageRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EditMessageRequest;
                responseSerialize: (message: MessageResponse) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => MessageResponse;
            };
            RevokeMessage: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: RevokeMessageRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => RevokeMessageRequest;
                responseSerialize: (message: MessageResponse) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => MessageResponse;
            };
            SendButtonReply: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: ButtonReplyRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => ButtonReplyRequest;
                responseSerialize: (message: MessageResponse) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => MessageResponse;
            };
            GetSubscribedNewsletters: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NewsletterListRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NewsletterListRequest;
                responseSerialize: (message: NewsletterList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NewsletterList;
            };
            GetNewsletterInfo: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NewsletterInfoRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NewsletterInfoRequest;
                responseSerialize: (message: Newsletter) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Newsletter;
            };
            GetNewsletterMessagesByInvite: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: GetNewsletterMessagesByInviteRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => GetNewsletterMessagesByInviteRequest;
                responseSerialize: (message: Json) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Json;
            };
            SearchNewslettersByView: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: SearchNewslettersByViewRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => SearchNewslettersByViewRequest;
                responseSerialize: (message: NewsletterSearchPageResult) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NewsletterSearchPageResult;
            };
            SearchNewslettersByText: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: SearchNewslettersByTextRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => SearchNewslettersByTextRequest;
                responseSerialize: (message: NewsletterSearchPageResult) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => NewsletterSearchPageResult;
            };
            CreateNewsletter: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: CreateNewsletterRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => CreateNewsletterRequest;
                responseSerialize: (message: Newsletter) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Newsletter;
            };
            NewsletterToggleMute: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NewsletterToggleMuteRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NewsletterToggleMuteRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            NewsletterToggleFollow: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: NewsletterToggleFollowRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => NewsletterToggleFollowRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            GetLabels: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: GetLabelsRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => GetLabelsRequest;
                responseSerialize: (message: JsonList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => JsonList;
            };
            UpsertLabel: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: UpsertLabelRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => UpsertLabelRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            DeleteLabel: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: DeleteLabelRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => DeleteLabelRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            AddChatLabel: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: ChatLabelRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => ChatLabelRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            RemoveChatLabel: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: ChatLabelRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => ChatLabelRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            GetLabelsByJid: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EntityByIdRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EntityByIdRequest;
                responseSerialize: (message: JsonList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => JsonList;
            };
            GetChatsByLabelId: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EntityByIdRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EntityByIdRequest;
                responseSerialize: (message: JsonList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => JsonList;
            };
            UpdateContact: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: UpdateContactRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => UpdateContactRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            GetContacts: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: GetContactsRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => GetContactsRequest;
                responseSerialize: (message: JsonList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => JsonList;
            };
            GetContactById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EntityByIdRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EntityByIdRequest;
                responseSerialize: (message: Json) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Json;
            };
            CancelEventMessage: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: CancelEventMessageRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => CancelEventMessageRequest;
                responseSerialize: (message: MessageResponse) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => MessageResponse;
            };
            DownloadMedia: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: DownloadMediaRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => DownloadMediaRequest;
                responseSerialize: (message: DownloadMediaResponse) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => DownloadMediaResponse;
            };
            RejectCall: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: RejectCallRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => RejectCallRequest;
                responseSerialize: (message: Empty) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Empty;
            };
            GetMessageById: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: EntityByIdRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => EntityByIdRequest;
                responseSerialize: (message: Json) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => Json;
            };
            GetMessages: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: GetMessagesRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => GetMessagesRequest;
                responseSerialize: (message: JsonList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => JsonList;
            };
            GetChats: {
                path: string;
                requestStream: boolean;
                responseStream: boolean;
                requestSerialize: (message: GetChatsRequest) => Buffer<ArrayBuffer>;
                requestDeserialize: (bytes: Buffer) => GetChatsRequest;
                responseSerialize: (message: JsonList) => Buffer<ArrayBuffer>;
                responseDeserialize: (bytes: Buffer) => JsonList;
            };
        };
        [method: string]: grpc_1.UntypedHandleCall;
        abstract StartSession(call: grpc_1.ServerUnaryCall<StartSessionRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract StopSession(call: grpc_1.ServerUnaryCall<Session, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract GetSessionState(call: grpc_1.ServerUnaryCall<Session, SessionStateResponse>, callback: grpc_1.sendUnaryData<SessionStateResponse>): void;
        abstract RequestCode(call: grpc_1.ServerUnaryCall<PairCodeRequest, PairCodeResponse>, callback: grpc_1.sendUnaryData<PairCodeResponse>): void;
        abstract Logout(call: grpc_1.ServerUnaryCall<Session, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract SetProfileName(call: grpc_1.ServerUnaryCall<ProfileNameRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract SetProfileStatus(call: grpc_1.ServerUnaryCall<ProfileStatusRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract SetProfilePicture(call: grpc_1.ServerUnaryCall<SetProfilePictureRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract GetAllLids(call: grpc_1.ServerUnaryCall<GetLidsRequest, JsonList>, callback: grpc_1.sendUnaryData<JsonList>): void;
        abstract GetLidsCount(call: grpc_1.ServerUnaryCall<Session, OptionalUInt64>, callback: grpc_1.sendUnaryData<OptionalUInt64>): void;
        abstract FindPNByLid(call: grpc_1.ServerUnaryCall<EntityByIdRequest, OptionalString>, callback: grpc_1.sendUnaryData<OptionalString>): void;
        abstract FindLIDByPhoneNumber(call: grpc_1.ServerUnaryCall<EntityByIdRequest, OptionalString>, callback: grpc_1.sendUnaryData<OptionalString>): void;
        abstract FetchGroups(call: grpc_1.ServerUnaryCall<Session, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract GetGroups(call: grpc_1.ServerUnaryCall<Session, JsonList>, callback: grpc_1.sendUnaryData<JsonList>): void;
        abstract GetGroupInfo(call: grpc_1.ServerUnaryCall<JidRequest, Json>, callback: grpc_1.sendUnaryData<Json>): void;
        abstract CreateGroup(call: grpc_1.ServerUnaryCall<CreateGroupRequest, Json>, callback: grpc_1.sendUnaryData<Json>): void;
        abstract LeaveGroup(call: grpc_1.ServerUnaryCall<JidRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract GetGroupInviteLink(call: grpc_1.ServerUnaryCall<JidRequest, OptionalString>, callback: grpc_1.sendUnaryData<OptionalString>): void;
        abstract RevokeGroupInviteLink(call: grpc_1.ServerUnaryCall<JidRequest, OptionalString>, callback: grpc_1.sendUnaryData<OptionalString>): void;
        abstract GetGroupInfoFromLink(call: grpc_1.ServerUnaryCall<GroupCodeRequest, Json>, callback: grpc_1.sendUnaryData<Json>): void;
        abstract JoinGroupWithLink(call: grpc_1.ServerUnaryCall<GroupCodeRequest, Json>, callback: grpc_1.sendUnaryData<Json>): void;
        abstract SetGroupName(call: grpc_1.ServerUnaryCall<JidStringRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract SetGroupDescription(call: grpc_1.ServerUnaryCall<JidStringRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract SetGroupPicture(call: grpc_1.ServerUnaryCall<SetPictureRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract SetGroupLocked(call: grpc_1.ServerUnaryCall<JidBoolRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract SetGroupAnnounce(call: grpc_1.ServerUnaryCall<JidBoolRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract UpdateGroupParticipants(call: grpc_1.ServerUnaryCall<UpdateParticipantsRequest, JsonList>, callback: grpc_1.sendUnaryData<JsonList>): void;
        abstract GetProfilePicture(call: grpc_1.ServerUnaryCall<ProfilePictureRequest, ProfilePictureResponse>, callback: grpc_1.sendUnaryData<ProfilePictureResponse>): void;
        abstract SendPresence(call: grpc_1.ServerUnaryCall<PresenceRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract SendChatPresence(call: grpc_1.ServerUnaryCall<ChatPresenceRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract SubscribePresence(call: grpc_1.ServerUnaryCall<SubscribePresenceRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract CheckPhones(call: grpc_1.ServerUnaryCall<CheckPhonesRequest, CheckPhonesResponse>, callback: grpc_1.sendUnaryData<CheckPhonesResponse>): void;
        abstract MarkChatUnread(call: grpc_1.ServerUnaryCall<ChatUnreadRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract GenerateNewMessageID(call: grpc_1.ServerUnaryCall<Session, NewMessageIDResponse>, callback: grpc_1.sendUnaryData<NewMessageIDResponse>): void;
        abstract SendMessage(call: grpc_1.ServerUnaryCall<MessageRequest, MessageResponse>, callback: grpc_1.sendUnaryData<MessageResponse>): void;
        abstract SendReaction(call: grpc_1.ServerUnaryCall<MessageReaction, MessageResponse>, callback: grpc_1.sendUnaryData<MessageResponse>): void;
        abstract MarkRead(call: grpc_1.ServerUnaryCall<MarkReadRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract EditMessage(call: grpc_1.ServerUnaryCall<EditMessageRequest, MessageResponse>, callback: grpc_1.sendUnaryData<MessageResponse>): void;
        abstract RevokeMessage(call: grpc_1.ServerUnaryCall<RevokeMessageRequest, MessageResponse>, callback: grpc_1.sendUnaryData<MessageResponse>): void;
        abstract SendButtonReply(call: grpc_1.ServerUnaryCall<ButtonReplyRequest, MessageResponse>, callback: grpc_1.sendUnaryData<MessageResponse>): void;
        abstract GetSubscribedNewsletters(call: grpc_1.ServerUnaryCall<NewsletterListRequest, NewsletterList>, callback: grpc_1.sendUnaryData<NewsletterList>): void;
        abstract GetNewsletterInfo(call: grpc_1.ServerUnaryCall<NewsletterInfoRequest, Newsletter>, callback: grpc_1.sendUnaryData<Newsletter>): void;
        abstract GetNewsletterMessagesByInvite(call: grpc_1.ServerUnaryCall<GetNewsletterMessagesByInviteRequest, Json>, callback: grpc_1.sendUnaryData<Json>): void;
        abstract SearchNewslettersByView(call: grpc_1.ServerUnaryCall<SearchNewslettersByViewRequest, NewsletterSearchPageResult>, callback: grpc_1.sendUnaryData<NewsletterSearchPageResult>): void;
        abstract SearchNewslettersByText(call: grpc_1.ServerUnaryCall<SearchNewslettersByTextRequest, NewsletterSearchPageResult>, callback: grpc_1.sendUnaryData<NewsletterSearchPageResult>): void;
        abstract CreateNewsletter(call: grpc_1.ServerUnaryCall<CreateNewsletterRequest, Newsletter>, callback: grpc_1.sendUnaryData<Newsletter>): void;
        abstract NewsletterToggleMute(call: grpc_1.ServerUnaryCall<NewsletterToggleMuteRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract NewsletterToggleFollow(call: grpc_1.ServerUnaryCall<NewsletterToggleFollowRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract GetLabels(call: grpc_1.ServerUnaryCall<GetLabelsRequest, JsonList>, callback: grpc_1.sendUnaryData<JsonList>): void;
        abstract UpsertLabel(call: grpc_1.ServerUnaryCall<UpsertLabelRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract DeleteLabel(call: grpc_1.ServerUnaryCall<DeleteLabelRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract AddChatLabel(call: grpc_1.ServerUnaryCall<ChatLabelRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract RemoveChatLabel(call: grpc_1.ServerUnaryCall<ChatLabelRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract GetLabelsByJid(call: grpc_1.ServerUnaryCall<EntityByIdRequest, JsonList>, callback: grpc_1.sendUnaryData<JsonList>): void;
        abstract GetChatsByLabelId(call: grpc_1.ServerUnaryCall<EntityByIdRequest, JsonList>, callback: grpc_1.sendUnaryData<JsonList>): void;
        abstract UpdateContact(call: grpc_1.ServerUnaryCall<UpdateContactRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract GetContacts(call: grpc_1.ServerUnaryCall<GetContactsRequest, JsonList>, callback: grpc_1.sendUnaryData<JsonList>): void;
        abstract GetContactById(call: grpc_1.ServerUnaryCall<EntityByIdRequest, Json>, callback: grpc_1.sendUnaryData<Json>): void;
        abstract CancelEventMessage(call: grpc_1.ServerUnaryCall<CancelEventMessageRequest, MessageResponse>, callback: grpc_1.sendUnaryData<MessageResponse>): void;
        abstract DownloadMedia(call: grpc_1.ServerUnaryCall<DownloadMediaRequest, DownloadMediaResponse>, callback: grpc_1.sendUnaryData<DownloadMediaResponse>): void;
        abstract RejectCall(call: grpc_1.ServerUnaryCall<RejectCallRequest, Empty>, callback: grpc_1.sendUnaryData<Empty>): void;
        abstract GetMessageById(call: grpc_1.ServerUnaryCall<EntityByIdRequest, Json>, callback: grpc_1.sendUnaryData<Json>): void;
        abstract GetMessages(call: grpc_1.ServerUnaryCall<GetMessagesRequest, JsonList>, callback: grpc_1.sendUnaryData<JsonList>): void;
        abstract GetChats(call: grpc_1.ServerUnaryCall<GetChatsRequest, JsonList>, callback: grpc_1.sendUnaryData<JsonList>): void;
    }
    const MessageServiceClient_base: grpc_1.ServiceClientConstructor;
    export class MessageServiceClient extends MessageServiceClient_base {
        constructor(address: string, credentials: grpc_1.ChannelCredentials, options?: Partial<grpc_1.ChannelOptions>);
        StartSession: GrpcUnaryServiceInterface<StartSessionRequest, Empty>;
        StopSession: GrpcUnaryServiceInterface<Session, Empty>;
        GetSessionState: GrpcUnaryServiceInterface<Session, SessionStateResponse>;
        RequestCode: GrpcUnaryServiceInterface<PairCodeRequest, PairCodeResponse>;
        Logout: GrpcUnaryServiceInterface<Session, Empty>;
        SetProfileName: GrpcUnaryServiceInterface<ProfileNameRequest, Empty>;
        SetProfileStatus: GrpcUnaryServiceInterface<ProfileStatusRequest, Empty>;
        SetProfilePicture: GrpcUnaryServiceInterface<SetProfilePictureRequest, Empty>;
        GetAllLids: GrpcUnaryServiceInterface<GetLidsRequest, JsonList>;
        GetLidsCount: GrpcUnaryServiceInterface<Session, OptionalUInt64>;
        FindPNByLid: GrpcUnaryServiceInterface<EntityByIdRequest, OptionalString>;
        FindLIDByPhoneNumber: GrpcUnaryServiceInterface<EntityByIdRequest, OptionalString>;
        FetchGroups: GrpcUnaryServiceInterface<Session, Empty>;
        GetGroups: GrpcUnaryServiceInterface<Session, JsonList>;
        GetGroupInfo: GrpcUnaryServiceInterface<JidRequest, Json>;
        CreateGroup: GrpcUnaryServiceInterface<CreateGroupRequest, Json>;
        LeaveGroup: GrpcUnaryServiceInterface<JidRequest, Empty>;
        GetGroupInviteLink: GrpcUnaryServiceInterface<JidRequest, OptionalString>;
        RevokeGroupInviteLink: GrpcUnaryServiceInterface<JidRequest, OptionalString>;
        GetGroupInfoFromLink: GrpcUnaryServiceInterface<GroupCodeRequest, Json>;
        JoinGroupWithLink: GrpcUnaryServiceInterface<GroupCodeRequest, Json>;
        SetGroupName: GrpcUnaryServiceInterface<JidStringRequest, Empty>;
        SetGroupDescription: GrpcUnaryServiceInterface<JidStringRequest, Empty>;
        SetGroupPicture: GrpcUnaryServiceInterface<SetPictureRequest, Empty>;
        SetGroupLocked: GrpcUnaryServiceInterface<JidBoolRequest, Empty>;
        SetGroupAnnounce: GrpcUnaryServiceInterface<JidBoolRequest, Empty>;
        UpdateGroupParticipants: GrpcUnaryServiceInterface<UpdateParticipantsRequest, JsonList>;
        GetProfilePicture: GrpcUnaryServiceInterface<ProfilePictureRequest, ProfilePictureResponse>;
        SendPresence: GrpcUnaryServiceInterface<PresenceRequest, Empty>;
        SendChatPresence: GrpcUnaryServiceInterface<ChatPresenceRequest, Empty>;
        SubscribePresence: GrpcUnaryServiceInterface<SubscribePresenceRequest, Empty>;
        CheckPhones: GrpcUnaryServiceInterface<CheckPhonesRequest, CheckPhonesResponse>;
        MarkChatUnread: GrpcUnaryServiceInterface<ChatUnreadRequest, Empty>;
        GenerateNewMessageID: GrpcUnaryServiceInterface<Session, NewMessageIDResponse>;
        SendMessage: GrpcUnaryServiceInterface<MessageRequest, MessageResponse>;
        SendReaction: GrpcUnaryServiceInterface<MessageReaction, MessageResponse>;
        MarkRead: GrpcUnaryServiceInterface<MarkReadRequest, Empty>;
        EditMessage: GrpcUnaryServiceInterface<EditMessageRequest, MessageResponse>;
        RevokeMessage: GrpcUnaryServiceInterface<RevokeMessageRequest, MessageResponse>;
        SendButtonReply: GrpcUnaryServiceInterface<ButtonReplyRequest, MessageResponse>;
        GetSubscribedNewsletters: GrpcUnaryServiceInterface<NewsletterListRequest, NewsletterList>;
        GetNewsletterInfo: GrpcUnaryServiceInterface<NewsletterInfoRequest, Newsletter>;
        GetNewsletterMessagesByInvite: GrpcUnaryServiceInterface<GetNewsletterMessagesByInviteRequest, Json>;
        SearchNewslettersByView: GrpcUnaryServiceInterface<SearchNewslettersByViewRequest, NewsletterSearchPageResult>;
        SearchNewslettersByText: GrpcUnaryServiceInterface<SearchNewslettersByTextRequest, NewsletterSearchPageResult>;
        CreateNewsletter: GrpcUnaryServiceInterface<CreateNewsletterRequest, Newsletter>;
        NewsletterToggleMute: GrpcUnaryServiceInterface<NewsletterToggleMuteRequest, Empty>;
        NewsletterToggleFollow: GrpcUnaryServiceInterface<NewsletterToggleFollowRequest, Empty>;
        GetLabels: GrpcUnaryServiceInterface<GetLabelsRequest, JsonList>;
        UpsertLabel: GrpcUnaryServiceInterface<UpsertLabelRequest, Empty>;
        DeleteLabel: GrpcUnaryServiceInterface<DeleteLabelRequest, Empty>;
        AddChatLabel: GrpcUnaryServiceInterface<ChatLabelRequest, Empty>;
        RemoveChatLabel: GrpcUnaryServiceInterface<ChatLabelRequest, Empty>;
        GetLabelsByJid: GrpcUnaryServiceInterface<EntityByIdRequest, JsonList>;
        GetChatsByLabelId: GrpcUnaryServiceInterface<EntityByIdRequest, JsonList>;
        UpdateContact: GrpcUnaryServiceInterface<UpdateContactRequest, Empty>;
        GetContacts: GrpcUnaryServiceInterface<GetContactsRequest, JsonList>;
        GetContactById: GrpcUnaryServiceInterface<EntityByIdRequest, Json>;
        CancelEventMessage: GrpcUnaryServiceInterface<CancelEventMessageRequest, MessageResponse>;
        DownloadMedia: GrpcUnaryServiceInterface<DownloadMediaRequest, DownloadMediaResponse>;
        RejectCall: GrpcUnaryServiceInterface<RejectCallRequest, Empty>;
        GetMessageById: GrpcUnaryServiceInterface<EntityByIdRequest, Json>;
        GetMessages: GrpcUnaryServiceInterface<GetMessagesRequest, JsonList>;
        GetChats: GrpcUnaryServiceInterface<GetChatsRequest, JsonList>;
    }
    export {};
}
