import Store from './store';

class Dispatcher {
    dispatch(action) {
        switch(action.type) {
            case 'CREATE_TODO':
                this._createTodo(action.title);
                break;

            case 'DELETE_TODO':
                this._deleteTodo(action.id);
                break;

            case 'UPDATE_TODO':
                this._updateTodo(action.todo);
                break;

            default:
                console.log('Undefined Action');
        }
    }

    _createTodo(title) {
        const todo = {
            id: Date.now(),
            title,
            isChecked: false
        };

        let todos = Store.getTodos();
        todos.unshift(todo);
        Store.setTodos(todos);
    }
    _deleteTodo(id) {
        let todos = Store.getTodos();
        todos = todos.filter(todo => todo.id !== id);
        Store.setTodos(todos);
    }
    _updateTodo(todo) {
        let todos = Store.getTodos();
        todos = todos.map(item => item.id === todo.id ? todo : item);
        Store.setTodos(todos);
    }
};

export default new Dispatcher();