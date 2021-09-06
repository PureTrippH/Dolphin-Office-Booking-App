import React from "react";
import { Form, ErrorMessage, Field, Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button, MenuItem, Radio, Select } from "@material-ui/core";
import { writeToDB, overwriteDB } from '../../utils/axios';
import { getCalendar} from "../../utils/axios";
import { parseISO, addMinutes, addDays } from "date-fns"
const ScheduleForm = (props) => {
    return (
        <div>
            <Formik initialValues={{date: "", phoneNum: "", counselor: "", duration: "", message: ""}} onSubmit={(data, {setSubmitting, resetForm}) => {
                if(props.type == "edited") {
                    setSubmitting(true);
                    overwriteDB(props.email, data.phoneNum, data.date, data.message, props.name, data.duration, props.prevDate, props.prevEndTime);
                    props.changeFunc("", "", "");
                    window.location.reload();
                }
                setTimeout(() => {
                    let vals = JSON.stringify(data, null, 2);
                    writeToDB(props.email, data.phoneNum, data.date, data.message, props.name, data.duration);
                    setSubmitting(false);
                    return window.location.reload();
                }, 400);
            }}
            validate={(values, props) => {
                let errors = {}
                let email = `${values.counselor}@gmail.com`;
                getCalendar(email).then(calData => {
                    if(calData.data.data) {
                        calData.data.data.items.forEach(date => {
                            let startTime = parseISO(values.date) >= parseISO(date.start.dateTime) && parseISO(values.date) <= parseISO(date.end.dateTime);
                            let endTime = addMinutes(parseISO(values.date), parseInt(values.duration)) >= parseISO(date.start.dateTime) && addMinutes(parseISO(values.date), parseInt(values.duration)) <= parseISO(date.end.dateTime);
                            if(startTime) {
                                console.log("Error");
                                errors.date = "Start Date and Time Taken! Find Another Time, Day, or Duration!"
                            } else if(endTime) {
                                errors.date = "End Time Taken! Find Another Time, Day, or Duration!"
                            }
                            else if(parseISO(values.date) > addDays(new Date(), 21)) {
                                errors.date = "Please Choose A Time Within 3 Weeks From Now!"
                            }
                        });
                    }
                });
                if(values.date === "") {
                    errors.date = "Required Field!"
                }
                if(values.duration === "") {
                    errors.duration = "Required Field!"
                }
                if(values.counselor === "") {
                    errors.counselor = "Required Field!"
                }
                console.log(errors.startTime);
                return errors;
            }}>
                {({ values, errors, isSubmitting, handleChange, handleBlur, handleSubmit }) => (
                    <Form style={{"backgroundColor": "#f2c1bd","padding": `"2%"`, "margin": "5%", "border": "groove #e6b7b3 3px"}}>
                    <link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet" />
                    <h3 style={{"fontFamily": "Fjalla One"}}>Appointment Date</h3>
                    <Field as={TextField} style={{"borderRadius": "10px", "marginBottom": "1%"}} type="datetime-local" name="date" />
                    {errors.date ? (<div><p>{errors.date}</p></div>) : null}
                    <h3 style={{"fontFamily": "Fjalla One"}}>Phone Number</h3>
                    <Field as={TextField} style={{"borderRadius": "10px", "marginBottom": "1%"}} type="phoneNum" name="phoneNum" />
                    <h3 style={{"fontFamily": "Fjalla One"}}>Counselor</h3>
                    <Field style={{"fontFamily": "Fjalla One", "marginBottom": "1%"}} as={Select} name="counselor" type="counselor">
                        <MenuItem style={{"fontFamily": "Fjalla One"}} value="oxygenatemc">Stello</MenuItem>
                        <MenuItem style={{"fontFamily": "Fjalla One"}} value="capehenrykid">Lillienstern</MenuItem>
                    </Field>
                    {errors.counselor ? (<div><p>{errors.counselor}</p></div>) : null}
                    <h3 style={{"fontFamily": "Fjalla One"}}>Duration</h3>
                    <Field style={{"fontFamily": "Fjalla One", "marginBottom": "1%"}} as={Select} name="duration" type="duration">
                        <MenuItem style={{"fontFamily": "Fjalla One"}} value="10">10 Minutes</MenuItem>
                        <MenuItem style={{"fontFamily": "Fjalla One"}} value="20">20 Minutes</MenuItem>
                        <MenuItem style={{"fontFamily": "Fjalla One"}} value="30">30 Minutes</MenuItem>
                        <MenuItem style={{"fontFamily": "Fjalla One"}} value="40">40 Minutes</MenuItem>
                        <MenuItem style={{"fontFamily": "Fjalla One"}} value="60">60 Minutes</MenuItem>
                    </Field>
                    {errors.duration ? (<div><p>{errors.duration}</p></div>) : null}
                    <h3 style={{"fontFamily": "Fjalla One"}}>Message</h3>
                    <Field style={{"fontFamily": "Fjalla One"}} as={TextField} style={{"borderRadius": "10px", "marginBottom": "2%"}} type="message" name="message" />
                    
                    <Button  style={{"margin": "auto"}} color="error" variant="contained" fullWidth type="submit" disabled={isSubmitting || !(JSON.stringify(errors) === '{}')}>
                        Submit
                    </Button>
                    </Form>
                )}
        </Formik><div>
        </div>
        </div>
    )
}
export default ScheduleForm;