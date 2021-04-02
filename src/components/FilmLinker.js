import React, { useState } from "react";
import styled from "styled-components";
import urlTest from "../api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadFilms } from "../actions/filmAction";
import Film from "../pages/Film";
export const FilmLinker = ({
  filmList,
  setFilmList,
  filmStats,
  setFilmStats,
}) => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.film);

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

  return (
    <MainForm>
      <Label>
        <h3> Podaj link lub id filmu: </h3>
        <input className="link" type="text" />{" "}
      </Label>
      <input type="submit" onClick={addFilm} />
      <input type="submit" value="clear" onClick={clearFilmList} />
      <List>
        {stats &&
          stats.map((stat) => (
            <Film info={stat} id={stat.etag}>
              {" "}
            </Film>
          ))}
      </List>
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
