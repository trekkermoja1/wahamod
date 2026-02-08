"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaManager = void 0;
const mime = require('mime-types');
const promiseRetry = require('promise-retry');
class MediaManager {
    constructor(storage, mimetypes, log) {
        this.storage = storage;
        this.mimetypes = mimetypes;
        this.log = log;
        this.RETRY_OPTIONS = {
            retries: 5,
            minTimeout: 100,
            maxTimeout: 500,
        };
        if (this.mimetypes && this.mimetypes.length > 0) {
            const mimetypes = this.mimetypes.join(',');
            const msg = `Only '${mimetypes}' mimetypes will be downloaded for the session`;
            this.log.info(msg);
        }
    }
    shouldProcessMimetype(mimetype) {
        if (!this.mimetypes || this.mimetypes.length === 0) {
            return true;
        }
        return this.mimetypes.some((type) => mimetype.startsWith(type));
    }
    async processMediaInternal(processor, message, session) {
        const messageId = processor.getMessageId(message);
        const chatId = processor.getChatId(message);
        const mimetype = processor.getMimetype(message);
        const filename = processor.getFilename(message);
        if (!this.shouldProcessMimetype(mimetype)) {
            this.log.info(`The message '${messageId}' has '${mimetype}' mimetype media, skip it.`);
            return null;
        }
        let extension = mime.extension(mimetype);
        if (mimetype == 'application/was' && !extension) {
            extension = 'zip';
        }
        const mediaData = {
            session: session,
            message: {
                id: messageId,
                chatId: chatId,
            },
            file: {
                extension: extension,
                filename: filename,
            },
        };
        const exists = await this.withRetry('Checking media', () => this.exists(mediaData));
        if (!exists) {
            this.log.info(`The message ${messageId} has media, downloading it...`);
            const buffer = await this.withRetry('Fetching media', () => this.fetchMedia(message, processor));
            await this.withRetry('Saving media', () => this.saveMedia(buffer, mediaData));
            this.log.info(`The media from '${messageId}' has been saved.`);
        }
        const data = await this.withRetry('Getting media URL', () => this.getStorageData(mediaData));
        return data;
    }
    async processMedia(processor, message, session) {
        let messageId;
        try {
            messageId = processor.getMessageId(message);
            if (!processor.hasMedia(message)) {
                return null;
            }
        }
        catch (error) {
            this.log.error(error, `Error checking if message has media for message '${messageId}'`);
            return null;
        }
        let media = {
            url: null,
            filename: null,
            mimetype: null,
        };
        try {
            media.filename = processor.getFilename(message);
            media.mimetype = processor.getMimetype(message);
            const data = await this.processMediaInternal(processor, message, session);
            media = Object.assign(Object.assign({}, media), data);
        }
        catch (err) {
            this.log.error(err, `Error processing media for message '${messageId}'`);
            media.error = err;
            media.error.details = `${err.stack}`;
        }
        return media;
    }
    async fetchMedia(message, processor) {
        const messageId = processor.getMessageId(message);
        this.log.debug(`Fetching media from WhatsApp message '${messageId}'...`);
        const buffer = await processor.getMediaBuffer(message);
        if (!buffer) {
            throw new Error(`Message '${messageId}' has no media, but it has media flag in the engine`);
        }
        return buffer;
    }
    async saveMedia(buffer, mediaData) {
        this.log.debug(`Saving media from WhatsApp the message '${mediaData.message.id}'...`);
        const result = await this.storage.save(buffer, mediaData);
        this.log.debug(`The media from '${mediaData.message.id}' has been saved.`);
        return result;
    }
    async getStorageData(mediaData) {
        return await this.storage.getStorageData(mediaData);
    }
    async exists(mediaData) {
        this.log.trace(`Checking if media exists for message '${mediaData.message.id}'...`);
        const result = await this.storage.exists(mediaData);
        this.log.trace(`Media for message '${mediaData.message.id}' exists: ${result}`);
        return result;
    }
    async withRetry(name, fn) {
        const retryOptions = this.RETRY_OPTIONS;
        try {
            return await promiseRetry((retry, number) => {
                return fn().catch(retry);
            }, retryOptions);
        }
        catch (error) {
            this.log.error(error, `Failed to execute '${name}', tried '${retryOptions.retries}' times`);
            throw error;
        }
    }
    close() {
        this.storage.close().catch((err) => {
            this.log.error(`Failed to close media storage: ${err}`);
        });
    }
}
exports.MediaManager = MediaManager;
//# sourceMappingURL=MediaManager.js.map