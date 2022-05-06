import React from "react"

const TodoFilter = ({ filterItems }) => {
  return (
    <div>
      <button onClick={() => filterItems("all")}>All</button>
      <button onClick={() => filterItems("active")}>Active</button>
      <button onClick={() => filterItems("completed")}>Complete</button>
    </div>
  )
}

export default TodoFilter
