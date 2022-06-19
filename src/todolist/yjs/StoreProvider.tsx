import {WebsocketProvider} from 'y-websocket'
import {IndexeddbPersistence} from 'y-indexeddb'
import {getYjsValue, syncedStore} from '@syncedstore/core'
import {TodoListType} from "../lib/model";
import React, {useContext, useMemo} from "react";
import {Doc} from "yjs";
import {setupUser} from "./awareness";
import {MappedTypeDescription} from "@syncedstore/core/types/doc";
import {Awareness} from 'y-protocols/awareness'

function useSetupStore() {
    return useMemo(() => {
        const store = syncedStore<{ todolist: TodoListType }>({todolist: []})
        const doc = getYjsValue(store)

        // this allows you to instantly get the (cached) documents data
        const indexeddbProvider = new IndexeddbPersistence('count-demo', doc as Doc)
        indexeddbProvider.whenSynced.then(() => {
            console.log('loaded data from indexed db')
        })
        const websocketProvider = new WebsocketProvider(
            'ws://localhost:1234', 'todo-demo', doc as Doc
        )

        setupUser(websocketProvider.awareness);

        return {store, awareness: websocketProvider.awareness}
    }, []);
}

const StoreContext = React.createContext<{store:  MappedTypeDescription<{todolist: TodoListType}>, awareness: Awareness}>({} as any);

export function StoreProvider({children}: {children: React.ReactNode}) {
    const {store, awareness} = useSetupStore();
    return <StoreContext.Provider value={{store, awareness}}>{children}</StoreContext.Provider>
}

export function useStore() {
    return useContext(StoreContext);
}

