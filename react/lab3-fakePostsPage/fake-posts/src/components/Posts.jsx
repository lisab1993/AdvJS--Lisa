import React from "react";
import { useEffect } from "react";

const Posts = (props) => {
    const posts = props.posts
    const users = props.users

    // const getObjIndex = (array, propName, targetVal) => {
    //     //takes in an array
    //     //searches for an object that has the desired property/value combo
    //     //returns the index of that object
    //     //empty object means to pass and do nothing
    //     let output = ''
    //     array.map(obj => (
    //         (obj[propName] === targetVal) ?
    //         output = (array.indexOf(obj)) : 
    //         {}
    //     ))
    //     return output
    // }

    // useEffect(() => {
    //     let title = ''
    //     let body = '' 
    //     let user = ''
    //     posts.map(post => (
    //         title = post.title,
    //         console.log(title, ' -title'),
    //         body = post.body,
    //         console.log(body, ' -body'),
    //         user = users[getObjIndex(users, 'id', post.userId)],
    //         console.log(user['name'], ' -user')
    //         // console.log((users[getObjIndex(users, 'id', post.userId)])),

            
    //     ))
    // }, [posts, users])

  return (
    <div>
      {/* {props.users.map((obj, index) => (
        <div key={index}>
          Name: {obj.name}
          <br /> <br /> <hr />
        </div>
      ))}  */}

    </div>
  );
};

export default Posts;


//KEEP THIS
// import React from "react";

// const Posts = (props) => {

//   return (
//     <div className="border-2 border-solid border-rose-700 mx-auto w-1/3">
//       {props.posts.map((obj, index) => (
//         <div className="border-2 border-solid border-black" key={index}>
//           <div className="text-center">{obj.title}</div>
//           <div>{obj.body}</div>
//         </div>
//       ))} 

//     </div>
//   );
// };

// export default Posts;
