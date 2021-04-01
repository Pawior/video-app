import React, { useState } from "react";
import styled from "styled-components";
import urlTest from "../api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loadFilms } from "../actions/filmAction";
export const FilmLinker = ({
  filmList,
  setFilmList,
  filmStats,
  setFilmStats,
}) => {
  const dispatch = useDispatch();
  const { stats } = useSelector((state) => state.film);

  // const getViewers = async () => {
  //   try {
  //     const viewers = await axios.get(urlTest());
  //     console.log(viewers);
  //     setFilmStats((filmStats) => [
  //       ...filmStats,
  //       viewers.data.items[0].statistics.viewCount,
  //     ]);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
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
    console.log(pole.value);

    console.log(filmList);
    // console.log(urlTest());
    // getViewers();
    checkLink(pole.value);
    loadFilmHandler(checkLink(pole.value));
    setFilmList((filmList) => [...filmList, pole.value]);
  };

  const clearFilmList = () => {
    setFilmList = [""];
  };
  const nothing = () => {
    return null;
  };

  return (
    <MainForm>
      <label>
        Link:
        <input className="link" type="text" />{" "}
      </label>
      <input type="submit" onClick={addFilm} />
      <textarea value={filmList} onChange={nothing}></textarea>
      <input type="submit" value="clear" onClick={clearFilmList} />
      <textarea value={filmStats} onChange={nothing}></textarea>
    </MainForm>
  );
};
const MainForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export default FilmLinker;
