import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import ChannelsList from './ChannelsList';
import Desktop from './Desktop';
import Friends from './Friends';
import Menu from './Menu';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path='/channel'>
            <Menu />
            <ChannelsList />
          </Route>
          <Route path='/'>
            <Menu />
            <Friends />
            <Desktop />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
