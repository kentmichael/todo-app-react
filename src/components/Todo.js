import React, { useReducer } from "react"
import TodoDisplayList from "./TodoDisplayList"
import TodoFormInput from "./TodoFormInput"

const todoList = []

const todoAction = (currentList, action) => {
  let lastItem,
    lastId = 0

  if (currentList.length) {
    lastItem = currentList[currentList.length - 1]
    lastId = lastItem.id
  }

  switch (action.type) {
    case "add":
      return [
        ...currentList,
        {
          id: lastId + 1,
          item: action.item,
          isCompleted: false,
        },
      ]
    case "toggleStatus":
      const newList = currentList.map((listItem) => {
        if (listItem.id === action.id) {
          return {
            ...listItem,
            isCompleted: !listItem.isCompleted,
          }
        }
        return listItem
      })
      return newList
    default:
      return currentList
  }
}

const Todo = () => {
  const [list, dispatch] = useReducer(todoAction, todoList)

  const addItemToList = (item) => {
    dispatch({ type: "add", item })
  }

  const toggleItemStatus = (id) => {
    dispatch({ type: "toggleStatus", id })
  }

  //Add useEffect to check local storage and set
  //todoList if found

  return (
    <React.Fragment>
      <TodoFormInput addItemToList={addItemToList} />
      <TodoDisplayList toggleItemStatus={toggleItemStatus} list={list} />
    </React.Fragment>
  )
}

export default Todo
