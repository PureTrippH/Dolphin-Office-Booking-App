import React from 'react';
import Border from "../Border";
import '../../Mobile.css';
import { Icon, Button } from '@material-ui/core';
import Carousel from 'react-bootstrap/Carousel' 


//import Button from "../../Button";



const BaseCarousel = (props) => {
	const [currentApp, setApp] = React.useState(0);
    let content = props.content;
	let contentMap = null;
    
    if(content) {
    contentMap = content.map((newContent) =>
	<Carousel.Item>
	<div className="CarouselCell" style={{"backgroundColor": "#f59995", "borderRadius": "5px", "border": "groove #914133", "width": "auto"}}>
		<h3 style={{"fontSize": "1em"}}>Appointment</h3>
		<Border />
		<h5 style={{"fontSize": "1em"}}>{newContent.Date}</h5>
		<h4 style={{"fontSize": "1em", "wordWrap": "inherit", "hyphens": "auto"}}>Message: {newContent.Message}</h4>
		<h4 style={{"fontSize": "1em"}}>Status: {newContent.Status}</h4>
		{(newContent.Status == "Modified") ? 
		<Button style={{"marginBottom": "2.5%"}} color="error" variant="contained" type="submit">View Edits</Button>: null
		}
	</div> 
	</Carousel.Item>
        );
    }
    return (
		<div>
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
			<Carousel interval={600} keyboard={false} pauseOnHover={true}>
				{contentMap}
			</Carousel>
		</div>
    )
}
export default BaseCarousel;
		