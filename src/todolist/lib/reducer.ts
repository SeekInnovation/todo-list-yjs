import {makeEmptyTodo, TodoListType} from "./model";
import {randomId} from "./utils";

export const INITIAL_STATE: TodoListType = [
    {
        id: randomId(),
        text: 'Learn React',
        completed: false
    },
    {
        id: randomId(),
        text: 'Learn TypeScript',
        completed: false
    },
    {
        id: randomId(),
        text: 'Learn Realtime Collaboration',
        completed: false
    }
]


export const Actions = {
    addTodo: () => ({type: 'ADD_TODO' as const}),
    removeTodo: (id: string) => ({type: 'REMOVE_TODO' as const, id}),
    toggleTodo: (id: string) => ({type: 'TOGGLE_TODO' as const, id}),
    updateTodo: (id: string, text: string) => ({type: 'UPDATE_TODO' as const, id, text}),
}

export type ActionType = ReturnType<typeof Actions[keyof typeof Actions]>

function addTodo(state: TodoListType) {
    return [...state, makeEmptyTodo()]
}

function removeTodo(state: TodoListType, action: ReturnType<typeof Actions['removeTodo']>): TodoListType {
    return state.filter(todo => todo.id !== action.id)
}

function toggleTodo(state: TodoListType, action: ReturnType<typeof Actions['toggleTodo']>): TodoListType {
    return state.map(todo => {
        if (todo.id === action.id) {
            return {...todo, completed: !todo.completed}
        }
        return todo
    })
}

function updateTodo(state: TodoListType, action: ReturnType<typeof Actions['updateTodo']>): TodoListType {
    return state.map(todo => {
        if (todo.id === action.id) {
            return {...todo, text: action.text}
        }
        return todo
    })
}

export function reducer(state: TodoListType = INITIAL_STATE, action: ActionType): TodoListType {
    switch (action.type) {
        case 'ADD_TODO':
            return addTodo(state);
        case 'REMOVE_TODO':
            return removeTodo(state, action);
        case 'TOGGLE_TODO':
            return toggleTodo(state, action);
        case 'UPDATE_TODO':
            return updateTodo(state, action);
        default:
            return state;
    }
}

