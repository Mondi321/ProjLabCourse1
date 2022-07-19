import React, { useEffect } from 'react'
import { Button, ButtonGroup, Col, Form, Row } from 'react-bootstrap';
import { AiFillHome } from 'react-icons/ai';
import { Porosia } from '../../app/models/porosia';
import { useStore } from '../../app/stores/store';
import { Link, useHistory } from 'react-router-dom';

interface Props {
    values: Porosia
    setValues: (value: Porosia) => void;
}

export default function PorosiaForm({ values, setValues }: Props) {

    const { porosiaStore, commonStore } = useStore();
    const { createPorosia } = porosiaStore;
    const history = useHistory();
    const { setModalShow } = commonStore;


    const handlePaymentChange = (e: any) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    useEffect(() => {
        let total = values.porosiaDetails.reduce((tempTotal, item) => {
            return tempTotal + (item.sasia! * item.cmimiArtikullit)
        }, 0);
        setValues({
            ...values,
            totali: total
        })
    }, [JSON.stringify(values.porosiaDetails)])

    const submitOrder = (e: any) => {
        e.preventDefault();
        createPorosia(values).then(() => {
            if (window.confirm('Would you like to write a review?')) {
                history.push(`/home`);
                setModalShow(true);
            }
            else {
                history.push('/home');
                alert('Thank you for you order!');
            }
        });
    }

    return (

        <Form onSubmit={submitOrder}>
            <Row className='mb-5'>
                <Col md={2}>
                    <Form.Group >
                        <Form.Label>Order Number</Form.Label>
                        <Form.Control type="text" value={'#' + values.numriPorosise} disabled />
                    </Form.Group>
                </Col>
                <Col md={{ span: 3, offset: 1 }}>
                    <Form.Label>Payment Method</Form.Label>
                    <Form.Select name='metodaPageses' onChange={handlePaymentChange} >
                        <option value='none'>Select</option>
                        <option value='Cash'>Cash</option>
                        <option value='Card'>Card</option>
                    </Form.Select>
                </Col>
                <Col md={{ span: 2, offset: 1 }}>
                    <Form.Group >
                        <Form.Label>Totali</Form.Label>
                        <Form.Control type="text" disabled value={'$' + values.totali} />
                    </Form.Group>
                </Col>
                <Col md={{ offset: 1 }} style={{ alignSelf: 'flex-end' }}>
                    <ButtonGroup>
                        <Button type='submit' variant='warning'>
                            Submit
                        </Button>
                        <Link to='/home'>
                            <Button variant='secondary'>
                                <AiFillHome />
                            </Button>
                        </Link>
                    </ButtonGroup>
                </Col>
            </Row>
        </Form>

    )
}
