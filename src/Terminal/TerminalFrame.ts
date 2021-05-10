import { point } from "./point";
import { TerminalBox } from "./TerminalBox";
import { TColorArray, TerminalContext } from "./TerminalContext";
import { TerminalTheme } from "./Theme";

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
        // === constants =======================================================

        const cursor = TerminalContext

        const box = this._box

        const theme = this._selected
            ? TerminalTheme.frame.selected
            : TerminalTheme.frame.blurred

        const bar_cl: TColorArray = [
            theme.color.border.foreground,
            theme.color.border.background]

        const title_cl: TColorArray = [
            theme.color.title.foreground,
            theme.color.title.background]

        // == title ============================================================

        const reticensesTitle = this._title.length > box.size.x - 3 ? '…' : ' '

        const formatedTitle = ` ${this._title.substr(0, box.size.x - 3)}${reticensesTitle}`

        // === top bar =========================================================

        cursor
            // corner top left
            .reset()
            .color(...bar_cl)
            .move(box.topLeft)
            .write("┌")

            // title
            .reset()
            .italic()
            .color(...title_cl)
            .write(formatedTitle)

            // top bar
            .reset()
            .color(...bar_cl)
            .write('─'.repeat(box.size.x - formatedTitle.length - 1))

            // corner top right
            .reset()
            .color(...bar_cl)
            .write("┐")

        //

        if (box.size.y <= 0)
            return

        // === bottom bar ======================================================

        cursor
            // corner bottom left
            .reset()
            .color(...bar_cl)
            .move(box.bottomLeft)
            .write("└")

            // bottom bar
            .reset()
            .color(...bar_cl)
            .write('─'.repeat(box.size.x - 1))

            // corner top right
            .reset()
            .color(...bar_cl)
            .write("┘")


        // === vertival bars ===================================================

        TerminalContext
            .color(...bar_cl)
            .repeat(box.size.y - 1, (cr, cnt) => cr
                .move(box.topLeft, point(0, cnt + 1))
                .write("│")
                .move(box.topRight, point(0, cnt + 1))
                .write("│"))
            .reset()
    }

    setSelected(isSelected: boolean) {
        this._selected = isSelected
    }

    update() {
        this._drawFrame()
    }
}