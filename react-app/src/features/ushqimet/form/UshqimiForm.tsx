import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react'
import { Button, Card, Col, Spinner } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from "uuid";
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { Ushqimi } from '../../../app/models/ushqimi';

export default observer(function UshqimiForm() {
    const history = useHistory();
    const { ushqimiStore } = useStore();
    const { createUshqimi, updateUshqimi, loading, loadUshqimi, loadingInitial } = ushqimiStore;
    const { id } = useParams<{ id: string }>();

    const [ushqimi, setUshqimi] = useState({
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
        if (id) loadUshqimi(id).then(ushqimi => setUshqimi(ushqimi!))
    }, [id, loadUshqimi]);


    function handleFormSubmit(ushqimi: Ushqimi){
        if (ushqimi.id.length === 0) {
            let newUshqimi = {
                ...ushqimi,
                id: uuid()
            };
            createUshqimi(newUshqimi).then(() => history.push(`/ushqimet/${newUshqimi.id}`))
        }else{
            updateUshqimi(ushqimi).then(() => history.push(`/ushqimet/${ushqimi.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Card border='primary' style={{marginTop: '6rem'}}>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={ushqimi}
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
                            <Link to='/ushqimet'>
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
