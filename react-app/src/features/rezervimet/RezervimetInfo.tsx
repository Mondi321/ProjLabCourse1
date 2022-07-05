import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import './rezervimiInfo.css';

export default function RezervimetInfo() {
    const { userStore } = useStore();
    const { user } = userStore;

    return (
        <div className="rezervimetInfo">
            <div className="rezervimetInfoFoto">
                <img src="/assets/rezervimi.jpg" alt="" />
            </div>
            <div className="rezervimetInfoPermbajtja">
                <div className="rezervimetInfoPermbajtjaTable">
                    <h2>Rezervimet</h2>
                    <Table variant='warning' bordered hover size="sm" className='rezervimetInfoTable'>
                        <thead>
                            <tr>
                                <th>Data</th>
                                <th>Nr. Personave</th>
                                <th>Mesazhi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.rezervimet?.map(rezervimi => (
                                <tr key={rezervimi.id}>
                                    <td>{rezervimi.data}</td>
                                    <td>{rezervimi.nrPersonave}</td>
                                    <td>{rezervimi.mesazhi}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Link to='/home'>
                        <Button variant='warning' className='rezervimetInfoPermbajtjaButton'>
                            Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
