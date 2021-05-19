import logo from './logo.svg';
import './App.css';
import Button from "./Components/Button" 
import {Switch, Route} from 'react-router-dom';
import Homepage from "./Routes/Home";
import Dashboard from "./Routes/Dashboard";


function App() {
  return (
    <Switch>
      <Route path="/" exact={true} component={Homepage} />
      <Route path="/Dashboard" exact={true} component={Dashboard} />
    </Switch>
  );
}

export default App;
