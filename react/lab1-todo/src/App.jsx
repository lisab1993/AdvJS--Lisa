import { useState } from "react";
import { createRoot } from "react-dom/client";
//version 1 is on the Todo component
import Todo from "./components/version_1/Todo-v1";

import List from "./components/version_2/List";

const App = () => {
  const [newText, setNewText] = useState("");
  const [todos, setTodos] = useState([
    { name: "walk the dog", complete: false },
    { name: "feed the cat", complete: false },
    { name: "go for a walk", complete: true },
  ]);

  //loop over the list, and check if the item is complete or not
  //there will be two List components, one for todos, one for todones
  //
  const handleChange = (event) => {
    event.preventDefault();
    setNewText(event.target.value);
  };

  const addTodo = () => {
    setTodos([...todos, { name: newText, complete: false }]);
    setNewText("")
  };

  const removeItem = (item) => {
    let removeIndex = 0;
    for (obj in todos) {
      if (item.name === todos[obj]["name"]) {
        removeIndex = obj
      }
    }
    todos.splice(removeIndex, 1)
    setTodos([...todos])
  };

  const toggleCompleted = (item) => {
    let todoIndex = null;
    //loop to find the item
    //indexOf doesn't work due to the function in the item
    for (obj in todos) {
      if (item.name === todos[obj]["name"]) {
        todoIndex = obj;
      }
    }
    //grab the object from state
    let itemObj = todos[todoIndex];
    //determine if completion needs to be true or false
    if (itemObj["complete"] === false) {
      //flip the boolean in our copied object and save it
      itemObj["complete"] = true;
      setTodos([...todos]);
    } else {
      itemObj["complete"] = false;
      setTodos([...todos]);
    }
  };

  return (
    <div>
      <h1>Add Todo Item</h1>
      <p>Enter New Todo</p>
      <div>
        <input
          value={newText}
          type="text"
          onChange={(event) => handleChange(event)}
        />
        <button onClick={() => addTodo()}>Add Todo</button>
      </div>

      <br />
      <hr />
      <br />

      <h1>Incomplete Items</h1>
      <List
        todos={todos.filter((todoObj) => todoObj.complete === false)}
        handleToggle={toggleCompleted}
        handleRemove={removeItem}
      />

      <br />
      <hr />
      <br />

      <h1>Complete Items</h1>
      <List
        todos={todos.filter((todoObj) => todoObj.complete === true)}
        handleToggle={toggleCompleted}
        handleRemove={removeItem}
      />
    </div>
  );
};

// npm run dev in the terminal to start the app
const root = createRoot(document.getElementById("root"));
root.render(<App />);
