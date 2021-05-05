// import { Box } from "./Box";
// import { CursorController } from "./CursorController";
// import { Theme } from "./Theme";
// import { point, sumPoints } from "./Util";

// const FramesList: Frame[] = []

// let SelectedFrame: Frame;

// export class Frame {
//     static getCurrent() {
//         return SelectedFrame
//     }

//     static selectStep(step: number) {
//         const currentIdx = FramesList.indexOf(SelectedFrame)
//         const nextIdx = currentIdx + step
//         const prevSelectedFrame = SelectedFrame;
//         const lastFrameListIdx = FramesList.length - 1

//         let nextSelectedFrame: Frame = FramesList[nextIdx]

//         if (!nextSelectedFrame) {
//             if (nextIdx > lastFrameListIdx)
//                 nextSelectedFrame = FramesList[0]

//             if (nextIdx < 0)
//                 nextSelectedFrame = FramesList[lastFrameListIdx]
//         }

//         SelectedFrame = nextSelectedFrame
//         prevSelectedFrame.update()
//         nextSelectedFrame.update()
//     }

//     static selectNext() {
//         return Frame.selectStep(1)
//     }

//     static selectPrevious() {
//         return Frame.selectStep(-1)
//     }

//     // =========================================================================

//     protected _cursor = new CursorController()

//     constructor(
//         protected _title: string,
//         protected _box: Box,
//     ) {
//         if (!SelectedFrame)
//             SelectedFrame = this
//         FramesList.push(this)
//         _box.on("resize", () => this.update())
//         this.init()
//     }

//     init() {
//         this.update()
//     }

//     protected _getTheme() {
//         return SelectedFrame === this ? Theme["frame-focused"] : Theme["frame"]
//     }

//     protected _drawFrame() {
//         const cursor = this._cursor
//         const box = this._box
//         const theme = this._getTheme()

//         // frame colors
//         cursor
//             .color(theme.color.border.foreground)
//             .background(theme.color.border.background)

//         // corners

//         cursor
//             .move(box.topLeft)
//             .write("┌")

//             .move(box.topRight)
//             .write("┐")

//             .move(box.bottomLeft)
//             .write("└")

//             .move(box.bottomRight)
//             .write("┘")

//         // horizontal bars

//         const sizeX = box.size.x - 1

//         const horizBar = '─'.repeat(sizeX >= 1 ? sizeX : 1);

//         cursor
//             .move(box.topLeft, point(1, 0))
//             .write(horizBar)
//             .move(box.bottomLeft, point(1, 0))
//             .write(horizBar)

//         // vertival bars

//         for (let top = box.size.y; top-- > 1;) {
//             cursor
//                 .move(box.topLeft, point(0, top))
//                 .write("│")
//                 .move(box.topRight, point(0, top))
//                 .write("│")
//         }

//         // title

//         const formatedTitle = this._title.substr(0, box.size.x - 3)

//         cursor
//             .move(box.topLeft, point(1, 0))
//             .italic()
//             .color(theme.color.title.foreground)
//             .background(theme.color.title.background)
//             .write(` ${formatedTitle}${formatedTitle != this._title ? '…' : ' '}`)
//             .reset();

//         // 
//         cursor
//             .reset()
//     }

//     update() {
//         this._drawFrame()
//     }

//     getBox() {
//         return this._box
//     }
// }