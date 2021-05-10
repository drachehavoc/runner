import "./init"
import { pointZero, point, sumPoints } from "./Terminal/point"
import { TerminalBox } from "./Terminal/TerminalBox"
import { TerminalContext } from "./Terminal/TerminalContext"
import { TerminalWindowSelector } from "./Terminal/TerminalWindowSelector"
import { TerminalWindowMultipleContentBox } from "./Terminal/TerminalWindowMultipleContentBox"
import { spawn } from "child_process"
import pidusage from "pidusage"
import prettyMilliseconds from "pretty-ms"
import prettyBytes from "pretty-bytes"

// =============================================================================

const winProcesses = new TerminalWindowSelector("Processes", new TerminalBox(
    pointZero(),
    () => point(30, TerminalContext.getHeight() - 7)
))

const winLog = new TerminalWindowMultipleContentBox("Log", new TerminalBox(
    () => sumPoints(winProcesses.getBox().topRight, point(1, 0)),
    TerminalBox.fnMaxScreen()
))

const winProcessInformation = new TerminalWindowMultipleContentBox("Information", new TerminalBox(
    () => sumPoints(winProcesses.getBox().bottomLeft, point(0, 1)),
    () => point(winProcesses.getBox().size.x, TerminalContext.getHeight())
))

// =============================================================================

let computeProccesStats: Function

function interval(time: number) {
    setTimeout(async () => {
        if (computeProccesStats)
            computeProccesStats()
        interval(time)
    }, time)
}

interval(1000)

function createItemProcess(title: string, command: string, ...options: string[]) {
    const winPrcessesContent = winProcesses.getContent()
    const winLogContent = winLog.newContentBox()
    const winProcessContent = winProcessInformation.newContentBox()
    const proc = spawn(command, options)

    const infos = async () => {
        winProcessContent.clear()
        pidusage(proc.pid, (err, stats) => {
            if (err)
                winProcessContent.add(`STATS ERROR: ${err}`)

            winProcessContent.add(`       pid: ${proc.pid}`)
            winProcessContent.add(`      ppid: ${stats.ppid}`)
            winProcessContent.add(` cpu usage: ${stats.cpu}`)
            winProcessContent.add(` mem usage: ${prettyBytes(stats.memory)}`)
            winProcessContent.add(`   elapsed: ${prettyMilliseconds(stats.elapsed)}`)
        })
    }

    winPrcessesContent.add(title, lineIdx => {
        winLog.selectContentBox(winLogContent)
        infos()
        computeProccesStats = infos
        winProcessInformation.selectContentBox(winProcessContent)
    })


    proc.stdout.on('data', data => {
        winLogContent.add(data.toString().replace(/\r*\n$/, ""))
    })

    proc.stderr.on('data', data => {
        winLogContent.add(data.toString().replace(/\r*\n$/, ""))
    })

    proc.on('close', code => {
        winLogContent.add(`exit with code ${code}`)
    })
}

createItemProcess("Ping Google", "ping", "www.google.com")
createItemProcess("Ping Facebook", "ping", "www.facebook.com")
createItemProcess("Ping UOL", "ping", "www.uol.com.br")