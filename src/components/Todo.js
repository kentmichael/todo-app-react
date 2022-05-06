import React, { useEffect, useReducer, useState } from "react"
import TodoDisplayList from "./TodoDisplayList"
import TodoFilter from "./TodoFilter"
import TodoFormInput from "./TodoFormInput"
import TodoMarkAllComplete from "./TodoMarkAllComplete"

const todoList = []

const todoAction = (currentList, action) => {
  let lastItem,
    lastId = 0

  if (currentList.length) {
    lastItem = currentList[currentList.length - 1]
    lastId = lastItem.id
  }

  let list = []

  switch (action.type) {
    case "fromLocalStorage":
      list = action.CACHE_TODO_ITEM
      break
    case "add":
      list = [
        ...currentList,
        {
          id: lastId + 1,
          item: action.item,
          isCompleted: false,
        },
      ]
      break
    case "toggleStatus":
      list = currentList.map((listItem) => {
        if (listItem.id === action.id) {
          return {
            ...listItem,
            isCompleted: !listItem.isCompleted,
          }
        }
        return listItem
      })
      break
    case "markAllAsComplete":
      list = currentList.map((listItem) => {
        return {
          ...listItem,
          isCompleted: !action.boolStatus,
        }
      })
      break
    case "deleteItem":
      list = action.itemsToRetain
      break
    default:
      return currentList
  }

  localStorage.setItem("CACHE_TODO_ITEM", JSON.stringify(list))
  return list
}

const Todo = () => {
  const [list, dispatch] = useReducer(todoAction, todoList)
  const [filter, setFilter] = useState("all")

  const addItemToList = (item) => {
    dispatch({ type: "add", item })
  }

  const toggleItemStatus = (id) => {
    dispatch({ type: "toggleStatus", id })
  }

  const markAllAsComplete = (boolStatus) => {
    dispatch({ type: "markAllAsComplete", boolStatus })
  }

  const deleteItem = (itemsToRetain) => {
    dispatch({ type: "deleteItem", itemsToRetain })
  }

  const filterItems = (option) => {
    setFilter(option)
  }

  //Check local storage on initial render
  useEffect(() => {
    if (localStorage.getItem("CACHE_TODO_ITEM")) {
      dispatch({
        type: "fromLocalStorage",
        CACHE_TODO_ITEM: JSON.parse(localStorage.getItem("CACHE_TODO_ITEM")),
      })
    }
  }, [])

  return (
    <React.Fragment>
      <TodoFormInput addItemToList={addItemToList} />
      <TodoDisplayList
        toggleItemStatus={toggleItemStatus}
        list={list}
        filter={filter}
      />
      <TodoFilter filterItems={filterItems} />
      <TodoMarkAllComplete
        markAllAsComplete={markAllAsComplete}
        list={list}
        deleteItem={deleteItem}
      />
    </React.Fragment>
  )
}

export default Todo
