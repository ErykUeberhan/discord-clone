import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import ChannelsList from './ChannelsList';
import Chat from './Chat';
import ChatMenu from './ChatMenu';
import Desktop from './Desktop';
import Friends from './Friends';
import MembersList from './MembersList';
import Menu from './Menu';
import { selectUser, login, logout } from './features/counter/userSlice';
import { auth } from './firebase'
import Login from './Login';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('user is:', authUser);
      if (authUser) {
        dispatch(login({
          email: authUser.email,
        })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch])
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
            {
              user ? (
                <>
                  <Menu />
                  <Friends />
                  <Desktop />
                </>
              ) : (
                  <Login />
                )
            }

          </Route>
        </Switch>
      </div>
    </Router >
  );
}

export default App;
