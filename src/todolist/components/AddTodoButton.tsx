import {useTodoDispatch} from "../TodoProvider";
import React, {useCallback} from "react";
import {Actions} from "../lib/reducer";
import {Button} from "@mui/material";

export function AddTodoButton() {
    const dispatch = useTodoDispatch();
    const handleClick = useCallback(
        () => {
            dispatch(Actions.addTodo())
        },
        [dispatch],
    );

    return <Button variant={"contained"} onClick={handleClick}>Add Todo</Button>;
}