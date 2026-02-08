"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterAppQueue = RegisterAppQueue;
const bullMQAdapter_1 = require("@bull-board/api/bullMQAdapter");
const nestjs_1 = require("@bull-board/nestjs");
const bullmq_1 = require("@nestjs/bullmq");
function RegisterAppQueue(options) {
    return [
        bullmq_1.BullModule.registerQueue(Object.assign({}, options)),
        nestjs_1.BullBoardModule.forFeature({
            name: options.name,
            adapter: bullMQAdapter_1.BullMQAdapter,
        }),
    ];
}
//# sourceMappingURL=BullUtils.js.map