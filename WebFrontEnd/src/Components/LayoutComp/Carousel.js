import React from 'react';
import Border from "../Border";
import '../../Mobile.css';
import { Icon, Button } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import Carousel from 'react-bootstrap/Carousel' 


//import Button from "../../Button";



const BaseCarousel = (props) => {
	const [currentApp, setApp] = React.useState(0);
    let content = props.content;
	let contentMap = null;
    
    if(content) {
    contentMap = content.map((newContent) =>
	<Carousel.Item interval={2000}>
	<div className="CarouselCell" style={{"backgroundColor": "#f59995", "borderRadius": "5px", "border": "groove #914133", "width": "auto"}}>
		<link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet" />
		<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Fjalla+One&display=swap" rel="stylesheet" />
		<h1 style={{"fontFamily": "Alfa Slab One","fontSize": "1.5em"}}>Appointment</h1>
		<Border />
		<h5 style={{"fontFamily": "Fjalla One", "fontSize": "1em"}}>{format(parseISO(newContent.Date), "MM-dd-yyyy 'At' hh:mma")}</h5>
		<h4 style={{"fontFamily": "Fjalla One", "fontSize": "1em", "wordWrap": "inherit", "hyphens": "auto"}}>Message: {newContent.Message}</h4>
		<h4 style={{"fontFamily": "Fjalla One", "fontSize": "1em"}}>Status: {newContent.Status}</h4>
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
		