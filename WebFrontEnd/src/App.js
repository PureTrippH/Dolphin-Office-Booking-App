import logo from './logo.svg';
import './App.css';
import Button from "./Components/Button" 
import {Switch, Route} from 'react-router-dom';
import Homepage from "./Routes/Home";
import Dashboard from "./Routes/Dashboard";
import ProtectedRoute from "./Routes/CustomRoutes/ProtectedRoute";
import React from 'react';
import { isLoggedIn } from "../src/utils/axios";
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [currentApp, setApp] = React.useState(0);
  AOS.init();
  return (
    <Switch>
      <Route path="/" exact={true} component={Homepage} />
      <ProtectedRoute path="/Dashboard" loggedIn={true} component={Dashboard} />
    </Switch>
  );
}

export default App;
