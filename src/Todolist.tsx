import {Button} from "./Button.tsx";
import {FilterValuesType, Task, TodolistType} from "./commontypes.ts";
import {CreateItemForm} from "./CreateItemForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";

type Props = {
  todolistId: TodolistType['id']
  title: string,
  tasks: Task[],
  filter: FilterValuesType,
  deleteTask: (taskId: Task['id'], todolistId: TodolistType['id']) => void,
  deleteTodolist: (todolistId: TodolistType['id']) => void,
  changeToDoListFilter: (nextFilterValue: FilterValuesType, todolistId: TodolistType['id']) => void,
  createTask: (title: Task['title'], todolistId: TodolistType['id']) => void
  changetaskStatus: (taskId: Task['id'], newTaskStatus: Task['isDone'], todolistId: TodolistType['id']) => void
  changeToDolistTitle: (title: TodolistType['title'], todolistId: TodolistType['id']) => void
  changeTaskTitle: (taskId: Task['id'], title: Task['title'], todolistId: TodolistType['id']) => void
}

export const Todolist = ({
                           title,
                           tasks,
                           filter,
                           deleteTask,
                           changeToDoListFilter,
                           createTask,
                           changetaskStatus,
                           todolistId,
                           deleteTodolist,
                           changeToDolistTitle,
                           changeTaskTitle,
                         }: Props) => {

  const list = tasks.length === 0
    ? <span>Your takslist is empty</span>
    : <ul>
      {tasks.map(t => {
        const changeTaskTitleHandler = (newTitle: Task['title']) => {
          changeTaskTitle(t.id, newTitle, todolistId)
        }
        return (
          <li className={t.isDone ? 'task-done' : 'task'}>
            <input
              type="checkbox"
              checked={t.isDone}
              onChange={e => changetaskStatus(t.id, e.currentTarget.checked, todolistId)}
            />
            <EditableSpan
              title={t.title}
              changeTitle={changeTaskTitleHandler}
            />
            <Button
              title={'x'}
              onClick={() => deleteTask(t.id, todolistId)}
            />
          </li>
        )
      })}
    </ul>

  const createTaskHandler = (taskTitle: Task['title']) => {
    createTask(taskTitle, todolistId)
  }
  const changeTodolistTitleHandler = (newTitle: TodolistType['title']) => {
    changeToDolistTitle(newTitle, todolistId)
  }

  return (
    <div>
      <h3>
        <EditableSpan
          title={title}
          changeTitle={changeTodolistTitleHandler}
        />
        <Button
          title={'x'}
          onClick={() => deleteTodolist(todolistId)}
        />
      </h3>
      <CreateItemForm
        createItem={createTaskHandler}
        maxTitleLength={10}
      />
      {list}
      <div>
        <Button
          title={'Все'}
          classname={filter === 'all' ? 'btn-filter-active' : ''}
          onClick={() => changeToDoListFilter('all', todolistId)}
        />
        <Button
          title={'В работе'}
          classname={filter === 'active' ? 'btn-filter-active' : ''}
          onClick={() => changeToDoListFilter('active', todolistId)}
        />
        <Button
          title={'Сделано'}
          classname={filter === 'completed' ? 'btn-filter-active' : ''}
          onClick={() => changeToDoListFilter('completed', todolistId)}
        />
      </div>
    </div>
  )
}