import React from "react";
import Film from "./Film";
const Posts = ({ posts }) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <Film info={post} id={post.etag}>
            {" "}
          </Film>
        ))}
    </>
  );
};
export default Posts;
