"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxCursor = void 0;
const colors = {
    foreground: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
    },
    background: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m",
    },
};
class BoxCursor {
    constructor(_box) {
        this._box = _box;
        this._position = _box.start;
    }
    vertical(position, move) {
        if (position == "top")
            return this;
    }
    left(pos) {
        this._position.x = this._box.startX + pos;
    }
    right(pos) {
        this._position.x = this._box.endX - pos;
    }
    top(pos) {
        this._position.y = this._box.startY + pos;
    }
    bottom(pos) {
        this._position.y = this._box.endY - pos;
    }
    reset() {
        this.write("\x1b[0m");
    }
    alterColor() {
        this.color("cyan", null);
    }
    alterColorSelectedLine() {
        this.color("white", "cyan");
    }
    color(foreground, background) {
        if (foreground)
            this.write(colors.foreground[foreground]);
        if (background)
            this.write(colors.background[background]);
    }
    write(text) {
        process.stdout.cursorTo(this._position.x, this._position.y);
        process.stdout.write(text);
    }
}
exports.BoxCursor = BoxCursor;
