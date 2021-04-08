import logo from '../CHC.png';
import '../App.css';
import Button from "../Components/Button" 
import React from "react"; 
import { useHistory } from "react-router-dom";
import { getAccountInf } from "../utils/axios";


function Dashboard() {
  const [userInfo, setUserInf] = React.useState([]);
  let history = useHistory();
  React.useEffect(async () => {
    setUserInf(await getAccountInf());
  })

  return (
    <div className="App">
      <h1>Hello {userInfo.given_name}!</h1>
    </div>
  );
}

export default Homepage;
