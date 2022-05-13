import { useEffect, useState } from "react";
import axios from "axios";
import Posts from "./components/Posts.jsx";
import "./index.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [test, setTest] = useState([]);

  const getObjIndex = (array, propName, targetVal) => {
    //takes in an array
    //searches for an object that has the desired property/value combo
    //returns the index of that object
    //empty object means to pass and do nothing
    let output = "";
    array.map((obj) =>
      obj[propName] === targetVal ? (output = array.indexOf(obj)) : {}
    );
    return output;
  };

  const handleAsync = async () => {
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        console.log("posts set");
        setPosts(res.data);
      });
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        console.log("users set");
        setUsers(res.data);
      });
    let output = posts.map(
      (post) => (post.userId = users[getObjIndex(users, "id", post.userId)])
    );
    setTest(output);
  };

  useEffect(() => {
    handleAsync();
  }, []);

  return (
    <div className="flex">
      <Posts posts={posts} />
    </div>
  );
}

export default App;
