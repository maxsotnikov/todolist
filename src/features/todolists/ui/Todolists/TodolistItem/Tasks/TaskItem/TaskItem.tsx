import ListItem from '@mui/material/ListItem';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {Task, TodolistType} from '@/common/commontypes.ts';
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  deleteTaskAC
} from '@/features/todolists/model/tasks-reducer.ts';
import {ChangeEvent} from 'react';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan.tsx';
import {container, getListItemSx} from '@/common/styles/container.styles.ts';

type Props = {
  task: Task
  todolistId: TodolistType['id']
}

export const TaskItem = ({task, todolistId}: Props) => {
  const dispatch = useAppDispatch();

  const changeTaskTitleHandler = (newTitle: Task['title']) => {
    dispatch(changeTaskTitleAC({
      taskId: task.id,
      title: newTitle,
      todolistId
    }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newStatusValue = e.currentTarget.checked
    dispatch(changeTaskStatusAC({
      taskId: task.id,
      isDone: newStatusValue,
      todolistId
    }))
  }

  const deleteTaskHandler = () => {
    dispatch(deleteTaskAC({taskId: task.id, todolistId}))
  }

  return (
    <ListItem
      key={task.id}
      disablePadding
      sx={container}
    >
      <Checkbox
        size="small"
        checked={task.isDone}
        onChange={changeTaskStatusHandler}
      />
      <Box sx={getListItemSx(task.isDone)}>
        <EditableSpan
          title={task.title}
          changeTitle={changeTaskTitleHandler}
        />
      </Box>
      <IconButton onClick={deleteTaskHandler}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};