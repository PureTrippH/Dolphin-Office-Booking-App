import logo from '../CHC.png';
import '../App.css';
import React from "react"; 
import axios from 'axios';
import { useHistory } from "react-router-dom";
import ScheduleForm from "../Components/form/Form";
import Dolphin from "../graphics/dolphingraphic.jpg";
import Button from "../Components/Button";
import BaseGrid from "../Components/Bases/BaseGrid";
import Border from "../Components/Border";
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
      console.log(data);
    })
  }, []);
  
  getCalendar('primary').then(data => {
    console.log(data);
  })
  return (
    <div className="App">
      <BaseGrid gridtemplaterows="5% 90% 5%">
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
      <Body>
        <div></div>
        <div style={{
          "backgroundColor": "#f0b1ad",
          "minHeight": "100%",
          "borderRight": "solid #c98471",
          "borderLeft": "solid #c98471"
        }}>
          <div style={{"backgroundColor": "#bf5441", "border": "groove #914133", "margin": "auto"}}>
            <h1 style={{"margin": "5px"}}>
              Hello! {userInfo.name}
              <Border/>
            </h1>
            <img style={{"borderRadius": "25%", "border": "groove #914133"}} src={userInfo.pic_url} />
            </div>
            <div>
              <h2 style={{"padding": "2%", "backgroundColor": "#cc7464", "border": "groove #914133"}}>Your Appointments!
              </h2>
            </div>
            <div style={{"backgroundColor": "#ba8e8a"}}>
              <h2 style={{"padding": "2%", "margin": "auto", "backgroundColor": "#cc7464", "border": "groove #914133"}}>Schedule an Appointment!</h2>
              <ScheduleForm name={userInfo.name} email={userInfo.email}></ScheduleForm>
            </div>
          </div>
      </Body>
      <Navibar>
        <div></div>

      </Navibar>
      </BaseGrid>
    </div>
  );
}

export default Dashboard;
