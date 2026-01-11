import {EditableSpan} from '@/common/components/EditableSpan/EditableSpan.tsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import {TodolistType} from '@/common/commontypes.ts';
import {
  changeTodolistTitleAC,
  deleteTodolistAC
} from '@/features/todolists/model/todolists-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {container} from '@/common/styles/container.styles.ts';

type Props = {
  todolist: TodolistType
}

export const TodolistTitle = ({todolist}: Props) => {
  const {id, title} = todolist
  const dispatch = useAppDispatch();

  const changeTodolistTitleHandler = (newTitle: TodolistType['title']) => {
    dispatch(changeTodolistTitleAC({id, title: newTitle}))
  }

  const deleteTodolistHandler = () => {
    dispatch(deleteTodolistAC({id}))
  }

  return (
    <div>
      <Typography
        variant="h5"
        sx={container}
      >
        <EditableSpan
          title={title}
          changeTitle={changeTodolistTitleHandler}
        />
        <IconButton onClick={deleteTodolistHandler}>
          <DeleteIcon />
        </IconButton>
      </Typography>
    </div>
  );
};