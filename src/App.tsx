import { BrowserRouter } from 'react-router-dom';
import Header from './components/layout/Header';
import SearchContextProvider from './context/SearchContext';
import Main from './Main';

const App = () => {
  return (
    <SearchContextProvider>
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
    </SearchContextProvider>
  );
}

export default App;
