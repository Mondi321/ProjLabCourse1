import { observer } from "mobx-react-lite";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

export default observer(function EventiList() {

    const { eventiStore } = useStore();
    const { eventet, deleteEventi } = eventiStore;

    return (
        <>
            {eventet.map(eventi => (
                <Card key={eventi.id} border='primary' style={{ width: '548px', margin: '5px' }}>
                    <Card.Body>
                        <Card.Title>
                            {eventi.titulli}
                        </Card.Title>
                        <Card.Text>
                            Pershkrimi: {eventi.pershkrimi}
                            <br></br>
                            Cmimi: {eventi.cmimi}$
                        </Card.Text>
                        <Link to={`/eventet/${eventi.id}`}>
                            <Button className='float-end'>
                                Shiko Eventin
                            </Button>
                        </Link>
                        <Button onClick={() => deleteEventi(eventi.id)} variant='danger' className='float-end' style={{ marginRight: '10px' }}>
                            Delete
                        </Button>
                    </Card.Body>
                </Card>
            ))}
        </>
    )
})