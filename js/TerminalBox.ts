import { sumPoints, TPoint } from "./point";
import { TerminalContext } from "./TerminalContext";
import { EventsHandler } from "./EventsHandler";

type TBoxPointUpdate = (self: TerminalBox) => TPoint
type TBoxOnResize = (self: TerminalBox) => any

export class TerminalBox {
    protected _events = new EventsHandler({
        resize: [] as TBoxOnResize[]
    })

    protected _cache: {
        start?: TPoint
        end?: TPoint
        size?: TPoint
    } = {}

    constructor(
        protected _start: TPoint | TBoxPointUpdate,
        protected _end: TPoint | TBoxPointUpdate,
    ) {
        this._init()
    }

    protected _init() {
        this._cache = this._calculateValues()
        TerminalContext.on('clear', () => this._update())
        TerminalContext.on('resize', () => this._update())
    }

    protected _update() {
        this._cache = this._calculateValues()
        this._events.fire('resize', this)
    }

    protected _calculateValues() {
        const start = this._start instanceof Function
            ? this._start(this)
            : this._start

        const end = this._end instanceof Function
            ? this._end(this)
            : this._end

        const size = {
            x: end.x - start.x,
            y: end.y - start.y,
        }

        return { start, end, size }
    }

    on = this._events.on.bind(this._events)

    fnTopRight(point: TPoint = { x: 0, y: 0 }, ...points: TPoint[]) {
        return () => sumPoints(this.topRight, point, ...points)
    }

    get start(): TPoint {
        return this._cache.start ?? (this._cache = this._calculateValues()).start
    }

    get end(): TPoint {
        return this._cache.end ?? (this._cache = this._calculateValues()).end
    }

    get size(): TPoint {
        return this._cache.size ?? (this._cache = this._calculateValues()).size
    }

    get topLeft() {
        return this.start;
    }

    get topRight() {
        return { x: this.end.x, y: this.start.y };
    }

    get bottomRight() {
        return this.end;
    }

    get bottomLeft() {
        return { x: this.start.x, y: this.end.y };
    }
}