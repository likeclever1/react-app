import eventEmitter from './event-emitter';

class StoreClass {
    constructor() {
        this.todos = [];

        if ('localStorage' in window) {
            this.todos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
        }
    }

    setTodos(data, commit = true) {
        this.todos = [ ...data ];

        if (commit && 'localStorage' in window) {
            localStorage.setItem('todos', JSON.stringify(this.todos));
        }

        eventEmitter.emitEvent('STORE_UPDATED');
    }

    getTodos() {
        return this.todos;
    }

    addListener(eventType, callback) {
        eventEmitter.addListener(eventType, callback);
    }
}

const Store = new StoreClass();

export default Store;