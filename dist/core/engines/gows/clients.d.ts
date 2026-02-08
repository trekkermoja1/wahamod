import * as grpc from '@grpc/grpc-js';
import { messages } from '@waha/core/engines/gows/grpc/gows';
export declare const GetMessageServiceClient: (session: string, address: string, credentials: grpc.ChannelCredentials) => messages.MessageServiceClient;
export declare const GetEventStreamClient: (session: string, address: string, credentials: grpc.ChannelCredentials) => messages.EventStreamClient;
