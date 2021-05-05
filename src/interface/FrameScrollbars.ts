// import { Box } from "./Box";
// import { Frame } from "./Frame";
// import { Scrollbar } from "./Scrollbar";
// import { point, sumPoints } from "./Util";

// export class FrameScrollbars extends Frame {
//     protected _scrolls: { x: Scrollbar, y: Scrollbar } = this._instantiateScrollbars()

//     protected _fixedScroll = false

//     protected _instantiateScrollbars() {
//         const _boxScrollY = new Box(
//             () => sumPoints(this._box.topRight, point(0, 1)),
//             () => sumPoints(this._box.bottomRight, point(0, -1))
//         )

//         const y = new Scrollbar(_boxScrollY, 'vertical')

//         const _boxScrollX = new Box(
//             () => sumPoints(this._box.bottomLeft, point(1, 0)),
//             () => sumPoints(this._box.bottomRight, point(-1, 0))
//         )

//         const x = new Scrollbar(_boxScrollX, 'horizontal')

//         return { y, x }
//     }

//     protected _isOverflow() {
//         return { x: false, y: false }
//     }

//     protected _updateScrolls() {
//         const theme = this._getTheme()
//         const overflow = this._isOverflow()
//         if (overflow.y)
//             this._scrolls.y.update(null, theme.color.border.foreground, theme.color.border.background)
//         if (overflow.x)
//             this._scrolls.x.update(null, theme.color.border.foreground, theme.color.border.background)
//     }

//     toggleFixedBar() {
//         this._fixedScroll = !this._fixedScroll
//         this._scrolls.y.setBarFixed(this._fixedScroll)
//         this._scrolls.x.setBarFixed(this._fixedScroll)
//     }

//     update() {
//         super._drawFrame()
//         this._updateScrolls()
//     }
// }