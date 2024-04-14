import { useContext, useEffect, useRef, useState } from "react";
import Login from "./components/login/Login";
import { AuthContext } from "./store/auth-context";
import Home from "./Home";

export default function App() {
  const ctx = useContext(AuthContext);


  return (
    <>  <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </>
  );
}

