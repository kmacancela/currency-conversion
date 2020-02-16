import React, { useState } from "react";
import Context from "./auth";
import { useCookies } from "react-cookie";
import { navigate } from "hookrouter";

const AuthContextWrapper = props => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //doing something
  const [transfers, setTransfers] = useState(null)

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
          setCookie("token", res.token);
          setError("");
          localStorage.setItem('account', JSON.stringify(res.account))
          localStorage.setItem('token', res.token)
          fetchTransfers(res.account);
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

  const fetchTransfers = () => {
    // setTimeout(() => {
      fetch("http://localhost:3000/transfers")
      .then(r => r.json())
      .then(res => {
        // console.log('account', localStorage.getItem('account').id)
        console.log('res of transfers', res)
        let accountTransfers = res.filter(transfer => {
          // console.log('account', JSON.parse(localStorage.getItem('account')))
          // console.log('insider condition', transfer, transfer.sender === JSON.parse(localStorage.getItem('account')).id)
          return transfer.sender === JSON.parse(localStorage.getItem('account')).id
        })
        console.log('res of transfers of this account', accountTransfers)
        setTransfers(accountTransfers);
      })
    // }, 1000)
  }

  return (
    <Context.Provider
      value={{
        token: cookies.token,
        error,
        loading,
        login,
        logout,
        signup,
        transfers
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default AuthContextWrapper;
