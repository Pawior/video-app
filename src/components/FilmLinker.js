import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { loadFilms } from "../actions/filmAction";
import { loadFilmsVimeo } from "../actions/filmActionVimeo";
import { clearFilms } from "../actions/filmsClear";
import Posts from "../pages/Posts";
import Button from "react-bootstrap/Button";
import Paginationed from "../components/Pagination";
import Form from "react-bootstrap/Form";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import DataExported from "./DataExported";
import getVideoId from "get-video-id";
import breakpoint from "./StyledComponentsBreakpoint";
export const FilmLinker = () => {
  const dispatch = useDispatch();
  const [statsChanged, setStatsChanged] = useState(false);
  const [filterState, setFilterState] = useState(false);
  const inputRef = useRef(null);

  let { stats } = useSelector((state) => {
    if (filterState === false) {
      return state.film;
    } else if (filterState === true) {
      const stats = state.film.stats.filter(
        (item) => item[3].favourite !== false
      );

      return { stats };
    }
  });
  // Pagination
  // const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(4);
  let indexOfLastPost = currentPage * postsPerPage;
  let indexOfFirstPost = indexOfLastPost - postsPerPage;
  let currentPosts = stats.slice(indexOfFirstPost, indexOfLastPost);

  const loadFilmHandler = (id) => {
    dispatch(loadFilms(id));
  };
  const loadFilmHandlerVimeo = (id) => {
    dispatch(loadFilmsVimeo(id));
  };
  // Check that link is correct
  const checkLink = (inputedLink) => {
    // For Youtube
    // inputedLink = inputedLink.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    // return inputedLink[2] !== undefined
    //   ? inputedLink[2].split(/[^0-9a-z_\-]/i)[0]
    //   : inputedLink[0];

    // Ready for Youtube and Vimeo links as well
    const { id } = getVideoId(inputedLink);
    return id;
  };
  // Adding film
  const addFilm = (e) => {
    e.preventDefault();
    // let isNum = /\d/.test(checkLink(inputRef.current.value));
    if (inputRef.current.value.length > 8) {
      if (inputRef.current.value.includes("vimeo")) {
        loadFilmHandlerVimeo(checkLink(inputRef.current.value));
      } else checkLink(inputRef.current.value);
      loadFilmHandler(checkLink(inputRef.current.value));
      inputRef.current.value = "";
    } else {
      window.alert("Zły link lub błędne id filmu");
    }
  };
  // Sort
  const sortAlphabetically = (e) => {
    e.preventDefault();
    console.log("sad");
    switch (e.target.value) {
      case "AZ":
        console.log("sadd");
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
        stats.sort((a, b) => Date.parse(b[1]) - Date.parse(a[1]));
        break;
      case "OldestNewest":
        stats.sort((a, b) => Date.parse(a[1]) - Date.parse(b[1]));
        break;
      default:
        break;
    }

    // Additional state to fire useEffect
    setStatsChanged(() => {
      return !statsChanged;
    });
  };
  // Filter
  const filterHandler = (e) => {
    switch (e.target.value) {
      case "Ulubione":
        setFilterState(true);
        break;
      case "NieFiltruj":
        setFilterState(false);
        break;
      default:
        break;
    }

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
  // Make pagination
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
        {stats[0] && (
          <SortFilter>
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
            <Form>
              <Form.Group controlId="exampleForm.SelectCustom">
                <Form.Label>Filtruj</Form.Label>
                <Form.Control as="select" custom onChange={filterHandler}>
                  <option value="NieFiltruj">Brak filtrowania</option>
                  <option value="Ulubione">Ulubione</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </SortFilter>
        )}
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
// Sort and Filter container
const SortFilter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
  @media only screen and ${breakpoint.device.xs} {
    flex-direction: column;
    Form {
      width: 10rem;
    }
  }
`;
export default FilmLinker;
