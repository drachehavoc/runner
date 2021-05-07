import { EventsHandler } from "./EventsHandler"
import { sumPoints, TPoint } from "./point"

export type colorSet = { [color: string]: [string, string] }

export type TForegroundColors = keyof typeof colors.foreground

export type TBackgroundColors = keyof typeof colors.background

const _events = new EventsHandler({
    clear: [] as Array<() => any>,
    resize: [] as Array<() => any>,
})

const charEsc = '\x1b[';

const colors = {
    foreground: <colorSet>{
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

    background: <colorSet>{
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

process.stdout.on('resize', () => _events.fire('resize'))

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
        return TerminalContext.escCode("?25", "l")
    }

    static unhide() {
        return TerminalContext.escCode("?25", "h")
    }

    static color(color: TForegroundColors) {
        return TerminalContext.escCode(...colors.foreground[color])
    }

    static background(color: TBackgroundColors) {
        return TerminalContext.escCode(...colors.background[color])
    }

    static italic() {
        return TerminalContext.escCode("3", "m")
    }

    static reset() {
        return TerminalContext.escCode("0", "m")
    }
}