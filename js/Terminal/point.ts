export type TPoint = { x: number, y: number }

export const point = (x: number, y: number): TPoint => ({ x, y })

export const sumPoints = (...points: [TPoint, ...TPoint[]]) => points.reduce((a, b) => ({ x: a.x + b.x, y: a.y + b.y }))

export const pointZero = (): TPoint => ({ x: 0, y: 0 })