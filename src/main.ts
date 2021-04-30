import "./runner/Init"
import { Box } from "./interface/Box"
import { Frame } from "./interface/Frame"
import { point, sumPoints } from "./interface/Util"

const activities = new Frame(
    "Activities",
    new Box(
        point(0, 0),
        () => point(35, Box.terminalSizeY - 10)
    )
)

const log = new Frame(
    "Logs",
    new Box(
        activities.box.fnTopRight(point(1, 0)),
        Box.fnTerminalSize()
    )
)

const information = new Frame(
    "Information",
    new Box(
        () => sumPoints(activities.box.bottomLeft, point(0, 1)),
        () => point(activities.box.size.x, Box.terminalSizeY)
    )
)