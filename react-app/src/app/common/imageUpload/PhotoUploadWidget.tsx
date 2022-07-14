import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import PhotoWidgetCropper from './PhotoWidgetCropper';
import PhotoWidgetDropzone from './PhotoWidgetDropzone';

interface Props {
    setAddPhotoMode: (addPhotoMode: boolean) => void;
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default observer(function PhotoUploadWidget({ setAddPhotoMode, loading, uploadPhoto }: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <Container>
            <Row style={{ marginTop: '40px' }}>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <Card.Title>1. Add Photo</Card.Title>
                            <PhotoWidgetDropzone setFiles={setFiles} />
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={{ offset: 1, span: 3 }}>
                    <Card style={{ height: 265 }}>
                        <Card.Body>
                            <Card.Title>2. Resize Image</Card.Title>
                            {files && files.length > 0 && (
                                <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                            )}
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={{ offset: 1, span: 3 }}>
                    <Card style={{ minHeight: 265 }}>
                        <Card.Body>
                            <Card.Title>3. Preview and Upload</Card.Title>
                            {files && files.length > 0 &&
                                <>
                                    <div className='img-preview' style={{ minHeight: 200, minWidth: '100%', overflow: 'hidden' }} />
                                    <ButtonGroup className='mt-1 d-flex'>
                                        <Button onClick={onCrop} variant="primary">
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="true"
                                                hidden={!loading}
                                            />
                                            Accept
                                        </Button>
                                        <Button disabled={loading} onClick={() => setFiles([])} variant="danger">Close</Button>
                                    </ButtonGroup>

                                </>
                            }
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 3, offset: 5 }} style={{ marginTop: '15px' }}>
                    <Button variant='warning' onClick={() => setAddPhotoMode(false)}>
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Container>
    )
})
