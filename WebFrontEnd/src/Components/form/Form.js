import React from "react";
import { Formik } from 'formik';
import {Form, Field, ErrorMessage } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MenuItem, Select } from '@material-ui/core';
import Alert from 'react-bootstrap/Alert';
import { writeToDB, overwriteDB } from '../../utils/axios';
import { getCalendar} from "../../utils/axios";
import { parseISO, addMinutes, addDays } from "date-fns"

import Popup from '../LayoutComp/Popup';

const ScheduleForm = (props) => {
    const [calendar, setCalendar] = React.useState([]);
    const [valid, setValid] = React.useState(false);
    React.useEffect(() => {
          getCalendar('oxygenatemc@gmail.com').then(calData => {
            if(calData.data.data) {
                console.log(calData);
                setCalendar(calData.data.data.items);
            }
        })
      }, []);
    return(
        <Formik
            initialValues={{ date: '', phoneNum: '', message: '', duration: 'SelectOne'}}
            validate={values => {
                const errors = {};
                let sched = parseISO(values.date);
                calendar.forEach(date => {
                    let startTime = parseISO(values.date) >= parseISO(date.start.dateTime) && parseISO(values.date) <= parseISO(date.end.dateTime);
                    let endTime = addMinutes(parseISO(values.date), parseInt(values.duration)) >= parseISO(date.start.dateTime) && addMinutes(parseISO(values.date), parseInt(values.duration)) <= parseISO(date.end.dateTime);
                    if(startTime) {
                        setValid(false);
                        errors.date = (
                            <Alert variant='danger'>
                                Start Date and Time Taken! Find Another Time, Day, or Duration!
                            </Alert>
                        )
                    } else if(endTime) {
                        setValid(false);
                        errors.date = (
                            <Alert variant='danger'>
                                End Date and Time Taken! Find Another Time, Day, or Duration!
                            </Alert>
                        )
                    }
                    else if(parseISO(values.date) >= addDays(parseISO(values.date), 21)) {
                        setValid(false);
                        errors.date = (
                            <Alert variant='danger'>
                                Please Choose A Time Within 3 Weeks From Now!
                            </Alert>
                        )
                    } else {
                        setValid(true);
                    }
                })
                console.log(values.duration);
                if(values.duration == "SelectOne") {
                    setValid(true);
                    errors.duration = (
                        <Alert variant='danger'>
                            Required Field!
                        </Alert>
                    )
                }
                if (!values.date) {
                    setValid(true);
                    errors.date = (
                        <Alert variant='danger'>
                            Required Field!
                        </Alert>
                    )
                }
                
                
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                if(props.type == "edited") {
                    overwriteDB(props.email, values.phoneNum, values.date, values.message, props.name, values.duration, props.prevDate, props.prevEndTime);
                    props.changeFunc("", "", "");
                    return window.location.reload();
                }
                setTimeout(() => {
                let vals = JSON.stringify(values, null, 2);
                console.log(props);
                writeToDB(props.email, values.phoneNum, values.date, values.message, props.name, values.duration);
                }, 400);
                setValid(false);
                return window.location.reload();
            }}
        >
            {({ isSubmitting }) => (
                <Form style={{"backgroundColor": "#f2c1bd","padding": `"2%"`, "margin": "5%", "border": "groove #e6b7b3 3px"}}>
                <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet" />
                <h3 style={{"fontFamily": "Fjalla One"}}>Appointment Date</h3>
                <Field as={TextField} style={{"borderRadius": "10px", "marginBottom": "1%"}} type="datetime-local" name="date" />
                <ErrorMessage name="date" component="div" />
                <h3 style={{"fontFamily": "Fjalla One"}}>Phone Number</h3>
                <Field as={TextField} style={{"borderRadius": "10px", "marginBottom": "1%"}} type="phoneNum" name="phoneNum" />
                <h3 style={{"fontFamily": "Fjalla One"}}>Duration</h3>
                <Field style={{"fontFamily": "Fjalla One", "marginBottom": "1%"}} as={Select} name="duration" type="duration">
                    <MenuItem style={{"fontFamily": "Fjalla One"}} value="SelectOne">Select One</MenuItem>
                    <MenuItem style={{"fontFamily": "Fjalla One"}} value="10">10 Minutes</MenuItem>
                    <MenuItem style={{"fontFamily": "Fjalla One"}} value="20">20 Minutes</MenuItem>
                    <MenuItem style={{"fontFamily": "Fjalla One"}} value="30">30 Minutes</MenuItem>
                    <MenuItem style={{"fontFamily": "Fjalla One"}} value="40">40 Minutes</MenuItem>
                    <MenuItem style={{"fontFamily": "Fjalla One"}} value="60">60 Minutes</MenuItem>
                </Field>
                <ErrorMessage style={{"fontFamily": "Fjalla One"}}  name="duration" component="div" />
                <h3 style={{"fontFamily": "Fjalla One"}}>Message</h3>
                <Field style={{"fontFamily": "Fjalla One"}} as={TextField} style={{"borderRadius": "10px", "marginBottom": "2%"}} type="message" name="message" />
                
                <Button  style={{"margin": "auto"}} color="error" variant="contained" fullWidth type="submit" disabled={!valid}>
                    Submit
                </Button>
                </Form>
            )}
        </Formik>
    );
}
export default ScheduleForm;