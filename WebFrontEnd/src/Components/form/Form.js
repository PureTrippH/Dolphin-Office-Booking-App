import React from "react";
import { Formik } from 'formik';
import {Form, Field, ErrorMessage } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { MenuItem, Select } from '@material-ui/core';
import Alert from 'react-bootstrap/Alert';
import { writeToDB } from '../../utils/axios';
import { getCalendar} from "../../utils/axios";
import { parseISO, addMinutes, addDays } from "date-fns"

import Popup from '../LayoutComp/Popup';

const ScheduleForm = (props) => {
    const [calendar, setCalendar] = React.useState([]);

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
            initialValues={{ date: '', phoneNum: '', message: '', duration: '10'}}
            validate={values => {
                const errors = {};
                let sched = parseISO(values.date);
                calendar.forEach(date => {
                    let startTime = parseISO(values.date) >= parseISO(date.start.dateTime) && parseISO(values.date) <= parseISO(date.end.dateTime);
                    let endTime = addMinutes(parseISO(values.date), parseInt(values.duration)) >= parseISO(date.start.dateTime) && addMinutes(parseISO(values.date), parseInt(values.duration)) <= parseISO(date.end.dateTime);
                    if(startTime) {
                        errors.date = (
                            <Alert variant='danger'>
                                Start Date and Time Taken! Find Another Time, Day, or Duration!
                            </Alert>
                        )
                    } else if(endTime) {
                        errors.date = (
                            <Alert variant='danger'>
                                End Date and Time Taken! Find Another Time, Day, or Duration!
                            </Alert>
                        )
                    }
                    else if(parseISO(values.date) >= addDays(parseISO(values.date), 21)) {
                        errors.date = (
                            <Alert variant='danger'>
                                Please Choose A Time Within 3 Weeks From Now!
                            </Alert>
                        )
                    }
                })
                if (!values.date) {
                errors.date = (
                    <Alert variant='danger'>
                        Required Field!
                    </Alert>
                )
                }
                
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                let vals = JSON.stringify(values, null, 2);
                console.log(props);
                writeToDB(props.email, values.phoneNum, values.date, values.message, props.name, values.duration);
                }, 400);
                return (
                    <Popup><h1>test</h1></Popup>
                )
            }}
        >
            {({ isSubmitting }) => (
                <Form style={{"backgroundColor": "#f2c1bd","padding": "2%", "margin": "5%", "border": "groove #e6b7b3 3px"}}>
                <h3>Appointment Date</h3>
                <Field as={TextField} style={{"borderRadius": "10px"}} type="datetime-local" name="date" />
                <ErrorMessage name="date" component="div" />
                <h3>Phone Number</h3>
                <Field as={TextField} style={{"borderRadius": "10px"}} type="phoneNum" name="phoneNum" />
                <h3>Duration</h3>
                <Field as={Select} name="duration" type="duration">
                    <MenuItem value="10">10 Minutes</MenuItem>
                    <MenuItem value="20">20 Minutes</MenuItem>
                    <MenuItem value="30">30 Minutes</MenuItem>
                    <MenuItem value="40">40 Minutes</MenuItem>
                    <MenuItem value="60">60 Minutes</MenuItem>
                </Field>
                <h3>Message</h3>
                <Field as={TextField} style={{"borderRadius": "10px", "marginBottom": "2%"}} type="message" name="message" />
                <ErrorMessage  name="phoneNum" component="div" />
                <Button style={{"margin": "auto"}} color="error" variant="contained" fullWidth type="submit" disabled={isSubmitting}>
                    Submit
                </Button>
                </Form>
            )}
        </Formik>
    );
}
export default ScheduleForm;