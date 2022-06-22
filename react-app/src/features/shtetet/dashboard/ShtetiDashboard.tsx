import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ShtetiTable from './ShtetiTable';

export default observer(function ShtetiDashboard() {

    const { shtetiStore } = useStore();
    const { shtetiRegistry, loadShtetet } = shtetiStore;

    useEffect(() => {
        if (shtetiRegistry.size <= 1) loadShtetet();
    }, [shtetiRegistry.size, loadShtetet])


    if (shtetiStore.loadingInitial) return <LoadingComponent />


    return (
        <ShtetiTable />
    )
})
