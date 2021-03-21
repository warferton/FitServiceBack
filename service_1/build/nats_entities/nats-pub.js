"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var nats_1 = require("nats");
var random_1 = require("../utils/random");
var time_1 = require("../utils/time");
//connect to NATS
var server = 
//local + remote cluster
{
    servers: ["localhost:4222", "demo.nats.io:4443"],
    name: 'service_1_pub',
    noEcho: true,
    noRandomize: true,
    timeout: 10 * 1000,
    maxReconnectAttempts: 5
};
//subject to publish to
var publish_subject = "messages.service.2";
//init codec
var sc = nats_1.StringCodec();
//execute
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var nc, err_1, i, msg, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, nats_1.connect(server)];
            case 1:
                nc = _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log("error connecting to " + JSON.stringify(server) + " \n " + err_1);
                return [2 /*return*/];
            case 3:
                ;
                console.log("connected to " + nc.getServer());
                return [4 /*yield*/, time_1.wait(5 * 1000)];
            case 4:
                _a.sent();
                console.log("sending..");
                i = 0;
                _a.label = 5;
            case 5:
                if (!(i < 15)) return [3 /*break*/, 8];
                msg = random_1.randomWord() + " " + random_1.randomWord();
                nc.publish(publish_subject, sc.encode(msg));
                console.log("sent...");
                return [4 /*yield*/, time_1.wait(5 * 1000)];
            case 6:
                _a.sent();
                _a.label = 7;
            case 7:
                i++;
                return [3 /*break*/, 5];
            case 8:
                nc.publish(publish_subject, sc.encode("close"));
                _a.label = 9;
            case 9:
                _a.trys.push([9, 13, , 14]);
                return [4 /*yield*/, nc.flush()];
            case 10:
                _a.sent();
                return [4 /*yield*/, nc.drain()];
            case 11:
                _a.sent();
                return [4 /*yield*/, nc.close()];
            case 12:
                _a.sent();
                return [3 /*break*/, 14];
            case 13:
                err_2 = _a.sent();
                console.log("Error caught: " + err_2.message);
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); })();
