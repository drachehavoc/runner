"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frame = void 0;
const Box_1 = require("./Box");
const CursorController_1 = require("./CursorController");
const FrameScrollbar_1 = require("./FrameScrollbar");
const Theme_1 = require("./Theme");
const Util_1 = require("./Util");
const FramesList = [];
let SelectedFrame;
class Frame {
    constructor(_title, _box) {
        this._title = _title;
        this._box = _box;
        // =========================================================================
        this._fixedScroll = false;
        this._cursor = new CursorController_1.CursorController();
        if (!SelectedFrame)
            SelectedFrame = this;
        FramesList.push(this);
        _box.on("resize", () => this.update());
        this._scrolls = this._instantiateScrollbars();
        this.update();
    }
    static get current() {
        return SelectedFrame;
    }
    static selectStep(step) {
        const currentIdx = FramesList.indexOf(SelectedFrame);
        const nextIdx = currentIdx + step;
        const prevSelectedFrame = SelectedFrame;
        const lastFrameListIdx = FramesList.length - 1;
        let nextSelectedFrame = FramesList[nextIdx];
        if (!nextSelectedFrame) {
            if (nextIdx > lastFrameListIdx)
                nextSelectedFrame = FramesList[0];
            if (nextIdx < 0)
                nextSelectedFrame = FramesList[lastFrameListIdx];
        }
        SelectedFrame = nextSelectedFrame;
        prevSelectedFrame.update();
        nextSelectedFrame.update();
    }
    static selectNext() {
        return Frame.selectStep(1);
    }
    static selectPrevious() {
        return Frame.selectStep(-1);
    }
    _getTheme() {
        return SelectedFrame === this ? Theme_1.Theme["frame-focused"] : Theme_1.Theme["frame"];
    }
    _instantiateScrollbars() {
        const _boxScrollVertical = new Box_1.Box(() => Util_1.sumPoints(this._box.topRight, Util_1.point(0, 1)), () => Util_1.sumPoints(this._box.bottomRight, Util_1.point(0, -1)));
        const _boxScrollHorizontal = new Box_1.Box(() => Util_1.sumPoints(this._box.bottomLeft, Util_1.point(1, 0)), () => Util_1.sumPoints(this._box.bottomRight, Util_1.point(-1, 0)));
        const vertical = new FrameScrollbar_1.FrameScrollbars(_boxScrollVertical, 'vertical');
        const horizontal = new FrameScrollbar_1.FrameScrollbars(_boxScrollHorizontal, 'horizontal');
        return { vertical, horizontal };
    }
    _draw() {
        const cursor = this._cursor;
        const box = this._box;
        const theme = this._getTheme();
        // frame colors
        cursor
            .color(theme.color.border.foreground)
            .background(theme.color.border.background);
        // corners
        cursor
            .move(box.topLeft)
            .write("┌")
            .move(box.topRight)
            .write("┐")
            .move(box.bottomLeft)
            .write("└")
            .move(box.bottomRight)
            .write("┘");
        // horizontal bars
        const sizeX = box.size.x - 1;
        const horizBar = '─'.repeat(sizeX >= 1 ? sizeX : 1);
        cursor
            .move(box.topLeft, Util_1.point(1, 0))
            .write(horizBar)
            .move(box.bottomLeft, Util_1.point(1, 0))
            .write(horizBar);
        // vertival bars
        for (let top = box.size.y; top-- > 1;) {
            cursor
                .move(box.topLeft, Util_1.point(0, top))
                .write("│")
                .move(box.topRight, Util_1.point(0, top))
                .write("│");
        }
        // title
        const formatedTitle = this._title.substr(0, box.size.x - 3);
        cursor
            .move(box.topLeft, Util_1.point(1, 0))
            .italic()
            .color(theme.color.title.foreground)
            .background(theme.color.title.background)
            .write(` ${formatedTitle}${formatedTitle != this._title ? '…' : ' '}`)
            .reset();
        // 
        cursor
            .reset();
    }
    toggleFixedBar() {
        this._fixedScroll = !this._fixedScroll;
        this._scrolls.vertical.setBarFixed(this._fixedScroll);
        this._scrolls.horizontal.setBarFixed(this._fixedScroll);
    }
    update() {
        const showScrollbars = this.showScrollbars;
        const theme = this._getTheme();
        this._draw();
        if (showScrollbars.vertical)
            this._scrolls.vertical.update(null, theme.color.border.foreground, theme.color.border.background);
        if (showScrollbars.horizontal)
            this._scrolls.horizontal.update(null, theme.color.border.foreground, theme.color.border.background);
    }
    get box() {
        return this._box;
    }
    get showScrollbars() {
        return {
            vertical: false,
            horizontal: false
        };
    }
}
exports.Frame = Frame;
