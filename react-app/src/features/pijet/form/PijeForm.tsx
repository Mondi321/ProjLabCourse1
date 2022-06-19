import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Spinner } from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Pije } from '../../../app/models/pije';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { v4 as uuid } from "uuid";
import { observer } from 'mobx-react-lite';

export default observer(function PijeForm() {

    const history = useHistory();
    const { pijeStore } = useStore();
    const { createPije, updatePije, loading, loadPije, loadingInitial } = pijeStore;
    const { id } = useParams<{ id: string }>();

    const [pije, setPije] = useState({
        id: '',
        emri: '',
        perberesit: '',
        cmimi: 0
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required('Emri eshte i zbrazet!'),
        perberesit: Yup.string().required('Perberesi eshte i zbrazet!'),
        cmimi: Yup.string().required('Cmimi eshte i zbrazet!'),
    })

    useEffect(() => {
        if (id) loadPije(id).then(pije => setPije(pije!))
    }, [id, loadPije]);


    function handleFormSubmit(pije: Pije){
        if (pije.id.length === 0) {
            let newPije = {
                ...pije,
                id: uuid()
            };
            createPije(newPije).then(() => history.push(`/pijet/${newPije.id}`))
        }else{
            updatePije(pije).then(() => history.push(`/pijet/${pije.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Card border='primary' style={{ marginTop: '6rem' }}>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={pije}
                    onSubmit={(values) => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off' className='m-2'>
                            <MyTextInput name='emri' placeholder='Emri' />
                            <MyTextArea name='perberesit' placeholder='Perberesit' />
                            <MyTextInput name='cmimi' placeholder='Cmimi' />

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
                            <Link to='/pijet'>
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
