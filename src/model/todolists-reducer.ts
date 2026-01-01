import {FilterValuesType, TodolistType} from '../common/commontypes.ts';
import {createAction, createReducer, nanoid} from '@reduxjs/toolkit';

export type DeleteTodolistActionType = ReturnType<typeof DeleteTodolistAC>
export type CreateTodolistActionType = ReturnType<typeof CreateTodolistAC>

const initialState: TodolistType[] = []

export const DeleteTodolistAC = createAction<{
  id: TodolistType['id']
}>('todolists/deleteTodolist')
export const ChangeTodolistTitleAC = createAction<{
  title: TodolistType['title'],
  id: TodolistType['id']
}>('todolists/changeTodolistTitle')
// export const ChangeTodolistTitleAC = createAction('todolists/changeTodolistTitle', (title: TodolistType['title'], id: TodolistType['id']) => {
//   return {
//     payload : {
//       title, id
//     }}
// })
export const ChangeTodolistFilterAC = createAction<{
  filter: FilterValuesType,
  id: TodolistType['id']
}>('todolists/changeTodolistFilter')
export const CreateTodolistAC = createAction('todolists/createTodolistAC', (title: TodolistType['title']) => {
  return {
    payload: {
      id: nanoid(),
      title
    }
  }
})

export const todolistsReducer = createReducer(initialState, builder => {
  builder
    .addCase(DeleteTodolistAC, (state, action) => {
    const index = state.findIndex(todo => todo.id === action.payload.id)
    if (index !== -1) state.splice(index, 1)
  })
    .addCase(ChangeTodolistTitleAC, (state, action) => {
      const index = state.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) state[index].title = action.payload.title
    })
    .addCase(ChangeTodolistFilterAC, (state, action) => {
      const todolist = state.find(todo => todo.id === action.payload.id)
      if (todolist) todolist.filter = action.payload.filter
    })
    .addCase(CreateTodolistAC, (state, action) => {
      const newTodolist: TodolistType = {
        id: action.payload.id,
        title: action.payload.title,
        filter: 'all',
      }
      state.push(newTodolist)
    })
})