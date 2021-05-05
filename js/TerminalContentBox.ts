import { EventsHandler } from "./EventsHandler";
import { point } from "./point";
import { TerminalBox } from "./TerminalBox";
import { TerminalContext } from "./TerminalContext";

type TPanelOnAddContent = (self: TerminalContentBox) => any

export class TerminalContentBox {
    protected _events = new EventsHandler({
        addContent: [] as TPanelOnAddContent[]
    })

    protected _width = 0

    protected _height = 0

    protected _content: string[] = []

    protected _position = { y: 0, x: 0 }

    constructor(
        protected _box: TerminalBox
    ) {
        //
    }

    protected _draw() {
        const ySize = this._box.size.y + 1
        const xSize = this._box.size.x + 1
        const xInit = this._position.x
        for (let linePos = ySize; linePos--;) {
            const lineId = linePos + this._position.y
            const lineContent = this._content[lineId]?.substr(xInit, xSize).padEnd(xSize, ' ') ?? ` `.repeat(xSize)
            TerminalContext
                .move(this._box.topLeft, point(0, linePos))
                .write(lineContent)
        }
    }

    add(content: string) {
        const lines = content.split(/\n/gm)
        this._height += lines.length
        lines.forEach(line => {
            if (line.length > this._width)
                this._width = line.length
            this._content.push(line)
        })
        this._events.fire('addContent', this)
        this._draw()
    }

    scrollDown() {
        this._position.y++
        const s = this._height - this._box.size.y - 1
        if (this._position.y >  s)
            return this._position.y = s
        this._draw()
    }

    scrollUp() {
        this._position.y--
        if (this._position.y < 0)
            return this._position.y = 0
        this._draw()
    }

    scrollLeft() {
        this._position.x--
        if (this._position.x < 0)
            return this._position.x = 0
        this._draw()
    }

    scrollRight() {
        this._position.x++
        const s = this._width - this._box.size.x - 1
        if (this._position.x >  s)
            return this._position.x = s
        this._draw()
    }
}