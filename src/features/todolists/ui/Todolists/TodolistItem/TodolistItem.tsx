import {Task, TodolistType} from '@/common/commontypes.ts';
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm.tsx';
import {createTaskAC} from '@/features/todolists/model/tasks-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {TodolistTitle} from '@/features/todolists/ui/Todolists/TodolistItem/TodolistTitle/TodolistTitle.tsx';
import {Tasks} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/Tasks.tsx';
import {FilterButtons} from '@/features/todolists/ui/Todolists/TodolistItem/FilterButtons/FilterButtons.tsx';

type Props = {
  todolist: TodolistType
}

export const TodolistItem = ({todolist,}: Props) => {

  const dispatch = useAppDispatch();

  const createTaskHandler = (taskTitle: Task['title']) => {
    dispatch(createTaskAC({title: taskTitle, todolistId: todolist.id}))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <CreateItemForm
        createItem={createTaskHandler}
        maxTitleLength={10}
      />
      <Tasks todolist={todolist} />
      <FilterButtons todolist={todolist} />
    </div>
  )
}