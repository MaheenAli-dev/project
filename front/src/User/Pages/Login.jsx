import React, { useState, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2'; 


import { GlobalContext } from '../../usercontext/context';
import '../../login.css';
import SignUp from '../../pages/SignUp';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSignUp, setShowSignUp] = useState(false);

  const handleToggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  const { dispatch } = useContext(GlobalContext);

  const Loginuser = (e) => {
    e.preventDefault();
    const payload = {
      email,
      password,
    };

    axios
      .post('http://localhost:1234/api/login', payload)
      .then((json) => {
        Cookies.set('token', json.data.token);
        dispatch({
          type: 'USER_LOGIN',
          token: json.data.token,
        });

        setEmail('');
        setPassword('');

  
        Swal.fire({
          title: 'Login Successfully!',
          text: 'Thanks for reviewing our product',
          icon: 'success',
          confirmButtonText: 'Continue Shopping',
        });
      })
      .catch((err) => {
        console.log(err);
  
        Swal.fire({
          title: 'Login Failed!',
          text: 'Invalid credentials. Please try again.',
          icon: 'error', 
          confirmButtonText: 'OK', 
        });
      });
  };

  return (
    <>
      <div className=" bg-dark  " style={{ background: '#000', width: '100%', }}>
        <div className="d-flex justify-content-center   ">
          <div className='p-5 wrapper bg-dark rounded text-white' style={{ marginTop: '20vh', marginBottom: '20vh' }}>

            <div className="text-center text-white  name" style={{ marginTop: '20px', marginBottom: '8vh' }}>
              {showSignUp ? "Sign Up" : "Login"}
            </div>
            {showSignUp ? (
              <SignUp handleToggleSignUp={handleToggleSignUp} />
            ) : (
              <form onSubmit={Loginuser}>
                <div className="mb-3 form-field ">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control "
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      border: '1px solid #212529',
                      outline: 'none',
                      background: '#212529',
                      color: '#ccc',
                      padding: '10px 15px 10px 10px',
                      boxShadow: 'inset 8px 8px 8px #000, inset -8px -8px 8px #222',

                    }}
                  />
                </div>
                <div className="mb-3 form-field">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                      border: '1px solid #212529',
                      outline: 'none',
                      background: '#212529',
                      color: '#ccc',
                      padding: '10px 15px 10px 10px',
                      boxShadow: 'inset 8px 8px 8px #000, inset -8px -8px 8px #222',
                    }}
                  />
                </div>
                <div className='align-items-center text-align center'>
                  <button type="submit" className="btn btn-outline-light bg-warning text-white" style={{ marginBottom: '20px' }}
                    onClick={Loginuser}>
                    Login
                  </button>
                  <span className="switch ">
                    {showSignUp ? "Already have an account?" : "Don't have an account?"}
                    <label  htmlFor="signup_toggle" onClick={handleToggleSignUp}>
                      {showSignUp ? "Login" : "Sign Up"}
                    </label>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
