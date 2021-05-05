// import { clearStack } from "./clearStack";
// import { fireFactory, onFactory, sumPoints } from "./Util";

// const std = process.stdout

// type TBoxPointUpdate = (self: Box) => TPoint
// type TBoxOnResize = (self: Box) => any

// export class Box {
//     static fnSize(point: TPoint) {
//         return (box: Box) => ({
//             x: box.start.x + point.x,
//             y: box.start.y + point.y,
//         });
//     }

//     static fnTerminalSize(point: TPoint = { x: 0, y: 0 }) {
//         return () => ({
//             x: Box.terminalSizeX - point.x,
//             y: Box.terminalSizeY - point.y,
//         });
//     }

//     static get terminalSizeX() {
//         return std.columns - 1
//     }

//     static get terminalSizeY() {
//         return std.rows - 1
//     }

//     private _events = {
//         resize: [] as TBoxOnResize[]
//     }

//     private _cache = {
//         start: { x: NaN, y: NaN },
//         end: { x: NaN, y: NaN },
//         size: { x: NaN, y: NaN },
//     }

//     private _fire = fireFactory(this._events)

//     constructor(
//         protected _start: TPoint | TBoxPointUpdate,
//         protected _end: TPoint | TBoxPointUpdate,
//     ) {
//         this._calculateValues()
//         clearStack.add(() => {
//             this._calculateValues()
//             this._fire('resize', this)
//         })
//     }

//     private _calculateValues() {
//         this._cache.start = this._start instanceof Function
//             ? this._start(this)
//             : { ... this._start }

//         this._cache.end = this._end instanceof Function
//             ? this._end(this)
//             : { ... this._end }

//         this._cache.size = {
//             x: this._cache.end.x - this._cache.start.x,
//             y: this._cache.end.y - this._cache.start.y,
//         }
//     }

//     on = onFactory(this._events)

//     fnTopRight(point: TPoint = { x: 0, y: 0 }, ...points: TPoint[]) {
//         return () => sumPoints(this.topRight, point, ...points)
//     }

//     get start(): TPoint {
//         return this._cache.start
//     }

//     get end(): TPoint {
//         return this._cache.end
//     }

//     get size(): TPoint {
//         return this._cache.size
//     }

//     get topLeft() {
//         return this.start;
//     }

//     get topRight() {
//         return { x: this.end.x, y: this.start.y };
//     }

//     get bottomRight() {
//         return this.end;
//     }

//     get bottomLeft() {
//         return { x: this.start.x, y: this.end.y };
//     }
// }