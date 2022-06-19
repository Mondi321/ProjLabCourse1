import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Button, Card, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function EmbelsiraDetail() {

    const { embelsiraStore } = useStore();
    const { selectedEmbelsira: embelsira, loadEmbelsira, loadingInitial } = embelsiraStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadEmbelsira(id);
    }, [id, loadEmbelsira]);


    if (loadingInitial || !embelsira) return <LoadingComponent />;

    return (
        <Col md={{ span: 4, offset: 4 }}>
            <Card border='primary' style={{ marginTop: '85px' }}>
                <Card.Img style={{ height: '200px' }} variant="top" src={`/assets/${embelsira.emri}.jpg`} />
                <Card.Body>
                    <Card.Title>{embelsira.emri}</Card.Title>
                    <Card.Text>
                        {embelsira.perberesit}
                        <br></br>
                        {embelsira.cmimi}$
                    </Card.Text>
                    <div className='d-flex flex-row justify-content-center gap-2'>
                        <Link to={`/manageEmbelsira/${embelsira.id}`}>
                            <Button variant='outline-primary'>
                                Edit
                            </Button>
                        </Link>
                        <Link to='/embelsirat'>
                            <Button variant='outline-secondary'>
                                Cancel
                            </Button>
                        </Link>
                    </div>

                </Card.Body>
            </Card>
        </Col>
    )
})
