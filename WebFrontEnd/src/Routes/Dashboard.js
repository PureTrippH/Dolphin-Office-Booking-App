import logo from '../CHC.png';
import '../App.css';
import React from "react"; 
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Dolphin from "../graphics/dolphingraphic.jpg"
import { getAccountInf } from "../utils/axios";

//Components
import Navibar from "../Components/LayoutComp/Navibar";
import Body from "../Components/LayoutComp/Body";

function Dashboard() {
  const [userInfo, setUserInf] = React.useState([]);
  React.useEffect(() => {
    getAccountInf().then(({
      data
    }) => {
      setUserInf(data);
    })}, []);



  return (
    <div className="App">
      <div className="MainGrid" style={{
        "display": "grid", 
        "gridTemplateRows": "10vh 85vh 5vh"
        }}>
      <Navibar>
        <p>test</p>
        <img alt="CHC Logo" style={{
          "display": "block",
          "objectFit": "scale-down",
          "backgroundPosition": "center",
          "borderRadius": "20%",
          "margin": "auto"
        }}src={Dolphin}/>
        <p>test</p>
      </Navibar>
      <Body>
        <h1>
          Hello! {userInfo.given_name}
        </h1>
      </Body>
      <Navibar />
    </div>

    </div>
  );
}

export default Dashboard;
