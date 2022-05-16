const Posts = (props) => {

  return (
    <div>
      {props.posts.map((post, index) => (
        <div
          key={index}
          className="
        border-2 border-solid border-black 
        mb-1 w-2/3 mx-auto text-center p-3
        bg-gradient-to-b from-cyan-400 to-pink-400 via-purple-400
        "
        >
          <div className="font-bold font-comfortaa text-xl">{post.title}</div>
          <div className="font-handlee font-bold text-lg">{post.body}</div>
          <div className="font-cookie italic font-bold text-xl">~{post.author}</div>
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
