import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';
import * as Yup from 'yup';
import { Stafi } from '../../../app/models/stafi';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Button, Card, Col, Spinner } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';
import MyTextInput from '../../../app/common/form/MyTextInput';

export default observer(function StafiForm() {

    const history = useHistory();
    const { stafiStore, shtetiStore, qytetiStore, gjiniaStore, bankaStore } = useStore();
    const { createStafi, updateStafi, loading, loadStafi, loadingInitial } = stafiStore;
    const { shtetet, loadShtetet } = shtetiStore;
    const { qytetetArray, loadQytetetByShtetiId } = qytetiStore;
    const { gjinite, loadGjinite } = gjiniaStore;
    const { bankat, loadBankat } = bankaStore;
    const { id } = useParams<{ id: undefined }>();

    const [isDisabled, setIsDisabled] = useState(true);
    const [shtetiId, setShtetiId] = useState('');


    const [stafi, setStafi] = useState({
        emri: '',
        mbiemri: '',
        detyra: '',
        shtetiId: shtetiId,
        qytetiId: 0,
        gjiniaId: 0,
        bankaId: 0,
        adresa: '',
        dataLindjes: ''
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required('Emri eshte i zbrazet!'),
        mbiemri: Yup.string().required('Mbiemri eshte i zbrazet!'),
        detyra: Yup.string().required('Detyra eshte i zbrazet!'),
        adresa: Yup.string().required('Adresa eshte i zbrazet!'),
        dataLindjes: Yup.string().required('Data Lindjes eshte i zbrazet!')
    })

    useEffect(() => {
        if (id) {
            loadStafi(id).then(stafi => {setStafi(stafi!)
            setShtetiId(stafi!.shtetiId)});
            setIsDisabled(false);
        }
    }, [id, loadStafi]);

    useEffect(() => {
        loadShtetet();
    }, [loadShtetet])

    useEffect(() => {
        loadQytetetByShtetiId(shtetiId);
    }, [loadQytetetByShtetiId, shtetiId])

    useEffect(() => {
        loadGjinite();
    }, [loadGjinite])

    useEffect(() => {
        loadBankat();
    }, [loadBankat])

    function handleFormSubmit(stafi: Stafi) {
        if (id) {
            updateStafi(stafi).then(() => history.push('/stafi'))
        } else {
            createStafi(stafi).then(() => history.push('/stafi'))
        }
    }


    if (loadingInitial) return <LoadingComponent />

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Card border='primary' style={{ marginTop: '1rem' }}>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={stafi}
                    onSubmit={(values) => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty, handleChange }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off' className='m-2'>
                            <MyTextInput name='emri' placeholder='Emri' />
                            <MyTextInput name='mbiemri' placeholder='Mbiemri' />
                            <MyTextInput name='detyra' placeholder='Detyra' />
                            <Field as="select" name="shtetiId" className='form-select mt-3 mb-3' onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                const getShtetiId = e.target.value;
                                setShtetiId(getShtetiId);


                                if (getShtetiId === '') {
                                    setIsDisabled(true);
                                }
                                else {
                                    setIsDisabled(false);
                                }
                                handleChange(e);
                            }}>
                                <option value=''>Shteti</option>
                                {shtetet.map(shteti => (
                                    <option key={shteti.shtetiId} value={shteti.shtetiId}>{shteti.emri}</option>
                                ))}
                            </Field>
                            <Field as="select" name="qytetiId" className='form-select mt-3 mb-3' disabled={isDisabled}>
                                <option value=''>Qyteti</option>
                                {qytetetArray.map(qyteti => (
                                    <option key={qyteti.qytetiId} value={qyteti.qytetiId}>{qyteti.emri}</option>
                                ))}
                            </Field>
                            <Field as="select" name="gjiniaId" className='form-select mt-3 mb-3'>
                                <option value=''>Gjinia</option>
                                {gjinite.map(gjinia => (
                                    <option key={gjinia.gjiniaId} value={gjinia.gjiniaId}>{gjinia.gjiniaE}</option>
                                ))}
                            </Field>
                            <Field as="select" name="bankaId" className='form-select mt-3 '>
                                <option value=''>Banka</option>
                                {bankat.map(banka => (
                                    <option key={banka.bankaId} value={banka.bankaId}>{banka.emri}</option>
                                ))}
                            </Field>
                            <MyTextInput name='adresa' placeholder='Adresa' />
                            <Field type='date' name="dataLindjes" className='form-control' />

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
                            <Link to='/stafi'>
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
