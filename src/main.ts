import "./runner/Init"
import { Box } from "./interface/Box"
import { Frame } from "./interface/Frame"
import { point, sumPoints } from "./interface/Util"
import { FramePanel } from "./interface/FramePanel"

// =============================================================================

import fs from "fs"
import path from "path"
const fileLocation = path.resolve(__dirname, '../\$tempDev/lorem.txt')
const lorem = fs.readFileSync(fileLocation);

// =============================================================================

const activities = new Frame(
    "Activities",
    new Box(
        point(0, 0),
        () => point(35, Box.terminalSizeY - 10)
    )
)

const information = new Frame(
    "Information",
    new Box(
        () => sumPoints(activities.box.bottomLeft, point(0, 1)),
        () => point(activities.box.size.x, Box.terminalSizeY)
    )
)

const log = new Frame(
    "Logs",
    new Box(
        activities.box.fnTopRight(point(1, 0)),
        Box.fnTerminalSize()
    )
)

// =============================================================================

new FramePanel(new Box(
    () => sumPoints(activities.box.topLeft, point(1, 1)),
    () => sumPoints(activities.box.bottomRight, point(-1, -1))
));