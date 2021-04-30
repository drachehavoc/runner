"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumPoints = exports.point = void 0;
const point = (x, y) => ({ x, y });
exports.point = point;
const sumPoints = (...points) => {
    let x = 0;
    let y = 0;
    points.forEach(point => { x += point.x, y += point.y; });
    return exports.point(x, y);
};
exports.sumPoints = sumPoints;
