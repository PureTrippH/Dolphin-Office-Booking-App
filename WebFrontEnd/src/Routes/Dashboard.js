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
import Header from '../Components/LayoutComp/Headers/Header'
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
    <div className="App" style={{"height": "100vh", "backgroundColor": "#e3beba", "display": "absolute"}}>
      <link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Fjalla+One&display=swap" rel="stylesheet" />
      <Grid style={{"backgroundColor": "#e3beba"}}>
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
          "boxShadow": "rgba(0, 0, 0, 0.56) 0px 22px 70px 4px", "height": "100"}}>
        <div style={{
          "backgroundColor": "#f0b1ad",
          "minHeight": "100%",
        }}>
          <div style={{"backgroundColor": "#bf5441", "border": "groove #914133", "margin": "auto"}}>
            <h1 style={{"fontFamily": "Alfa Slab One", "margin": "5px"}}>
               Hello! {userInfo.name}
              <Border/>
            </h1>
            <img style={{"borderRadius": "25%", "border": "groove #914133", "boxShadow": "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} src={userInfo.pic_url} />
            </div>
            <Header text="Your Appointments">
              {apps.length == 0 ? null : <Carousel email={userInfo.email} name={userInfo.name} content={apps} />
              }
            </Header>
            <Header text="Schedule an Appointment!" />
            <ScheduleForm style={{"padding": "2%", "margin": "5%", "position": "relative", "boxShadow": "rgba(0, 0, 0, 0.35) 0px 5px 15px"}} name={userInfo.name} email={userInfo.email}></ScheduleForm>
          </div>
          </div>
      <div style={{"boxShadow": "rgb(38, 57, 77) 0px 20px 30px 30px;", "position": "relative" ,"minHeight": "5vh", "maxHeight": "100%", "border": "inset #db7972", "backgroundColor": "#d47572"}}>
      </div>
      </Grid>
    </div>
  );
}

export default Dashboard;
