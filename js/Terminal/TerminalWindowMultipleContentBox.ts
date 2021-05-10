import { point, sumPoints } from "./point"
import { TerminalBox } from "./TerminalBox"
import { TerminalContentBox } from "./TerminalContentBox"
import { TerminalWindow } from "./TerminalWindow"

let delme = 0

class TerminalContentBoxF extends TerminalContentBox {
    delme = delme++

    constructor(
        protected _window?: TerminalWindowMultipleContentBox,
        ...args: ConstructorParameters<typeof TerminalContentBox>
    ) {
        super(...args)
    }

    add(content: string) {
        this._add(content)
        if (this._window?.getContent() == this)
            this._draw()
    }
}

export class TerminalWindowMultipleContentBox extends TerminalWindow {
    protected _contents: TerminalContentBox[] = []

    protected _currentContent?: TerminalContentBoxF

    protected _createContentRaw() {
        return new TerminalContentBoxF(
            this,
            new TerminalBox(
                () => sumPoints(this._box.topLeft, point(1, 1)),
                () => sumPoints(this._box.bottomRight, point(-1, -1))
            )
        )
    }

    newContentBox() {
        const content = this._createContent() as TerminalContentBoxF
        if (!this._currentContent)
            this._currentContent = content
        this._contents.push(content)
        return content
    }

    getContent() {
        if (!this._currentContent)
            throw new Error(`${this.constructor.name} dosent has any ContentBox at moment, please create with ${this.constructor.name}.newPanel().`)
        return this._currentContent
    }

    selectContentBox(content: TerminalContentBoxF) {
        if (!this._contents.includes(content))
            throw new Error(`${content.constructor.name} is not part of ${this.constructor.name}`)
        this._currentContent = content
        content.update()
    }
}