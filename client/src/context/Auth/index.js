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
        console.log("res?: ", res)
        if(res.token !== undefined) {
          console.log('user found...')
          setCookie("token", res.token);
          setError("");
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
      navigate("/")
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
        logout
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AuthContextWrapper;
