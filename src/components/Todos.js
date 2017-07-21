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

        this.draggedTodo = null;

        this.onCreateTodo = this.onCreateTodo.bind(this);
        this.handleUpdateTodos = this.handleUpdateTodos.bind(this);

        this.onDrop = this.onDrop.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
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

    onDragStart(e, todo) {
        const el = e.nativeEvent.target;

        this.draggedTodo = todo;
        e.nativeEvent.dataTransfer.effectAllowed = 'move';
        e.nativeEvent.dataTransfer.setData('text/html', el.innerHTML);
    }

    onDragOver(e) {
        e.nativeEvent.preventDefault();
        e.nativeEvent.dataTransfer.dropEffect = 'move';
    }

    onDragEnter(e) {
        const el = e.nativeEvent.target;

        if (el.tagName.toUpperCase() === 'LI') {
            el.classList.add('over');
        }
    }

    onDragLeave(e) {
        const el = e.nativeEvent.target;

        if (el.tagName.toUpperCase() === 'LI') {
            el.classList.remove('over');
        }
    }

    onDrop(e, index) {
        e.nativeEvent.preventDefault();

        if (index > -1) {
            Dispatcher.dispatch(Actions.rearrange(index, this.draggedTodo));
        }

        return false;
    }

    onDragEnd(e) {
        Array.from(this.refs.list.children).forEach((item) => {
            item.classList.remove('over');
        });
    }

    render() {
        return (
            <div className="todos">
                <div className="todos__header">
                    <input  type="text" onKeyPress={this.onCreateTodo} ref="input" />
                </div>

                { (!this.state.todos.length) ? (<h4>No Todos</h4>) : '' }

                <ul className="todos__list" ref="list">
                    {
                        this.state.todos.map( (todo, index) => {
                            return (
                                <li draggable key={todo.id}
                                    onDragStart={(e) => {this.onDragStart(e, todo)}}
                                    onDragOver={this.onDragOver.bind(this)}
                                    onDragEnter={this.onDragEnter.bind(this)}
                                    onDragLeave={this.onDragLeave.bind(this)}
                                    onDrop={(e) => {this.onDrop(e, index)}}
                                    onDragEnd={this.onDragEnd.bind(this)}>
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