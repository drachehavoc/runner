import { Box } from "./Box";
import { CursorController } from "./CursorController";
import { FrameScrollbars } from "./FrameScrollbar";
import { Theme } from "./Theme";
import { point, sumPoints } from "./Util";

const FramesList: Frame[] = []
let SelectedFrame: Frame;

export class Frame {
    static get current() {
        return SelectedFrame
    }

    static selectStep(step: number) {
        const currentIdx = FramesList.indexOf(SelectedFrame)
        const nextIdx = currentIdx + step
        const prevSelectedFrame = SelectedFrame;
        const lastFrameListIdx = FramesList.length - 1

        let nextSelectedFrame: Frame = FramesList[nextIdx];

        if (!nextSelectedFrame) {
            if (nextIdx > lastFrameListIdx)
                nextSelectedFrame = FramesList[0]

            if (nextIdx < 0)
                nextSelectedFrame = FramesList[lastFrameListIdx]
        }

        SelectedFrame = nextSelectedFrame
        prevSelectedFrame.update()
        nextSelectedFrame.update()
    }

    static selectNext() {
        return Frame.selectStep(1)
    }

    static selectPrevious() {
        return Frame.selectStep(-1)
    }

    // =========================================================================

    private _fixedScroll = false

    private _cursor = new CursorController()

    private _scrolls: { vertical: FrameScrollbars, horizontal: FrameScrollbars }

    constructor(
        private _title: string,
        private _box: Box,
    ) {
        if (!SelectedFrame)
            SelectedFrame = this
        FramesList.push(this)
        _box.on("resize", () => this.update())
        this._scrolls = this._instantiateScrollbars()
        this.update()
    }

    private _getTheme() {
        return SelectedFrame === this ? Theme["frame-focused"] : Theme["frame"]
    }

    private _instantiateScrollbars() {
        const _boxScrollVertical = new Box(
            () => sumPoints(this._box.topRight, point(0, 1)),
            () => sumPoints(this._box.bottomRight, point(0, -1))
        )

        const _boxScrollHorizontal = new Box(
            () => sumPoints(this._box.bottomLeft, point(1, 0)),
            () => sumPoints(this._box.bottomRight, point(-1, 0))
        )

        const vertical = new FrameScrollbars(_boxScrollVertical, 'vertical')
        const horizontal = new FrameScrollbars(_boxScrollHorizontal, 'horizontal')

        return { vertical, horizontal }
    }

    private _draw() {
        const cursor = this._cursor
        const box = this._box
        const theme = this._getTheme()

        // frame colors
        cursor
            .color(theme.color.border.foreground)
            .background(theme.color.border.background)

        // corners

        cursor
            .move(box.topLeft)
            .write("┌")

            .move(box.topRight)
            .write("┐")

            .move(box.bottomLeft)
            .write("└")

            .move(box.bottomRight)
            .write("┘")

        // horizontal bars

        const sizeX = box.size.x - 1

        const horizBar = '─'.repeat(sizeX >= 1 ? sizeX : 1);

        cursor
            .move(box.topLeft, point(1, 0))
            .write(horizBar)
            .move(box.bottomLeft, point(1, 0))
            .write(horizBar)

        // vertival bars

        for (let top = box.size.y; top-- > 1;) {
            cursor
                .move(box.topLeft, point(0, top))
                .write("│")
                .move(box.topRight, point(0, top))
                .write("│")
        }

        // title

        const formatedTitle = this._title.substr(0, box.size.x - 3)

        cursor
            .move(box.topLeft, point(1, 0))
            .italic()
            .color(theme.color.title.foreground)
            .background(theme.color.title.background)
            .write(` ${formatedTitle}${formatedTitle != this._title ? '…' : ' '}`)
            .reset();

        // 
        cursor
            .reset()
    }

    toggleFixedBar() {
        this._fixedScroll = !this._fixedScroll
        this._scrolls.vertical.setBarFixed(this._fixedScroll)
        this._scrolls.horizontal.setBarFixed(this._fixedScroll)
    }

    update() {
        const showScrollbars = this.showScrollbars
        const theme = this._getTheme()
        this._draw()
        if (showScrollbars.vertical)
            this._scrolls.vertical.update(null, theme.color.border.foreground, theme.color.border.background)

        if (showScrollbars.horizontal)
            this._scrolls.horizontal.update(null, theme.color.border.foreground, theme.color.border.background)
    }

    get box() {
        return this._box
    }

    get showScrollbars() {
        return {
            vertical: false,
            horizontal: false
        }
    }
}