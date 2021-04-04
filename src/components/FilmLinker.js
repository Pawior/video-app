import React, { useState } from "react";
import styled from "styled-components";
import urlTest from "../api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadFilms } from "../actions/filmAction";
import Film from "../pages/Film";
import Posts from "../pages/Posts";
import PageItem from "react-bootstrap/PageItem";
import Paginationed from "../components/Pagination";
import Pagination from "react-bootstrap/Pagination";

export const FilmLinker = ({
  filmList,
  setFilmList,
  filmStats,
  setFilmStats,
}) => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.film);
  // Pagination
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  // Current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = stats.slice(indexOfFirstPost, indexOfLastPost);

  const loadFilmHandler = (id) => {
    dispatch(loadFilms(id));
  };
  const checkLink = (inputedLink) => {
    inputedLink = inputedLink.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return inputedLink[2] !== undefined
      ? inputedLink[2].split(/[^0-9a-z_\-]/i)[0]
      : inputedLink[0];
  };
  const addFilm = (e) => {
    e.preventDefault();
    const pole = document.querySelector(".link");
    if (pole.value != "") {
      checkLink(pole.value);
      loadFilmHandler(checkLink(pole.value));
      setFilmList((filmList) => [...filmList, pole.value]);
      pole.value = "";
    }
  };

  const clearFilmList = () => {
    setFilmList = [""];
  };

  // Make paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MainForm>
      <Label>
        <h3> Podaj link lub id filmu: </h3>
        <input className="link" type="text" />{" "}
      </Label>
      <input type="submit" onClick={addFilm} />
      <input type="submit" value="clear" onClick={clearFilmList} />
      <Posts posts={currentPosts}> </Posts>
      <Paginationed
        postsPerPage={postsPerPage}
        totalPosts={stats.length}
        paginate={paginate}
        stats={stats}
      />
      {/* <List>
        {stats &&
          stats.map((stat) => (
            <Film info={stat} id={stat.etag}>
              {" "}
            </Film>
          ))}
      </List> */}
      <Footer> </Footer>
    </MainForm>
  );
};
const MainForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-items: center;
  gap: 10px;
`;
const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const List = styled.div`
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  gap: 100px;
`;
const Footer = styled.div`
  min-height: 10vh;
`;

export default FilmLinker;
