import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
  createItem: (title: string) => void
  maxTitleLength: number
}

export const CreateItemForm = ({createItem, maxTitleLength}: Props) => {

  const [itemInput, setItemInput] = useState('');
  const [error, setError] = useState(false);

  const createItemHandler = () => {
    const trimmedTitle = itemInput.trim()
    if (trimmedTitle !== '') {
      createItem(trimmedTitle)
    } else {
      setError(true);
    }
    setItemInput('');
  }

  const onChangeSetItemInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    error && setError(false);
    if (e.currentTarget.value.length <= maxTitleLength) {
      setItemInput(e.currentTarget.value)
    }
  }

  const onKeyDownCreateItemHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      createItemHandler()
    }
  }

  const isItemTitleNotValid = itemInput.length === 0 || itemInput.length > maxTitleLength
  const isItemTitleLengthValid =  itemInput.length === maxTitleLength

  return (
    <div>
      <input
        placeholder={`max length must be ${maxTitleLength}`}
        value={itemInput}
        onChange={onChangeSetItemInputHandler}
        onKeyDown={onKeyDownCreateItemHandler}
        className={error ? 'input-error' : ''}
      />
      <Button
        title={'+'}
        disabled={isItemTitleNotValid}
        onClick={createItemHandler}
      />
      {isItemTitleLengthValid &&
        <div>max length mast be 10 charters</div>
      }

      {error &&
        <div style={{color: "red"}}>enter is valid</div>
      }
    </div>
  );
};