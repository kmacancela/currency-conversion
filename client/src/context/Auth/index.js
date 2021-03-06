import React, { useState } from "react";
import Context from "./auth";
import { useCookies } from "react-cookie";
import { navigate } from "hookrouter";

const AuthContextWrapper = props => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = (email, password) => {
    setLoading(true);
    setTimeout(() => {
      fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      .then(r => r.json())
      .then(res => {
        if(res.token !== undefined) {
          // console.log('res?', res.account);
          setCookie("token", res.token);
          setError("");
          localStorage.setItem('account', JSON.stringify(res.account))
          localStorage.setItem('token', res.token)
        } else {
          setError("Wrong credentials");
        }
      })
      setLoading(false);
    }, 1000)
  }

  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      removeCookie("token")
      localStorage.removeItem('account')
      localStorage.removeItem('token')
      navigate("/")
      setLoading(false);
    }, 1000)
  }

  const signup = (email, password, first_name, last_name, currency) => {
    let balance = 0
    setLoading(true);
    setTimeout(() => {
      fetch("http://localhost:3000/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password, first_name, last_name, currency, balance })
      })
      .then(r => r.json())
      .then(res => {
        if(res.email === email){
          login(email, password)
        } else {
          setError("Wrong credentials");
        }
      })
      setLoading(false);
    }, 1000)
  }

  return (
    <Context.Provider
      value={{
        token: cookies.token,
        error,
        loading,
        login,
        logout,
        signup
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AuthContextWrapper;
