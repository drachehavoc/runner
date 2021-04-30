"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameVerticalScrollbars = void 0;
const CursorController_1 = require("./CursorController");
class FrameVerticalScrollbars {
    constructor(_box) {
        this._box = _box;
        this._cursor = new CursorController_1.CursorController();
        //
    }
    draw() {
        this._cursor
            .move(this._box.topRight)
            .write("Z")
            .move(this._box.bottomRight)
            .write("Z");
    }
}
exports.FrameVerticalScrollbars = FrameVerticalScrollbars;
