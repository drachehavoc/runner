// export const point = (x: number, y: number) => ({ x, y });

// export const sumPoints = (...points: [TPoint, ...TPoint[]]) => {
//     let x = 0
//     let y = 0
//     points.forEach(point => { x += point.x, y += point.y })
//     return point(x, y)
// }

// type genericFunctionArray = Array<(...n: any[]) => any>

// export const onFactory = <E extends { [eventName: string]: genericFunctionArray }>(eventList: E) => {
//     return <K extends keyof E>(eventType: K, callback: E[K][number]) => {
//         if (!eventList[eventType])
//             throw new Error('EventType not permited.');
//         eventList[eventType].push(callback);
//     }
// }

// export const fireFactory = <E extends { [eventName: string]: genericFunctionArray }>(eventList: E) => {
//     return <K extends keyof E>(eventType: K, ...parameters: Parameters<E[K][number]>) => {
//         eventList[eventType].forEach(fn => fn(...parameters));
//     }
// }