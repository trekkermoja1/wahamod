import { INestApplication } from '@nestjs/common';
export declare class SwaggerConfiguratorCore {
    protected app: INestApplication;
    protected logger: any;
    private config;
    constructor(app: INestApplication);
    get title(): any;
    get description(): any;
    get externalDocUrl(): any;
    configure(webhooks: any[]): void;
    private configureWebhooks;
    setUpAuth(credentials: [string, string]): void;
}
