"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FrameScrollbars = void 0;
const CursorController_1 = require("./CursorController");
const Util_1 = require("./Util");
class FrameScrollbars {
    constructor(_box, direction, foreground = "default", background = "default") {
        this._box = _box;
        this._cursor = new CursorController_1.CursorController();
        this._positionInPercent = 0;
        this._fixed = false;
        this._color = { foreground, background };
        this._direction = this._getDirectionData(direction);
    }
    _getDirectionData(direction) {
        if (direction == "horizontal")
            return {
                size: () => this._box.size.x,
                start: () => this._box.bottomLeft,
                pointCalcPosition: () => Util_1.point(this._calcPosition(), 0),
                bar: "━━",
                fixedbar: "══",
                clearBar: "──",
            };
        if (direction == "vertical")
            return {
                size: () => this._box.size.y,
                start: () => this._box.topRight,
                pointCalcPosition: () => Util_1.point(0, this._calcPosition()),
                bar: "┃",
                fixedbar: "║",
                clearBar: "│"
            };
        throw new Error(`Scrollbar can be only 'verical' or 'horizontal', '${direction}' not alowed.`);
    }
    _getBar() {
        return !this._fixed ? this._direction.bar : this._direction.fixedbar;
    }
    _calcPosition() {
        return Math.round(this._positionInPercent * (this._direction.size() - this._direction.bar.length + 1));
    }
    _clear() {
        this._cursor
            .move(this._direction.start(), this._direction.pointCalcPosition())
            .color(this._color.foreground)
            .background(this._color.background)
            .write(this._direction.clearBar);
    }
    setBarFixed(fixed) {
        this._fixed = fixed;
        this.draw();
    }
    draw() {
        this._cursor
            .move(this._direction.start(), this._direction.pointCalcPosition())
            .color(this._color.foreground)
            .background(this._color.background)
            .write(this._getBar());
    }
    update(percent, foreground, background) {
        if (!percent)
            percent = this._positionInPercent;
        if (percent && percent < 0)
            percent = 0;
        if (percent && percent > 1)
            percent = 1;
        this._clear();
        if (percent)
            this._positionInPercent = percent;
        if (foreground)
            this._color.foreground = foreground;
        if (background)
            this._color.background = background;
        this.draw();
    }
}
exports.FrameScrollbars = FrameScrollbars;
