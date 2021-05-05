import { point } from "./point";
import { TerminalBox } from "./TerminalBox";
import { TerminalContext } from "./TerminalContext";
import { Theme, TThemeFrame } from "./Theme";

export class TerminalFrame {
    protected _themeFrame = Theme.frame

    constructor(
        private _box: TerminalBox,
        private _title: string
    ) {
        this._init()
    }

    private _init() {
        this._drawFrame()
    }

    protected _drawFrame() {
        const cursor = TerminalContext
        const box = this._box

        // frame colors
        cursor
            .color(this._themeFrame.color.border.foreground)
            .background(this._themeFrame.color.border.background)

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
            .color(this._themeFrame.color.title.foreground)
            .background(this._themeFrame.color.title.background)
            .write(` ${formatedTitle}${formatedTitle != this._title ? '…' : ' '}`)
            .reset();

        // 
        cursor
            .reset()
    }

    setTheme(themeFrame: TThemeFrame) {
        this._themeFrame = themeFrame
    }
}