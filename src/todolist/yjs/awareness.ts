import {useEffect, useState} from "react";
import {Awareness} from 'y-protocols/awareness'
import {randomId} from "../lib/utils";
import {useStore} from "./StoreProvider";


export interface UserType {
    id: string
    name: string
    color: string
    activeTodoId: string | null
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function setupUser(awareness: Awareness) {
    awareness.setLocalState({
        color: getRandomColor(),
        name: 'Anonymous',
        id: randomId(),
        activeTodoId: null
    } as UserType)
}

export function useAwareness() {
    const {awareness} = useStore()
    const [states, setStates] = useState<UserType[]>([]);
    useEffect(() => {
        const changeHandler = () => {
            setStates([...awareness.getStates().values() as any]);
        }
        awareness.on('change', changeHandler);

        return () => awareness.off('change', changeHandler);
    }, [awareness])
    return states;
}

export function useLocalAwarenessState() {
    const {awareness} = useStore()
    const [state, setState] = useState<UserType>(awareness.getLocalState() as UserType);
    useEffect(() => {
        const changeHandler = (change: { added: number[], updated: number[], removed: number[] }) => {
            if (change.updated.length > 0 && change.updated.includes(awareness.clientID)) {
                setState(awareness.getLocalState() as UserType);
            }
        }
        awareness.on('change', changeHandler);

        return () => awareness.off('change', changeHandler);
    }, [awareness])
    return state;
}

export function useSetUserField(){
    const {awareness} = useStore()

    return <T extends keyof UserType>(property: T, value: UserType[T]) => {
        awareness.setLocalStateField(property, value);
    }
}