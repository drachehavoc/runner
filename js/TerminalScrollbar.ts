import { point, sumPoints, TPoint } from "./point";
import { TerminalContext } from "./TerminalContext";

export class TerminalVerticalScroll {
    protected _bars = { clear: "│", normal: "┃", fixed: "║" }

    protected _percent = 0

    protected _prevPosition?: TPoint

    constructor(
        protected _start: TPoint | ((...n: any[]) => TPoint),
        protected _size: number | ((...n: any[]) => number),
    ) {
        this._init()
    }

    protected _init() {
        this._draw()
    }

    protected _getSize() {
        return this._size instanceof Function ? this._size() : this._size
    }

    protected _getStart() {
        return this._start instanceof Function ? this._start() : this._start
    }

    protected _getCurrentPosition() {
        return Math.round(this._percent * (this._getSize() - this._bars.normal.length + 1))
    }

    protected _getCurrentPositionPoint() {
        return sumPoints(this._getStart(), point(0, this._getCurrentPosition()))
    }

    protected _clear() {
        if (!this._prevPosition)
            return

        TerminalContext
            .move(this._prevPosition)
            .write(this._bars.clear)
    }

    protected _draw() {
        TerminalContext
            .move(this._prevPosition = this._getCurrentPositionPoint())
            .write(this._bars.normal)
    }

    update(percent?: number) {
        if (percent)
            this._percent = Math.min(Math.max(percent, 0), 1)
        this._clear()
        this._draw()
    }
}

export class TerminalHorizontalScroll extends TerminalVerticalScroll {
    protected _init() {
        this._bars = { clear: "──", normal: "━━", fixed: "══" }
        super._init()
    }

    protected _getCurrentPositionPoint() {
        return sumPoints(this._getStart(), point(this._getCurrentPosition(), 0))
    }
}