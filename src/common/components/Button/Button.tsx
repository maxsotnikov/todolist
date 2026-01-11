type PropsType = {
  title: string,
  onClick: () => void,
  disabled?: boolean,
  classname?: string,
}

export const Button = ({title, onClick, disabled, classname}: PropsType) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className= {classname}
    >{title}</button>
  )
}