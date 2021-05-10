import { point } from "./point"
import { TerminalContentBox } from "./TerminalContentBox"
import { TerminalContext } from "./TerminalContext"
import { TerminalTheme } from "./Theme";

export class TerminalContentSelectorBox extends TerminalContentBox {
    protected _focusedLineIdx = 0

    protected _selectedLineIdx = 0

    protected _callbacks: Function[] = []

    protected _draw() {
        const ySize = this._box.size.y + 1
        const xSize = this._box.size.x
        const xInit = this._position.x

        for (let linePos = ySize; linePos--;) {
            const lineIdx = linePos + this._position.y
            const focused = this._focusedLineIdx === lineIdx ? TerminalTheme.frame.selected.color.border.foreground : "default"    
            let lineContent = this._content[lineIdx]
            if (lineContent) {
                // const selected = this._selectedLineIdx == lineIdx ? " ᐳ " : ""
                const selected = this._selectedLineIdx == lineIdx ? " ❯ " : ""
                const size = xSize - selected.length + 1
                lineContent = lineContent.substr(xInit, size).padEnd(size, ' ') + selected
            } else {
                lineContent = ` `.repeat(xSize)
            }
            TerminalContext
                .move(this._box.topLeft, point(0, linePos))
                .background(focused)
                .write(lineContent)
                .reset()
        }
    }

    add(content: string, callback?: (lineIdx: number) => any) {
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
        this._callbacks[this._selectedLineIdx]?.(this._selectedLineIdx)
        this._draw()
    }
}