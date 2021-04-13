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
    case "CLEAR_FILMS": {
      return { stats: [] };
    }
    case "ADD_FAVOURITE": {
      console.log(action.payload);
      return {
        ...state,
        stats: state.stats.map((item, index) => {
          console.log("jestem prawie fajny");
          console.log(action.payload);
          if (index === action.payload) {
            console.log("jestem fajn y");
            item.map((itemek, indexik) => {
              console.log("jestem bardzo fajn y");
              if (indexik === 3) {
                return itemek;
              } else {
                return itemek;
              }
              // return indexik === 3 ? itemek : itemek;
            });
          } else {
            return item;
          }
        }),
      };
    }
    default:
      return { ...state };
  }
};

export default filmReducer;
