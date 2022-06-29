import { createContext, useReducer } from "react";

const INTIAL_STATE = {
  destination: "",
  dates: [],
  options: {
    adult: 1,
    children: 0,
    room: 1,
  },
};

export const SearchContext = createContext(INTIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      console.log("curr state", action);
      return { ...action.payload };
    case "RESET_SEARCH":
      return INTIAL_STATE;
    default:
      return state;
  }
};

export const SearchReducerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INTIAL_STATE);

  return (
    <SearchContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SearchContext.Provider>
  );
};
