import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import BankaTable from './BankaTable';

export default observer(function BankaDashboard() {

    const { bankaStore } = useStore();
    const { bankaRegistry, loadBankat } = bankaStore;

    useEffect(() => {
        if (bankaRegistry.size <= 1) loadBankat();
    }, [bankaRegistry.size, loadBankat])


    if (bankaStore.loadingInitial) return <LoadingComponent />

  return (
        <BankaTable />
  )
})
