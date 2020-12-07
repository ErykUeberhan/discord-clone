import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import firebase from 'firebase';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);


  let history = useHistory();

  useEffect(() => {
    let avatarColor = `rgb(${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)}, ${Math.ceil(Math.random() * 255)})`
    const u = firebase.auth().currentUser;
    if (user && !u.photoURL) {
      u.updateProfile({
        photoURL: avatarColor,
      })
    }
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
        {
          user ?
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
            :
            <Route path='/'>
              <Login />
            </Route>
        }
      </div>
    </Router >
  );
}

export default App;
