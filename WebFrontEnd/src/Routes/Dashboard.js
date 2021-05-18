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
import styled from "styled-components";
import Carousel from '../Components/LayoutComp/Carousel';
import { getAccountInf, clearCookie, getCalendar, logout, getApps} from "../utils/axios";

//Components
import Navibar from "../Components/LayoutComp/Navibar";
import Body from "../Components/LayoutComp/Body";

const Grid = styled.div`
display: grid;
grid-template-rows: 0.1fr 1.7fr 0.1fr;
gap: 0px 0px;
height: ${props => props.height ? props.height : "100vh"};
`;

function Dashboard() {
  const [userInfo, setUserInf] = React.useState([]);
  const [calendar, setCalendar] = React.useState([]);
  const [apps, setApps] = React.useState([]);
  React.useEffect(() => {
    getAccountInf().then(({
      data
    }) => {
      setUserInf(data);
      getApps(data.name).then(dbData => {
        setApps(dbData.data);
        console.log(dbData.data);
      })
    })
  }, []);
  
  getCalendar('primary').then(data => {
    console.log(data);
  })
  console.log(apps);
  return (
    <div className="App">
      <Grid>
      <Navibar>
      <Button clickEvent={logout}>Logout</Button>
        <img alt="CHC Logo" style={{
          "width": "100px", "margin": "10px", "border-radius": "10px",
          "border": "solid #c98471",
          "margin": "0 auto"
        }}src={Dolphin}/>
      </Navibar>
        <div style={{"paddingRight": "5%", "paddingLeft": "5%", "backgroundColor": "#f7c3c1"}}>
        <div style={{
          "backgroundColor": "#f0b1ad",
          "minHeight": "100%",
          "borderRight": "solid #c98471",
          "borderLeft": "solid #c98471",
        }}>
          <div style={{"backgroundColor": "#bf5441", "border": "groove #914133", "margin": "auto"}}>
            <h1 style={{"margin": "5px"}}>
              Hello! {userInfo.name}
              <Border/>
            </h1>
            <img style={{"borderRadius": "25%", "border": "groove #914133"}} src={userInfo.pic_url} />
            </div>
            <div>
              <h2 style={{"backgroundColor": "#cc7464", "border": "groove #914133"}}>Your Appointments!
              </h2>
            </div>
            <Carousel />
            <div style={{"backgroundColor": "#ba8e8a"}}>
              <h2 style={{"margin": "auto", "backgroundColor": "#cc7464", "border": "groove #914133"}}>Schedule an Appointment!</h2>
            </div>
            <ScheduleForm name={userInfo.name} email={userInfo.email}></ScheduleForm>
          </div>
          </div>
      <div style={{"minHeight": "100%", "border": "inset #db7972", "backgroundColor": "#d47572"}}>

      </div>
      </Grid>
    </div>
  );
}

export default Dashboard;
