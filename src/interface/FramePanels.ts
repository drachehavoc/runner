// import { FrameScrollbars } from "./FrameScrollbars";
// import { Box } from "./Box";
// import { Panel } from "./Panel";
// import { point, sumPoints } from "./Util";

// export class FramePanels extends FrameScrollbars {
//     protected _panels: Map<Panel, string> = new Map()

//     constructor(...args: ConstructorParameters<typeof FrameScrollbars>) {
//         super(...args)
//     }

//     protected _panelsBox = new Box(
//         () => sumPoints(this._box.topLeft, point(1, 1)),
//         () => sumPoints(this._box.bottomRight, point(-1, -1))
//     )

//     protected _currentPanel?: Panel

//     addPanel(title?: string) {
//         const panel = new Panel(this._panelsBox)
//         this._panels.set(panel, title ?? super._title)
//         return panel
//     }

//     getCurrentPanel() {
//         return this._currentPanel ?? (this._currentPanel = this.addPanel())
//     }

//     update() {
//         super._drawFrame()
//         this.getCurrentPanel().update()
//     }
// }