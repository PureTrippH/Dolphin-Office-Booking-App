import React from 'react';
//import Button from "../../Button";

const Navibar = (props) => {
    return (
        <div className="NaviGrid" style={{"display": "grid", 
        "gridTemplateColumns": "10% 80% 10%",
        "justifyContent": "center",
        "maxHeight": "100%", 
        "border": "inset #db7972",
        "overflow": "revert",
        "backgroundColor": "#b55c59"}}>
                {props.children}
        </div>
    )
}
export default Navibar;