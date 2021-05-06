import { point, pointZero, sumPoints } from "./point";
import { TerminalBox } from "./TerminalBox";
import { TerminalContentBox } from "./TerminalContentBox";
import { TerminalContext } from "./TerminalContext";
import { TerminalFrame } from "./TerminalFrame";
import { TerminalHorizontalScroll, TerminalVerticalScroll } from "./TerminalScrollbar";
import { Theme } from "./Theme";

const TerminalWindowList: TerminalWindow[] = []
let TerminalWindowSelected: TerminalWindow

export class TerminalWindow {

    static selectStep(step: number) {
        const TerminalWindowPrev = TerminalWindowSelected

        let currentIdx = TerminalWindowList.indexOf(TerminalWindowSelected) ?? 0
        let nextIdx: number = currentIdx + step

        if (nextIdx < 0)
            nextIdx = TerminalWindowList.length - 1

        if (nextIdx >= TerminalWindowList.length)
            nextIdx = 0

        TerminalWindowSelected = TerminalWindowList[nextIdx]
        TerminalWindowPrev.update()
        TerminalWindowSelected.update()
    }

    static next() {
        return TerminalWindow.selectStep(1)
    }

    static previous() {
        return TerminalWindow.selectStep(-1)
    }

    // =========================================================================

    protected _frame
    protected _scrolls
    protected _content

    constructor(
        protected _mainTitle: string,
        protected _box: TerminalBox
    ) {
        this._init()
        this._frame = this._createFrame()
        this._scrolls = this._createScrolls()
        this._content = this._createContent()
    }

    protected _init() {
        if (!TerminalWindowSelected)
            TerminalWindowSelected = this
        TerminalWindowList.push(this)
    }

    protected _isSlected() {
        return TerminalWindowSelected === this
    }

    protected _getTheme() {
        return this._isSlected()
            ? Theme.frame.selected
            : Theme.frame.blurred
    }

    protected _createFrame() {
        const frame = new TerminalFrame(this._mainTitle, this._box)
        frame.setSelected(this._isSlected())
        frame.update()
        return frame
    }

    protected _createScrolls() {
        const vertical = new TerminalVerticalScroll(
            () => sumPoints(this._box.topRight, point(0, 1)),
            () => this._box.size.y - 2
        )

        const horizontal = new TerminalHorizontalScroll(
            () => sumPoints(this._box.bottomLeft, point(1, 0)),
            () => this._box.size.x - 2
        )

        const selected = this._isSlected()
        vertical.setSelected(selected)
        horizontal.setSelected(selected)
        vertical.update()
        horizontal.update()

        return { vertical, horizontal }
    }

    protected _createContent() {
        const content = new TerminalContentBox(new TerminalBox(
            () => sumPoints(this._box.topLeft, point(1, 1)),
            () => sumPoints(this._box.bottomRight, point(-1, -1))
        ))

        content.on("verticalScrollChange", () => {
            this._scrolls.vertical.update(content.getPositionPercentY())
        })

        content.on("horizontalScrollChange", () => {
            this._scrolls.horizontal.update(content.getPositionPercentX())
        })

        content.on("addContent", () => {
            this._scrolls.vertical.setVisible(content.getOverflowX())
            this._scrolls.horizontal.setVisible(content.getOverflowX())
        })

        content.on("update", () => {
            this._scrolls.vertical.setVisible(content.getOverflowX())
            this._scrolls.horizontal.setVisible(content.getOverflowX())
        })

        content.add(this._isSlected() ? "SIM" : "NÃO")

        return content
    }

    getBox() {
        return this._box
    }

    getFrame() {
        return this._frame
    }

    getContent() {
        return this._content
    }

    getScrollX() {
        return this._scrolls.horizontal
    }

    getScrollY() {
        return this._scrolls.vertical
    }

    update() {
        const selected = this._isSlected()
        const frame = this.getFrame()
        const scrollX = this.getScrollX()
        const scrollY = this.getScrollY()
        
        frame.setSelected(selected)
        scrollX.setSelected(selected)
        scrollY.setSelected(selected)
        
        frame.update()
        scrollX.update()
        scrollY.update()
    }
}