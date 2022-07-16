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
import Friends from './pages/Friends';
import CreateKlab from "./pages/CreateKlab";
import FindKlab from "./pages/FindKlabs";
import MyKlabs from "./pages/MyKlabs";
import KlabInvites from "./pages/KlabInvites";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Landing /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/sign-up", element: <SignUp /> },
    { path: "/home", element: <Home /> },
    { path: "/settings", element: <Settings /> },
    { path: "/friends", element: <Friends /> },
    { path: "/create-klab", element: <CreateKlab /> },
    { path: "/find-klabs", element: <FindKlab /> },
    { path: "/my-klabs", element: <MyKlabs /> },
    { path: "/klab-invites", element: <KlabInvites /> },
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