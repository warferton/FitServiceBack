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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var nats_1 = require("nats");
var message_1 = require("../custom_types/message");
var transactions_1 = require("../utils/transactions");
//connect to NATS
var server = 
//local + remote cluster
{
    servers: ["localhost:4222", "demo.nats.io:4443"],
    name: 'service_2_sub',
    noEcho: true,
    timeout: 10 * 1000,
    noRandomize: true,
    maxReconnectAttempts: 5
};
//subject to subscribe to
var subscription_subject = "messages.service.2";
//init codec
var sc = nats_1.StringCodec();
//execute 
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var nc, err_1, sub, sub_1, sub_1_1, m, msg, e_1_1, err_2, err_3;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, nats_1.connect(server)];
            case 1:
                nc = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _b.sent();
                console.log("error connecting to " + JSON.stringify(server) + " \n " + err_1);
                return [2 /*return*/];
            case 3:
                ;
                console.log("connected to " + nc.getServer());
                sub = nc.subscribe(subscription_subject, {
                    timeout: 60 * 1000 // 60sec timeout
                });
                _b.label = 4;
            case 4:
                _b.trys.push([4, 17, , 18]);
                _b.label = 5;
            case 5:
                _b.trys.push([5, 10, 11, 16]);
                sub_1 = __asyncValues(sub);
                _b.label = 6;
            case 6: return [4 /*yield*/, sub_1.next()];
            case 7:
                if (!(sub_1_1 = _b.sent(), !sub_1_1.done)) return [3 /*break*/, 9];
                m = sub_1_1.value;
                msg = sc.decode(m.data);
                if (msg === 'close')
                    return [3 /*break*/, 9];
                console.log("[" + sub.getProcessed() + "]: " + msg + "  - pending: " + sub.getPending());
                transactions_1.executeInsertMessage(new message_1.Message(msg));
                _b.label = 8;
            case 8: return [3 /*break*/, 6];
            case 9: return [3 /*break*/, 16];
            case 10:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 16];
            case 11:
                _b.trys.push([11, , 14, 15]);
                if (!(sub_1_1 && !sub_1_1.done && (_a = sub_1.return))) return [3 /*break*/, 13];
                return [4 /*yield*/, _a.call(sub_1)];
            case 12:
                _b.sent();
                _b.label = 13;
            case 13: return [3 /*break*/, 15];
            case 14:
                if (e_1) throw e_1.error;
                return [7 /*endfinally*/];
            case 15: return [7 /*endfinally*/];
            case 16: return [3 /*break*/, 18];
            case 17:
                err_2 = _b.sent();
                console.error("Exception caught: " + err_2.message);
                return [3 /*break*/, 18];
            case 18:
                console.log("subscription closed");
                _b.label = 19;
            case 19:
                _b.trys.push([19, 23, , 24]);
                return [4 /*yield*/, nc.drain()];
            case 20:
                _b.sent();
                return [4 /*yield*/, nc.close()];
            case 21:
                _b.sent();
                return [4 /*yield*/, nc.closed()];
            case 22:
                _b.sent();
                return [3 /*break*/, 24];
            case 23:
                err_3 = _b.sent();
                console.log("Error caught: " + err_3.message);
                return [3 /*break*/, 24];
            case 24: return [2 /*return*/];
        }
    });
}); })();
