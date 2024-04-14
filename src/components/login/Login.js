import React, { useContext, useEffect, useReducer, useState } from "react"; 

import './Login.css'
import { AuthContext } from "../../store/auth-context";



const emailReducer = (prevState, action) => {
    if (action.type == "USER_9A3ED_YEKTEB") {
      return { value: action.data, isVaid: action.data.includes("@") };
    }
    if (action.type == "USER_NZEL_EL_BARRA") {
      return { value: prevState.value, isVaid: prevState.value.includes("@") };
    }
    return { value: "", isVaid: null };
  };


  const passwordReducer = (prevState, action) => {
    if (action.type == "USER_9A3ED_YEKTEB") {
      return { value: action.data, isVaid: action.data.trim().length > 6 };
    }
    if (action.type == "USER_NZEL_EL_BARRA") {
      return {
        value: prevState.value,
        isVaid: prevState.value.trim().length > 6,
      };
    }
    return { value: "", isVaid: null };
  };

const Login = () => {

  const { onLogin } = useContext(AuthContext);
   const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isVaid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isVaid: null,
  });

  const { isVaid: x } = emailState;
  const { isVaid: y } = passwordState;
  useEffect(() => {
    const timer = setTimeout(() => {
      setFormIsValid(x && y);
    }, 300);
    console.log("effect");
    return () => {
      console.log("clean-up");
      clearTimeout(timer);
    };
  }, [x, y]);


  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_9A3ED_YEKTEB", data: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_9A3ED_YEKTEB", data: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "USER_NZEL_EL_BARRA" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "USER_NZEL_EL_BARRA" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    onLogin(emailState.value, passwordState.value);
  };

    return (
      <>
        <section>
          <div className="auth">
            <h1 className="title">Welcome to MovizLand</h1>
            <form onSubmit={submitHandler} >
            <input
                type="email"
                id="email"
                value={emailState.value}
                onChange={emailChangeHandler}
                onBlur={validateEmailHandler}
            />
              <input
                type="password"
                id="password"
                name="password"
                value={passwordState.value}
                onChange={passwordChangeHandler}
                onBlur={validatePasswordHandler}
              />
              <p>Forgot Password?</p>
              <button type="submit">Login</button>
            </form>
            <p className="login-message">Not a member? <span>Sign up</span></p>
          </div>
        </section>
      </>
    );
  };
  
  export default Login;

