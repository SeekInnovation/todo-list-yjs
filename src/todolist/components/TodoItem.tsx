import {TodoItemType} from "../lib/model";
import {Checkbox, IconButton, Stack, TextField} from "@mui/material";
import React, {useCallback} from "react";
import {useTodoDispatch} from "../TodoProvider";
import {Actions} from "../lib/reducer";
import {Delete} from "@mui/icons-material";

export function TodoItem({text, completed, id}: TodoItemType) {
    const dispatch = useTodoDispatch();

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

    return <Stack direction={'row'} spacing={1} p={1}>
        <Checkbox checked={completed} onChange={handleCheck} color={'success'}/>
        <TextField value={text} onChange={handleChange} variant={"standard"} fullWidth/>
        <IconButton onClick={handleRemove} color={'error'}>
            <Delete/>
        </IconButton>
    </Stack>
}