import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Import SweetAlert


function SignUp({ handleToggleSignUp }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const signUpUser = (e) => {
    e.preventDefault();

  
    if (username && email && password) {
      const payload = { username, email, password };
      console.log(payload);
      axios.post('http://localhost:1234/api/signup', payload)
        .then(json => {
          console.log(json.data);
          Cookies.set('token', json.data.token)
          console.log('User created successfully:', json.data.username); 
          setEmail('');
          setPassword('');
          setUsername('');
  
       
          Swal.fire({
            title: 'SignUp Successfully!',
            text: 'Thanks for reviewing our product',
            icon: 'success',
            confirmButtonText: 'Continue Shopping',
          });
        })
        .catch(err => console.log(err.message));
    } }


  return (

    <>
      <div className="container" >
        <form onSubmit={signUpUser}>
          <div className="mb-3  ">
            <label htmlFor="exampleInputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control "
              id="exampleInputName"
              aria-describedby="nameHelp"
              // placeholder='Email Address'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                border: '1px solid #212529',
                outline: 'none',
                background: '#212529',
                color: '#ccc',
                padding: '10px 15px 10px 10px',
                boxShadow: 'inset 8px 8px 8px #000, inset -8px -8px 8px #222',

              }}
            />
            <div id="nameHelp" className="form-text">
              Put Your Name Below
            </div>
          </div>
          <div className="mb-3 ">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control "
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              // placeholder='Email Address'
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
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3 ">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              // placeholder="password"
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

          <button type="submit" className="btn btn-outline-light bg-warning text-white" style={{ marginBottom: '20px' }}>
            Sign Up
          </button>
          <span className="switch">
            Already have an account?
            <label  htmlFor="signup_toggle" onClick={handleToggleSignUp}>
              Login
            </label>
          </span>
        </form>
      </div>
    </>
  );
}
export default SignUp;




