import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

export default observer(function PijeList() {

    const {pijeStore} = useStore(); 
    const {pijetByCmimi, deletePije} = pijeStore; 

    return (
        <>
            {pijetByCmimi.map(pije => (
                <Card key={pije.id} border='primary' style={{ width: '548px', margin: '5px' }}>
                    <Card.Body>
                        <Card.Title>
                            {pije.emri}
                        </Card.Title>
                        <Card.Text>
                            Perberesit: {pije.perberesit}
                            <br></br>
                            Cmimi: {pije.cmimi}$
                        </Card.Text>
                        <Link to={`/pijet/${pije.id}`}>
                            <Button className='float-end'>
                                Shiko Pijen
                            </Button>
                        </Link>
                        <Button onClick={() => deletePije(pije.id)} variant='danger' className='float-end' style={{ marginRight: '10px' }}>
                            Delete
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </>
    )
})
