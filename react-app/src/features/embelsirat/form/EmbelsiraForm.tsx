import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Embelsira } from '../../../app/models/embelsira';
import {v4 as uuid} from 'uuid';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Button, Card, Col, Spinner } from 'react-bootstrap';
import { Form, Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { observer } from 'mobx-react-lite';

export default observer(function EmbelsiraForm() {

    const history = useHistory();
    const { embelsiraStore } = useStore();
    const { createEmbelsira, updateEmbelsira, loading, loadEmbelsira, loadingInitial } = embelsiraStore;
    const { id } = useParams<{ id: string }>();

    const [embelsira, setEmbelsira] = useState({
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
        if (id) loadEmbelsira(id).then(embelsira => setEmbelsira(embelsira!))
    }, [id, loadEmbelsira]);


    function handleFormSubmit(embelsira: Embelsira) {
        if (embelsira.id.length === 0) {
            let newEmbelsira = {
                ...embelsira,
                id: uuid()
            };
            createEmbelsira(newEmbelsira).then(() => history.push(`/embelsirat/${newEmbelsira.id}`))
        } else {
            updateEmbelsira(embelsira).then(() => history.push(`/embelsirat/${embelsira.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Card border='primary' style={{ marginTop: '6rem' }}>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={embelsira}
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
                            <Link to='/embelsirat'>
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
