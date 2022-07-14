import { observer } from 'mobx-react-lite';
import React, { useState } from 'react'
import { Button, ButtonGroup, Card, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget';
import { useStore } from '../../app/stores/store';
import {BiTrash} from 'react-icons/bi';

export default observer(function ChangePhoto() {
    const { userStore, photoStore } = useStore();
    const { user } = userStore;
    const { uploadPhoto, uploading, deletePhoto } = photoStore;
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    function handlePhotoUpload(file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    return (
        <>
            {addPhotoMode ? (
                <PhotoUploadWidget setAddPhotoMode={setAddPhotoMode} uploadPhoto={handlePhotoUpload} loading={uploading} />
            ) : (
                <Container>
                    <Card className='mt-4'>
                        <Row>
                            <Col style={{ marginTop: '50px' }}>
                                <Image src={user?.image || '/assets/user.png'} style={{ width: '40%', height: '400px', marginLeft: '30%' }} rounded />
                            </Col>
                        </Row>
                        <Row>
                            <div className='d-flex justify-content-center gap-2 mt-3' style={{ marginBottom: '50px' }}>
                                <Link to='/home'>
                                    <Button variant='warning'>
                                        Cancel
                                    </Button>
                                </Link>
                                <ButtonGroup>
                                    <Button variant='warning' onClick={() => setAddPhotoMode(!addPhotoMode)}>
                                        Change Photo
                                    </Button>
                                    <Button onClick={deletePhoto} variant='danger'>
                                        <BiTrash />
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </Row>
                    </Card>
                </Container>
            )}
        </>
    )
})
