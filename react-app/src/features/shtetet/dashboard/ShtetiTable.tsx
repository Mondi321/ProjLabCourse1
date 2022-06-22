import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

export default observer(function ShtetiTable() {

    const { shtetiStore } = useStore();
    const { shtetet, deleteShteti } = shtetiStore;

    return (
        <Table striped bordered hover style={{ marginTop: '20px' }}>
            <thead>
                <tr style={{ background: 'white' }}>
                    <th>Emri</th>
                    <th>Emri Postal</th>
                    <th style={{display: 'flex', justifyContent: 'center'}}>
                        <Link to='/createShteti'>
                            <Button variant='outline-primary'>
                                Create
                            </Button>
                        </Link>
                    </th>
                </tr>
            </thead>
            <tbody style={{ background: 'white' }}>
                {shtetet.map(shteti => (
                    <tr key={shteti.emri}>
                        <td>{shteti.emri}</td>
                        <td>{shteti.emriPostal}</td>
                        <td>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                <Button onClick={() => deleteShteti(shteti.shtetiId!)} variant='outline-danger'>
                                    Delete
                                </Button>
                                <Link to={`/manageShteti/${shteti.shtetiId}`}>
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
