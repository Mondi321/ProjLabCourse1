import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { Shteti } from '../../../app/models/shteti';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Button, Card, Col, Spinner } from 'react-bootstrap';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Form, Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { observer } from 'mobx-react-lite';

export default observer(function ShtetiForm() {

    const history = useHistory();
    const { shtetiStore } = useStore();
    const { createShteti, updateShteti, loading, loadShteti, loadingInitial } = shtetiStore;
    const { id } = useParams<{ id: undefined }>();

    const [shteti, setShteti] = useState({
        emri: '',
        emriPostal: ''
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required('Emri eshte i zbrazet!'),
        emriPostal: Yup.string().required('Emri postal eshte i zbrazet!')
    })

    useEffect(() => {
        if (id) loadShteti(id).then(shteti => setShteti(shteti!))
    }, [id, loadShteti]);


    function handleFormSubmit(shteti: Shteti) {
        if (id) {
            updateShteti(shteti).then(() => history.push('/shtetet'))
        } else {
            createShteti(shteti).then(() => history.push('/shtetet'))
        }
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Card border='primary' style={{ marginTop: '6rem' }}>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={shteti}
                    onSubmit={(values) => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off' className='m-2'>
                            <MyTextInput name='emri' placeholder='Emri' />
                            <MyTextInput name='emriPostal' placeholder='Emri Postal' />

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
                            <Link to='/shtetet'>
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
