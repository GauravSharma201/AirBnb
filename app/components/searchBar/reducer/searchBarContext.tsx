"use client";

import { createContext, useContext, useReducer } from "react";
import { SearchBarState, SearchBarAction } from "./searchBarTypes";
import { searchBarReducer, initialSearchBarState } from "./searchBarReducer";

interface SearchBarContextProps {
  state: SearchBarState;
  dispatch: React.Dispatch<SearchBarAction>;
}

export const SearchBarContext = createContext<
  SearchBarContextProps | undefined
>(undefined);

export const SearchBarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(searchBarReducer, initialSearchBarState);
  return (
    <SearchBarContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchBarContext.Provider>
  );
};

export function useSearchBar() {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error("useSearchBar must be used within the SearchBarProvider");
  }

  return context;
}
