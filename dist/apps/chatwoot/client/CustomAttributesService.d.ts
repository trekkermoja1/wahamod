import ChatwootClient from '@figuro/chatwoot-sdk';
import { ChatWootAccountAPIConfig } from '@waha/apps/chatwoot/client/interfaces';
import { CustomAttributeModel, CustomAttributeType } from '@waha/apps/chatwoot/client/types';
export interface CustomAttribute {
    key: string;
    name: string;
    type: CustomAttributeType;
    description: string;
    model: CustomAttributeModel;
}
export declare class CustomAttributesService {
    private config;
    private accountAPI;
    constructor(config: ChatWootAccountAPIConfig, accountAPI: ChatwootClient);
    upsert(attributes: Array<CustomAttribute>): Promise<void>;
}
