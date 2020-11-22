import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import ChannelsList from './ChannelsList';
import Chat from './Chat';
import ChatMenu from './ChatMenu';
import Desktop from './Desktop';
import Friends from './Friends';
import MembersList from './MembersList';
import Menu from './Menu';

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path='/channel'>
            <Menu />
            <ChannelsList />
            <div className='chatField'>
              <div className='chatField_menu'>
                <ChatMenu />
              </div>
              <div className='chatField_desktop'>
                <Chat />
                <MembersList />
              </div>
            </div>
          </Route>
          <Route path='/'>
            <Menu />
            <Friends />
            <Desktop />
          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
