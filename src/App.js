import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import store from './store';
import Home from './components/Home/Home';
const Signup = () => <h1> Signup </h1>
const App = () => {
  return (
    <Provider store={ store }>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
      </Router>
    </Provider>
  );
}

export default App;
