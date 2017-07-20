import React, { Component } from 'react';

import Todo from './Todo';

import Store from '../flux/store';
import * as Actions from '../flux/actions';
import Dispatcher from '../flux/dispatcher';


class Todos extends Component {
    constructor() {
        super();

        this.state = {
            todos: Store.getTodos()
        };

        this.onCreateTodo = this.onCreateTodo.bind(this);
        this.handleUpdateTodos = this.handleUpdateTodos.bind(this);
    }

    componentWillMount() {
        Store.addListener('STORE_UPDATED', () => {
            this.setState({
                todos: Store.getTodos()
            })
        });
    }

    onCreateTodo(event) {
        if (event.key !== 'Enter') return;

        if (!this.refs.input.value) return;

        Dispatcher.dispatch(Actions.createTodo(this.refs.input.value));

        // clear inputText
        this.refs.input.value = null;
    }

    handleUpdateTodos(todo) {
        Dispatcher.dispatch(Actions.updateTodo(todo));
    }

    render() {
        return (
            <div className="todos">
                <div className="todos__header">
                    <input  type="text" onKeyPress={this.onCreateTodo} ref="input" />
                </div>

                { (!this.state.todos.length) ? (<h4>No Todos</h4>) : '' }

                <ul className="todos__list">
                    {
                        this.state.todos.map( (todo) => {
                            return (
                                <li draggable key={todo.id}>
                                    <Todo todo={todo} />
                                </li>
                            );
                        })
                    }
                </ul>

                <div className="todos__controls">
                    <span>
                        { this.state.todos.filter(todo => todo.isChecked).length } / { this.state.todos.length }
                    </span>
                </div>
            </div>
        )
    }
}

export default Todos;