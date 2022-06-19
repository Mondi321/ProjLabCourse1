import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import EmbelsiraList from './EmbelsiraList';

export default observer(function EmbelsiraDashboard() {

    const { embelsiraStore } = useStore();
    const { loadEmbelsirat, embelsiraRegistry } = embelsiraStore;

    useEffect(() => {
        if (embelsiraRegistry.size <= 1) loadEmbelsirat();
    }, [embelsiraRegistry.size, loadEmbelsirat])


    if (embelsiraStore.loadingInitial) return <LoadingComponent />

    return (
        <Container style={{ marginTop: '90px' }}>
            <Row md={2}>
                <EmbelsiraList />
            </Row>
        </Container>
    )
})
