import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Button, Card, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function PijeDetail() {

    const{pijeStore} = useStore();
    const {selectedPije: pije, loadPije, loadingInitial} = pijeStore;
    const{id} = useParams<{id: string}>();

    useEffect(() => {
        if(id) loadPije(id);
      }, [id, loadPije]);

      if (loadingInitial || !pije) return <LoadingComponent />;
  return (
    <Col md={{ span: 4, offset: 4 }}>
    <Card border='primary' style={{marginTop: '85px'}}>
        <Card.Img style={{height: '200px'}} variant="top" src={`/assets/${pije.emri}.jpg`} />
        <Card.Body>
            <Card.Title>{pije.emri}</Card.Title>
            <Card.Text>
                    {pije.perberesit}
                    <br></br>
                    {pije.cmimi}$
            </Card.Text>
            <div className='d-flex flex-row justify-content-center gap-2'>
                <Link to={`/managePije/${pije.id}`}>
                    <Button variant='outline-primary'>
                        Edit
                    </Button>
                </Link>
                <Link to='/pijet'>
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
