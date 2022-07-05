import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import {Rezervimi} from '../../../app/models/rezervimi';
import {v4 as uuid} from 'uuid';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Button, Card, Col, Spinner } from "react-bootstrap";
import { Field, Form, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";

export default observer(function RezervimiForm() {
    const history = useHistory();
    const { rezervimiStore } = useStore();
    const { createRezervimi, updateRezervimi, loading, loadRezervimi, loadingInitial } = rezervimiStore;
    const { id } = useParams<{ id: string }>();

    const [rezervimi, setRezervimi] = useState({
        id: '',
        data: '',
        nrPersonave: '',
        mesazhi: ''
    });

    const validationSchema = Yup.object({
        data: Yup.string().required('Data eshte e zbrazet!'),
        nrPersonave: Yup.number().required('Numri i personave eshte i zbrazet!'),
        mesazhi: Yup.string().required('Mesazhi eshte i zbrazet!'),
    })

    useEffect(() => {
        if (id) loadRezervimi(id).then(rezervimi => setRezervimi(rezervimi!))
    }, [id, loadRezervimi]);


    function handleFormSubmit(rezervimi: Rezervimi){
        if (rezervimi.id.length === 0) {
            let newRezervimi = {
                ...rezervimi,
                id: uuid()
            };
            createRezervimi(newRezervimi).then(() => history.push(`/rezervimet`))
        }else{
            updateRezervimi(rezervimi).then(() => history.push(`/rezervimet`))
        }
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Card border='primary' style={{marginTop: '6rem'}}>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={rezervimi}
                    onSubmit={(values) => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off' className='m-2'>
                            <Field type='date' name="data" className='form-control' />
                            <MyTextInput name='nrPersonave' placeholder='Nr. Personave' />
                            <MyTextInput name='mesazhi' placeholder='Mesazhi' />

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
                            <Link to='/rezervimet'>
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