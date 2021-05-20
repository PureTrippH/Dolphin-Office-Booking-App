import React from 'react';
//import Button from "../../Button";

const Popup = (props) => {
    return (
        <div className="Popup" style={{
        "position": "absolute",
        "top": "50%",
        "right": "50%",
        "alignContent": "center",
        "zIndex": "0",
        "backgroundColor": "#f7c3c1"}}>
            {props.children}
        </div>
    )
}
export default Popup;