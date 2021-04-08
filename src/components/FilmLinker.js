import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import urlTest from "../api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadFilms } from "../actions/filmAction";
import { clearFilms } from "../actions/filmsClear";
import Film from "../pages/Film";
import Posts from "../pages/Posts";
import PageItem from "react-bootstrap/PageItem";
import Paginationed from "../components/Pagination";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";

export const FilmLinker = ({
  filmList,
  setFilmList,
  filmStats,
  setFilmStats,
}) => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.film);
  const [statsChanged, setStatsChanged] = useState(false);
  const inputRef = useRef(null);
  // Pagination
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  // Current posts
  useEffect(() => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = stats.slice(indexOfFirstPost, indexOfLastPost);
    console.log("wykonuje");
  }, [statsChanged]);
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
    console.log(
      stats
        .slice()
        .sort((a, b) => a[0].snippet.title.localeCompare(b[0].snippet.title))
    );
    if (pole.value != "") {
      checkLink(inputRef.current.value);
      loadFilmHandler(checkLink(inputRef.current.value));
      setFilmList((filmList) => [...filmList, inputRef.current.value]);
      inputRef.current.value = "";
    }
  };

  const sortAlphabetically = (e) => {
    e.preventDefault();
    var datauska = new Date().toLocaleString();
    console.log(datauska.slice(0, datauska.lastIndexOf(",")));

    switch (e.target.value) {
      case "AZ":
        stats.sort((a, b) =>
          a[0].snippet.title.localeCompare(b[0].snippet.title)
        );
        break;
      case "ZA":
        stats.sort((a, b) =>
          b[0].snippet.title.localeCompare(a[0].snippet.title)
        );
        break;
      case "NewestOldest":
        stats.sort((a, b) => Date.parse(a[1]) - Date.parse(b[1]));
        break;
      case "OldestNewest":
        stats.sort((a, b) => Date.parse(b[1]) - Date.parse(a[1]));
        break;
    }

    setStatsChanged(() => {
      return !statsChanged;
    });
  };

  const clearFilmList = (e) => {
    e.preventDefault();
    dispatch(clearFilms());

    localStorage.clear();
  };

  // Make paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MainForm>
      <Label>
        <h3> Podaj link lub id filmu: </h3>
        <input ref={inputRef} className="link" type="text" />{" "}
      </Label>
      <input type="submit" onClick={addFilm} />
      <input type="submit" value="clear" onClick={clearFilmList} />

      <Form>
        <Form.Group controlId="exampleForm.SelectCustom">
          <Form.Label>Sortuj</Form.Label>
          <Form.Control as="select" custom onChange={sortAlphabetically}>
            <option value="wybierz">Wybierz</option>
            <option value="AZ">A - Z</option>
            <option value="ZA">Z - A</option>
            <option value="NewestOldest"> Od najnowszych</option>
            <option value="OldestNewest"> Od najstarszych</option>
          </Form.Control>
        </Form.Group>
      </Form>
      <List>
        <Posts posts={currentPosts}> </Posts>
      </List>
      <Paginationed
        postsPerPage={postsPerPage}
        totalPosts={stats.length}
        paginate={paginate}
        stats={stats}
        currentPage={currentPage}
        posts={currentPosts}
        setCurrentPage={setCurrentPage}
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
  gap: 3rem;
`;
const Footer = styled.div`
  min-height: 10vh;
`;

export default FilmLinker;
