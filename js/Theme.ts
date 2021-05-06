import { TForegroundColors, TBackgroundColors } from "./TerminalContext";

// export type TThemeForegroundBackground = {
//     foreground: TForegroundColors,
//     background: TBackgroundColors
// }

// export type TThemeFrame = {
//     color: {
//         border: TThemeForegroundBackground,
//         title: TThemeForegroundBackground,
//     }

// }

// export type TThemeScroll = {

// }

// export type TTheme = {
//     frame: TThemeFrame,
//     "frame-focused": TThemeFrame,
// }

// export const Theme: TTheme = {
//     frame: {
//         color: {
//             border: {
//                 foreground: "white",
//                 background: "default",
//             },
//             title: {
//                 background: "white",
//                 foreground: "black"
//             },
//         },
//     },

//     "frame-focused": {
//         color: {
//             border: {
//                 foreground: "cyan",
//                 background: "default",
//             },
//             title: {
//                 foreground: "black",
//                 background: "cyan",
//             },
//         }
//     },
// }
















export type TThemeForegroundBackground = {
    foreground: TForegroundColors,
    background: TBackgroundColors
}

export type TThemeColorFrame = {
    color: {
        title: TThemeForegroundBackground
        border: TThemeForegroundBackground
    },
}

export type TThemeFrame = {
    blurred: TThemeColorFrame,
    selected: TThemeColorFrame,
}

export type TThemeColorScroll = {
    color: TThemeForegroundBackground
}

export type TThemeScroll = {
    blurred: TThemeColorScroll,
    selected: TThemeColorScroll,
}

export type TTheme = {
    frame: TThemeFrame,
    scroll: TThemeScroll
}

const frame: TThemeFrame = {
    blurred: {
        color: {
            title: {
                background: "white",
                foreground: "black",
            },
            border: {
                foreground: "white",
                background: "default",
            },
        },
    },
    selected: {
        color: {
            title: {
                foreground: "black",
                background: "cyan",
            },
            border: {
                foreground: "cyan",
                background: "default",
            },
        },
    },
}

const scroll: TThemeScroll = {
    blurred: {
        color: {
            foreground: "white",
            background: "default",
        }
    },
    selected: {
        color: {
            foreground: "cyan",
            background: "default",
        }
    }
}

export const Theme: TTheme = {
    frame,
    scroll,
}