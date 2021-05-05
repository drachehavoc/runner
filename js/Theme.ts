import { TForegroundColors, TBackgroundColors } from "./TerminalContext";

export type TThemeForegroundBackground = {
    foreground: TForegroundColors,
    background: TBackgroundColors
}

export type TThemeFrame = {
    color: {
        border: TThemeForegroundBackground,
        title: TThemeForegroundBackground
    }
}

export type TTheme = {
    frame: TThemeFrame,
    "frame-focused": TThemeFrame,
}

export const Theme: TTheme = {
    frame: {
        color: {
            border: {
                foreground: "white",
                background: "default",
            },
            title: {
                background: "white",
                foreground: "black"
            },
        }
    },

    "frame-focused": {
        color: {
            border: {
                foreground: "cyan",
                background: "default",
            },
            title: {
                foreground: "black",
                background: "cyan",
            },
        }
    },
}