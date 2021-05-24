import React from 'react';
import { Button } from "@material-ui/core";
import Border from "../Bases/Border"

const Popup = (props) => {
    return (
            <div className="Popup" style={{
            "position": "absolute",
            "alignItems": "center",
            "textAlign": "center",
            "margin": "auto",
            "top": "25%",
            "left": "50%",
            "alignContent": "center",
            "justifyContent": "center",
            "border": "groove #73322f 25px",
            "transform": "translate(-50%, -50%)",
            "width": "100%",
            "height": "50%",
            "backgroundColor": "#f7c3c1"}}>
                <h1 style={{"fontSize": "1.5em", "overflowWrap": "break-word", "hyphens": "auto"}}>Modifications:</h1>
                <Border />
                <div style={{"display": "grid",
                "gridTemplateColumns": "50% 50%"}}>
                    <div style={{"height": "100%", "border": "groove #e6b7b3 5px"}}>
                    <div>
                    <h5 style={{"fontSize": "1em"}}>Date: {props.date}</h5>
                    <h5 style={{"fontSize": "1em", "overflowWrap": "break-word", "hyphens": "auto"}}>Message: {props.message}</h5>
                    <h5 style={{"fontSize": "1em"}}>Duration: 50 Minutes</h5>
                    </div>
                    <div style={{"border": "groove #e6b7b3 5px"}}>
                        <Button color="primary">Accept</Button>
                        <Button color="error">Decline</Button>
                    </div>
                    </div>
                    <div style={{"border": "groove #e6b7b3 3px"}}>

                    </div>
                </div>
            </div>
    )
}
export default Popup;