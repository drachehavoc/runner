import { EventsHandler } from "./EventsHandler"
import { point } from "./point"
import { TerminalBox } from "./TerminalBox"
import { TerminalContext } from "./TerminalContext"

type TOnAddContent = (self: TerminalContentBox) => any
type TOnUpdate = (self: TerminalContentBox) => any
type TOnVerticalScrollChange = (self: TerminalContentBox) => any
type TOnHorizontalScrollChange = (self: TerminalContentBox) => any

export class TerminalContentBox {
    protected _events = new EventsHandler({
        addContent: [] as TOnAddContent[],
        update: [] as TOnUpdate[],
        verticalScrollChange: [] as TOnVerticalScrollChange[],
        horizontalScrollChange: [] as TOnHorizontalScrollChange[],
    })

    protected _width = 0

    protected _height = 0

    protected _content: string[] = []

    protected _position = { y: 0, x: 0 }

    constructor(
        protected _box: TerminalBox
    ) {
        this._init()
    }

    protected _init() {
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

    getOverflowX() {
        return this._width > this._box.size.x
    }

    getOverflowY() {
        return this._height > this._box.size.y
    }

    getPositionPercentX() {
        return this._position.x / (this._width - this._box.size.x)
    }

    getPositionPercentY() {
        return this._position.y / (this._height - this._box.size.y)
    }

    on = this._events.on.bind(this._events)

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
        this._events.fire('verticalScrollChange', this)
        const s = Math.max(this._height - this._box.size.y - 1, 0)
        if (this._position.y > s) {
            this._position.y = s
            return
        }
        this._draw()
    }

    scrollUp() {
        this._position.y--
        this._events.fire('verticalScrollChange', this)
        if (this._position.y < 0) {
            this._position.y = 0
            return
        }
        this._draw()
    }

    scrollLeft() {
        this._position.x--
        this._events.fire('horizontalScrollChange', this)
        if (this._position.x < 0) {
            this._position.x = 0
            return
        }
        this._draw()
    }

    scrollRight() {
        this._position.x++
        const s = Math.max(this._width - this._box.size.x - 1, 0)
        this._events.fire('horizontalScrollChange', this)
        if (this._position.x > s) {
            this._position.x = s
            return
        }
        this._draw()
    }

    update() {
        this._draw()
        this._events.fire("update", this)
    }
}