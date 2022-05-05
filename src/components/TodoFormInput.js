import React, { useEffect, useRef, useState } from "react"

const TodoFormInput = (props) => {
  const [todoInput, setTodoInput] = useState("")
  const inputRef = useRef(null)

  const inputChangeHandler = (e) => {
    setTodoInput(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    if (todoInput !== "") {
      props.addItemToList(todoInput)
      setTodoInput("")
    }
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [todoInput])

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        aria-label="input-field"
        value={todoInput}
        onChange={inputChangeHandler}
        ref={inputRef}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TodoFormInput
