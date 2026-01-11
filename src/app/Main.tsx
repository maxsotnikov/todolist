import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {CreateItemForm} from '@/common/components/CreateItemForm/CreateItemForm.tsx';
import {TodolistType} from '@/common/commontypes.ts';
import {createTodolistAC} from '@/features/todolists/model/todolists-reducer.ts';
import {useAppDispatch} from '@/common/hooks/useAppDispatch.ts';
import {Todolists} from '@/features/todolists/ui/Todolists/Todolists.tsx';

export const Main = () => {
  const dispatch = useAppDispatch();

  const createToDolist = (title: TodolistType['title']) => {
    const action = createTodolistAC(title)
    dispatch(action)
  }

  return (
    <Container maxWidth="lg">
      <Grid container sx={{padding: '15px 0'}}>
        <CreateItemForm
          createItem={createToDolist}
          maxTitleLength={10}
        />
      </Grid>
      <Grid container spacing={4}>
        <Todolists />
      </Grid>
    </Container>
  );
};