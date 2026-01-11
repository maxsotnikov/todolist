import List from '@mui/material/List';
import {Task, TodolistType} from '@/common/commontypes.ts';
import {useAppSelector} from '@/common/hooks/useAppSelector.ts';
import {selectTasks} from '@/features/todolists/model/tasks-selectors.ts';
import {TaskItem} from '@/features/todolists/ui/Todolists/TodolistItem/Tasks/TaskItem/TaskItem.tsx';

type Props = {
  todolist: TodolistType
}

export const Tasks = ({todolist,}: Props) => {
  const {id, filter} = todolist

  const tasks = useAppSelector(selectTasks);

  let filteredTasks: Task[] = tasks[id]
  if (filter === 'active') {
    filteredTasks = filteredTasks.filter(task => !task.isDone)
  }
  if (filter === 'completed') {
    filteredTasks = filteredTasks.filter(task => task.isDone)
  }

  return (
    <>
      {filteredTasks.length === 0
        ? <span>Your takslist is empty</span>
        : <List>
          {filteredTasks.map(task => {
            return (
              <TaskItem
                key={task.id}
                todolistId={id}
                task={task}
              />
            )
          })}
        </List>}
    </>
  );
};