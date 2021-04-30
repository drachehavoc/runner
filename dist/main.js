"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./runner/Init");
const Box_1 = require("./interface/Box");
const Frame_1 = require("./interface/Frame");
const Util_1 = require("./interface/Util");
const activities = new Frame_1.Frame("Activities", new Box_1.Box(Util_1.point(0, 0), () => Util_1.point(35, Box_1.Box.terminalSizeY - 10)));
const log = new Frame_1.Frame("Logs", new Box_1.Box(activities.box.fnTopRight(Util_1.point(1, 0)), Box_1.Box.fnTerminalSize()));
const information = new Frame_1.Frame("Information", new Box_1.Box(() => Util_1.sumPoints(activities.box.bottomLeft, Util_1.point(0, 1)), () => Util_1.point(activities.box.size.x, Box_1.Box.terminalSizeY)));
