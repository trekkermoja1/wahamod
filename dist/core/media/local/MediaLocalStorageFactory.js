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
exports.MediaLocalStorageFactory = void 0;
const common_1 = require("@nestjs/common");
const MediaLocalStorage_1 = require("./MediaLocalStorage");
const MediaLocalStorageConfig_1 = require("./MediaLocalStorageConfig");
const MediaStorageFactory_1 = require("../MediaStorageFactory");
let MediaLocalStorageFactory = class MediaLocalStorageFactory extends MediaStorageFactory_1.MediaStorageFactory {
    constructor(config) {
        super();
        this.config = config;
    }
    async build(name, logger) {
        return new MediaLocalStorage_1.MediaLocalStorage(logger, this.config.filesFolder, this.config.filesURL, this.config.filesLifetime);
    }
};
exports.MediaLocalStorageFactory = MediaLocalStorageFactory;
exports.MediaLocalStorageFactory = MediaLocalStorageFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [MediaLocalStorageConfig_1.MediaLocalStorageConfig])
], MediaLocalStorageFactory);
//# sourceMappingURL=MediaLocalStorageFactory.js.map