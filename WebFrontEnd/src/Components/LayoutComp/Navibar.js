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
        "boxShadow": "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        "backgroundColor": "#b55c59"}}>
                {props.children}
        </div>
    )
}
export default Navibar;