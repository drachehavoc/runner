import { Box } from "./Box";
import { CursorController, TForegroundColors, TBackgroundColors } from "./CursorController";
import { point } from "./Util";

export class FrameScrollbars {
    private _cursor = new CursorController()
    private _color: { foreground: TForegroundColors, background: TBackgroundColors }
    private _positionInPercent = 0
    private _fixed = false

    private _direction: {
        size: () => number,
        start: () => TPoint,
        pointCalcPosition: () => TPoint,
        bar: string,
        fixedbar: string,
        clearBar: string
    }

    constructor(
        private _box: Box,
        direction: "vertical" | "horizontal",
        foreground: TForegroundColors = "default",
        background: TBackgroundColors = "default"
    ) {
        this._color = { foreground, background }
        this._direction = this._getDirectionData(direction)
    }

    _getDirectionData(direction: "vertical" | "horizontal") {
        if (direction == "horizontal")
            return {
                size: () => this._box.size.x,
                start: () => this._box.bottomLeft,
                pointCalcPosition: () => point(this._calcPosition(), 0),
                bar: "━━",
                fixedbar: "══",
                clearBar: "──",
            }

        if (direction == "vertical")
            return {
                size: () => this._box.size.y,
                start: () => this._box.topRight,
                pointCalcPosition: () => point(0, this._calcPosition()),
                bar: "┃",
                fixedbar: "║",
                clearBar: "│"
            }

        throw new Error(`Scrollbar can be only 'verical' or 'horizontal', '${direction}' not alowed.`)
    }

    _getBar() {
        return !this._fixed ? this._direction.bar : this._direction.fixedbar
    }

    _calcPosition() {
        return Math.round(this._positionInPercent * (this._direction.size() - this._direction.bar.length + 1))
    }

    _clear() {
        this._cursor
            .move(this._direction.start(), this._direction.pointCalcPosition())
            .color(this._color.foreground)
            .background(this._color.background)
            .write(this._direction.clearBar)
    }

    setBarFixed(fixed: boolean) {
        this._fixed = fixed
        this.draw()
    }

    draw() {
        this._cursor
            .move(this._direction.start(), this._direction.pointCalcPosition())
            .color(this._color.foreground)
            .background(this._color.background)
            .write(this._getBar())
    }

    update(percent?: number | null, foreground?: TForegroundColors | null, background?: TBackgroundColors | null) {
        if (!percent)
            percent = this._positionInPercent

        if (percent && percent < 0)
            percent = 0

        if (percent && percent > 1)
            percent = 1

        this._clear()

        if (percent)
            this._positionInPercent = percent

        if (foreground)
            this._color.foreground = foreground

        if (background)
            this._color.background = background

        this.draw()
    }
}