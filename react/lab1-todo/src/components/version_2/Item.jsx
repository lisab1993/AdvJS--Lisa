import React from 'react'

const Item = (props) => {
  return (
    <div>
        {props.name}
        {props.complete === false ? <button onClick={(() => props.handleToggle(props))}>Complete</button> : <button onClick={(() => props.handleToggle(props))}>Back to Incomplete</button>}
        <button>Delete</button>
    </div>
  )
}

export default Item