import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store'


export default observer(function UshqimiDetail() {

    const {ushqimiStore} = useStore();
    const {selectedUshqimi: ushqimi, loadUshqimi, loadingInitial} = ushqimiStore;
    const{id} = useParams<{id: string}>();

    useEffect(() => {
      if(id) loadUshqimi(id);
    }, [id, loadUshqimi]);
    

    if (loadingInitial || !ushqimi) return <LoadingComponent />;
    return (
        <Col md={{ span: 4, offset: 4 }}>
            <Card border='primary' style={{marginTop: '85px'}}>
                <Card.Img style={{height: '200px'}} variant="top" src={`/assets/${ushqimi.emri}.jpg`} />
                <Card.Body>
                    <Card.Title>{ushqimi.emri}</Card.Title>
                    <Card.Text>
                            {ushqimi.perberesit}
                            <br></br>
                            {ushqimi.cmimi}$
                    </Card.Text>
                    <div className='d-flex flex-row justify-content-center gap-2'>
                        <Link to={`/manage/${ushqimi.id}`}>
                            <Button variant='outline-primary'>
                                Edit
                            </Button>
                        </Link>
                        <Link to='/ushqimet'>
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
