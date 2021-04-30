"use strict";
// https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursorController = void 0;
const Util_1 = require("./Util");
const charEsc = '\x1b[';
const colors = {
    foreground: {
        /****/ "default": ["39", "m"],
        //
        /****/ black: ["30", "m"],
        /******/ red: ["31", "m"],
        /****/ green: ["32", "m"],
        /***/ yellow: ["33", "m"],
        /*****/ blue: ["34", "m"],
        /**/ magenta: ["35", "m"],
        /*****/ cyan: ["36", "m"],
        /****/ white: ["37", "m"],
        //
        /****/ "bright-black": ["90", "m"],
        /******/ "bright-red": ["91", "m"],
        /****/ "bright-green": ["92", "m"],
        /***/ "bright-yellow": ["93", "m"],
        /*****/ "bright-blue": ["94", "m"],
        /**/ "bright-magenta": ["95", "m"],
        /*****/ "bright-cyan": ["96", "m"],
        /****/ "bright-white": ["97", "m"],
    },
    background: {
        /****/ "default": ["49", "m"],
        //
        /****/ black: ["40", "m"],
        /******/ red: ["41", "m"],
        /****/ green: ["42", "m"],
        /***/ yellow: ["43", "m"],
        /*****/ blue: ["44", "m"],
        /**/ magenta: ["45", "m"],
        /*****/ cyan: ["46", "m"],
        /****/ white: ["47", "m"],
        //
        /****/ "bright-black": ["100", "m"],
        /******/ "bright-red": ["101", "m"],
        /****/ "bright-green": ["102", "m"],
        /***/ "bright-yellow": ["103", "m"],
        /*****/ "bright-blue": ["104", "m"],
        /**/ "bright-magenta": ["105", "m"],
        /*****/ "bright-cyan": ["106", "m"],
        /****/ "bright-white": ["107", "m"],
    }
};
const std = process.stdout;
class CursorController {
    constructor() {
        this.color = (color) => this._escCode(...colors.foreground[color]);
        this.background = (color) => this._escCode(...colors.background[color]);
        this.italic = () => this._escCode("3", "m");
        this.reset = () => this._escCode("0", "m");
    }
    static _escCode(code, modificator = "m") {
        std.write(charEsc + code + modificator);
        return CursorController;
    }
    _escCode(code, modificator = "m") {
        std.write(charEsc + code + modificator);
        return this;
    }
    move(...points) {
        const pos = Util_1.sumPoints(...points);
        std.cursorTo(pos.x, pos.y);
        return this;
    }
    write(...parts) {
        std.write(parts.join(''));
        return this;
    }
}
exports.CursorController = CursorController;
CursorController.clearScreen = () => CursorController._escCode("2", "J");
CursorController.hide = () => CursorController._escCode("?25", "l");
CursorController.unhide = () => CursorController._escCode("?25", "h");
