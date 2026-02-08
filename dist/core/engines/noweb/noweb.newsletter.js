"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewsletterMetadata = toNewsletterMetadata;
function toNewsletterMetadata(data) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (((_a = data.state) === null || _a === void 0 ? void 0 : _a.type) === 'DELETED') {
        return null;
    }
    if (((_b = data.state) === null || _b === void 0 ? void 0 : _b.type) === 'NON_EXISTING') {
        return null;
    }
    return {
        id: data.id,
        state: (_c = data.state) === null || _c === void 0 ? void 0 : _c.type,
        creation_time: +data.thread_metadata.creation_time,
        name: data.thread_metadata.name.text,
        nameTime: +data.thread_metadata.name.update_time,
        description: data.thread_metadata.description.text,
        descriptionTime: +data.thread_metadata.description.update_time,
        invite: data.thread_metadata.invite,
        handle: data.thread_metadata.handle,
        picture: ((_d = data.thread_metadata.picture) === null || _d === void 0 ? void 0 : _d.direct_path) || null,
        preview: ((_e = data.thread_metadata.preview) === null || _e === void 0 ? void 0 : _e.direct_path) || null,
        reaction_codes: (_h = (_g = (_f = data.thread_metadata) === null || _f === void 0 ? void 0 : _f.settings) === null || _g === void 0 ? void 0 : _g.reaction_codes) === null || _h === void 0 ? void 0 : _h.value,
        subscribers: +data.thread_metadata.subscribers_count,
        verification: data.thread_metadata.verification,
        viewer_metadata: data.viewer_metadata,
    };
}
//# sourceMappingURL=noweb.newsletter.js.map