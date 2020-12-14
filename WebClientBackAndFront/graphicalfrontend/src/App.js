import logo from './logo.svg';
import './App.css';
import Button from "./Components/Button" 
import {Switch, Route} from 'react-router-dom';
import Homepage from "./Routes/Home";


function App() {
  return (
    
    <Switch>
      <Route path="/" exact={true} component={Homepage} />
    </Switch>
  );
}

export default App;
