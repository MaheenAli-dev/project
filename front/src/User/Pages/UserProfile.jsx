import React, { useContext } from 'react';
import { GlobalContext } from '../../usercontext/context';
import { decodeToken } from 'react-jwt';
import '../../profile.css';

function UserProfile() {
  
  const { state, dispatch } = useContext(GlobalContext)
  const data = decodeToken(state.token);

  const payload = {
    username: data.username,
    email: data.email,
  };
  const logOutUser = () => {
    dispatch(
      {
        type: "USER_LOGOUT"
      }
    )
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  return (
    <div className="full-page-bg">
      <div className="d-flex justify-content-center align-items-center full-height">
        <div className='p-5 wrapper bg-dark rounded text-white'>
          <div className="logo">
            <img
              src="https://www.shareicon.net/data/2017/02/15/878685_user_512x512.png"
              alt=""
            />
          </div>
          <div className="text-center mt-4 name">
            {capitalizeFirstLetter(payload.username)} Profile
          </div>
          <div className="profile-details mt-5">
            <div className="mb-3">
              <label><h5>UserName</h5></label>
              <div className='text-warning'><h6>{payload.username}</h6></div>
            </div>
            <div className="mb-3">
              <label><h5>Email</h5></label>
              <div className='text-warning'><h6>{payload.email}</h6></div>
            </div>
            <button className="btn btn-outline-light bg-warning text-white"
              onClick={logOutUser}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
