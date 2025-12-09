import {Button} from "./Button.tsx";
import {FilterValuesType, Task} from "./commontypes.ts";
import {useRef} from "react";

type Props = {
  title: string,
  tasks: Task[],
  deleteTask: (taskId: Task['id']) => void,
  changeToDoListFilter: (nextFilterValue: FilterValuesType) => void,
  createTask: (title: Task['title']) => void
}

export const Todolist =({title, tasks, deleteTask, changeToDoListFilter, createTask}: Props) => {
  const taskInputRef = useRef<HTMLInputElement>(null);

  const list = tasks.length === 0
    ? <span>Your takslist if empty</span>
    : <ul>
      {tasks.map(t => {
        return (
          <li>
            <input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <Button title={'x'} onClick={() => deleteTask(t.id)}/>
          </li>
        )
      })}
    </ul>

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input ref={taskInputRef}/>
        <Button title={'+'} onClick={() => {
          if(taskInputRef.current) {
            createTask(taskInputRef.current.value)
            taskInputRef.current.value = ''
          }
        }}/>
      </div>
      {list}
      <div>
        <Button title={'All'} onClick={() => changeToDoListFilter('all')}/>
        <Button title={'Active'} onClick={() => changeToDoListFilter('active')}/>
        <Button title={'Completed'} onClick={() => changeToDoListFilter('completed')}/>
      </div>
    </div>
  )
}