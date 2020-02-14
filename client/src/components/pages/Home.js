import React, {useContext} from 'react';
import AuthContext from "../../context/Auth/auth";

export default function Home() {
  const context = useContext(AuthContext);

  const logout = () => {
    context.logout()
  }

  return(
    <div><button onClick={logout}>Log out</button></div>
  )
}
