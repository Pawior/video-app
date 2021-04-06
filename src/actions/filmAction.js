import axios from "axios";
import baseUrl, { params, key } from "../api";
import { useId } from "react-id-generator";
import { v4 as uuidv4 } from "uuid";
export const loadFilms = (id) => async (dispatch) => {
  // FETCH AXIOS
  const filmData = await axios
    .get(`${baseUrl()}${id}&key=${key()}&${params()}`)
    .catch((err) => {
      console.log(err);
    });
  console.log(`${baseUrl()}${id}&key=${key()}&${params()}`);

  dispatch({
    type: "FETCH_FILM",
    payload: {
      stats: [
        filmData.data.items[0],
        new Date().toLocaleDateString(),
        uuidv4(),
      ],
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
