import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";

import { isLoggedIn, signInThunk } from "../redux/slices/authslice";
import logoshopping from '../logo-shopping-list.svg';

import './Login.css';
  
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory();
    const isAuthenticated = useSelector(state => state.auth.isauthenticated);

    const handleValidation = () => {
        let errors = {};
        let formIsValid = true;

        if (!username) {
            formIsValid = false;
            errors["username"] = 'Username field can not be empty';
        }

        if (!password) {
            formIsValid = false;
            errors["password"] = 'Password field can not be empty';
        }

        setErrors(errors);
        return formIsValid;
    };

    const onLoginButtonClick = async (events) => {
        if (handleValidation()) {
            try {
                const resp = await dispatch(signInThunk({username: username, password: password}));
                console.log('signed in', resp);
                history.push('/');
            } catch (err) {
                console.log('Error with fetch', err)
            }
        } else {
            console.log('Invalid validation from user input');
        }
    };

    const passwordChange = (event) => setPassword(event.target.value);
    const usernameChange = (event)  => setUsername(event.target.value);

    useEffect(() => void(dispatch(isLoggedIn())), [dispatch]);

    let usernameerror;
    let passworderror;

    if (errors["username"]) usernameerror = <span className="login-error">{errors["username"]}</span>;
    if (errors["password"]) passworderror = <span className="login-error">{errors["password"]}</span>;
    if (isAuthenticated) return <Redirect to="/" />;

    return (
        <main className="login">
            <img src={logoshopping} className="logo" alt="logo" />
            <h3 className="App-h3">Shopping List</h3>
            <div className="login-container">
                <header className="login-header">
                    Welcome! Please <i>Sign in</i>
                </header>
                <section className="login-content">
                    <div>
                        <label className="label-input" htmlFor="username">Username: </label>
                        <input className="login-input label-input" type="text" id="username" value={username} onChange={usernameChange} />
                    </div>
                    {usernameerror}
                    <div>
                        <label className="label-input" htmlFor="password">Password: </label>
                        <input className="login-input label-input" type="password" id="password" value={password} onChange={passwordChange} />
                    </div>
                    {passworderror}
                </section>
                <div className='register-link'>
                    <Link style={{color: '#c7e8e8'}} to='/register'>Don't have an account? Click here to register</Link>
                </div>
                <input type="button" value="Login" className="login-button" onClick={onLoginButtonClick} />
            </div>
        </main>
    );
};

export default Login;