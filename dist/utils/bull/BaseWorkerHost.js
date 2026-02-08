"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWorkerHost = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const JobDetailedError_1 = require("./JobDetailedError");
const bullmq_2 = require("bullmq");
class BaseWorkerHost extends bullmq_1.WorkerHost {
    async process(job, token) {
        try {
            return await this.processJob(job);
        }
        catch (err) {
            if (err instanceof bullmq_2.DelayedError) {
                throw err;
            }
            throw new JobDetailedError_1.JobDetailedError(err);
        }
    }
}
exports.BaseWorkerHost = BaseWorkerHost;
//# sourceMappingURL=BaseWorkerHost.js.map