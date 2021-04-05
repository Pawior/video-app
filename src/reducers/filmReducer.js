const initState = {
  stats: [],
};

const filmReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_FILM":
      return {
        ...state,
        stats: [...state.stats, action.payload.stats],
        date: action.payload.date,
      };
    case "REMOVE_FILM": {
      return {
        ...state,
        stats: state.stats.filter((item, index) => item.etag != action.payload),
      };
    }
    default:
      return { ...state };
  }
};

export default filmReducer;
