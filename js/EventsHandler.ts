type genericFunctionArray = Array<(...n: any[]) => any>
type TEventsList = { [eventName: string]: genericFunctionArray }

export class EventsHandler<EventsList extends TEventsList>{
    constructor(
        private _eventList: EventsList
    ) { }

    on <EventType extends keyof EventsList>(eventType: EventType, callback: EventsList[EventType][number]) {
        if (!this._eventList[eventType])
            throw new Error('EventType not permited.');
        this._eventList[eventType].push(callback);
    }

    fire <EventType extends keyof EventsList>(eventType: EventType, ...args: Parameters<EventsList[EventType][number]>) {
        this._eventList[eventType].forEach(fn => fn(...args));
    }
}