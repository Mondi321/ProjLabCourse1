import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

export default observer(function StafiTable() {

    const { stafiStore } = useStore();
    const { stafis, deleteStafi } = stafiStore;

    return (
        <Table striped bordered hover style={{ marginTop: '20px' }}>
            <thead>
                <tr style={{ background: 'white' }}>
                    <th>Emri</th>
                    <th>Mbiemri</th>
                    <th>Detyra</th>
                    <th>Shteti</th>
                    <th>Qyteti</th>
                    <th>Gjinia</th>
                    <th>Banka</th>
                    <th>Adresa</th>
                    <th>Data e lindjes</th>
                    <th style={{ display: 'flex', justifyContent: 'center' }}>
                        <Link to='/createStafi'>
                            <Button variant='outline-primary'>
                                Create
                            </Button>
                        </Link>
                    </th>
                </tr>
            </thead>
            <tbody style={{ background: 'white' }}>
                {stafis.map(stafi => (
                    <tr key={stafi.stafiId}>
                        <td>{stafi.emri}</td>
                        <td>{stafi.mbiemri}</td>
                        <td>{stafi.detyra}</td>
                        <td>{stafi.shteti?.emri}</td>
                        <td>{stafi.qyteti?.emri}</td>
                        <td>{stafi.gjinia?.gjiniaE}</td>
                        <td>{stafi.banka?.emri}</td>
                        <td>{stafi.adresa}</td>
                        <td>{stafi.dataLindjes}</td>
                        <td>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                <Button onClick={() => deleteStafi(stafi.stafiId!)} variant='outline-danger'>
                                    Delete
                                </Button>
                                <Link to={`/manageStafi/${stafi.stafiId}`}>
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
