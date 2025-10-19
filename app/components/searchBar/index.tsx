import { SearchBarProvider } from "./reducer/searchBarContext";
import SearchBarComponent from "./searchBar";

function SearchBar() {
  return (
    <SearchBarProvider>
      <SearchBarComponent />
    </SearchBarProvider>
  );
}

export default SearchBar;
