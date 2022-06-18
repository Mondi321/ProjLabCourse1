import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {  Col, Container, Row } from "react-bootstrap";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import UshqimiList from "./UshqimiList";

export default observer( function UshqimiDashboard() {

      const {ushqimiStore} = useStore();
      const{loadUshqimet, ushqimiRegistry} = ushqimiStore;

      useEffect(() => {
        if(ushqimiRegistry.size <= 1) loadUshqimet();
      }, [ushqimiRegistry.size, loadUshqimet])
    
      
      if (ushqimiStore.loadingInitial) return <LoadingComponent />
  return (
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2 }}>
          <UshqimiList/>
        </Col>
        <Col >
        </Col>
      </Row>
          
    </Container>
  )
})
