import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import EventiList from "./EventiList";

export default observer(function EventiDashboard() {

    const { eventiStore } = useStore();
    const { loadEventet } = eventiStore;

    useEffect(() => {
        loadEventet();
    }, [loadEventet])


    if (eventiStore.loadingInitial) return <LoadingComponent />

    return (
        <Container style={{ marginTop: '90px' }}>
            <Row md={2}>
                <EventiList />
            </Row>
        </Container>
    )
})