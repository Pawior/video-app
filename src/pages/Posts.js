import React from "react";
import Film from "./Film";
const Posts = ({ posts, date }) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <Film info={post} date={date} id={post.etag}>
            {" "}
          </Film>
        ))}
    </>
  );
};
export default Posts;
