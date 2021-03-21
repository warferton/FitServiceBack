"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
//Represents a message to be sent to/by a service
var Message = /** @class */ (function () {
    function Message(message_body) {
        this.timestamp = new Date();
        this.body = message_body;
    }
    return Message;
}());
exports.Message = Message;
