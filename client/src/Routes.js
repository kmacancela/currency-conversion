import React from 'react';
import Home from './components/pages/Home'
import Login from './components/pages/Login'
import SignUp from './components/pages/SignUp'

export const routes = {
  "/": () => <Login />,
  "/home": () => <Home />,
  "/signup": () => <SignUp />
};
