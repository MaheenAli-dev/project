import axios from 'axios';
import Cookies from 'js-cookie';
import SignUp from '../../pages/SignUp';
import '../../login.css';
import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../usercontext/context';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);

  const handleToggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const { state, dispatch } = useContext(GlobalContext)

  const Loginuser = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password
    }

    axios.post('http://localhost:1234/api/login', payload)
      .then((json) => {
        Cookies.set('token', json.data.token)
        dispatch({
          type: "USER_LOGIN",
          token: json.data.token
        });
        
      
        setEmail("");
        setPassword("");
      })
      .catch(err => console.log(err))
  }





  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100%' }}>
          <div className='p-5 bg-dark rounded text-white'>
            <form onSubmit={Loginuser}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control bg-warning outline-light"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control bg-warning outline-light"
                  id="exampleInputPassword1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-outline-light bg-warning text-white"style={{ marginRight: '10px' }}
                onClick={Loginuser}>
                Login
              </button>
              <button type="submit" className="btn btn-outline-light bg-warning text-white"
                onClick={() => {

                  dispatch({
                    type: "USER_LOGOUT"
                  })

                }}>
                Logout
              </button>
            </form>

          </div>


        </div>
      </div>
    </>
  )
}

export default Login