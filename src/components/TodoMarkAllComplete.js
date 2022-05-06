import React from "react"

const TodoMarkAllComplete = ({ markAllAsComplete, list, deleteItem }) => {
  const isCompleted = list.every((item) => item.isCompleted)
  const anyCompleted = list.some((item) => item.isCompleted)
  const toRetain = list.filter((item) => !item.isCompleted)

  return (
    <div>
      <button onClick={() => markAllAsComplete(isCompleted)}>
        Mark all as complete
      </button>
      <br />
      {anyCompleted && (
        <button onClick={() => deleteItem(toRetain)}>
          Delete all complete
        </button>
      )}
    </div>
  )
}

export default TodoMarkAllComplete
