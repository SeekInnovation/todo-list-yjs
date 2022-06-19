import {randomId} from "./utils";

export type TodoItemType = {
    id: string;
    text: string;
    completed: boolean;
}

export type TodoListType = TodoItemType[]

export function makeEmptyTodo() {
    return {
        id: randomId(),
        text: '',
        completed: false
    };
}