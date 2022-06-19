import React, {useCallback} from 'react';
import './App.css';
import {Box, Card, CardContent, Container, Stack, TextField, Typography, useTheme} from "@mui/material";
import {TodoList} from "./todolist/components/TodoList";
import {YTodoProvider} from "./todolist/yjs/YTodoProvider";
import {StoreProvider} from "./todolist/yjs/StoreProvider";
import {useSetUserField, useLocalAwarenessState} from "./todolist/yjs/awareness";

function App() {
    return (
        <StoreProvider>
            <YTodoProvider>
                <Container maxWidth={"xs"}>
                    <UserSetup/>
                    <TodoList/>
                </Container>
            </YTodoProvider>
        </StoreProvider>
    );
}

function UserSetup() {
    const {name, color} = useLocalAwarenessState()
    const setName = useSetUserField();
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setName('name', e.target.value);
        },
        [setName],
    );

    const theme = useTheme()

    return (
        <Card>
            <CardContent>
                <h3>Current User</h3>
                <Stack direction={"row"} justifyContent={'space-between'}>
                    <TextField variant={'standard'} label={'Username'} value={name} onChange={handleChange}/>
                    <Box px={2} sx={{background: color, color: theme.palette.getContrastText(color), display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
                        <Typography variant={'overline'}>Color</Typography>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default App;
