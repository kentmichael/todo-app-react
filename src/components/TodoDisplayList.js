import React from "react"

const itemCompleted = {
  textDecoration: "line-through",
  color: "gray",
}

const filterList = (list, filter) => {
  switch (filter) {
    case "active":
      return list.filter((item) => !item.isCompleted)
    case "completed":
      return list.filter((item) => item.isCompleted)
    default:
      return list
  }
}

const TodoDisplayList = ({ list, toggleItemStatus, filter }) => {
  const filteredList = filterList(list, filter)

  return (
    <ul>
      {filteredList.length === 0 ? (
        <li>Empty list</li>
      ) : (
        filteredList.map((item) => (
          <li key={item.id} style={item.isCompleted ? itemCompleted : null}>
            {item.item}
            <button onClick={() => toggleItemStatus(item.id)}>X</button>
          </li>
        ))
      )}
    </ul>
  )
}

export default TodoDisplayList
