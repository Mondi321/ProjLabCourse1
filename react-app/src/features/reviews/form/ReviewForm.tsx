import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useStore } from "../../../app/stores/store";
import * as Yup from 'yup';
import {v4 as uuid} from 'uuid';
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { Button, Card, Col, Spinner } from "react-bootstrap";
import { Form, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Review } from "../../../app/models/review";

export default observer(function ReviewForm() {
    const history = useHistory();
    const { reviewStore } = useStore();
    const { createReview, updateReview, loading, loadReview, loadingInitial } = reviewStore;
    const { id } = useParams<{ id: string }>();

    const [review, setReview] = useState({
        id: '',
        mesazhi: '',
        ratingValue: 0
    });

    const validationSchema = Yup.object({
        mesazhi: Yup.string().required('Mesazhi eshte i zbrazet!'),
        ratingValue: Yup.number().required('Numri i personave eshte i zbrazet!')
    })

    useEffect(() => {
        if (id) loadReview(id).then(review => setReview(review!))
    }, [id, loadReview]);


    function handleFormSubmit(review: Review){
        if (review.id.length === 0) {
            let newReview = {
                ...review,
                id: uuid()
            };
            createReview(newReview).then(() => history.push(`/reviews`))
        }else{
            updateReview(review).then(() => history.push(`/reviews`))
        }
    }

    if (loadingInitial) return <LoadingComponent />

    return (
        <Col md={{ span: 6, offset: 3 }}>
            <Card border='primary' style={{marginTop: '6rem'}}>
                <Formik
                    validationSchema={validationSchema}
                    enableReinitialize
                    initialValues={review}
                    onSubmit={(values) => handleFormSubmit(values)}>
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form onSubmit={handleSubmit} autoComplete='off' className='m-2'>
                            <MyTextInput name='mesazhi' placeholder='Mesazhi' />
                            <MyTextInput name='ratingValue' placeholder='Rating Value' />

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
                            <Link to='/reviews'>
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