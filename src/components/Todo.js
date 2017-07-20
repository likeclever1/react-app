import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as Actions from '../flux/actions';
import Dispatcher from '../flux/dispatcher';

class Todo extends Component {
    constructor (props) {
        super(props);

        this.state = {
            edit: false
        };

        this.onShowEdit = this.onShowEdit.bind(this);
        this.onUpdateStatus = this.onUpdateStatus.bind(this);
        this.onUpdateTitle = this.onUpdateTitle.bind(this);
        this.onRemoveTodo = this.onRemoveTodo.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            edit: false
        });
    }

    onUpdateStatus() {
        let todo = Object.assign({}, this.props.todo);

        todo.isChecked = !todo.isChecked;

        Dispatcher.dispatch(Actions.updateTodo(todo));
    }

    onUpdateTitle(e) {
        if (e.nativeEvent.type === 'keypress' && e.nativeEvent.keyCode !== 13) {
            return;
        }

        let todo = Object.assign({}, this.props.todo);
        todo.title = this.refs.title.value;

        Dispatcher.dispatch(Actions.updateTodo(todo));
    }

    onRemoveTodo() {
        Dispatcher.dispatch(Actions.deleteTodo(this.props.todo.id));
    }

    onShowEdit() {
        this.setState({
            edit: true
        });
    }

    render() {
        return (
            <div className="todo">
                {
                    !this.state.edit ?
                        <div className="todo__inner">
                            <input type="checkbox"
                                onChange={ this.onUpdateStatus }
                                checked={ this.props.todo.isChecked } />
                            <label>{ this.props.todo.title }</label>

                            <i onClick={this.onShowEdit} className="btn-edit">&#9998;</i>
                            <i onClick={this.onRemoveTodo} className="btn-remove">&times;</i>
                        </div>
                        : <input type="text" autoFocus
                            defaultValue={ this.props.todo.title }
                            ref="title"
                            onBlur={ this.onUpdateTitle }
                            onKeyPress={ this.onUpdateTitle } />
                }
            </div>
        );
    }
}

Todo.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        isChecked: PropTypes.bool.isRequired
    })
};

export default Todo;