import React from 'react'

const Item = (props) => {
  return (
    <div>
      Item Component
        {props.name}
        {props.complete === false ? <button onClick={(() => props.handleToggle(props))}>Complete</button> : <button onClick={(() => props.handleToggle(props))}>Back to Incomplete</button>}
        <button onClick={() => props.handleRemove(props)}>Delete</button>
    </div>
  )
}

export default Item