import { observer } from "mobx-react-lite";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useStore } from "../../../app/stores/store";

export default observer(function ReviewTable() {

    const { reviewStore } = useStore();
    const { reviews, deleteReview } = reviewStore;

    return (
        <Table striped bordered hover style={{ marginTop: '20px' }}>
            <thead>
                <tr style={{ background: 'white' }}>
                    <th>Emri</th>
                    <th>Username</th>
                    <th>Mesazhi</th>
                    <th>Rating Value</th>
                    <th style={{display: 'flex', justifyContent: 'center'}}>
                        <Link to='/createReview'>
                            <Button variant='outline-primary'>
                                Create
                            </Button>
                        </Link>
                    </th>
                </tr>
            </thead>
            <tbody style={{ background: 'white' }}>
                {reviews.map(review => (
                    <tr key={review.id}>
                        <td>{review.user?.displayName}</td>
                        <td>{review.user?.username}</td>
                        <td>{review.mesazhi}</td>
                        <td>{review.ratingValue}</td>
                        <td>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                                <Button onClick={() => deleteReview(review.id!)} variant='outline-danger'>
                                    Delete
                                </Button>
                                <Link to={`/manageReview/${review.id}`}>
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