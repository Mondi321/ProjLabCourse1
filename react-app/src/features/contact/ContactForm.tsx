import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import MyTextArea from '../../app/common/form/MyTextArea';
import MyTextInput from '../../app/common/form/MyTextInput';
import './contactForm.css';

export default function ContactForm() {
    const [contact, setContact] = useState({
        emri: '',
        email: '',
        subject: '',
        number: '',
        message: ''
    })

    const validationSchema = Yup.object({
        emri: Yup.string().required('Name is required!'),
        email: Yup.string().email('Not a valid email').required('Email is required!'),
        subject: Yup.string().required('Subject is required!'),
        number: Yup.number().required('Number is required!'),
        message: Yup.string().required('Message is required!'),
    })

    function handleFormSubmit(contact: any) {
        setContact(contact);
        console.log(contact);
    }
    return (
        <div className="contactForm">
            <img src="/assets/contact-form.jpg" alt="" />
            <div className='contactForm-permbajtja'>
                <h1>Contact Us</h1>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={(values) => handleFormSubmit(values)}
                    initialValues={contact}
                >
                    {({ handleSubmit, isSubmitting, dirty, isValid }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off' className='contactForm-Formik'>
                            <div className="inputsOne">
                                <MyTextInput name='emri' placeholder='Your Name' />
                                <MyTextInput name='email' placeholder='Your Email' />
                            </div>
                            <div className="inputsTwo">
                                <MyTextInput name='subject' placeholder='Subject' />
                                <MyTextInput name='number' placeholder='Number' />
                            </div>
                            <MyTextArea name='message' placeholder='Your Message' />

                            <button disabled={isSubmitting || !dirty || !isValid}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
