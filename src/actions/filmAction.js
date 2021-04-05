import axios from "axios";
import baseUrl, { params, key } from "../api";

export const loadFilms = (id) => async (dispatch) => {
  // FETCH AXIOS
  const filmData = await axios
    .get(`${baseUrl()}${id}&key=${key()}&${params()}`)
    .catch((err) => {
      // what now?
      console.log(err);
    });
  console.log(id);
  dispatch({
    type: "FETCH_FILM",
    payload: {
      stats: filmData.data.items[0],
      date: new Date().toLocaleDateString(),
    },
  });
  // function removeFilms() {
  //   dispatch({
  //     type: "REMOVE_FILM",
  //     payload: {
  //       stats: filmData.data.items[0],
  //     },
  //   });
  // }
};

export default loadFilms;
