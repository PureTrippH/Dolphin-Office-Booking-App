import React from "react";
import { Formik } from 'formik';
import {Form, Field, ErrorMessage } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { writeToDB } from '../../utils/axios';

const ScheduleForm = (props) => {
    
    return(
        <Formik
            initialValues={{ date: '', phoneNum: '', message: ''}}
            validate={values => {
                const errors = {};
                if (!values.date) {
                errors.date = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                let vals = JSON.stringify(values, null, 2);
                console.log(props);
                writeToDB(props.email, values.phoneNum, values.date, values.message, props.name);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form style={{"backgroundColor": "#f2c1bd","padding": "2%", "margin": "5%", "border": "groove #e6b7b3 3px"}}>
                <h3>Appointment Date</h3>
                <Field as={TextField} style={{"borderRadius": "10px"}} type="datetime-local" name="date" />
                <ErrorMessage name="date" component="div" />
                <h3>Phone Number</h3>
                <Field as={TextField} style={{"borderRadius": "10px"}} type="phoneNum" name="phoneNum" />
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