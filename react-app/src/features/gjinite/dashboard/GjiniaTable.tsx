import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

export default observer(function GjiniaTable() {

    const { gjiniaStore } = useStore();
    const { gjinite, deleteGjinia } = gjiniaStore;

    return (
        <Table striped bordered hover style={{ marginTop: '20px' }}>
            <thead>
                <tr style={{ background: 'white' }}>
                    <th>Gjinite</th>
                    <th style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to='/createGjinia'>
                            <Button variant='outline-primary'>
                                Create
                            </Button>
                        </Link>
                    </th>
                </tr>
            </thead>
            <tbody style={{ background: 'white' }}>
                {gjinite.map(gjinia => (
                    <tr key={gjinia.gjiniaId}>
                        <td>{gjinia.gjiniaE}</td>
                        <td>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                <Button onClick={() => deleteGjinia(gjinia.gjiniaId!)} variant='outline-danger'>
                                    Delete
                                </Button>
                                <Link to={`/manageGjinia/${gjinia.gjiniaId}`}>
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
