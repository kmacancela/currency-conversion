import React from 'react';
import { useRoutes } from "hookrouter";
import CssBaseline from '@material-ui/core/CssBaseline';
import { routes } from "./Routes";
import NotFound from "./components/pages/NotFound";
import AuthContextWrapper from "./context/Auth";

export default function App() {
  const route = useRoutes(routes);

  return route ? (
    <React.Fragment>
      <CssBaseline />
      <AuthContextWrapper>{route}</AuthContextWrapper>
    </React.Fragment>
    ) : (
    <React.Fragment>
      <CssBaseline />
      <NotFound />
    </React.Fragment>
  );
}
