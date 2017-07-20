class EventEmitter {
    constructor() {
        this.subscriptions = [];
    }
    addListener(eventType, callback) {
        this.subscriptions.push({
            eventType,
            callback
        });
    }
    emitEvent(eventType) {
        const subscriptions = this.subscriptions.filter(sub => eventType === sub.eventType);
        subscriptions.forEach(sub => {
            sub.callback();
        });
    }
}

const eventEmitter = new EventEmitter();

export default eventEmitter;