import logo from '../logo.svg';
import '../App.css';
import Button from "../Components/Button" 
import { useHistory } from "react-router-dom";


function Homepage() {

  let history = useHistory();
  const login = () => window.location.href = 'http://localhost:3001/google'  

  const changePage = () => {
    history.push('/google');
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Button clickEvent={() => login()}> Login </Button>
      </header>
    </div>
  );
}

export default Homepage;
