import React from 'react';
//import Button from "../../Button";

const Body = (props) => {
    return (
        <div className="NaviGrid" style={{"display": "grid", 
        "gridTemplateColumns": "10% 90%",
        "maxHeight": "100%", 
        "border": "inset #db7972",
        "alignItems": "center",
        "backgroundColor": "#f7c3c1"}}>
                {props.children}
        </div>
    )
}
export default Body;