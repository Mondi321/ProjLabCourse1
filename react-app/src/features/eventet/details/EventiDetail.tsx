import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Card, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";

export default observer(function EventiDetail() {

    const { eventiStore } = useStore();
    const { selectedEventi: eventi, loadEventi, loadingInitial } = eventiStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadEventi(id);
    }, [id, loadEventi]);


    if (loadingInitial || !eventi) return <LoadingComponent />;

    return (
        <Col md={{ span: 4, offset: 4 }}>
            <Card border='primary' style={{ marginTop: '85px' }}>
                <Card.Img style={{ height: '200px' }} variant="top" src='/assets/event-birthday.jpg' />
                <Card.Body>
                    <Card.Title>{eventi.titulli}</Card.Title>
                    <Card.Text>
                        {eventi.pershkrimi}
                        <br></br>
                        {eventi.cmimi}$
                    </Card.Text>
                    <div className='d-flex flex-row justify-content-center gap-2'>
                        <Link to={`/manageEventi/${eventi.id}`}>
                            <Button variant='outline-primary'>
                                Edit
                            </Button>
                        </Link>
                        <Link to='/eventet'>
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