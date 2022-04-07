import { useContext, useState, createContext } from "react";

interface ISearchContext {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>
}

const SearchContext = createContext({} as ISearchContext);

const SearchContextProvider: React.FC = ({ children }) => {
  const [search, setSearch] = useState('')
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchContextProvider;

export const useSearchContext = () => useContext(SearchContext);
