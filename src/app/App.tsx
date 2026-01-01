import './App.css'
import {Todolist} from '../Todolist.tsx';
import {FilterValuesType, Task, TodolistType} from '../common/commontypes.ts';
import {useState} from 'react';
import {CreateItemForm} from '../CreateItemForm.tsx';
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
import {container} from '../Todolist.styles.ts';
import {NavButton} from '../NavButton.ts';
import {
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  CreateTodolistAC,
  DeleteTodolistAC
} from '../model/todolists-reducer.ts';
import {
  ChangeTaskStatusAC,
  ChangeTaskTitleAC,
  CreateTaskAC,
  DeleteTaskAC
} from '../model/tasks-reducer.ts';
import {useAppDispatch} from '../common/hooks/useAppDispatch.ts';
import {useAppSelector} from '../common/hooks/useAppSelector.ts';
import {selectTodolists} from '../model/todolists-selectors.ts';
import {selectTasks} from '../model/tasks-selectors.ts';


function App() {
  //BLL
  const todolists = useAppSelector(selectTodolists);
  const tasks = useAppSelector(selectTasks);
  const dispatch = useAppDispatch();

  //tasks
  const deleteTask = (taskId: Task['id'], todolistId: TodolistType['id']) => {
    const action = DeleteTaskAC({taskId: taskId, todolistId})
    dispatch(action)
  }
  const createTask = (title: Task['title'], todolistId: TodolistType['id']) => {
    const action = CreateTaskAC({title, todolistId: todolistId})
    dispatch(action)
  }
  const changetaskStatus = (taskId: Task['id'], newTaskStatus: Task['isDone'], todolistId: TodolistType['id']) => {
    const action = ChangeTaskStatusAC({taskId: taskId, isDone: newTaskStatus, todolistId})
    dispatch(action)
  }
  const changeTaskTitle = (taskId: Task['id'], title: Task['title'], todolistId: TodolistType['id']) => {
    const action = ChangeTaskTitleAC({taskId, title, todolistId})
    dispatch(action)
  }

  //todolists
  const changeToDoListFilter = (nextFilterValue: FilterValuesType, todolistId: TodolistType['id']) => {
    const action = ChangeTodolistFilterAC({
      filter: nextFilterValue,
      id: todolistId
    })
    dispatch(action)
  }
  const changeToDolistTitle = (title: TodolistType['title'], todolistId: TodolistType['id']) => {
    const action = ChangeTodolistTitleAC({id: todolistId, title})
    dispatch(action)
  }
  const deleteTodolist = (todolistId: TodolistType['id']) => {
    //Удаляем тудулист
    const action = DeleteTodolistAC({id: todolistId})
    dispatch(action)
  }
  const createToDolist = (title: TodolistType['title']) => {
    const action = CreateTodolistAC(title)
    dispatch(action)
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