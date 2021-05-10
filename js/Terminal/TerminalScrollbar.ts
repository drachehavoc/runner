import { point, sumPoints, TPoint } from "./point";
import { TerminalContext } from "./TerminalContext";
import { TerminalTheme } from "./Theme";

export class TerminalVerticalScroll {
    protected _bars = { clear: "│", normal: "┃", fixed: "║" }

    protected _percent = 0

    protected _visible = false

    protected _selected = false

    constructor(
        protected _start: TPoint | ((...n: any[]) => TPoint),
        protected _size: number | ((...n: any[]) => number),
    ) {
        this._init()
    }

    protected _init() {
        // this._draw()
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
        if (this._getSize() <= 0)
            return

        const theme = this._getTheme()
        
        TerminalContext
            .move(this._getCurrentPositionPoint())
            .color(theme.color.foreground)
            .background(theme.color.background)
            .write(this._bars.clear)
            .reset()
    }

    protected _getTheme() {
        return this._selected ? TerminalTheme.scroll.selected : TerminalTheme.scroll.blurred
    }

    protected _draw() {
        if (this._getSize() <= 0)
            return

        if (!this._visible)
            return

        const theme = this._getTheme()

        TerminalContext
            .move(this._getCurrentPositionPoint())
            .color(theme.color.foreground)
            .background(theme.color.background)
            .write(this._bars.normal)
            .reset()
    }

    setSelected(isSelected: boolean) {
        this._selected = isSelected
    }

    setVisible(visible: boolean) {
        this._visible = visible
        this.update()
    }

    update(percent?: number) {
        this._clear()
        if (percent)
            this._percent = Math.min(Math.max(percent, 0), 1)
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