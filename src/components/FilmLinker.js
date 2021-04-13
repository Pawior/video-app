import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import urlTest from "../api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadFilms } from "../actions/filmAction";
import { clearFilms } from "../actions/filmsClear";
import Film from "../pages/Film";
import Posts from "../pages/Posts";
import PageItem from "react-bootstrap/PageItem";
import Button from "react-bootstrap/Button";
import Paginationed from "../components/Pagination";
import Pagination from "react-bootstrap/Pagination";
import Form from "react-bootstrap/Form";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import breakpoint from "./StyledComponentsBreakpoint";
import DataExported from "./DataExported";
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
  }, [statsChanged]);
  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = stats.slice(indexOfFirstPost, indexOfLastPost);

  const loadFilmHandler = (id) => {
    dispatch(loadFilms(id));
  };
  // Check that link is correct
  const checkLink = (inputedLink) => {
    inputedLink = inputedLink.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return inputedLink[2] !== undefined
      ? inputedLink[2].split(/[^0-9a-z_\-]/i)[0]
      : inputedLink[0];
  };
  // Adding film
  const addFilm = (e) => {
    e.preventDefault();
    const inputValue = document.querySelector(".link");
    console.log(
      stats
        .slice()
        .sort((a, b) => a[0].snippet.title.localeCompare(b[0].snippet.title))
    );
    if (inputValue.value != "") {
      checkLink(inputRef.current.value);
      loadFilmHandler(checkLink(inputRef.current.value));
      setFilmList((filmList) => [...filmList, inputRef.current.value]);
      inputRef.current.value = "";
    }
  };
  // Sort
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
    // Additional state to fire useEffect
    setStatsChanged(() => {
      return !statsChanged;
    });
  };
  // Clear list
  const clearFilmList = (e) => {
    e.preventDefault();
    dispatch(clearFilms());

    localStorage.clear();
  };
  const importExampleDataHandler = (e) => {
    localStorage.setItem("state", DataExported().state);
    window.location.reload();
  };
  // Make paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <MainForm>
      <Label>
        <h3> Podaj link lub id filmu: </h3>
        <ClearAndImport>
          <SearchBar>
            {" "}
            <input ref={inputRef} className="link" type="text" />{" "}
            <button onClick={addFilm} className="roundedSearch">
              <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
            </button>
          </SearchBar>
          <Button variant="outline-info" onClick={importExampleDataHandler}>
            {" "}
            Import przykładowych danych
          </Button>
          <Button variant="outline-danger" onClick={clearFilmList}>
            Wyczyść listę
          </Button>{" "}
        </ClearAndImport>
      </Label>

      <List>
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
  Form {
    align-self: flex-end;
  }
`;
const Label = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const List = styled.div`
  margin-top: 5vh;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
const Footer = styled.div`
  min-height: 10vh;
`;
const SearchBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const ClearAndImport = styled.div`
  display: flex;
  flex-direction: column;

  Button {
    align-self: flex-start;
    margin: 5px 0px;
  }
`;
export default FilmLinker;
