import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

export default observer (function UshqimiList() {

    const {ushqimiStore} = useStore(); 
    const {ushqimetByCmimi, deleteUshqimi} = ushqimiStore;  
  return (
    <Col className='mt-4'>
        {ushqimetByCmimi.map(ushqimi => (
            <Card key={ushqimi.id} border = 'primary'>
                <Card.Body>
                    <Card.Title>
                        {ushqimi.emri}
                    </Card.Title>
                    <Card.Text>
                            Perberesit: {ushqimi.perberesit}
                            <br></br>
                            Cmimi: {ushqimi.cmimi}$
                    </Card.Text>
                    <Link to={`/ushqimet/${ushqimi.id}`}>
                        <Button className='float-end'>
                            Shiko Ushqimin
                        </Button>
                    </Link>
                    <Button onClick={() => deleteUshqimi(ushqimi.id)} variant='danger' className='float-end' style={{marginRight: '10px'}}>
                        Delete
                    </Button>
                </Card.Body>
            </Card>
        ))}
    </Col>
  )
})
