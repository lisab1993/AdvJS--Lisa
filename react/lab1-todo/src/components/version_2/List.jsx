import React from "react";
import Item from "./Item";

function List(props) {
  //the list component will be used for incomplete and complete lists
  //the items inside will be shown using the item component
  //i need to pass the state down from App to List


  return (
    <div>
      <h3>List Component</h3>
        {props.todos.map((obj, index) => (
            <Item key={index} name={obj.name} complete={obj.complete} handleToggle={props.handleToggle} handleRemove={props.handleRemove}/>
        ))}
    </div>
  );
}

export default List;
