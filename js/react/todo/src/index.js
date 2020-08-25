import React from 'react';
import ReactDOM from 'react-dom';
import AppHeader from "./components/app-header";
import SearchPanel from "./components/search-panel";
import TodoList from "./components/todo-list";

const App = () => {

    const todoData = [
        {
            label: 'Drink coffee',
            important: false,
            id: 1
        },
        {
            label: 'Make awesome app',
            important: true,
            id: 2
        },
        {
            label: 'Sleep',
            important: false,
            id: 3
        }
    ];

    return (
        <div>
            <AppHeader/>
            <SearchPanel/>
            <TodoList todos={todoData}/>
        </div>
    )
}

const el = (
    <App/>
);

ReactDOM.render(el, document.getElementById('root'));

