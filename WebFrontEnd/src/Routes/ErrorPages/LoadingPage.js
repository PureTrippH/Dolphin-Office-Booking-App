import '../../App.css';
import { useHistory } from "react-router-dom";
import { CircularProgress  } from '@material-ui/core';
import '../../App.css';

function LoadingPage() {

  let history = useHistory();
  const login = () => window.location.href = 'http://localhost:3001/google'  

  const changePage = () => {
    history.push('/google');
  }

  return (
    <div className="App">
      <header className="App-header">
      <CircularProgress color="secondary"/>
      <h1 style={{'fontFamily': 'PersonaFont', "color": "black"}}>Take Your Time..</h1>  
      </header>
    </div>
  );
}

export default LoadingPage;
