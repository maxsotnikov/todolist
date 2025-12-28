import {FilterValuesType, TodolistType} from '../commontypes.ts';
import {v1} from 'uuid';

export type DeleteTodolistActionType = ReturnType<typeof DeleteTodolistAC>
export type CreateTodolistActionType = ReturnType<typeof CreateTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>

type Actions =
  DeleteTodolistActionType
  | CreateTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType

const initialState: TodolistType[] = []

export const todolistsReducer = (todolists: TodolistType[] = initialState, action: Actions): TodolistType[] => {
  switch (action.type) {
    case 'delete_todolist':
      return todolists.filter(tl => tl.id !== action.payload.id);
    case 'create_todolist':
      const newTodolist: TodolistType = {
        id: action.payload.id,
        title: action.payload.title,
        filter: 'all',
      }
      return [...todolists, newTodolist];
    case 'changeTitle_todolist':
      return todolists.map(tl => tl.id === action.payload.id ? {
        ...tl,
        title: action.payload.title,
      } : tl)
    case 'changeFilter_todolist':
      return todolists.map((tl => tl.id === action.payload.id ? {
        ...tl,
        filter: action.payload.filter,
      } : tl))
    default:
      return todolists;
  }
}

export const DeleteTodolistAC = (id: TodolistType['id']) => {
  return {
    type: 'delete_todolist',
    payload: {
      id
    }
  } as const
}

export const CreateTodolistAC = (title: TodolistType['title']) => {
  return {
    type: 'create_todolist',
    payload: {
      id: v1(),
      title
    }
  } as const
}

export const ChangeTodolistTitleAC = (payload: {
  title: TodolistType['title'],
  id: TodolistType['id']
}) => {
  return {
    type: 'changeTitle_todolist',
    payload
  } as const
}

export const ChangeTodolistFilterAC = (payload: {
  filter: FilterValuesType,
  id: TodolistType['id']
}) => {
  return {
    type: 'changeFilter_todolist',
    payload
  } as const
}