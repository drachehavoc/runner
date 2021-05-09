import { pointZero } from "./Terminal/point"
import { TerminalContentSelectorBox } from "./Terminal/TerminalContentSelectorBox"
import { TerminalContext } from "./Terminal/TerminalContext"
import { TerminalWindow } from "./Terminal/TerminalWindow"

TerminalContext.hide()

TerminalContext.on('resize', () => {
    TerminalContext.clear()
    TerminalWindow.updateAll()
})

TerminalContext.on("keypress", key => {
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