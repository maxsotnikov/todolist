import './App.css'
import {Todolist} from './Todolist.tsx';
import {FilterValuesType, Task, TodolistType} from './commontypes.ts';
import {useReducer, useState} from 'react';
import {v1} from 'uuid';
import {CreateItemForm} from './CreateItemForm.tsx';
import {createTheme, ThemeProvider,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import {container} from './Todolist.styles.ts';
import {NavButton} from './NavButton.ts';
import {
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  CreateTodolistAC,
  DeleteTodolistAC,
  todolistsReducer
} from './model/todolistReducer.ts';
import {
  ChangeTaskStatusAC, ChangeTaskTitleAC,
  CreateTaskAC,
  DeleteTaskAC,
  tasksReducer
} from './model/tasksReducer.ts';

function App() {
  //BLL
  const todolistId_1 = v1()
  const todolistId_2 = v1()
  const [todolists, dispatchTodolists] = useReducer(todolistsReducer, [
    {id: todolistId_1, title: 'What to learn', filter: 'all'},
    {id: todolistId_2, title: 'What to buy', filter: 'all'},
  ]);

  const [tasks, dispatchTasks] = useReducer(tasksReducer, {
    [todolistId_1]: [
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'JS/TS', isDone: false},
      {id: v1(), title: 'REACT JS', isDone: false}],
    [todolistId_2]: [
      {id: v1(), title: 'Meat', isDone: true},
      {id: v1(), title: 'Milk', isDone: false},
      {id: v1(), title: 'Bread', isDone: false}
    ]
  });

  //tasks
  const deleteTask = (taskId: Task['id'], todolistId: TodolistType['id']) => {
    const action = DeleteTaskAC({taskId: taskId, todolistId})
    dispatchTasks(action)
  }
  const createTask = (title: Task['title'], todolistId: TodolistType['id']) => {
    const action = CreateTaskAC({title, todolistId: todolistId})
    dispatchTasks(action)
  }
  const changetaskStatus = (taskId: Task['id'], newTaskStatus: Task['isDone'], todolistId: TodolistType['id']) => {
    const action = ChangeTaskStatusAC({taskId: taskId, isDone: newTaskStatus, todolistId})
    dispatchTasks(action)
  }
  const changeTaskTitle = (taskId: Task['id'], title: Task['title'], todolistId: TodolistType['id']) => {
    const action = ChangeTaskTitleAC({taskId: taskId, title, todolistId})
    dispatchTasks(action)
  }

  //todolists
  const changeToDoListFilter = (nextFilterValue: FilterValuesType, todolistId: TodolistType['id']) => {
    const action = ChangeTodolistFilterAC({
      filter: nextFilterValue,
      id: todolistId
    })
    dispatchTodolists(action)
  }
  const changeToDolistTitle = (title: TodolistType['title'], todolistId: TodolistType['id']) => {
    const action = ChangeTodolistTitleAC({id: todolistId, title})
    dispatchTodolists(action)
  }
  const deleteTodolist = (todolistId: TodolistType['id']) => {
    //Удаляем тудулист
    const action = DeleteTodolistAC(todolistId)
    dispatchTodolists(action)
    dispatchTasks(action)
  }
  const createToDolist = (title: TodolistType['title']) => {
    const action = CreateTodolistAC(title)
    dispatchTodolists(action)
    dispatchTasks(action)
  }

  //GUI
  const todolistComponents = todolists.map(tl => {
    let filteredTasks: Task[] = tasks[tl.id]
    if (tl.filter === 'active') {
      filteredTasks = filteredTasks.filter(t => t.isDone === false)
    }
    if (tl.filter === 'completed') {
      filteredTasks = filteredTasks.filter(t => t.isDone === true)
    }
    return (
      <Grid key={tl.id}>
        <Paper
          elevation={10}
          sx={{padding: '15px'}}
        >
          <Todolist
            todolistId={tl.id}
            key={tl.id}
            title={tl.title}
            tasks={filteredTasks}
            filter={tl.filter}
            deleteTask={deleteTask}
            deleteTodolist={deleteTodolist}
            changeToDoListFilter={changeToDoListFilter}
            createTask={createTask}
            changeTaskStatus={changetaskStatus}
            changeTodolistTitle={changeToDolistTitle}
            changeTaskTitle={changeTaskTitle}
          />
        </Paper>
      </Grid>
    )

  })

  const [isDark, setIsDark] = useState(false)
  const theme = createTheme({
    palette: {
      primary: {
        main: '#425363',
      },
      secondary: {
        main: '#E1E4E3',
      },
      info: {
        main: '#A90101',
        contrastText: '#ffffff'
      },
      mode: isDark ? 'dark' : 'light'
    }
  })
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar sx={container}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <Box>
              <NavButton>Sign in</NavButton>
              <NavButton>Sign out</NavButton>
              <NavButton
                background={theme.palette.info.main}
                txtColor={theme.palette.info.contrastText}
              >
                FAQ
              </NavButton>
              <Switch onChange={() => setIsDark(!isDark)} />
            </Box>
          </Toolbar>
        </AppBar>
        <Container
          maxWidth="lg"
        >
          <Grid
            container
            sx={{padding: '15px 0'}}
          >
            <CreateItemForm
              createItem={createToDolist}
              maxTitleLength={10}
            />
          </Grid>
          <Grid
            container
            spacing={4}
          >
            {todolistComponents}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  )
}

export default App