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
grid-template-rows: 0.1fr 1.6fr 0.1fr;
gap: 0px 0px;
height: 100vh;
`;

function Dashboard() {
  const [userInfo, setUserInf] = React.useState([]);

  const [apps, setApps] = React.useState([]);

  React.useEffect(() => {
    getAccountInf().then(({
      data
    }) => {
      setUserInf(data);
      getApps(data.name).then(dbData => {
        setApps(dbData.data);
      })
    })
  }, []);
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Fjalla+One&display=swap" rel="stylesheet" />
      <Grid style={{"backgroundColor": "#e3beba", "height": "100%"}}>
      <Navibar>
      <Button clickEvent={logout}><h5 style={{"fontFamily": "Alfa Slab One", "margin": "center"}}>Logout</h5></Button>
        <img alt="CHC Logo" style={{
          "width": "100px", "margin": "10px", "border-radius": "10px",
          "border": "solid #c98471",
          "margin": "0 auto", 
          "boxShadow": "rgb(0, 0, 0) 0px 20px 30px -10px"
        }}src={Dolphin}/>
      </Navibar>
        <div style={{"position": "relative",  "marginRight": "5%", "marginLeft": "5%", "backgroundColor": "#f7c3c1", 
          "boxShadow": "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px"}}>
        <div style={{
          "backgroundColor": "#f0b1ad",
          "minHeight": "100%",
          "borderRight": "solid #c98471",
          "borderLeft": "solid #c98471",
        }}>
          <div style={{"backgroundColor": "#bf5441", "border": "groove #914133", "margin": "auto"}}>
            <h1 style={{"fontFamily": "Alfa Slab One", "margin": "5px"}}>
               Hello! {userInfo.name}
              <Border/>
            </h1>
            <img style={{"borderRadius": "25%", "border": "groove #914133", "boxShadow": "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} src={userInfo.pic_url} />
            </div>
            <div>
              <h2 style={{"fontFamily": "Alfa Slab One", "margin": "auto", "backgroundColor": "#cc7464", "border": "groove #914133", "boxShadow": "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>Your Appointments!
              </h2>
              {apps.length == 0 ? null : <Carousel content={apps} />
              }
              
            </div>
            <div style={{"backgroundColor": "#ba8e8a"}}>
              <h2 style={{"margin": "auto", "fontFamily": "Alfa Slab One", "backgroundColor": "#cc7464", "border": "groove #914133"}}>Schedule an Appointment!</h2>
            </div>
            <ScheduleForm style={{"position": "relative", "boxShadow": "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} name={userInfo.name} email={userInfo.email}></ScheduleForm>
          </div>
          </div>
      <div style={{"boxShadow": "rgb(38, 57, 77) 0px 20px 30px 30px;", "position": "relative", "zIndex": "10" ,"minHeight": "5vh", "maxHeight": "100%", "border": "inset #db7972", "backgroundColor": "#d47572"}}>
      </div>
      </Grid>
    </div>
  );
}

export default Dashboard;
