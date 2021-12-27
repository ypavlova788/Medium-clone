
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from 'routes'
import TopBar from 'components/topbar';
import { CurrentUserProvider } from 'contexts/currentUser';
import CurrentUserCheker from 'components/currentUserCheker';


const  App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserCheker>
      <Router>
        <TopBar/>
      <Routes/>
      </Router>
      </CurrentUserCheker>
    </CurrentUserProvider>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

