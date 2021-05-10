import readline from "readline"
import { EventsHandler } from "../Util/EventsHandler"
import { sumPoints, TPoint } from "./point"

//
export type TForegroundColors = keyof typeof colors.foreground
export type TEscColorSet = { [color: string]: [string, string] }
export type TColorArray = [TForegroundColors, TBackgroundColors]
export type TBackgroundColors = keyof typeof colors.background

//
const _events = new EventsHandler({
    clear: [] as Array<() => any>,
    keypress: [] as Array<(key: readline.Key) => any>,
    resize: [] as Array<() => any>,
})

//
const charEsc = '\x1b[';

//
const colors = {
    foreground: <TEscColorSet>{
        /****/"default": ["39", "m"],
        //
        /****/black: ["30", "m"],
        /******/red: ["31", "m"],
        /****/green: ["32", "m"],
        /***/yellow: ["33", "m"],
        /*****/blue: ["34", "m"],
        /**/magenta: ["35", "m"],
        /*****/cyan: ["36", "m"],
        /****/white: ["37", "m"],
        //
        /****/"bright-black": ["90", "m"],
        /******/"bright-red": ["91", "m"],
        /****/"bright-green": ["92", "m"],
        /***/"bright-yellow": ["93", "m"],
        /*****/"bright-blue": ["94", "m"],
        /**/"bright-magenta": ["95", "m"],
        /*****/"bright-cyan": ["96", "m"],
        /****/"bright-white": ["97", "m"],
    },

    background: <TEscColorSet>{
        /****/"default": ["49", "m"],
        //
        /****/black: ["40", "m"],
        /******/red: ["41", "m"],
        /****/green: ["42", "m"],
        /***/yellow: ["43", "m"],
        /*****/blue: ["44", "m"],
        /**/magenta: ["45", "m"],
        /*****/cyan: ["46", "m"],
        /****/white: ["47", "m"],
        //
        /****/"bright-black": ["100", "m"],
        /******/"bright-red": ["101", "m"],
        /****/"bright-green": ["102", "m"],
        /***/"bright-yellow": ["103", "m"],
        /*****/"bright-blue": ["104", "m"],
        /**/"bright-magenta": ["105", "m"],
        /*****/"bright-cyan": ["106", "m"],
        /****/"bright-white": ["107", "m"],
    }
}

//
process.stdout.on('resize', () => _events.fire('resize'))

//
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)
process.stdin.on("keypress", (c, k) => _events.fire('keypress', k))

export class TerminalContext {

    static on = _events.on.bind(_events)

    static escCode(code: string, modificator: string = "m") {
        process.stdout.write(charEsc + code + modificator);
        return TerminalContext;
    }

    static getWidth() {
        return process.stdout.columns - 1
    }

    static getHeight() {
        return process.stdout.rows - 1
    }

    static repeat(times: number, callback: (terminalContext: typeof TerminalContext,counter: number) => any) {
        for (let i = 0; i < times; i++)
            callback(TerminalContext, i)
        return TerminalContext
    }

    static walk(...points: [TPoint, ...TPoint[]]) {
        const pos = sumPoints(...points)
        process.stdout.moveCursor(pos.x, pos.y)
        return TerminalContext
    }

    static move(...points: [TPoint, ...TPoint[]]) {
        const pos = sumPoints(...points)
        process.stdout.cursorTo(pos.x, pos.y)
        return TerminalContext
    }

    static write(content: string) {
        process.stdout.write(content)
        return TerminalContext
    }

    static clear() {
        TerminalContext.escCode("2", "J")
        _events.fire('clear')
    }

    static hide() {
        TerminalContext.escCode("?25", "l")
        return TerminalContext
    }

    static unhide() {
        TerminalContext.escCode("?25", "h")
        return TerminalContext
    }

    static color(color: TForegroundColors, backgroundColor?: TBackgroundColors) {
        TerminalContext.escCode(...colors.foreground[color])
        if (backgroundColor)
            this.background(backgroundColor)
        return TerminalContext
    }

    static background(color: TBackgroundColors) {
        TerminalContext.escCode(...colors.background[color])
        return TerminalContext
    }

    static italic() {
        TerminalContext.escCode("3", "m")
        return TerminalContext
    }

    static reset() {
        TerminalContext.escCode("0", "m")
        return TerminalContext
    }
}