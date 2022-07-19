import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import './porosiaInfo.css';

export default function Porosite() {
    const { userStore } = useStore();
    const { user } = userStore;

    return (
        <div className="porositeInfo">
            <div className="porositeInfoFoto">
                <img src="/assets/rezervimi.jpg" alt="" />
            </div>
            <div className="porositeInfoPermbajtja">
                <div className="porositeInfoPermbajtjaTable">
                    <h2>Porosite</h2>
                    <Table variant='warning' bordered hover size="sm" className='porositeInfoTable'>
                        <thead>
                            <tr>
                                <th>Nr. Porosise</th>
                                <th>Metoda Pageses</th>
                                <th>Totali</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user?.porosite?.map(porosia => (
                                <tr key={porosia.id}>
                                    <td>{porosia.numriPorosise}</td>
                                    <td>{porosia.metodaPageses}</td>
                                    <td>{porosia.totali}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Link to='/home'>
                        <Button variant='warning' className='porositeInfoPermbajtjaButton'>
                            Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
