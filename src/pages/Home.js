import React, { useState } from "react";
import FilmLinker from "../components/FilmLinker";
import "../styles/_home.scss";
import styled from "styled-components";
import urlTest from "../api";
import axios from "axios";
// AIzaSyAdtBEaPxvB3RhY9X46ONNRdgs2n4E9roA

const Home = () => {
  const [filmList, setFilmList] = useState([]);
  const [filmStats, setFilmStats] = useState([]);

  return (
    <Main>
      <h1> Hej! Tutaj możesz zapisać swoje ulubione filmy</h1>
      <FilmLinker
        filmList={filmList}
        setFilmList={setFilmList}
        filmStats={filmStats}
        setFilmList={setFilmList}
      >
        {" "}
      </FilmLinker>
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    margin: 1rem 1rem 3rem 1rem;
  }
`;

const MainForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export default Home;
