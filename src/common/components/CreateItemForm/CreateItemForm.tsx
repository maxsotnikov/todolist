import {KeyboardEvent, ChangeEvent, useState} from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type Props = {
  createItem: (title: string) => void
  maxTitleLength: number
}

export const CreateItemForm = ({createItem, maxTitleLength}: Props) => {
  const [itemInput, setItemInput] = useState('')
  const [error, setError] = useState(false)

  const createItemHandler = () => {
    const trimmedTitle = itemInput.trim()
    if (trimmedTitle) {
      createItem(trimmedTitle)
    } else (
      setError(true)
    )
    setItemInput('')
  }
  const onChangeSetItemInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false)
    if (e.currentTarget.value.length <= maxTitleLength)
      setItemInput(e.currentTarget.value)
  }
  const onKeyDownCreateItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createItemHandler()
    }
  }

  const isItemTitleNotValid = itemInput.length === 0 || itemInput.length > maxTitleLength
  const isTitleLengthValid = itemInput && itemInput.length === (maxTitleLength)

  return (
    <Box>
      <TextField
        variant="outlined"
        size="small"
        label={'Enter a title'}
        placeholder={`max length must be ${maxTitleLength} charters`}
        value={itemInput}
        error={error}
        onChange={onChangeSetItemInputHandler}
        onKeyDown={onKeyDownCreateItemHandler}
        helperText={error && 'enter valid title'}
      />
      <IconButton

        disabled={isItemTitleNotValid}
        onClick={createItemHandler}
      >
        <AddBoxIcon />
      </IconButton>
      {isTitleLengthValid && <div style={{color: 'red'}}>max length must be {maxTitleLength} charters</div>}
    </Box>
  )
}