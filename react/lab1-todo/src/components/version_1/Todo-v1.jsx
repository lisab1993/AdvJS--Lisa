import { useState } from "react";

const Todo = () => {
  const [newText, setNewText] = useState("");
  const [todos, setTodos] = useState([
    { name: "walk the dog", complete: false },
    { name: "feed the cat", complete: false },
    { name: "go for a walk", complete: true },
  ]);

  const handleChange = (event) => {
    event.preventDefault();
    //handles the typing in the new todo input box
    setNewText(event.target.value);
    // console.log(event.target.value, "from handlechange");
  };

  const addItem = () => {
    setTodos([...todos, { name: newText, complete: false }]);
  };

  const removeItem = (item) => {
    //remove a todo item, either complete or incomplete
    if (todos.includes(item)) {
      const removeIndex = todos.indexOf(item);
      todos.splice(removeIndex, 1);
      setTodos([...todos]);
    }
  };

  const toggleCompleted = (item) => {
    //make an item complete or incomplete
    //turn incomplete items complete
    if (item.complete === false) {
      const incompleteIndex = todos.indexOf(item);
      item["complete"] = true;
      todos[incompleteIndex] = item;
      setTodos([...todos]);
    }
    //turn complete items incomplete
    else {
      const completeIndex = todos.indexOf(item);
      item["complete"] = false;
      todos[completeIndex] = item;
      setTodos([...todos]);
    }
  };

  return (
    <div>
      <h1>React Todo List</h1>
      <label htmlFor="newTodo">Add Your Todo Here</label>
      <input
        value={newText}
        onChange={(event) => handleChange(event)}
        id="newTodo"
        type="text"
      ></input>
      <button onClick={addItem}>Submit</button>

      <br></br>
      <hr></hr>

      <h2>Incomplete Tasks</h2>
      <div>
        {/* .filter() will create an array of incomplete items, and .map() will create a div for the item's name, complete and delete buttons */}
        {todos
          .filter((item) => item.complete === false)
          .map((item, index) => (
            <div key={index}>
              {item.name}{" "}
              <button onClick={() => toggleCompleted(item)}>Complete</button>
              <button onClick={() => removeItem(item)}>Delete</button>
            </div>
          ))}
      </div>

      <br></br>
      <hr></hr>

      <h2>Complete Tasks</h2>
      <div>
        {/* .filter() will create an array of incomplete items, and .map() will create a div for the item's name, complete and delete buttons */}
        {todos
          .filter((item) => item.complete === true)
          .map((item, index) => (
            <div key={index}>
              {item.name}{" "}
              <button onClick={() => toggleCompleted(item)}>
                Back to Incomplete
              </button>
              <button onClick={() => removeItem(item)}>Delete</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Todo;
