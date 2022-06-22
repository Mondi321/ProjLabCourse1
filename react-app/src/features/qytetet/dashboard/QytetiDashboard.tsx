import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import QytetiTable from './QytetiTable';

export default observer(function QytetiDashboard() {

    const { qytetiStore } = useStore();
    const { qytetiRegistry, loadQytetet } = qytetiStore;

    useEffect(() => {
        if (qytetiRegistry.size <= 1) loadQytetet();
    }, [qytetiRegistry.size, loadQytetet])


    if (qytetiStore.loadingInitial) return <LoadingComponent />

    return (
        <QytetiTable />
    )
})
