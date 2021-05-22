import React from "react";
import FilmLinker from "../components/FilmLinker";
import "../styles/_home.scss";
import styled from "styled-components";

const Home = () => {
  return (
    <Main>
      <h1> Your video library!</h1>
      <FilmLinker> </FilmLinker>
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

export default Home;
