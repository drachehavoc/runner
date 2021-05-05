// import { Box } from "./Box";
// import { CursorController } from "./CursorController";
// import { fireFactory, onFactory, point } from "./Util";

// type TPanelOnAddContent = (self: Panel) => any

// export class Panel {
//     protected _content: string[] = []
//     protected _cursor = new CursorController()
//     protected _size = { y: 0, x: 0 }
//     protected _position = { y: 0, x: 0 }
//     protected _events = {
//         addContent: [] as TPanelOnAddContent[]
//     }

//     constructor(
//         protected _box: Box
//     ) {
//         this._cursor
//             .move(_box.topLeft)
//             .write('A')
//             .move(_box.bottomRight)
//             .write('B')
//     }

//     protected _fire = fireFactory(this._events)

//     update() {
//         const ySize = this._box.size.y + 1
//         const xSize = this._box.size.x + 1
//         const xInit = this._position.x
//         for (let linePos = ySize; linePos--;) {
//             const lineId = linePos + this._position.y
//             const lineContent = this._content[lineId]?.substr(xInit, xSize).padEnd(xSize, ' ') ?? ` `.repeat(xSize)
//             this._cursor
//                 .move(this._box.topLeft, point(0, linePos))
//                 .write(lineContent)
//         }
//     }
    
//     isOverflow() {
//         return {
//             y: this._box.size.y > this._size.y,
//             x: this._box.size.x > this._size.x,
//         }
//     }

//     on = onFactory(this._events)

//     addContent(content: string) {
//         const lines = content.split(/\n/gm)
//         this._size.y += lines.length
//         lines.forEach(line => {
//             if (line.length > this._size.x)
//                 this._size.x = line.length
//             this._content.push(line)
//         })
//         this._fire('addContent', this)
//     }

//     clearLine(lineNo: number) {
//         if (lineNo > this._box.size.y)
//             return;

//         this._cursor
//             .move(this._box.topLeft, point(0, lineNo))
//             .write(` `.repeat(this._box.size.x))
//     }

//     scrollDown() {
//         this._position.y++
//         this.update()
//     }

//     scrollUp() {
//         this._position.y--
//         this.update()
//     }

//     scrollLeft() {
//         this._position.x--
//         this.update()
//     }

//     scrollRight() {
//         this._position.x++
//         this.update()
//     }
// }