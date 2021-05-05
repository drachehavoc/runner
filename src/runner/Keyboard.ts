// import { Frame } from "../interface/Frame"
// import { FramePanels } from "../interface/FramePanels"
// import { FrameScrollbars } from "../interface/FrameScrollbars"

// const readline = require("readline")
// const stdin = process.stdin

// readline.emitKeypressEvents(stdin)
// stdin.setRawMode(true)

// stdin.on("keypress", (c, key) => {
//     if (key.name == 'c' && key.ctrl) {
//         process.exit()
//     }

//     if (key.name == 'tab') {
//         if (key.shift)
//             return Frame.selectPrevious()
//         return Frame.selectNext()
//     }

//     let frame: Frame

//     if ((frame = Frame.getCurrent()) instanceof FrameScrollbars && key.name == 'backspace') {
//         return frame.toggleFixedBar()
//     }

//     if ((frame = Frame.getCurrent()) instanceof FramePanels) {
//         const panel = frame.getCurrentPanel()

//         if (key.name == 'up')
//             return panel.scrollUp()

//         if (key.name == 'down')
//             return panel.scrollDown()

//         if (key.name == 'left')
//             return panel.scrollLeft()

//         if (key.name == 'right')
//             return panel.scrollRight()
//     }

//     console.log(c, key)
// })