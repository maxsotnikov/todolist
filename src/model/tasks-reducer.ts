import {Task, TasksStateType, TodolistType} from '../common/commontypes.ts';
import {
  CreateTodolistAC,
  DeleteTodolistAC,
} from './todolists-reducer.ts';
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';

const initialState: TasksStateType = {}

export const DeleteTaskAC = createAction<{
  taskId: Task['id'],
  todolistId: TodolistType['id']
}>('tasks/deleteTask');
export const CreateTaskAC = createAction('tasks/createTask', (payload: {
  title: Task['title'],
  todolistId: TodolistType['id']
}) => {
  return {
    payload: {
      todolistId: payload.todolistId,
      taskId: nanoid(),
      title: payload.title,
      isDone: false,
    }
  }
});
export const ChangeTaskStatusAC = createAction<{
  taskId: Task['id'],
  isDone: Task['isDone'],
  todolistId: TodolistType['id']
}>('tasks/changeTaskStatus');
export const ChangeTaskTitleAC = createAction<{
  taskId: Task['id'],
  title: Task['title'],
  todolistId: TodolistType['id']
}>('tasks/changeTaskTitle');

export const tasksReducer = createReducer(initialState, builder => {
  builder
    .addCase(DeleteTodolistAC, (state, action) => {
      const id = action.payload.id;
      delete state[id];
    })
    .addCase(CreateTodolistAC, (state, action) => {
      const id = action.payload.id;
      state[id] = []
    })
    .addCase(DeleteTaskAC, (state, action) => {
      const {todolistId, taskId} = action.payload;
      const todolist = state[todolistId];
      const index = todolist.findIndex(task => task.id === taskId)
      if (index !== -1) todolist.splice(index, 1)
    })
    .addCase(CreateTaskAC, (state, action) => {
      const {todolistId, taskId, title, isDone} = action.payload
      const newTask: Task = {
        id: taskId,
        title,
        isDone
      }
      state[todolistId].unshift(newTask)
    })
    .addCase(ChangeTaskStatusAC, (state, action) => {
      const {todolistId, taskId, isDone} = action.payload;
      const task = state[todolistId].find(t => t.id === taskId)
      if (task) task.isDone = isDone
    })
    .addCase(ChangeTaskTitleAC, (state, action) => {
      const {taskId, title, todolistId} = action.payload
      const task = state[todolistId].find(t => t.id === taskId)
      if (task) task.title = title
    })
})
