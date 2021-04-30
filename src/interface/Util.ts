export const point = (x: number, y: number) => ({ x, y });

export const sumPoints = (...points: [TPoint, ...TPoint[]]) => {
    let x = 0
    let y = 0
    points.forEach(point => { x += point.x, y += point.y })
    return point(x, y)
}