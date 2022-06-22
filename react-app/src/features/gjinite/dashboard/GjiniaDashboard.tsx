import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import GjiniaTable from './GjiniaTable';

export default observer(function GjiniaDashboard() {

    const { gjiniaStore } = useStore();
    const { gjiniaRegistry, loadGjinite } = gjiniaStore;

    useEffect(() => {
        if (gjiniaRegistry.size <= 1) loadGjinite();
    }, [gjiniaRegistry.size, loadGjinite])


    if (gjiniaStore.loadingInitial) return <LoadingComponent />

    return (
        <GjiniaTable />
    )
})
