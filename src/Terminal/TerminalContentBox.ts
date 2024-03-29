import { EventsHandler } from "../Util/EventsHandler"
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

    protected _threatLine(lineContent: string) {
        let scape

        // TRATA ESCAPES DE CLEAR SCREEN
        // @TO-DO: limpar linha a esquerda e limpar linha a direita, precisam 
        //         serem tratados separadamente, da forma em que esta, um 
        //         simple limpar linha, limpa a tela toda.
        if (
            lineContent.includes(scape = '\x1bc') ||
            lineContent.includes(scape = '\x1b[0J') ||
            lineContent.includes(scape = '\x1b[1J') ||
            lineContent.includes(scape = '\x1b[2J') ||
            lineContent.includes(scape = '\x1b[3J')
        ) {
            this.clear()
            lineContent = lineContent.substr(lineContent.lastIndexOf(scape) + scape.length)
            if (lineContent.trim() == "") return
            this._threatLine(lineContent)
            return
        }

        // REMOVE SCAPES AINDA NÃO TRATADOS
        // @TO-DO: isto esta aqui para evitar outros escapes que ainda não foram
        //         tratados, a ideia é que um dia todos sejam tratados e assim
        //         esta linha será removida
        lineContent = lineContent.replace('\x1b', "[ESC]")

        //
        if (lineContent.length > this._width)
            this._width = lineContent.length

        //
        this._content.push(lineContent)
    }

    protected _add(content: string) {
        const lines = content.split(/\n/gm)
        this._height += lines.length
        lines.forEach(l => this._threatLine(l))
        this._events.fire('addContent', this)
    }

    protected _draw() {
        if (this._box.size.y <= 0 || this._box.size.x <= 0)
            return

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
        return this._height - 1 > this._box.size.y
    }

    getPositionPercentX() {
        return this._position.x / (this._width - this._box.size.x)
    }

    getPositionPercentY() {
        return this._position.y / (this._height - this._box.size.y)
    }

    on = this._events.on.bind(this._events)

    add(content: string) {
        this._add(content)
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

    clear() {
        this._width = 0
        this._height = 0
        this._content = []
        // this._position = { y: 0, x: 0 }
    }

    update() {
        this._draw()
        this._events.fire("update", this)
    }
}