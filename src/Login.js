import React, { useState } from 'react';
import './Login.css';
import { useHistory } from "react-router-dom";
import { auth } from './firebase';
import firebase from 'firebase';
import { selectUser } from './features/counter/userSlice';
import { useSelector } from 'react-redux';

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useSelector(selectUser);

    const login = (event) => {
        event.preventDefault();



        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {

                history.push('/');
            })
            .catch((e) => alert(e.message));
    };

    const register = (event) => {
        event.preventDefault();




        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {

            })
            .catch((e) => alert(e.message));
    };
    return (
        <div className='login'>
            <div className='login_form'>
                <p className='login_form_title'>Welcome back!</p>
                <p className='login_form_description'>We're so excited to see you again!</p>
                <p className='login_form_emailText'>EMAIL</p>
                <input className='login_form_emailInput' value={email} onChange={event => setEmail(event.target.value)} type='email' />
                <p className='login_form_passwordText'>PASSWORD</p>
                <input className='login_form_passwordInput' value={password} onChange={event => setPassword(event.target.value)} type='password' />
                <button className='login_form_submit' onClick={login}>Login</button>
                <button className='login_form_register' onClick={register}>Register</button>
            </div>
        </div>
    )
}

export default Login
