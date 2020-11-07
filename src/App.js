import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import store from './store';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Authenticate from './components/_utils/Authenticate';
import { loadCurrentUser } from './_actions/AuthActions';
import Login from './components/Login/Login';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import BusinessManager from './components/Admin/BusinessManager/BusinessManager';
import BusinessItem from './components/BusinessItem.js/BusinessItem';
import InvestmentManager from './components/Admin/InvestmentManager/InvestmentManager';
import Secret from './components/Secret/Secret';
import UserManager from './components/Admin/UserManager/UserManager';
import InvestmentItem from './components/InvestmentItem/InvestmentItem';
import Showcase from './components/Showcase/Showcase';
import UserContributions from './components/Admin/InvestmentManager/UserContributions';



store.dispatch(loadCurrentUser());

const App = () => {
  return (
    <Provider store={ store }>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup/:role?' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/showcase' component={Showcase} />
        <Route exact path='/secret' component={Secret} />
        <Route exact path='/business/:businessId' component={BusinessItem} />
        <Route exact path='/investments/:investmentId' component={InvestmentItem} />
        <Authenticate exact path='/dashboard' component={Dashboard} />
        <Authenticate exact path='/business-manager' component={BusinessManager} />
        <Authenticate exact path='/investment-manager' component={InvestmentManager} />
        <Authenticate exact path='/user-manager' component={UserManager} />
        <Authenticate exact path='/my-contributions' component={UserContributions} />
         
        
      </Router>
    </Provider>
  );
}

export default App;
