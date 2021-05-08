import { pointZero, point, sumPoints } from "./point"
import { TerminalBox } from "./TerminalBox"
import { TerminalContext } from "./TerminalContext"

// =============================================================================

import fs from "fs"
import path from "path"
import { TerminalWindow } from "./TerminalWindow"
import { TerminalWindowSelector } from "./TerminalWindowSelector"
import { TerminalContentSelectorBox } from "./TerminalContentSelectorBox"
const fileLocation = path.resolve(__dirname, '../\$tempDev/lorem.txt')
const lorem = fs.readFileSync(fileLocation).toString();

// =============================================================================

const winProcesses = new TerminalWindowSelector("Processes", new TerminalBox(
    pointZero(),
    TerminalBox.fnSize(point(30, 10))
))

const winPrcessesContent = winProcesses.getContent()

winPrcessesContent.add("Opção 001", () => console.log("selecionado Opção 001"))
winPrcessesContent.add("Opção 002", () => console.log("selecionado Opção 002"))
winPrcessesContent.add("Opção 003", () => console.log("selecionado Opção 003"))
winPrcessesContent.add("Opção 004", () => console.log("selecionado Opção 004"))
winPrcessesContent.add("Opção 005", () => console.log("selecionado Opção 005"))
winPrcessesContent.add("Opção 006", () => console.log("selecionado Opção 006"))
winPrcessesContent.add("Opção 007", () => console.log("selecionado Opção 007"))
winPrcessesContent.add("Opção 008", () => console.log("selecionado Opção 008"))
winPrcessesContent.add("Opção 009", () => console.log("selecionado Opção 009"))

winPrcessesContent.add("Opção 010", () => console.log("selecionado Opção 010"))
winPrcessesContent.add("Opção 011", () => console.log("selecionado Opção 011"))
winPrcessesContent.add("Opção 012", () => console.log("selecionado Opção 012"))
winPrcessesContent.add("Opção 013", () => console.log("selecionado Opção 013"))
winPrcessesContent.add("Opção 014", () => console.log("selecionado Opção 014"))
winPrcessesContent.add("Opção 015", () => console.log("selecionado Opção 015"))
winPrcessesContent.add("Opção 016", () => console.log("selecionado Opção 016"))
winPrcessesContent.add("Opção 017", () => console.log("selecionado Opção 017"))
winPrcessesContent.add("Opção 018", () => console.log("selecionado Opção 018"))
winPrcessesContent.add("Opção 019", () => console.log("selecionado Opção 019"))


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

    if (key.name == "return") {
        const win = TerminalWindow.selected
        const content = win.getContent()

        if (content instanceof TerminalContentSelectorBox)
            return content.selectFosuedOption();
    }

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