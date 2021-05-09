import "./init"
import { pointZero, point, sumPoints } from "./Terminal/point"
import { TerminalBox } from "./Terminal/TerminalBox"
import { TerminalContext } from "./Terminal/TerminalContext"
import { TerminalWindow } from "./Terminal/TerminalWindow"
import { TerminalWindowSelector } from "./Terminal/TerminalWindowSelector"
import { TerminalContentMultipleContentBox } from "./Terminal/TerminalWindowMultipleContentBox"
import { spawn } from "child_process"

// =============================================================================

const winProcesses = new TerminalWindowSelector("Processes", new TerminalBox(
    pointZero(),
    TerminalBox.fnSize(point(30, 10))
))

const winLog = new TerminalContentMultipleContentBox("Log", new TerminalBox(
    () => sumPoints(winProcesses.getBox().topRight, point(1, 0)),
    TerminalBox.fnMaxScreen()
))

const winProcessInformation = new TerminalWindow("Information", new TerminalBox(
    () => sumPoints(winProcesses.getBox().bottomLeft, point(0, 1)),
    () => point(winProcesses.getBox().size.x, TerminalContext.getHeight())
))

// =============================================================================

function createItemProcess(title: string, command: string, ...options: string[]) {
    const winPrcessesContent = winProcesses.getContent()
    const winLogContent = winLog.newContentBox()
    const proc = spawn(command, options)

    winPrcessesContent.add(title, lineIdx => {
        winLog.selectContentBox(winLogContent)
    })

    proc.stdout.on('data', data => {
        winLogContent.add(data.toString())
    })

    proc.stderr.on('data', data => {
        winLogContent.add(data.toString())
    })

    proc.on('close', code => {
        winLogContent.add(`exit with code ${code}`)
    })
}

createItemProcess("Ping Google", "ping", "www.google.com")
createItemProcess("Ping Facebook", "ping", "www.facebook.com")
createItemProcess("Ping UOL", "ping", "www.uol.com.br")