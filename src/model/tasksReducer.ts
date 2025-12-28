import {Task, TasksStateType, TodolistType} from '../commontypes.ts';
import {
  CreateTodolistActionType,
  DeleteTodolistActionType
} from './todolistReducer.ts';
import {v1} from 'uuid';

type DeleteTaskACType = ReturnType<typeof DeleteTaskAC>;
type CreateTaskACType = ReturnType<typeof CreateTaskAC>;
type ChangeTaskStatusACType = ReturnType<typeof ChangeTaskStatusAC>;
type ChangeTaskTitleACType = ReturnType<typeof ChangeTaskTitleAC>;

export type Actions =
  CreateTodolistActionType
  | DeleteTodolistActionType
  | DeleteTaskACType
  | CreateTaskACType
  | ChangeTaskStatusACType
  | ChangeTaskTitleACType;

// const initialState: TasksStateType = {}

export const tasksReducer = (tasks: TasksStateType, action: Actions): TasksStateType => {
  switch (action.type) {
    case 'create_todolist': {
      const id = action.payload.id
      return {...tasks, [id]: []}
    }
    case 'delete_todolist': {
      const copyTasksState = {...tasks}
      const id = action.payload.id
      delete copyTasksState[id]
      return copyTasksState
    }
    case 'delete_task': {
      const todolistId = action.payload.todolistId
      const taskId = action.payload.taskId
      return {
        ...tasks,
        [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)
      }
    }
    case 'create_task': {
      const {todolistId, taskId, title, isDone} = action.payload
      const newTask: Task = {
        id: taskId,
        title,
        isDone
      }
      return {...tasks, [todolistId]: [...tasks[todolistId], newTask]}
    }
    case 'changeStatus_task': {
      const todolistId = action.payload.todolistId
      const taskId = action.payload.taskId
      const newTaskStatus = action.payload.isDone
      return {
        ...tasks,
        [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {
          ...task,
          isDone: newTaskStatus
        } : task)
      }
    }
    case 'changeTitle_task': {
      const {taskId, title, todolistId} = action.payload
      return {
        ...tasks,
        [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {
          ...task,
          title
        } : task)
      }
    }
    default:
      return tasks
  }
}

export const DeleteTaskAC = (payload: {
  taskId: Task['id'],
  todolistId: TodolistType['id']
}) => {
  return {
    type: 'delete_task',
    payload
  } as const
}

export const CreateTaskAC = (payload: {
  title: Task['title'],
  todolistId: TodolistType['id']
}) => {
  return {
    type: 'create_task',
    payload: {
      todolistId: payload.todolistId,
      taskId: v1(),
      title: payload.title,
      isDone: false,
    }
  } as const
}

export const ChangeTaskStatusAC = (payload: {
  taskId: Task['id'],
  isDone: Task['isDone'],
  todolistId: TodolistType['id']
}) => {
  return {
    type: 'changeStatus_task',
    payload
  } as const
}

export const ChangeTaskTitleAC = (payload: {
  taskId: Task['id'],
  title: Task['title'],
  todolistId: TodolistType['id']
}) => {
  return {
    type: 'changeTitle_task',
    payload
  } as const
}

