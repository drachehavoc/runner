# Luminol Runner

...

# Know Issues

- [ ] Information does not appear until select a task in the 'Process Menu'

# Roadmap

- [ ] TerminalContentBox needs to be changet to cover all escape chars
    - [ ] 
        - [x] \x1bc: clear screen and move cursor to 0x0
        - [ ] \x1b[0J: clears from cursor until end of screen
            - was done, but in a wrong way, it is erasing the entire screen and turning the cursor to 0x0
        - [x] \x1b[1J: clears from cursor to beginning of screen
        - [x] \x1b[2J: clears entire screen
    - Reference: [ANSI Escape Sequences](https://gist.github.com/fnky/458719343aabd01cfb17a3a4f7296797)