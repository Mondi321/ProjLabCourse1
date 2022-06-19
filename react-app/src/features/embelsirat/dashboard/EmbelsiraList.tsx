import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

export default observer(function EmbelsiraList() {

    const { embelsiraStore } = useStore();
    const { embelsiratByCmimi, deleteEmbelsira } = embelsiraStore;

    return (
        <>
            {embelsiratByCmimi.map(embelsira => (
                <Card key={embelsira.id} border='primary' style={{ width: '548px', margin: '5px' }}>
                    <Card.Body>
                        <Card.Title>
                            {embelsira.emri}
                        </Card.Title>
                        <Card.Text>
                            Perberesit: {embelsira.perberesit}
                            <br></br>
                            Cmimi: {embelsira.cmimi}$
                        </Card.Text>
                        <Link to={`/embelsirat/${embelsira.id}`}>
                            <Button className='float-end'>
                                Shiko Embelsiren
                            </Button>
                        </Link>
                        <Button onClick={() => deleteEmbelsira(embelsira.id)} variant='danger' className='float-end' style={{ marginRight: '10px' }}>
                            Delete
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </>
    )
})
