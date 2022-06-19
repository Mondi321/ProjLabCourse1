import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Spinner } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { observer } from 'mobx-react-lite';
import { Contact } from '../../../app/models/contact';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function ContactFormEdit() {

    const history = useHistory();
    const { contactStore } = useStore();
    const { updateContact, loading, loadContact, loadingInitial } = contactStore;
    const { id } = useParams<{ id: string }>();

    const [contact, setContact] = useState({
        id:'',
        emri: '',
        email: '',
        subject: '',
        numri: '',
        mesazhi: ''
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required('Emri eshte i zbrazet!'),
        email: Yup.string().required('Email eshte i zbrazet!').email('Email jo valid'),
        subject: Yup.string().required('Subject eshte i zbrazet!'),
        numri: Yup.number().required('Numri eshte i zbrazet!'),
        mesazhi: Yup.string().required('Mesazhi eshte i zbrazet!'),
    })

    useEffect(() => {
        if (id) loadContact(id).then(contact => setContact(contact!))
    }, [id, loadContact]);


    function handleFormSubmit(contact: Contact){
        updateContact(contact).then(() => history.push(`/contacts`))
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Card border='primary' style={{ marginTop: '6rem' }}>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={contact}
                    onSubmit={(values) => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off' className='m-2'>
                            <MyTextInput name='emri' placeholder='Emri' />
                            <MyTextInput name='email' placeholder='Email' />
                            <MyTextInput name='subject' placeholder='Subject' />
                            <MyTextInput name='numri' placeholder='Numri' />
                            <MyTextArea name='mesazhi' placeholder='Mesazhi' />

                            <Button
                                className='float-end'
                                variant="primary"
                                type="submit"
                                disabled={isSubmitting || !dirty || !isValid}
                            >
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                    hidden={loading}
                                />
                                Submit
                            </Button>
                            <Link to='/contacts'>
                                <Button className='float-end' style={{ marginRight: '10px' }} variant='secondary'>
                                    Cancel
                                </Button>
                            </Link>
                        </Form>
                    )}
                </Formik>
            </Card>
        </Col>
    )
})
