import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

import './app.css';


class App extends React.Component {
    state = {
        todos: [
            {label: 'Drink Coffee', important: false, id: 1, done: false},
            {label: 'Make Awesome App', important: true, id: 2, done: false},
            {label: 'Have a lunch', important: false, id: 3, done: false},
            {label: 'Drink vodka', important: true, id: 4, done: false},
            {label: 'Drink mohito', important: false, id: 5, done: false},
        ],
        filter: 'all',
    }

    onDelete = (id) => {
        this.setState((oldState) => {
            const idx = oldState.todos.findIndex((item) => item.id === id)

            const prev = oldState.todos.slice(0, idx)
            const next = oldState.todos.slice(idx + 1)

            return {
                todos: [...prev, ...next]
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState((oldState) => {
            const idx = oldState.todos.findIndex((item) => item.id === id)

            const prev = oldState.todos.slice(0, idx)
            const current = oldState.todos[idx]
            const next = oldState.todos.slice(idx + 1)


            return {
                todos: [
                    ...prev,
                    {...current, important: !current.important},
                    ...next
                ]
            }
        })
    }

    onDone = (doneId) => {
        this.setState((oldState) => {
            const idx = oldState.todos.findIndex((item) => item.id === doneId)

            const prev = oldState.todos.slice(0, idx)
            const current = oldState.todos[idx]
            const next = oldState.todos.slice(idx + 1)

            return {
                todos: [
                    ...prev,
                    {...current, done: !current.done},
                    ...next
                ]
            }
        })
    }


    onToggleFilter = (status) => {
        this.setState({
            filter: status
        })
    }

    onStatusFilter = (todos, status) => {
        if (status === 'active') {
            return todos.filter((item) => item.done === false)
        } else if (status === 'done') {
            return todos.filter((item) => item.done === true)
        } else {
            return todos
        }
    }

    render() {
        const filteredTodos = this.onStatusFilter(this.state.todos, this.state.filter)

        const doneTodo =  this.state.todos.filter((todo) => todo.done)

        return (
            <div className="todo-app">
                <AppHeader toDo={this.state.todos.length} done={doneTodo.length}/>
                <div className="top-panel d-flex">
                    <SearchPanel/>
                    <ItemStatusFilter filter={this.state.filter} onToggleFilter={this.onToggleFilter}/>
                </div>

                <TodoList
                    onDone={this.onDone}
                    onDelete={this.onDelete}
                    onToggleImportant={this.onToggleImportant}
                    todos={filteredTodos}
                />
            </div>
        );
    }
}

export default App;
