import React from "react";
import { Formik } from 'formik';
import {Form, Field, ErrorMessage } from 'formik';


const ScheduleForm = (props) => {
    return(
        <Formik
            initialValues={{ date: '', phoneNum: '' }}
            validate={values => {
                const errors = {};
                if (!values.date) {
                errors.date = 'Required';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting }) => (
                <Form style={{"backgroundColor": "#f2c1bd","padding": "2%", "margin": "5%", "border": "groove #e6b7b3 3px"}}>
                <h3>Appointment Date</h3>
                <Field style={{"borderRadius": "10px"}} type="datetime-local" name="date" />
                <ErrorMessage name="date" component="div" />
                <h3>Phone Number</h3>
                <Field style={{"borderRadius": "10px"}} type="phoneNum" name="phoneNum" />
                <ErrorMessage name="phoneNum" component="div" />
                <button style={{"display": "block", "fontSize": "1rem"}} type="submit" disabled={isSubmitting}>
                    Submit
                </button>
                </Form>
            )}
        </Formik>
    );
}
export default ScheduleForm;