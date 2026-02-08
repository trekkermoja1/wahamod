"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicAuthFunction = BasicAuthFunction;
const basicAuth = require("express-basic-auth");
function BasicAuthFunction(username, password, exclude = []) {
    function authFunction(req, res, next) {
        const ignore = exclude.filter((url) => req.url.startsWith(url)).length > 0;
        if (ignore) {
            next();
            return;
        }
        const auth = basicAuth({
            challenge: true,
            users: {
                [String(username)]: String(password),
            },
        });
        auth(req, res, next);
    }
    return authFunction;
}
//# sourceMappingURL=basicAuth.js.map