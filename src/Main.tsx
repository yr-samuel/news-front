import { Route, Switch } from 'react-router-dom';
import Category from './components/Pages/Category';
import Home from './components/Pages/Home';
import News from './components/Pages/News';
import { MainGrid } from './styles';

const Main = () => {
  return (
    <MainGrid container spacing={2}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/news/:id" component={News} />
        <Route exact path="/category" component={Category} />
        <Route path="/category/:id" component={Category} />
      </Switch>
    </MainGrid>
  );
}

export default Main;
