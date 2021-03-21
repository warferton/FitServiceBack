"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomWord = void 0;
function randomWord() {
    // random num in range [0 ; 10)
    var rand = Math.floor(Math.random() * 10);
    return words[rand];
}
exports.randomWord = randomWord;
var words = [
    "Message",
    "August",
    "Apple",
    "From",
    "September",
    "Dry",
    "Night",
    "Sun",
    "Job",
    "Random"
];
