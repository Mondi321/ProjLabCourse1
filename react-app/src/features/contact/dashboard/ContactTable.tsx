import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

export default observer(function ContactTable() {

    const { contactStore } = useStore();
    const { contacts, deleteContact } = contactStore;

    return (
        <Table striped bordered hover style={{ marginTop: '20px' }}>
            <thead>
                <tr style={{ background: 'white' }}>
                    <th>Emri</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Numri</th>
                    <th>Mesazhi</th>
                    <th></th>
                </tr>
            </thead>
            <tbody style={{ background: 'white' }}>
                {contacts.map(contact => (
                    <tr key={contact.id}>
                        <td>{contact.emri}</td>
                        <td>{contact.email}</td>
                        <td>{contact.subject}</td>
                        <td>{contact.numri}</td>
                        <td>{contact.mesazhi}</td>
                        <td>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                <Button onClick={() => deleteContact(contact.id)} variant='outline-danger'>
                                    Delete
                                </Button>
                                <Link to={`/manageContact/${contact.id}`}>
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
