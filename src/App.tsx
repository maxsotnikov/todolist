import './App.css'
import {Todolist} from './Todolist.tsx';
import {FilterValuesType, Task, TasksStateType, TodolistType} from './commontypes.ts';
import {useState} from 'react';
import {v1} from 'uuid';
import {CreateItemForm} from './CreateItemForm.tsx';
import {
  AppBar, Box, Button, Container, createTheme,
  CssBaseline, Grid, IconButton, Paper, Switch, ThemeProvider, Toolbar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import {container} from './Todolist.styles.ts';
import {NavButton} from './NavButton.ts';
import {amber, green} from '@mui/material/colors';

function App() {
  //BLL
  const todolistId_1 = v1()
  const todolistId_2 = v1()
  const [todolists, setTodolists] = useState<TodolistType[]>([
    {id: todolistId_1, title: 'What to learn', filter: 'all'},
    {id: todolistId_2, title: 'What to buy', filter: 'all'},
  ]);

  const [tasks, setTasks] = useState<TasksStateType>({
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
    // 1. Иммютабельное создание нового состояния (nextState)
    // const currentTasksArray: Task[] = tasks[todolistId]
    // const filteredCurrentTasks: Task[] = currentTasksArray.filter(t => t.id !== taskId)
    // const nextState: TasksStateType = {...tasks}
    // nextState[todolistId] = filteredCurrentTasks
    // 2. Передать nextState для перерисовки в React с помощью setState
    // setTasks(nextState);

    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
    });
  }
  const createTask = (title: Task['title'], todolistId: TodolistType['id']) => {
    const newTask: Task = {
      id: v1(),
      title: title,
      isDone: false
    }
    // const currentTaskArray: Task[] = tasks[todolistId]
    // const addedCurrentTasks = [...currentTaskArray, newTask]
    // const nextState = {...tasks}
    // nextState[todolistId] = addedCurrentTasks
    // //2. Передать nextState для перерисовки в React с помощью setState
    // setTasks(nextState);

    setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
  }
  const changetaskStatus = (taskId: Task['id'], newTaskStatus: Task['isDone'], todolistId: TodolistType['id']) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {
        ...task,
        isDone: newTaskStatus
      } : task)
    })
  }
  const changeTaskTitle = (taskId: Task['id'], title: Task['title'], todolistId: TodolistType['id']) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {
        ...task,
        title
      } : task)
    })
  }

  //todolists
  const changeToDoListFilter = (nextFilterValue: FilterValuesType, todolistId: TodolistType['id']) => {
    const nextState: TodolistType[] = todolists.map((tl => tl.id === todolistId ? {
      ...tl,
      filter: nextFilterValue
    } : tl))
    setTodolists(nextState)
  }
  const changeToDolistTitle = (title: TodolistType['title'], todolistId: TodolistType['id']) => {
    const nextState: TodolistType[] = todolists.map((tl => tl.id === todolistId ? {
      ...tl,
      title: title
    } : tl))
    setTodolists(nextState)
  }
  const deleteTodolist = (todolistId: TodolistType['id']) => {
    //Удаляем тудулист
    const nextState = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(nextState)

    //Создаем копию tasks БЕЗ удаленного тудулиста
    const copyTasksState = {...tasks}
    delete copyTasksState[todolistId]// мутируем КОПИЮ
    //устанавливаем новую копию
    setTasks(copyTasksState)
  }
  const createToDolist = (title: TodolistType['title']) => {
    const newTodolistId = v1()
    const newTodolist: TodolistType = {
      id: newTodolistId,
      title: title,
      filter: 'all',
    }
    setTodolists([...todolists, newTodolist])
    setTasks({...tasks, [newTodolistId]: []})
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
          elevation={8}
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
            changetaskStatus={changetaskStatus}
            changeToDolistTitle={changeToDolistTitle}
            changeTaskTitle={changeTaskTitle}
          />
        </Paper>
      </Grid>
    )

  })

  const [isDark, setIsDark] = useState(false)
  const theme = createTheme({
    palette: {
      primary: green,
      secondary: amber,
      mode: isDark ? "dark" : "light"
    }
  })
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <AppBar position="static">
          <Toolbar sx={container}>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <Box>
              <NavButton>Sign in</NavButton>
              <NavButton>Sign out</NavButton>
              <NavButton background={theme.palette.secondary.dark}>FAQ</NavButton>
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
