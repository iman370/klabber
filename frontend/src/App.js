import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import Landing from './Landing';

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Landing /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;