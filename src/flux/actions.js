export function createTodo(title) {
    return {
        type: 'CREATE_TODO',
        title
    };
}

export function deleteTodo(id) {
    return {
        type: 'DELETE_TODO',
        id
    };
}

export function updateTodo(todo) {
    return {
        type: 'UPDATE_TODO',
        todo
    };
}

export function rearrange(position, todo) {
    return {
        type: 'REARRANGE_TODO',
        position,
        todo
    }
}