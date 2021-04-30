"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./Keyboard");
const CursorController_1 = require("../interface/CursorController");
CursorController_1.CursorController.hide().clearScreen();
process.stdout.on("resize", () => CursorController_1.CursorController.clearScreen());
process.on('exit', () => CursorController_1.CursorController.clearScreen().unhide());
