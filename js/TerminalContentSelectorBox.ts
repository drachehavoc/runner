import { point } from "./point"
import { TerminalContentBox } from "./TerminalContentBox"
import { TerminalContext } from "./TerminalContext"
import { Theme } from "./Theme";

export class TerminalContentSelectorBox extends TerminalContentBox {
    protected _focusedLineIdx = 0

    protected _selectedLineIdx = 0

    protected _callbacks: Function[] = []

    protected _draw() {
        const ySize = this._box.size.y + 1
        const xSize = this._box.size.x - 1
        const xInit = this._position.x
        for (let linePos = ySize; linePos--;) {
            const lineIdx = linePos + this._position.y
            const selected = this._selectedLineIdx == lineIdx ? "☒ " : "☐ "
            const focused = this._focusedLineIdx === lineIdx ? Theme.frame.selected.color.border.foreground : "default"
            const lineContent = (this._content[lineIdx]?.substr(xInit, xSize).padEnd(xSize, ' ') ?? ` `.repeat(xSize)) + selected
            TerminalContext
                .move(this._box.topLeft, point(0, linePos))
                .background(focused)
                .write(lineContent)
                .reset()
        }
    }

    add(content: string, callback?: Function) {
        if (!callback)
            throw new Error(`'${this.constructor.name}', precisa receber um callback.`)

        this._callbacks[this._height] = callback
        return super.add(content)
    }

    scrollUp() {
        this._focusedLineIdx--

        if (this._focusedLineIdx < 0) {
            this._focusedLineIdx = 0
            return
        }

        const top = this._position.y

        if (this._focusedLineIdx < top)
            return super.scrollUp()

        this._draw()
    }

    scrollDown() {
        this._focusedLineIdx++

        const bottom = this._box.size.y + this._position.y
        if (this._focusedLineIdx > this._height - 1) {
            this._focusedLineIdx = this._height - 1
            return
        }

        if (this._focusedLineIdx > bottom)
            return super.scrollDown()

        this._draw()
    }

    selectFosuedOption() {
        this._selectedLineIdx = this._focusedLineIdx
        this._callbacks[this._selectedLineIdx]?.()
        this._draw()
    }
}