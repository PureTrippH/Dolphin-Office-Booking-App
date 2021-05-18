import React from 'react';
//import Button from "../../Button";

const Carousel = (props) => {
    let index = 0; 
    let content = props.content;
    return (
        <div style={{"display": "flex", 
        "flexDirection": "row",
        "justifyContent": "center",
        "height": "100%",
        "backgroundColor": "#b55c59"}}>
                {props.children}
        </div>
    )
}
export default Carousel;