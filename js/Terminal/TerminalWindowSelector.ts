import { point, sumPoints } from "./point"
import { TerminalBox } from "./TerminalBox"
import { TerminalContentSelectorBox } from "./TerminalContentSelectorBox"
import { TerminalWindow } from "./TerminalWindow"

export class TerminalWindowSelector extends TerminalWindow {
    protected _content!: TerminalContentSelectorBox

    protected _createContentRaw() {
        const content = new TerminalContentSelectorBox(new TerminalBox(
            () => sumPoints(this._box.topLeft, point(1, 1)),
            () => sumPoints(this._box.bottomRight, point(-1, -1))
        ))
        return content
    }

    getContent(): TerminalContentSelectorBox {
        return this._content
    }
}