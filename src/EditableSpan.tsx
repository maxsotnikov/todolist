import {ChangeEvent, useState} from "react";
import {TextField} from '@mui/material';

type Props = {
  title: string,
  changeTitle: (newTitle: string) => void,
}

export const EditableSpan = ({title, changeTitle}: Props) => {
  const [titleInput, setTitleInput] = useState(title);
  const [editMode, setEditMode] = useState(false)

  const oneditMode = () => {
    setEditMode(true)
  }
  const offEditMode = () => {
    changeTitle(titleInput)
    setEditMode(false)
  }

  const setTitleInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitleInput(e.currentTarget.value)
  }
  return (
    editMode ?
      <TextField
        variant="standard"
        value={titleInput}
        onBlur={offEditMode}
        autoFocus={true}
        onChange={setTitleInputHandler}
      /> :
      <span onDoubleClick={oneditMode}>{title}</span>
  );
}
