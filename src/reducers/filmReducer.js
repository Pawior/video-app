const initState = {
  stats: [],
};

const filmReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_FILM":
      return {
        ...state,
        stats: [...state.stats, action.payload.stats],
      };
    case "REMOVE_FILM": {
      return {
        ...state,
        stats: state.stats.filter((item, index) => item[2] != action.payload),
      };
    }
    default:
      return { ...state };
  }
};

export default filmReducer;
