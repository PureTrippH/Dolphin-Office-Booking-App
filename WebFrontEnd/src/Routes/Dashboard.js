import logo from '../CHC.png';
import '../App.css';
import React from "react"; 
import { useHistory } from "react-router-dom";
import { getAccountInf } from "../utils/axios";

//Components
import Navibar from "../Components/LayoutComp/Navibar";

function Dashboard() {
  const [userInfo, setUserInf] = React.useState([]);
  let history = useHistory();
  React.useEffect(async() => {
    setUserInf(await getAccountInf());
    console.log(userInfo);
  })



  return (
    <div className="App">
      <div className="MainGrid" style={{"display": "grid", "gridTemplateRows": "5vh 90vh 5vh"}}>
      <Navibar>
        <p>test</p>
        <h1>idk</h1>
      </Navibar>
      <h1>Hello {userInfo.given_name}!</h1>
    </div>

    </div>
  );
}

export default Dashboard;
