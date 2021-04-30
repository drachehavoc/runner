import { Frame } from "../interface/Frame"

const readline = require("readline")
const stdin = process.stdin

readline.emitKeypressEvents(stdin)
stdin.setRawMode(true)

stdin.on("keypress", (c, key) => {
    if (key.name == 'c' && key.ctrl) {
        process.exit()
    }

    if (key.name == 'tab') {
        if (key.shift)
            return Frame.selectPrevious()
        return Frame.selectNext()
    }

    if (key.name == 'backspace') {
        return Frame.current.toggleFixedBar()
    }

    console.log(c, key)
})