import FullPageLoader from '../components/FullPageLoader.jsx';
import { useState } from 'react';
import { auth } from '../firebase/config.js';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword
  } from "firebase/auth";


function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginType, setLoginType] = useState('login');
  const [error, setError] = useState('');

  const [useCredential, setUseCredential] = useState({});

  function handleCredentials(e) {
    setUseCredential({ ...useCredential, [e.target.name]: e.target.value })
  }

  function handleSignup(e) {
    setError("")
    e.preventDefault();

    createUserWithEmailAndPassword(auth, useCredential.email, useCredential.password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        setError(error.message);
        // ..
      });
  }

  function handleLogin(e) {
    setError("")
    e.preventDefault();

    signInWithEmailAndPassword(auth, useCredential.email, useCredential.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handlePasswordMissed() {
    const email = prompt("Please, enter your email:")
    sendPasswordResetEmail(auth, email)
    alert("Email sent! Check your inbox.")
  }


  return (
    <>
      {isLoading && <FullPageLoader></FullPageLoader>}

      <div className="container login-page">
        <section>
          <h1>Welcome to the Book App</h1>
          <p>Login or create an account to continue</p>
          <div className="login-type">
            <button
              className={`btn ${loginType == 'login' ? 'selected' : ''}`}
              onClick={() => setLoginType('login')}>
              Login
            </button>
            <button
              className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
              onClick={() => setLoginType('signup')}>
              Signup
            </button>
          </div>
          <form className="add-form login">
            <div className="form-control">
              <label>Email *</label>
              <input onChange={(e) => handleCredentials(e)} type="text" name="email" placeholder="Enter your email" />
            </div>
            <div className="form-control">
              <label>Password *</label>
              <input onChange={(e) => handleCredentials(e)} type="password" name="password" placeholder="Enter your password" />
            </div>
            {
              loginType == 'login' ?
                <button onClick={(e) => handleLogin(e)} className="active btn btn-block">Login</button>
                :
                <button onClick={(e) => handleSignup(e)} className="active btn btn-block">Sign Up</button>
            }

            {
              error &&
              <div className="error">
                {error}
              </div>
            }


            <p onClick={handlePasswordMissed} className="forgot-password">Forgot Password?</p>

          </form>
        </section>
      </div>
    </>
  )
}

export default LoginPage
