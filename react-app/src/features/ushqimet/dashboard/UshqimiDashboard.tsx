import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {  Container, Row } from "react-bootstrap";
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
    <Container style={{marginTop: '90px'}}>
      <Row md={2}>
        <UshqimiList />
      </Row>
    </Container>
  )
})
