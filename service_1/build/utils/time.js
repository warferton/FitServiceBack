"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = void 0;
//Delay execution for a specified time
var wait = function (ms) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, ms);
    });
};
exports.wait = wait;
