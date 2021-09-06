import logo from './logo.svg';
import './App.css';
import Button from "./Components/Button" 
import {Switch, Route, Router} from 'react-router-dom';
import Homepage from "./Routes/Home";
import Dashboard from "./Routes/Dashboard";
import ProtectedRoute from "./Routes/CustomRoutes/ProtectedRoute";
import React from 'react';
import { isLoggedIn } from "../src/utils/axios";
import { CircularProgress  } from '@material-ui/core';
import AOS from 'aos';
import LoadingPage from './Routes/ErrorPages/LoadingPage'
import 'aos/dist/aos.css';

function App() {
  const [currentApp, setApp] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [authorized, setAuthorized] = React.useState(false);
  React.useEffect(() => {
    isLoggedIn().then(({data}) => {
      console.log(data);
      setAuthorized(data.isAuthorized);
      setLoading(false);
    })}, []);
  AOS.init();
  console.log(authorized);
  if(!loading) {
  return (
      <Switch>
        <ProtectedRoute path="/" loggedIn={authorized}>
          <Dashboard />
        </ProtectedRoute>
      </Switch>
  );
  } else {
    return (
      <LoadingPage />
    );
  }
}

export default App;
