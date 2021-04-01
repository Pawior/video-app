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
    default:
      return { ...state };
  }
};

export default filmReducer;
