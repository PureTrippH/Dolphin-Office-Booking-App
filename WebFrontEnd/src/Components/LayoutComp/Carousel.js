import React from 'react';
import Border from "../Border";
import '../../Mobile.css';
import { Icon, Button } from '@material-ui/core';
import { format, parseISO } from 'date-fns';
import Popup  from './Popup';
import Carousel from 'react-bootstrap/Carousel' 


//import Button from "../../Button";



const BaseCarousel = (props) => {
	const [currentApp, setApp] = React.useState(0);
    let content = props.content;
	let contentMap = null;
	const [popup, setPopup] = React.useState(false);
	const [userData, setData] = React.useState({message: "test", date: "test"});
	const [date, setDate] = React.useState({startDate: "lol", endDate: "lol"});
	const [controlOp, setControlOp] = React.useState(true);
	const [myInterval, setInterval] = React.useState(2000);

	const toggleButton = (dateString, message, dateNonString, endDate) => {
		setDate({startDate: dateNonString, endDate: endDate});
		setPopup(!popup);
		setControlOp(!controlOp);
		setData({message: message, date: dateString})
		if(myInterval == 2000) setInterval(100000000);
		else setInterval(2000);
	}
    
    if(content) {
    contentMap = content.map((newContent) =>
	<Carousel.Item>
	<div className="CarouselCell" style={{"backgroundColor": "#f59995", "borderRadius": "5px", "border": "groove #914133", "width": "auto"}}>
		<link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet" />
		<link href="https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Fjalla+One&display=swap" rel="stylesheet" />
		<h1 style={{"fontFamily": "Alfa Slab One","fontSize": "1.5em"}}>Appointment</h1>
		<Border />
		<h5 style={{"fontFamily": "Fjalla One", "fontSize": "1em"}}>{format(parseISO(newContent.Date), "MM-dd-yyyy 'At' hh:mma")}</h5>
		<h4 style={{"fontFamily": "Fjalla One", "fontSize": "1em", "wordWrap": "inherit", "hyphens": "auto"}}>Message: {newContent.Message}</h4>
		<h4 style={{"fontFamily": "Fjalla One", "fontSize": "1em"}}>Status: {newContent.Status}</h4>
		{(newContent.Status == "modified") ? (() => setControlOp(false),
		<Button onClick={() => toggleButton(format(parseISO(newContent.Date), "MM-dd-yyyy 'At' hh:mma"), newContent.Message, newContent.Date, newContent.EndTime)} style={{"marginBottom": "2.5%"}} color="error" variant="contained" type="submit">View Edits</Button>) : null
		}
	</div> 
	</Carousel.Item>
        );
    }
    return (
		<div>
			<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
			<Carousel controls={controlOp} indicators={controlOp} interval={myInterval} keyboard={false} pauseOnHover={true}>
				{contentMap}
			</Carousel>
			{popup ? (
				<div>
			<Popup email={props.email} name={props.name} changeFunc={toggleButton} date={userData.date} dateInfo={date} message={userData.message} /> </div>) : null}
		</div>
    )
}
export default BaseCarousel;	