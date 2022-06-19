import React, {useMemo} from "react";
import {makeReducer} from "./yjsReducer";
import {useStore} from "./StoreProvider";
import {TodoContext} from "../TodoProvider";
import {useSyncedStore} from '@syncedstore/react'

export function YTodoProvider({children}: { children: React.ReactNode }) {
    const {store} = useStore()
    const dispatch = useMemo(() => makeReducer(store), [store]);
    const state = useSyncedStore(store);
    return <TodoContext.Provider value={{dispatch, state: state.todolist}}>{children}</TodoContext.Provider>;
}