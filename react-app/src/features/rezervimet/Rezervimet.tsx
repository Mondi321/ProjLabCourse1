import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';
import { Rezervimi } from '../../app/models/rezervimi';
import { v4 as uuid } from 'uuid';
import { Formik } from 'formik';
import { Button, Form, Spinner } from 'react-bootstrap';
import MyTextInput from '../../app/common/form/MyTextInput';
import MyTextArea from '../../app/common/form/MyTextArea';
import './rezervimet.css';

export default observer(function Rezervimet() {

    const { rezervimiStore } = useStore();
    const { createRezervimi, loading } = rezervimiStore;
    const history = useHistory();

    const validationSchema = Yup.object({
        data: Yup.date().required('Data is required!'),
        nrPersonave: Yup.number().required('Nr. Personave is required!'),
        mesazhi: Yup.string().required('Mesazhi is required!')
    })

    function handleFormSubmit(rezervimi: Rezervimi) {
        let newRezervimi = {
            ...rezervimi,
            id: uuid()
        };
        createRezervimi(newRezervimi).then(() => {
            history.push('/home');
            alert('Rezervimi u krijua me sukses!');
        })
    }

    return (
        <div className="rezervimiForm">
            <div className="rezervimi-foto">
                <img src="/assets/rezervimi.jpg" alt="" />
            </div>
            <div className='rezervimiForm-permbajtja'>
                <h1>Make a reservation</h1>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    onSubmit={(values) => handleFormSubmit(values)}
                    initialValues={{
                        id: '',
                        data: '',
                        nrPersonave: '',
                        mesazhi: ''
                    }}
                >
                    {({ handleSubmit, isSubmitting, dirty, isValid }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off' className='rezervimiForm-Formik'>
                            <div className="rezervimi-input1">
                                <MyTextInput name='data' placeholder='Data' />
                                <MyTextInput name='nrPersonave' placeholder='NrPersonave' />
                            </div>
                            <MyTextArea name='mesazhi' placeholder='Message' />

                            <div className="buttons">
                                <Link to='/home'>
                                    <Button variant='warning'
                                        className='button'
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                                <Button
                                    type='submit'
                                    disabled={isSubmitting || !dirty || !isValid}
                                    variant='warning'
                                    className='button'
                                >
                                    <Spinner
                                        variant='dark'
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        hidden={loading}
                                    />
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
})
