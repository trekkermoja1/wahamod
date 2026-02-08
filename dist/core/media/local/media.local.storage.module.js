"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaLocalStorageModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const config_service_1 = require("../../../config.service");
const MediaLocalStorageConfig_1 = require("./MediaLocalStorageConfig");
const MediaLocalStorageFactory_1 = require("./MediaLocalStorageFactory");
const MediaStorageFactory_1 = require("../MediaStorageFactory");
let MediaLocalStorageModule = class MediaLocalStorageModule {
};
exports.MediaLocalStorageModule = MediaLocalStorageModule;
exports.MediaLocalStorageModule = MediaLocalStorageModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRootAsync({
                imports: [],
                extraProviders: [MediaLocalStorageConfig_1.MediaLocalStorageConfig, config_service_1.WhatsappConfigService],
                inject: [MediaLocalStorageConfig_1.MediaLocalStorageConfig],
                useFactory: (config) => {
                    return [
                        {
                            rootPath: config.filesFolder,
                            serveRoot: config.filesUri,
                        },
                    ];
                },
            }),
        ],
        providers: [
            {
                provide: MediaStorageFactory_1.MediaStorageFactory,
                useClass: MediaLocalStorageFactory_1.MediaLocalStorageFactory,
            },
            config_service_1.WhatsappConfigService,
            MediaLocalStorageConfig_1.MediaLocalStorageConfig,
        ],
        exports: [MediaStorageFactory_1.MediaStorageFactory],
    })
], MediaLocalStorageModule);
//# sourceMappingURL=media.local.storage.module.js.map