import {useTodoState} from "../TodoProvider";
import {Stack, Typography} from "@mui/material";
import {TodoItem} from "./TodoItem";
import {AddTodoButton} from "./AddTodoButton";
import React from "react";

export function TodoList() {
    const state = useTodoState()

    return <Stack m={2} mt={4}>
        <Typography variant={"h4"}>Todo List</Typography>
        <Stack>
            {state.map(todo => (
                <TodoItem key={todo.id} {...todo}/>
            ))}
        </Stack>
        <AddTodoButton/>
    </Stack>;
}