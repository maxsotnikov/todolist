import {Button} from "./Button.tsx";
import {FilterValuesType, Task, TodolistType} from "./commontypes.ts";
import {useState} from "react";

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
}

export const Todolist = ({
                           title,
                           tasks,
                           filter,
                           deleteTask,
                           changeToDoListFilter,
                           createTask,
                           changetaskStatus, todolistId, deleteTodolist
                         }: Props) => {
  const [taskInput, setTaskInput] = useState('');
  const [error, setError] = useState(false);


  const list = tasks.length === 0
    ? <span>Your takslist is empty</span>
    : <ul>
      {tasks.map(t => {
        return (
          <li className={t.isDone ? 'task-done' : 'task'}>
            <input
              type="checkbox"
              checked={t.isDone}
              onChange={e => changetaskStatus(t.id, e.currentTarget.checked, todolistId)}
            />
            <span>{t.title}</span>
            <Button
              title={'x'}
              onClick={() => deleteTask(t.id, todolistId)}
            />
          </li>
        )
      })}
    </ul>

  const createTaskHandler = () => {
    const trimmedTitle = taskInput.trim()
    if (trimmedTitle !== '') {
      createTask(trimmedTitle, todolistId)
    } else {
      setError(true);
    }
    setTaskInput('');
  }

  return (
    <div>
      <h3>
        {title}
        <Button title={'x'} onClick={() => deleteTodolist(todolistId)}/>
      </h3>
      <div>
        <input
          placeholder='max length of tasks must be 10'
          value={taskInput}
          onChange={(e) => {
            error && setError(false);
            if (e.currentTarget.value.length < 12) {
              setTaskInput(e.currentTarget.value)
            }
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              createTaskHandler()
            }
          }}
          className={error ? 'input-error' : ''}
        />
        <Button
          title={'+'}
          disabled={taskInput.length === 0 || taskInput.length > 10}
          onClick={createTaskHandler}
        />
        {taskInput && taskInput.length <= 10 &&
          <div>max length mast be 10 charters</div>
        }
        {taskInput.length > 10 &&
          <div style={{color: "red"}}>task title is too long</div>
        }
        {error &&
          <div style={{color: "red"}}>enter is valid</div>
        }
      </div>
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