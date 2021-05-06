import { pointZero, point, sumPoints } from "./point"
import { TerminalBox } from "./TerminalBox"
import { TerminalContext } from "./TerminalContext"

// =============================================================================

import fs from "fs"
import path from "path"
import { TerminalWindow } from "./TerminalWindow"
const fileLocation = path.resolve(__dirname, '../\$tempDev/lorem.txt')
const lorem = fs.readFileSync(fileLocation).toString();

// =============================================================================

const winA = new TerminalWindow("win - a", new TerminalBox(
    pointZero(),
    TerminalBox.fnSize(point(20, 10))
))

const winZ = new TerminalWindow("win - z", new TerminalBox(
    () => sumPoints(winA.getBox().bottomLeft, point(0, 1)),
    () => point(winA.getBox().size.x, TerminalContext.getHeight())
))

winA.getContent().add(lorem)

const winB = new TerminalWindow("win - b", new TerminalBox(
    () => sumPoints(winA.getBox().topRight, point(1, 0)),
    TerminalBox.fnMaxScreen()
))


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

    if (key.name == "tab")
        TerminalWindow[key.shift ? "previous" : "next"]()

    // if (key.name == "left")
    //     return contentBox.scrollLeft()

    // if (key.name == "right")
    //     return contentBox.scrollRight()

    // if (key.name == "up")
    //     return contentBox.scrollUp()

    // if (key.name == "down")
    //     return contentBox.scrollDown()
})

// =============================================================================