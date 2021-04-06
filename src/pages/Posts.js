import React from "react";
import Film from "./Film";
const Posts = ({ posts }) => {
  return (
    <>
      {posts[0] &&
        posts.map((post) => (
          <Film info={post} id={post[0].etag}>
            {" "}
          </Film>
        ))}
    </>
  );
};
export default Posts;
