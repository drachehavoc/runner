# Luminol Runner

...

# Know Issues

- [ ] Information does not appear until select a task in the 'Process Menu'

# Roadmap

- [ ] TerminalContentBox needs to be changet to cover all escape chars
    - [ ] Erase Functions
        - [x] ESCc: clear screen and move cursor to 0x0
        - [ ] ESC[0J: clears from cursor until end of screen
            - was done, but in a wrong way, it is erasing the entire screen and turning the cursor to 0x0
        - [x] ESC[1J: clears from cursor to beginning of screen
        - [x] ESC[2J: clears entire screen
        - [ ] ESC[K: clears the current line
        - [ ] ESC[0K: clears from cursor to end of line
        - [ ] ESC[1K: clears from cursor to start of line
        - [ ] ESC[2K: clears entire line
    - [ ] Cursor Controls
        - [ ] ESC[H: moves cursor to home position (0, 0)
        - [ ] ESC[{line};{column}H: moves cursor to line #, column #
        - [ ] ESC[{line};{column}f: moves cursor to line #, column #
        - [ ] ESC[#A: moves cursor up # lines
        - [ ] ESC[#B: moves cursor down # lines
        - [ ] ESC[#C: moves cursor right # columns
        - [ ] ESC[#D: moves cursor left # columns
        - [ ] ESC[#E: moves cursor to beginning of next line, # lines down
        - [ ] ESC[#F: moves cursor to beginning of previous line, # lines down
        - [ ] ESC[#G: moves cursor to column #
        - [ ] ESC[6n: request cursor position (reports as ESC[#;#R)
        - [ ] ESC[s: save cursor position
        - [ ] ESC[u: restores the cursor to the last saved position
    - [ ] Colors / Graphics Mode
        - [ ] ESC[{...}m: Set graphics mode for cell and onward.
        - [ ] ESC[0m: reset all modes (styles and colors
        - [ ] ESC[1m: set bold mode.
        - [ ] ESC[2m: set dim/faint mode.
        - [ ] ESC[3m: set italic mode.
        - [ ] ESC[4m: set underline mode.
        - [ ] ESC[5m: set blinking mode
        - [ ] ESC[7m: set inverse/reverse mode
        - [ ] ESC[8m: set invisible mode
        - [ ] ESC[9m: set strikethrough mode.
    - Reference: [ANSI Escape Sequences](https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797)