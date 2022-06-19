import React from "react";
import {ActionType, INITIAL_STATE, reducer} from "./lib/reducer";
import {TodoListType} from "./lib/model";

const TodoContext = React.createContext<{ dispatch: React.Dispatch<ActionType>, state: TodoListType }>({
    dispatch: () => {
    }, state: []
});

export function TodoProvider({children}: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
    return <TodoContext.Provider value={{dispatch, state}}>{children}</TodoContext.Provider>;
}

export function useTodoState() {
    const context = React.useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodoState must be used within a TodoProvider');
    }
    return context.state;
}

export function useTodoDispatch() {
    const context = React.useContext(TodoContext);
    if (context === undefined) {
        throw new Error('useTodoDispatch must be used within a TodoProvider');
    }
    return context.dispatch;
}