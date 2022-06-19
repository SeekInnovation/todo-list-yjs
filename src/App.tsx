import React from 'react';
import './App.css';
import {Container} from "@mui/material";
import {TodoProvider} from "./todolist/TodoProvider";
import {TodoList} from "./todolist/components/TodoList";

function App() {
    return (
        <TodoProvider>
            <Container maxWidth={"xs"}>
                <TodoList/>
            </Container>
        </TodoProvider>
    );
}

export default App;
