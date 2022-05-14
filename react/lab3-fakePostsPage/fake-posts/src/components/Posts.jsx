
const Posts = (props) => {

  return (
    <div>
      {props.posts.map((obj, index) => (
        <div key={index}>
          Name: {obj.title}
          <br />
          Body: {obj.body}
          <br />
          Author: {obj.author}
          <br /> <br /> <hr />
        </div>
      ))} 

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
