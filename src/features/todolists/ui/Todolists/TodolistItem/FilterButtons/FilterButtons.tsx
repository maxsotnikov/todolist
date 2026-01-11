import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {FilterValuesType, TodolistType} from '@/common/commontypes.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {changeTodolistFilterAC} from '@/features/todolists/model/todolists-reducer.ts';
import {container} from '@/common/styles/container.styles.ts';

type Props = {
  todolist: TodolistType
}

export const FilterButtons = ({todolist,}: Props) => {
  const {id, filter} = todolist

  const dispatch = useAppDispatch();

  const changeFilterHandler = (filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC({filter, id}))
  }

  return (
    <Box sx={container}>
      <Button
        variant="contained"
        size="small"
        color={filter === 'all' ? 'primary' : 'secondary'}
        disableElevation
        onClick={() => changeFilterHandler('all')}
      >
        All
      </Button>

      <Button
        variant="contained"
        size="small"
        color={filter === 'active' ? 'primary' : 'secondary'}
        disableElevation
        onClick={() => changeFilterHandler('active')}
      >
        Active
      </Button>

      <Button
        variant="contained"
        size="small"
        color={filter === 'completed' ? 'primary' : 'secondary'}
        disableElevation
        onClick={() => changeFilterHandler('completed')}
      >
        Completed
      </Button>
    </Box>
  );
};