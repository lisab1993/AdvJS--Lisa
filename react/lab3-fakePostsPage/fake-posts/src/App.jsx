import { useEffect, useState } from "react";
import axios from "axios";
import Posts from "./components/Posts.jsx";
import "./index.css";

function App() {
  //posts with author names added
  const [posts, setPosts] = useState([]);
  //the posts as returned by an axios call
  let prePosts = [];
  //the users as returned by an axios call
  let users = [];
  

  const getObjIndex = (array, propName, targetVal) => {
    //takes in an array to search through
    //searches for an object desired property value
    //propName is the prop (name, id, title,)
    //targetVal is property value to search for ('Leanne Graham', 1, 'qui est esse')
    //returns the index of that object
    //empty object in the negative ternary means to do nothing
    let output = "";
    array.map((obj) =>
      obj[propName] === targetVal ? (output = array.indexOf(obj)) : {}
    );
    return output;
  };

  const getPosts = async () => {
    //gets the posts from the api
    await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        prePosts = res.data;
        console.log("preposts set");
      });
    //gets the users from the api
    await axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        users = res.data;
        console.log("users set");
      });
    //add the author's names to their respective posts
    let userIndex = "";
    let user = "";
    let output = prePosts.map((post) => {
      userIndex = getObjIndex(users, "id", post.userId);
      user = users[userIndex];
      return {
        ...post,
        author: user["name"],
        title: post.title[0].toUpperCase() + post.title.slice(1),
        body: post.body[0].toUpperCase() + post.body.slice(1) + ".",
      };
    });
    setPosts(output);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex bg-emerald-800">
      <Posts posts={posts} />
    </div>
  );
}

export default App;
