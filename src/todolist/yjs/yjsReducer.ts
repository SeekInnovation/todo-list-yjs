import {makeEmptyTodo, TodoListType} from "../lib/model";
import {Actions, ActionType} from "../lib/reducer";
import {MappedTypeDescription} from "@syncedstore/core/types/doc";

export function makeReducer(store: MappedTypeDescription<{ todolist: TodoListType }>) {
    function addTodo() {
        store.todolist.push(makeEmptyTodo());
    }

    function removeTodo(action: ReturnType<typeof Actions['removeTodo']>) {
        store.todolist.splice(store.todolist.findIndex(todo => todo.id === action.id), 1);
    }

    function toggleTodo(action: ReturnType<typeof Actions['toggleTodo']>) {
        const todo = store.todolist.find(todo => todo.id === action.id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }

    function updateTodo(action: ReturnType<typeof Actions['updateTodo']>) {
        const todo = store.todolist.find(todo => todo.id === action.id);
        if (todo) {
            todo.text = action.text;
        }
    }

    return function reducer(action: ActionType) {
        switch (action.type) {
            case 'ADD_TODO':
                return addTodo();
            case 'REMOVE_TODO':
                return removeTodo(action);
            case 'TOGGLE_TODO':
                return toggleTodo(action);
            case 'UPDATE_TODO':
                return updateTodo(action);
        }
    }
}