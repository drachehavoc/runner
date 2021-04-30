import { Box } from "./Box";
import { CursorController } from "./CursorController";

export class FramePanel {
    private _content: string[] = []
    private _cursor = new CursorController()
    private _size = { vertical: 0, horizontal: 0 }
    
    constructor(
        private _box: Box
    ) {
        this._cursor
            .move(_box.topLeft)
            .write('A')
            .move(_box.bottomRight)
            .write('B')
    }

    addContent(content: string) {

    }
}