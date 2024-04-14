import React, { useContext } from 'react';
import { AuthContext } from '../../store/auth-context';

export const NumResult = ({ movies }) => { // Destructure movies from props
  const { onLogout, isLoggedIn } = useContext(AuthContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    onLogout();
  };

  return (
    <div className="num-results">
    <p>Found <strong>{movies.length}</strong> results</p>
    {isLoggedIn && (
      <p className="logout" onClick={logoutHandler}>Logout</p> 
    )}
  </div>
  );
}
