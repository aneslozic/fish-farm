import './App.css';
import { Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserHistory } from 'history';
import FishFarmOverview from './components/FishFarmOverview';
import FishFarmDetails from './components/FishFarmDetails';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

export const history = createBrowserHistory();
const queryClient = new QueryClient(); 

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <Switch>
          <Route exact path="/fish-farm/:id" component={FishFarmDetails} />
          <Route exact path="/" component={FishFarmOverview} />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
