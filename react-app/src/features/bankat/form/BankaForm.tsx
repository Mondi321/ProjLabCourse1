import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Banka } from '../../../app/models/banka';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Button, Card, Col, Spinner } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';

export default observer(function BankaForm() {

    const history = useHistory();
    const { bankaStore } = useStore();
    const { createBanka, updateBanka, loading, loadBanka, loadingInitial } = bankaStore;
    const { id } = useParams<{ id: undefined }>();

    const [banka, setBanka] = useState({
        emri: ''
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required('Emri eshte i zbrazet!')
    })

    useEffect(() => {
        if (id) loadBanka(id).then(banka => setBanka(banka!))
    }, [id, loadBanka]);


    function handleFormSubmit(banka: Banka) {
        if (id) {
            updateBanka(banka).then(() => history.push('/bankat'))
        } else {
            createBanka(banka).then(() => history.push('/bankat'))
        }
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Card border='primary' style={{ marginTop: '6rem' }}>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={banka}
                    onSubmit={(values) => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off' className='m-2'>
                            <MyTextInput name='emri' placeholder='Emri bankes' />

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
                            <Link to='/bankat'>
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
