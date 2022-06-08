import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  useRoutes,
} from "react-router-dom";

import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Settings from './pages/Settings';

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Landing /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/home", element: <Home /> },
    { path: "/settings", element: <Settings /> },
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