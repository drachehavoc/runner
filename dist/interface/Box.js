"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
const Util_1 = require("./Util");
const std = process.stdout;
class Box {
    constructor(_start, _end) {
        this._start = _start;
        this._end = _end;
        this._events = {
            resize: new Set()
        };
        this._cache = {
            start: { x: NaN, y: NaN },
            end: { x: NaN, y: NaN },
            size: { x: NaN, y: NaN },
        };
        this._calculateValues();
        std.on("resize", () => {
            this._calculateValues();
            this._events.resize.forEach(evt => evt(this));
        });
    }
    // =========================================================================
    static fnSize(point) {
        return (box) => ({
            x: box.start.x + point.x,
            y: box.start.y + point.y,
        });
    }
    static fnTerminalSize(point = { x: 0, y: 0 }) {
        return () => ({
            x: Box.terminalSizeX - point.x,
            y: Box.terminalSizeY - point.y,
        });
    }
    static get terminalSizeX() {
        return std.columns - 1;
    }
    static get terminalSizeY() {
        return std.rows - 1;
    }
    _calculateValues() {
        this._cache.start = this._start instanceof Function
            ? this._start(this)
            : { ...this._start };
        this._cache.end = this._end instanceof Function
            ? this._end(this)
            : { ...this._end };
        this._cache.size = {
            x: this._cache.end.x - this._cache.start.x,
            y: this._cache.end.y - this._cache.start.y,
        };
    }
    on(eventType, callback) {
        if (!this._events[eventType])
            throw new Error('EventType not permited.');
        this._events[eventType].add(callback);
    }
    fnTopRight(point = { x: 0, y: 0 }, ...points) {
        return () => Util_1.sumPoints(this.topRight, point, ...points);
    }
    get start() {
        return this._cache.start;
    }
    get end() {
        return this._cache.end;
    }
    get size() {
        return this._cache.size;
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
exports.Box = Box;
