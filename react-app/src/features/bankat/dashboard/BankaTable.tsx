import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

export default observer(function BankaTable() {

    const { bankaStore } = useStore();
    const { bankat, deleteBanka } = bankaStore;

    return (
        <Table striped bordered hover style={{ marginTop: '20px' }}>
            <thead>
                <tr style={{ background: 'white' }}>
                    <th>Emri bankes</th>
                    <th style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to='/createBanka'>
                            <Button variant='outline-primary'>
                                Create
                            </Button>
                        </Link>
                    </th>
                </tr>
            </thead>
            <tbody style={{ background: 'white' }}>
                {bankat.map(banka => (
                    <tr key={banka.emri}>
                        <td>{banka.emri}</td>
                        <td>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                <Button onClick={() => deleteBanka(banka.bankaId!)} variant='outline-danger'>
                                    Delete
                                </Button>
                                <Link to={`/manageBanka/${banka.bankaId}`}>
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
