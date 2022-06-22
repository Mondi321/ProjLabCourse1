import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Gjinia } from '../../../app/models/gjinia';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Button, Card, Col, Spinner } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { observer } from 'mobx-react-lite';

export default observer(function GjiniaForm() {

    const history = useHistory();
    const { gjiniaStore } = useStore();
    const { createGjinia, updateGjinia, loading, loadGjinia, loadingInitial } = gjiniaStore;
    const { id } = useParams<{ id: undefined }>();

    const [gjinia, setGjinia] = useState({
        gjiniaE: ''
    });

    const validationSchema = Yup.object({
        gjiniaE: Yup.string().required('Gjinia eshte e zbrazet!')
    })

    useEffect(() => {
        if (id) loadGjinia(id).then(gjinia => setGjinia(gjinia!))
    }, [id, loadGjinia]);


    function handleFormSubmit(gjinia: Gjinia) {
        if (id) {
            updateGjinia(gjinia).then(() => history.push('/gjinite'))
        } else {
            createGjinia(gjinia).then(() => history.push('/gjinite'))
        }
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Card border='primary' style={{ marginTop: '6rem' }}>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={gjinia}
                    onSubmit={(values) => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off' className='m-2'>
                            <MyTextInput name='gjiniaE' placeholder='Gjinia' />

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
                            <Link to='/gjinite'>
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
