import React, { Component } from "react";

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../../item-add-form";

import './app.css';

export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            { label: 'Drink Coffee', important: false, id: 1 },
            { label: 'Make Awesome App', important: true, id: 2 },
            { label: 'Have a lunch', important: false, id: 3 }
        ],
        term: '',
        filter: 'active' // active, all, done
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            return {
                todoData: [...todoData.slice(0, idx), ...todoData.slice(idx + 1)]
            }
        })
    }

    addItem = (text) => {
        const newItem = {
            label: text,
            important: false,
            id: this.maxId++
        };

        this.setState(({ todoData}) => {
            const newData = [...todoData, newItem]

            return {
                todoData: newData
            }
        })
    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            const idx = this.state.todoData.findIndex((el) => el.id === id)
            const item = {...todoData[idx], important: !todoData[idx].important}
            return {
                todoData: [...todoData.slice(0, idx), item, ...todoData.slice(idx + 1)]
            }
        })
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            const idx = this.state.todoData.findIndex((el) => el.id === id)
            const item = {...todoData[idx], done: !todoData[idx].done}
            return {
                todoData: [...todoData.slice(0, idx), item, ...todoData.slice(idx + 1)]
            }
        })
    }

    filter = (items, filter) => {
        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done);
            case 'done':
                return items.filter((item) => item.done);
            default:
                return items;
        };
    }

    search = (items, term) => {
        if (term.length === 0)
            return items
        return items.filter((item) => {
            return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    onSearchChange = (term) => {
        this.setState({
            term: term
        })
    }

    onFilterChange = (filter) => {
        this.setState({
            filter: filter
        })
    }


    render() {
        const { todoData, term, filter } = this.state

        const visibleItems = this.filter(this.search(todoData, term), filter)

        const doneCount = todoData.filter((el) => el.done).length
        const todoCount = todoData.length - doneCount

        return (
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter filter={filter} onFilterChange={this.onFilterChange} />
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={ this.deleteItem }
                    onToggleImportant={ this.onToggleImportant }
                    onToggleDone={ this.onToggleDone }
                />
                <ItemAddForm onItemAdded={this.addItem} />
            </div>
        );
    }

};

