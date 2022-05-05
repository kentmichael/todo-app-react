import React from "react"

const TodoDisplayList = ({ list, toggleItemStatus }) => {
  return (
    <ul>
      {list.length === 0 ? (
        <li>Empty list</li>
      ) : (
        list.map((item) => (
          <li key={item.id}>
            {JSON.stringify({ item })}
            <button onClick={() => toggleItemStatus(item.id)}>X</button>
          </li>
        ))
      )}
    </ul>
  )
}

export default TodoDisplayList
