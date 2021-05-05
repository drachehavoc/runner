import { pointZero, point, sumPoints } from "./point"
import { TerminalBox } from "./TerminalBox"
import { TerminalContentBox } from "./TerminalContentBox"
import { TerminalContext } from "./TerminalContext"
import { TerminalFrame } from "./TerminalFrame"
import { TerminalHorizontalScroll, TerminalVerticalScroll } from "./TerminalScrollbar"

// =============================================================================

import fs from "fs"
import path from "path"
const fileLocation = path.resolve(__dirname, '../\$tempDev/lorem.txt')
const lorem = fs.readFileSync(fileLocation).toString();

// =============================================================================

const box = new TerminalBox(
    point(10, 10),
    () => point(TerminalContext.getWidth() - 30, TerminalContext.getHeight() - 5)
)

// =============================================================================

const frame = new TerminalFrame(box, "Teste")

// =============================================================================
const verticalScroll = new TerminalVerticalScroll(
    () => sumPoints(box.topRight, point(0, 1)),
    () => box.size.y - 2
)

const horizontalScroll = new TerminalHorizontalScroll(
    () => sumPoints(box.bottomLeft, point(1, 0)),
    () => box.size.x - 2
)

// let percent = 0
// let step = 0.01
// setInterval(() => {
//     percent += step
//     if (percent >= 1 || percent <= 0) step *= -1
//     horizontalScroll.update(percent)
//     verticalScroll.update(percent)
// }, 10)

// =============================================================================

const contentBox = new TerminalContentBox(new TerminalBox(
    () => sumPoints(box.topLeft, point(1, 1)),
    () => sumPoints(box.bottomRight, point(-1, -1))
))

contentBox.add(lorem)

// setInterval(() => {
//     // contentBox.scrollDown()
//     contentBox.scrollRight()
// }, 100)

// =============================================================================

const readline = require("readline")
const stdin = process.stdin

TerminalContext.hide()
readline.emitKeypressEvents(stdin)
stdin.setRawMode(true)
stdin.on("keypress", (c, key) => {
    if (key.name == 'c' && key.ctrl) {
        TerminalContext.unhide()
        TerminalContext.clearScreen()
        TerminalContext.move(pointZero())
        process.exit()
    }

    if (key.name == "left")
        return contentBox.scrollLeft()

    if (key.name == "right")
        return contentBox.scrollRight()

    if (key.name == "up")
        return contentBox.scrollUp()

    if (key.name == "down")
        return contentBox.scrollDown()
})

// =============================================================================