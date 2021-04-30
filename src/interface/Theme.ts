import { TForegroundColors, TBackgroundColors } from "./CursorController";

type TThemeForegroundBackground = {
    foreground: TForegroundColors,
    background: TBackgroundColors
}

type TThemeFrame = {
    color: {
        border: TThemeForegroundBackground,
        title: TThemeForegroundBackground
    }
}

type TTheme = {
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