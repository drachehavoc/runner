"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Frame_1 = require("../interface/Frame");
const readline = require("readline");
const stdin = process.stdin;
readline.emitKeypressEvents(stdin);
stdin.setRawMode(true);
stdin.on("keypress", (c, key) => {
    if (key.name == 'c' && key.ctrl) {
        process.exit();
    }
    if (key.name == 'tab') {
        if (key.shift)
            return Frame_1.Frame.selectPrevious();
        return Frame_1.Frame.selectNext();
    }
    if (key.name == 'backspace') {
        return Frame_1.Frame.current.toggleFixedBar();
    }
    console.log(c, key);
});
