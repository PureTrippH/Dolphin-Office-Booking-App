import React from 'react';
import { Button } from "@material-ui/core";
import Border from "../Bases/Border"
import Form from "../form/Form";
import BaseGrid from "../Bases/BaseGrid";
import Header from '../LayoutComp/Headers/Header'

import { makeStyles } from '@material-ui/core/styles';
const Popup = (props) => {
    const [isFormVisible, showForum] = React.useState(false);
    const [isDestroyed, destroyPopup] = React.useState(false);
    const useStyles = makeStyles({
        root: {
          position: 'absolute',
          left: "50%"
        },
      });
    const classes = useStyles();

    return (
        <div>
            (<div data-aos="zoom-in" class="popup-background" style={{"position": "fixed", "zIndex": "1", "top": "0px", "left": "0px", "width": "100%", "height": "100%", "backgroundColor": "#7a7978", "opacity": "0.7"}}>
            </div>
                <div data-aos="zoom-in" className="Popup" style={{
                "zIndex": "4",
                "position": "absolute",
                "alignItems": "center",
                "textAlign": "center",
                "margin": "auto",
                "top": "25%",
                "left": "50%",
                "alignContent": "center",
                "justifyContent": "center",
                "border": "groove #73322f 5px",
                "transform": "translate(-50%, -50%)",
                "width": "100%",
                "height": "auto",
                "boxShadow": "rgb(38, 57, 77) 0px 20px 30px -10px",
                "backgroundColor": "#f7c3c1"}}>
                    {isFormVisible ? <div data-aos="fade-up">
                        <BaseGrid gridTemplateColumns="10% 90%">
                        <Header text="Edit Appointment"></Header>
                        <Form type="edited" changeFunc={props.changeFunc}style={{"position": "relative", "height": "50%", "margin": "autho"}}></Form>
                        </BaseGrid>
                    </div> : null}
                    {!isFormVisible ? 
                    <div data-aos="zoom-in">
                    <BaseGrid noMedia={true} gridtemplatecolumns="5% 95%">
                        <Button onClick={() => props.changeFunc("", "", "")} variant="contained" color="secondary">X</Button>
                        <Header style={{"position": "absolute", "left": "50%", "transform": "translate(-50%, -50%)"}} text="Modifications">
                        </Header>
                    </BaseGrid>
                    <h3>Your Appointment has been modified for a variety of reasons. Check out the changes below!</h3>
                    <div data-aos="zoom-in" style={{"display": "grid",
                    "gridTemplateColumns": "25% 50%, 25%",
                    "padding": "5%"}}>
                        <div style={{"height": "100%", "border": "groove #e6b7b3 5px"}}>
                        <div>
                        <h5 style={{"fontSize": "1em"}}>Date: {props.date}</h5>
                        <h5 style={{"fontSize": "1em", "overflowWrap": "break-word", "hyphens": "auto"}}>Message: {props.message}</h5>
                        <h5 style={{"fontSize": "1em"}}>Duration: 50 Minutes</h5>
                        </div>
                        <BaseGrid gap="10px">
                            <Button onClick={() => props.changeFunc("", "", "")} variant="contained" color="primary">Accept Changes</Button>
                            <Button variant="contained" onClick={() => showForum(true)} color="secondary">Decline Changes</Button>
                        </BaseGrid>
                        </div>
                    </div>
                    </div>
                    : null}
                </div>
            </div>
    )
}
export default Popup;