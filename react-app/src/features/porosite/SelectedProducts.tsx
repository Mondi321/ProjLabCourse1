import React from 'react'
import { Button, ButtonGroup, Card, Col, ListGroup, Row } from 'react-bootstrap'
import { Porosia } from '../../app/models/porosia';
import { AiFillDelete } from 'react-icons/ai';

interface Props {
    values: Porosia;
    setValues: (value: Porosia) => void;
}

export default function SelectedProducts({  values, setValues }: Props) {

    const updateSasine = (index: any, value: any) => {
        let x = { ...values };
        let artikulli = x.porosiaDetails[index];
        if (artikulli.sasia + value > 0) {
            artikulli.sasia += value;
            setValues({ ...x })
        }
    }

    const removeArtikujte = (index:any, id:any) => {
        let x = {...values};
        x.porosiaDetails = x.porosiaDetails.filter((_, i) => i !== index);
        setValues({...x})
    }

    let selectedProducts = values.porosiaDetails;

    return (
        <Row className='mt-5'>
            <Col md={{ span: 6, offset: 3 }}>
                <Card>
                    <ListGroup variant="flush">
                        {selectedProducts.map((product, index) => (
                            <ListGroup.Item key={index}>
                                {product.emri}
                                <ButtonGroup style={{marginLeft: '15px'}}>
                                    <Button onClick={e => updateSasine(index, -1)} variant='warning'>-</Button>
                                    <Button variant='secondary' disabled>{product.sasia}</Button>
                                    <Button onClick={e => updateSasine(index, 1)} variant='warning'>+</Button>
                                </ButtonGroup>
                                <span>
                                    {'$' + product.sasia! * product.cmimiArtikullit}
                                </span>
                                <AiFillDelete onClick={e => removeArtikujte(index, product.id)} style={{ float: 'right' ,color:'darkred', marginTop:'10px'}} className='deleteSelectedArtikull' />
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card>
            </Col>
        </Row>

    )
}
