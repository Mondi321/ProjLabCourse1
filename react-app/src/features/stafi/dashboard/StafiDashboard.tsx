import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import StafiTable from './StafiTable';

export default observer(function StafiDashboard() {

    const { stafiStore } = useStore();
    const {  loadStafis } = stafiStore;

    useEffect(() => {
        loadStafis();
    }, [ loadStafis])


    if (stafiStore.loadingInitial) return <LoadingComponent />

  return (
        <StafiTable />
  )
})
