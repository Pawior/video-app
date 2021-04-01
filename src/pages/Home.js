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
  const getViewers = async () => {
    try {
      const viewers = await axios.get(urlTest());
      console.log(viewers);
      setFilmStats((filmStats) => [
        ...filmStats,
        viewers.data.items[0].statistics.viewCount,
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const addFilm = (e) => {
    e.preventDefault();
    const pole = document.querySelector(".link");
    console.log(pole.value);
    setFilmList((filmList) => [...filmList, pole.value]);
    console.log(filmList);
    console.log(urlTest());
    getViewers();
  };

  const clearFilmList = () => {
    setFilmList = [""];
  };
  const nothing = () => {
    return null;
  };
  return (
    <Main>
      <h1> Hi bro whats up !? da</h1>
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
`;
const MainForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export default Home;
