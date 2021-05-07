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

const winProcesses = new TerminalWindow("Processes", new TerminalBox(
    pointZero(),
    TerminalBox.fnSize(point(30, 10))
))

const winProcessInformation = new TerminalWindow("Information", new TerminalBox(
    () => sumPoints(winProcesses.getBox().bottomLeft, point(0, 1)),
    () => point(winProcesses.getBox().size.x, TerminalContext.getHeight())
))

const winLog = new TerminalWindow("Log", new TerminalBox(
    () => sumPoints(winProcesses.getBox().topRight, point(1, 0)),
    TerminalBox.fnMaxScreen()
))

winLog.getContent().add(lorem)

// =============================================================================

TerminalContext.on('resize', () => {
    TerminalContext.clear()
    TerminalWindow.updateAll()
})

// =============================================================================

const readline = require("readline")
const stdin = process.stdin

TerminalContext.hide()
readline.emitKeypressEvents(stdin)
stdin.setRawMode(true)
stdin.on("keypress", (c, key) => {
    if (key.name == 'c' && key.ctrl) {
        TerminalContext.unhide()
        TerminalContext.clear()
        TerminalContext.move(pointZero())
        process.exit()
    }

    if (key.name == "tab")
        return TerminalWindow[key.shift ? "previous" : "next"]()

    if (key.name == "left")
        return TerminalWindow.selected.getContent().scrollLeft()

    if (key.name == "right")
        return TerminalWindow.selected.getContent().scrollRight()

    if (key.name == "up")
        return TerminalWindow.selected.getContent().scrollUp()

    if (key.name == "down")
        return TerminalWindow.selected.getContent().scrollDown()
})

// =============================================================================