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
import firebase from 'firebase';
import { selectMobileMenu } from './features/counter/appSlice';
import MobileChannelsList from './MobileChannelsList';

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const mobileMenu = useSelector(selectMobileMenu);

  // randomize user avatar color
  const color = (rand) => {
    const randomColor = Math.ceil(Math.random() * 255);
    if (rand <= 0.16) return `rgb(255, ${randomColor}, 0)`;
    else if (rand > 0.16 && rand <= 0.32) return `rgb(255, 0, ${randomColor})`;
    else if (rand > 0.32 && rand <= 0.48) return `rgb(${randomColor}, 255, 0)`;
    else if (rand > 0.48 && rand <= 0.64) return `rgb(0, 255, ${randomColor})`;
    else if (rand > 0.64 && rand <= 0.8) return `rgb(${randomColor}, 0, 255)`;
    else return `rgb(0, ${randomColor}, 255)`;
  }

  // add user avatar color to database
  const userInfo = firebase.auth().currentUser;
  let avatarColor = color(Math.random());
  if (user && !userInfo.photoURL) {
    userInfo.updateProfile({
      photoURL: avatarColor,
    })
  }


  // add user email to local storage
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(login({
          email: authUser.email,
        }))

      } else {
        dispatch(logout());
      }
    });

  }, [dispatch])
  return (
    <Router>
      <div className="app">
        {user ?
          <Switch>
            <Route path='/channel'>
              <Menu />
              {
                mobileMenu === true
                  ?
                  <>
                    <MobileChannelsList />
                    <MembersList />
                  </>
                  :
                  <>
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
                  </>
              }


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
