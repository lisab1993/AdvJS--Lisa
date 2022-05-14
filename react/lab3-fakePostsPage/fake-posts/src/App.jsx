import { useEffect, useState } from "react";
import axios from "axios";
import Posts from "./components/Posts.jsx";
import "./index.css";

function App() {
  const [posts, setPosts] = useState([]);
  let prePosts = [];
  let users = [];

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
        prePosts = res.data;
        console.log("preposts set");
        // console.log(prePosts, 'preposts');
      });
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        users = res.data;
        console.log("users set");
        // console.log(users, "users");
      });
    let userIndex = "";
    let user = "";
    let output = [];
    prePosts.map(
      (post) => (
        (userIndex = getObjIndex(users, "id", post.userId)),
        (user = users[userIndex]),
        // console.log(user['name'])
        //update the post Id
        (post["author"] = user["name"]),
        // console.log(post),
        output.push(post)
      )
    );
    // console.log(output, 'output')
    setPosts(output);
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
