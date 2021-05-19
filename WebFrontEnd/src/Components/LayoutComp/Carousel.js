import React from 'react';
import Border from "../Border";
import { Icon, Button } from '@material-ui/core';

//import Button from "../../Button";

const Carousel = (props) => {
    let index = 0; 
    let content = props.content;
    let contentMap = null;
    if(content) {
    contentMap = content.slice(index, index+3).map((newContent) =>
            <div style={{"backgroundColor": "#f59995", "borderRadius": "5px", "border": "groove #914133"}}>
                <h3 style={{"fontSize": "1em"}}>Appointment</h3>
                <h5 style={{"fontSize": "1em"}}>{newContent.Date}</h5>
                <h4 style={{"fontSize": "1em", "wordWrap": "inherit", "hyphens": "auto"}}>Message: {newContent.Message}</h4>
                <h4 style={{"fontSize": "1em"}}>Status: {newContent.Status}</h4>
                {(newContent.Status == "Modified") ? 
                <Button style={{"margin": "5px"}} color="error" variant="contained" type="submit">View Edits</Button>: null
                }
            </div> 
        );
    }
    return (
        <div>
        <div style={{"display": "flex", 
        "flexDirection": "row",
        "justifyContent": "space-evenly",
        "height": "auto",
        "border": "solid #c98471",
        "backgroundColor": "#f2c1bd"}}>
            
            {contentMap}
        </div>
        </div>
    )
}
export default Carousel;