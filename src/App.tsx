import './App.css'
import {Todolist} from "./Todolist.tsx";
import {
  FilterValuesType,
  Task,
  TasksStateType,
  TodolistType
} from "./commontypes.ts";
import {useState} from "react";
import {v1} from "uuid";

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

  const changeToDoListFilter = (nextFilterValue: FilterValuesType, todolistId: TodolistType['id']) => {
    const nextState: TodolistType[] = todolists.map((tl => tl.id === todolistId ? {...tl, filter: nextFilterValue} : tl))
    setTodolists(nextState)
  }

  const deleteTodolist = (todolistId: TodolistType['id']) => {
    //Удаляем тудулист
    const nextState = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(nextState)

    //Создаем копию tasks БЕЗ удаленного тудулиста
    const copyTasksState = {...tasks}
    delete copyTasksState[todolistId]// мутируем КОПИЮ
    //Устанавливаем новую копию
    setTasks(copyTasksState)
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
      />
      )

  })

  return (
    <div className="app">
      {todolistComponents}
    </div>
  )
}

export default App
