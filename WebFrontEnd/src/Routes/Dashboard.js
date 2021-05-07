import logo from '../CHC.png';
import '../App.css';
import React from "react"; 
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Form from "../Components/form/Form"
import Dolphin from "../graphics/dolphingraphic.jpg"
import Button from "../Components/Button"
import { getAccountInf, clearCookie, getCalendar, logout} from "../utils/axios";

//Components
import Navibar from "../Components/LayoutComp/Navibar";
import Body from "../Components/LayoutComp/Body";

function Dashboard() {
  const [userInfo, setUserInf] = React.useState([]);
  const [calendar, setCalendar] = React.useState([]);
  React.useEffect(() => {
    getAccountInf().then(({
      data
    }) => {
      setUserInf(data);
    })
  }, []);
  
  getCalendar().then(data => {
    console.log(data.data);
  })
  return (
    <div className="App">
      <div className="MainGrid" style={{
        "display": "grid", 
        "gridTemplateRows": "10vh 85vh 5vh"
        }}>
      <Navibar>
      <Button clickEvent={logout}>Logout</Button>
        <img alt="CHC Logo" style={{
          "objectFit": "cover",
          "maxHeight": "100%",
          "maxWidth": "100%",
          "borderRadius": "20%",
          "border": "solid #c98471",
          "margin": "0 auto"
        }}src={Dolphin}/>
      </Navibar>
      <Body style={{'overflow-y': "scroll"}}>
        <div></div>
        <div style={{
          "backgroundColor": "#f0b1ad",
          "minHeight": "100%",
          "borderRight": "solid #c98471",
          "borderLeft": "solid #c98471"
        }}>
          <div style={{"backgroundColor": "#bf5441", "border": "groove #914133", "maxHeight": "100%"}}>
            <h1>
              Hello! {userInfo.name}
            </h1>
            <img style={{"borderRadius": "25%", "border": "groove #914133", "maxHeight": "100%"}} src={userInfo.pic_url} />
            </div>
            <div>
              <h2 style={{"padding": "5%", "backgroundColor": "#cc7464", "border": "groove #914133", "maxHeight": "100%"}}>Your Appointments!</h2>
            </div>
            <div style={{"backgroundColor": "#ba8e8a"}}>
              <h2 style={{"padding": "5%", "backgroundColor": "#cc7464", "border": "groove #914133", "maxHeight": "100%"}}>Schedule an Appointment!</h2>
              <Form></Form>
            </div>
          </div>
      </Body>
      <Navibar>
        <div></div>

      </Navibar>
    </div>

    </div>
  );
}

export default Dashboard;
