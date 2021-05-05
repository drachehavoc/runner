// import "./runner/Init"
// import { Box } from "./interface/Box"
// import { Frame } from "./interface/Frame"
// import { point, sumPoints } from "./interface/Util"

// // =============================================================================

// import fs from "fs"
// import path from "path"
// import { FramePanels } from "./interface/FramePanels"
// const fileLocation = path.resolve(__dirname, '../\$tempDev/lorem.txt')
// const lorem = fs.readFileSync(fileLocation);

// // =============================================================================

// const activities = new Frame(
//     "Activities",
//     new Box(
//         point(0, 0),
//         () => point(35, Box.terminalSizeY - 10)
//     )
// )

// const information = new Frame(
//     "Information",
//     new Box(
//         () => sumPoints(activities.getBox().bottomLeft, point(0, 1)),
//         () => point(activities.getBox().size.x, Box.terminalSizeY)
//     )
// )

// const log = new FramePanels(
//     "Logs",
//     new Box(
//         activities.getBox().fnTopRight(point(1, 0)),
//         Box.fnTerminalSize()
//     )
// )

// // =============================================================================

// const panel = log.getCurrentPanel()
// panel.addContent("OI")
// panel.addContent(lorem.toString())