import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Qyteti } from '../../../app/models/qyteti';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Button, Card, Col, Spinner } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';

export default observer(function QytetiForm() {

    const history = useHistory();
    const { qytetiStore, shtetiStore } = useStore();
    const { createQyteti, updateQyteti, loading, loadQyteti, loadingInitial } = qytetiStore;
    const { shtetet, loadShtetet } = shtetiStore;
    const { id } = useParams<{ id: undefined }>();

    const [qyteti, setQyteti] = useState({
        emri: '',
        shtetiId: 0
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required('Emri eshte i zbrazet!')
    })

    useEffect(() => {
        if (id) loadQyteti(id).then(qyteti => setQyteti(qyteti!))
    }, [id, loadQyteti]);

    useEffect(() => {
        loadShtetet();
    },[loadShtetet])


    function handleFormSubmit(qyteti: Qyteti) {
        if (id) {
            updateQyteti(qyteti).then(() => history.push('/qytetet'))
        } else {
            createQyteti(qyteti).then(() => history.push('/qytetet'))
        }
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Card border='primary' style={{ marginTop: '6rem' }}>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={qyteti}
                    onSubmit={(values) => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off' className='m-2'>
                            <MyTextInput name='emri' placeholder='Emri' />
                            <Field as="select" name="shtetiId" className='form-select mt-3 mb-3'>
                                <option ></option>
                                {shtetet.map(shteti => (
                                    <option key={shteti.shtetiId} value={shteti.shtetiId}>{shteti.emri}</option>
                                ))}
                            </Field>

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
                            <Link to='/qytetet'>
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
