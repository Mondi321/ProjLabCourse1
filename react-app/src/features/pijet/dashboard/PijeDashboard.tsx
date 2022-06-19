import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import PijeList from './PijeList'

export default observer(function PijeDashboard() {
    
    const {pijeStore} = useStore();
    const {loadPijet, pijeRegistry} = pijeStore;

    useEffect(() => {
      if (pijeRegistry.size <= 1) loadPijet();
    }, [pijeRegistry.size,loadPijet])
    
    if (pijeStore.loadingInitial) return <LoadingComponent />
    return (
        <Container style={{ marginTop: '90px' }}>
            <Row md={2}>
                <PijeList />
            </Row>
        </Container>
    )
})
