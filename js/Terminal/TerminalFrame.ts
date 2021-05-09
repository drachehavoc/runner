import { point } from "./point";
import { TerminalBox } from "./TerminalBox";
import { TerminalContext } from "./TerminalContext";
import { TerminalTheme, TThemeFrame } from "./Theme";

export class TerminalFrame {
    protected _selected = false

    constructor(
        private _title: string,
        private _box: TerminalBox
    ) {
        this._init()
    }

    private _init() {
        // this._drawFrame()
    }

    protected _drawFrame() {
        const cursor = TerminalContext
        const box = this._box
        const theme = this._selected 
            ? TerminalTheme.frame.selected
            : TerminalTheme.frame.blurred 

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

    setSelected(isSelected: boolean) {
        this._selected = isSelected
    }

    update() {
        this._drawFrame()
    }
}