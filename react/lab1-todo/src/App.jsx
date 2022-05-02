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
  };

  const toggleCompleted = (item) => {
    let todoIndex = null
    for (obj in todos) {
        if (item.name === todos[obj]['name']) {
            todoIndex = obj
        }
    }
    let itemObj = todos[todoIndex]
    if (itemObj['complete'] === false) {
      itemObj['complete'] = true
      todos[todoIndex] = itemObj
      setTodos([...todos])
    } else {
      itemObj['complete'] = false
      todos[todoIndex] = itemObj
      setTodos([...todos])
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
      />

      <br />
      <hr />
      <br />

      <h1>Complete Items</h1>
      <List
        todos={todos.filter((todoObj) => todoObj.complete === true)}
        handleToggle={toggleCompleted}
      />
    </div>
  );
};

// npm run dev in the terminal to start the app
const root = createRoot(document.getElementById("root"));
root.render(<App />);
