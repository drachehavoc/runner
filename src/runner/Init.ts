import "./Keyboard"
import { CursorController } from "../interface/CursorController"

CursorController.hide().clearScreen()
process.stdout.on("resize", () => CursorController.clearScreen())
process.on('exit', () => CursorController.clearScreen().unhide())