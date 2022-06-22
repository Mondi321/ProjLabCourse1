import { observer } from 'mobx-react-lite'
import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

export default observer(function QytetiTable() {

    const { qytetiStore } = useStore();
    const { qytetet, deleteQyteti } = qytetiStore;


    return (
        <Table striped bordered hover style={{ marginTop: '20px' }}>
            <thead>
                <tr style={{ background: 'white' }}>
                    <th>Emri</th>
                    <th>Shteti Id</th>
                    <th style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to='/createQyteti'>
                            <Button variant='outline-primary'>
                                Create
                            </Button>
                        </Link>
                    </th>
                </tr>
            </thead>
            <tbody style={{ background: 'white' }}>
                {qytetet.map(qyteti => (
                    <tr key={qyteti.emri}>
                        <td>{qyteti.emri}</td>
                        <td>{qyteti.shtetiId}</td>
                        <td>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                <Button onClick={() => deleteQyteti(qyteti.qytetiId!)} variant='outline-danger'>
                                    Delete
                                </Button>
                                <Link to={`/manageQyteti/${qyteti.qytetiId}`}>
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
