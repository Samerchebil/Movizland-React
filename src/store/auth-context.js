import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    token: "",
    onLogin: (email, password) => {},
    onLogout: () => {},
 
});

const MyProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
      const token = localStorage.getItem("token");
      if (token == 1) {
        setIsLoggedIn(true);
      }
    }, []);
    const loginHandler = (email, password) => {
      console.log(password=="sa")
      if((email=="sa@gmail.com")&& (password=="sa")){
        setIsLoggedIn(true);
        localStorage.setItem("token", 1);
      }

    };
  
    const logoutHandler = () => {
      setIsLoggedIn(false);
      localStorage.removeItem("token");
    };
  
    return (
      <AuthContext.Provider
        value={{
          isLoggedIn: isLoggedIn,
          onLogin: loginHandler,
          onLogout: logoutHandler,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
  export default MyProvider;        