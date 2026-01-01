// import {Button} from "./Button.tsx";
import {FilterValuesType, Task, TodolistType} from './common/commontypes.ts';
import {CreateItemForm} from './CreateItemForm.tsx';
import {EditableSpan} from './EditableSpan.tsx';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {container, getListItemSx} from './Todolist.styles.ts';

type Props = {
  todolistId: TodolistType['id']
  title: string,
  tasks: Task[],
  filter: FilterValuesType,
  deleteTask: (taskId: Task['id'], todolistId: TodolistType['id']) => void,
  deleteTodolist: (todolistId: TodolistType['id']) => void,
  changeToDoListFilter: (nextFilterValue: FilterValuesType, todolistId: TodolistType['id']) => void,
  createTask: (title: Task['title'], todolistId: TodolistType['id']) => void
  changeTaskStatus: (taskId: Task['id'], newTaskStatus: Task['isDone'], todolistId: TodolistType['id']) => void
  changeTodolistTitle: (title: TodolistType['title'], todolistId: TodolistType['id']) => void
  changeTaskTitle: (taskId: Task['id'], title: Task['title'], todolistId: TodolistType['id']) => void
}

export const Todolist = ({
                           title,
                           tasks,
                           filter,
                           deleteTask,
                           changeToDoListFilter,
                           createTask,
                           changeTaskStatus,
                           todolistId,
                           deleteTodolist,
                           changeTodolistTitle,
                           changeTaskTitle,
                         }: Props) => {

  const list = tasks.length === 0
    ? <span>Your takslist is empty</span>
    : <List>
      {tasks.map(t => {
        const changeTaskTitleHandler = (newTitle: Task['title']) => {
          changeTaskTitle(t.id, newTitle, todolistId)
        }
        return (
          <ListItem
            // className={t.isDone ? 'task-done' : 'task'}
            key={t.id}
            disablePadding
            sx={container}
          >
            <Checkbox
              size="small"
              checked={t.isDone}
              onChange={e => changeTaskStatus(t.id, e.currentTarget.checked, todolistId)}
            />
            <Box sx={getListItemSx(t.isDone)}>
              <EditableSpan
                title={t.title}
                changeTitle={changeTaskTitleHandler}
              />
            </Box>

            <IconButton
              onClick={() => deleteTask(t.id, todolistId)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        )
      })}
    </List>

  const createTaskHandler = (taskTitle: Task['title']) => {
    createTask(taskTitle, todolistId)
  }
  const changeTodolistTitleHandler = (newTitle: TodolistType['title']) => {
    changeTodolistTitle(newTitle, todolistId)
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
        <IconButton
          onClick={() => deleteTodolist(todolistId)}
        >
          <DeleteIcon />
        </IconButton>
      </Typography>
      <CreateItemForm
        createItem={createTaskHandler}
        maxTitleLength={10}
      />
      {list}

      <Box sx={container}>
        <Button
          variant="contained"
          size="small"
          color={filter === 'all' ? 'primary' : 'secondary'}
          disableElevation
          onClick={() => changeToDoListFilter('all', todolistId)}
        >
          All
        </Button>

        <Button
          variant="contained"
          size="small"
          color={filter === 'active' ? 'primary' : 'secondary'}
          disableElevation
          onClick={() => changeToDoListFilter('active', todolistId)}
        >
          Active
        </Button>

        <Button
          variant="contained"
          size="small"
          color={filter === 'completed' ? 'primary' : 'secondary'}
          disableElevation
          onClick={() => changeToDoListFilter('completed', todolistId)}
        >
          Completed
        </Button>

      </Box>
    </div>
  )
}