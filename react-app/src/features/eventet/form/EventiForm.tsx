import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import {v4 as uuid} from 'uuid';
import { Eventi } from "../../../app/models/eventi";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Button, Card, Col, Spinner } from "react-bootstrap";
import { Form, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";

export default observer(function EventiForm() {

    const history = useHistory();
    const { eventiStore } = useStore();
    const { createEventi, updateEventi, loading, loadEventi, loadingInitial } = eventiStore;
    const { id } = useParams<{ id: string }>();

    const [eventi, setEventi] = useState({
        id: '',
        titulli: '',
        pershkrimi: '',
        cmimi: 0
    });

    const validationSchema = Yup.object({
        titulli: Yup.string().required('Titulli eshte i zbrazet!'),
        pershkrimi: Yup.string().required('Pershkrimi eshte i zbrazet!'),
        cmimi: Yup.number().required('Cmimi eshte i zbrazet!'),
    })

    useEffect(() => {
        if (id) loadEventi(id).then(eventi => setEventi(eventi!))
    }, [id, loadEventi]);


    function handleFormSubmit(eventi: Eventi) {
        if (eventi.id.length === 0) {
            let newEventi = {
                ...eventi,
                id: uuid()
            };
            createEventi(newEventi).then(() => history.push(`/eventet/${newEventi.id}`))
        } else {
            updateEventi(eventi).then(() => history.push(`/eventet/${eventi.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Card border='primary' style={{ marginTop: '6rem' }}>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={eventi}
                    onSubmit={(values) => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off' className='m-2'>
                            <MyTextInput name='titulli' placeholder='Titulli' />
                            <MyTextInput name='pershkrimi' placeholder='Pershkrimi' />
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
                            <Link to='/eventet'>
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
