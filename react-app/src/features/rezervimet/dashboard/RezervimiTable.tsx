import { observer } from "mobx-react-lite";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

export default observer(function RezervimiTable() {

    const { rezervimiStore } = useStore();
    const { rezervimet, deleteRezervimi } = rezervimiStore;

    return (
        <Table striped bordered hover style={{ marginTop: '20px' }}>
            <thead>
                <tr style={{ background: 'white' }}>
                    <th>Emri rezervuesit</th>
                    <th>Username</th>
                    <th>Nr. personave</th>
                    <th>Data</th>
                    <th>Mesazhi</th>
                    <th style={{display: 'flex', justifyContent: 'center'}}>
                        <Link to='/createRezervimi'>
                            <Button variant='outline-primary'>
                                Create
                            </Button>
                        </Link>
                    </th>
                </tr>
            </thead>
            <tbody style={{ background: 'white' }}>
                {rezervimet.map(rezervimi => (
                    <tr key={rezervimi.id}>
                        <td>{rezervimi.user?.displayName}</td>
                        <td>{rezervimi.user?.username}</td>
                        <td>{rezervimi.nrPersonave}</td>
                        <td>{rezervimi.data}</td>
                        <td>{rezervimi.mesazhi}</td>
                        <td>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                <Button onClick={() => deleteRezervimi(rezervimi.id!)} variant='outline-danger'>
                                    Delete
                                </Button>
                                <Link to={`/manageRezervimi/${rezervimi.id}`}>
                                    <Button variant='outline-warning'>
                                        Edit
                                    </Button>
                                </Link>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
})