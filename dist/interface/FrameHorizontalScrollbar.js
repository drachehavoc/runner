"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameHorizontalScrollbars = void 0;
const CursorController_1 = require("./CursorController");
const Util_1 = require("./Util");
class FrameHorizontalScrollbars {
    constructor(_box) {
        this._box = _box;
        this._cursor = new CursorController_1.CursorController();
        this._positionInPercent = 0;
        //
    }
    _calcPosition() {
        const total = this._box.size.x;
        const percentage = this._positionInPercent;
        return percentage * total;
    }
    _clear() {
        this._cursor
            .move(this._box.bottomLeft)
            .write("|");
    }
    draw() {
        this._cursor
            .move(this._box.bottomLeft, Util_1.point(this._calcPosition(), 0))
            .write(`|`);
    }
    update(percent) {
        if (percent && (percent < 0 || percent > 1))
            throw new Error(`Percent must be between 0 and 1.`);
        this._clear();
        if (percent)
            this._positionInPercent = percent;
        this.draw();
    }
}
exports.FrameHorizontalScrollbars = FrameHorizontalScrollbars;
