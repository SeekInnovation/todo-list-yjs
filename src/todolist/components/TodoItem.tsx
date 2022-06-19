import {TodoItemType} from "../lib/model";
import {Avatar, avatarClasses, AvatarGroup, Badge, Checkbox, IconButton, Stack, TextField} from "@mui/material";
import React, {useCallback, useMemo} from "react";
import {useTodoDispatch} from "../TodoProvider";
import {Actions} from "../lib/reducer";
import {Delete} from "@mui/icons-material";
import {useAwareness, useSetUserField} from "../yjs/awareness";


function useTodoUserCount(id: string) {
    const users = useAwareness();
    return useMemo(() => users.reduce((count, user) => {
        if (user.activeTodoId === id) {
            return count + 1;
        }
        return count;
    }, 0), [id, users]);
}

function useTodoUsers(id: string) {
    const users = useAwareness();
    return useMemo(() => users.filter(user => user.activeTodoId === id), [id, users]);
}

function TodoUserAvatars({id}: { id: string }) {
    const users = useTodoUsers(id);
    return <AvatarGroup max={3} sx={{[`& .${avatarClasses.root}`]: {width: 24, height: 24,}}}>
        {users.map(user => <Avatar style={{borderColor: user.color}} key={user.id}>{user.name[0]}</Avatar>)}
    </AvatarGroup>;
}

export function TodoItem({text, completed, id}: TodoItemType) {
    const dispatch = useTodoDispatch();

    const setUserValue = useSetUserField();

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(Actions.updateTodo(id, event.target.value))
        },
        [dispatch, id],
    );

    const handleCheck = useCallback(
        () => {
            dispatch(Actions.toggleTodo(id))
        },
        [dispatch, id]
    );

    const handleRemove = useCallback(
        () => {
            dispatch(Actions.removeTodo(id))
        },
        [dispatch, id]
    );

    const handleFocus = useCallback(
        () => {
            setUserValue('activeTodoId', id)
        },
        [setUserValue, id]
    );

    const handleBlur = useCallback(
        () => {
            setUserValue('activeTodoId', null)
        },
        [setUserValue]
    );

    const activeUserCount = useTodoUserCount(id);

    return <Badge badgeContent={<TodoUserAvatars id={id}/>}>
        <Stack direction={'row'} spacing={1} p={1} width={"100%"}>
            <Checkbox checked={completed} onChange={handleCheck} color={'success'}/>
            <TextField value={text} onChange={handleChange} variant={"standard"} fullWidth onFocus={handleFocus}
                       onBlur={handleBlur}/>
            <IconButton onClick={handleRemove} color={'error'}>
                <Delete/>
            </IconButton>
        </Stack>
    </Badge>
}