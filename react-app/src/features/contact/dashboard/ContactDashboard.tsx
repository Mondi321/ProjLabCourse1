import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import ContactTable from './ContactTable';

export default observer(function ContactDashboard() {

    const {contactStore} = useStore();
    const {contactRegistry, loadContacts} = contactStore;

    useEffect(() => {
        if(contactRegistry.size <= 1) loadContacts();
      }, [contactRegistry.size, loadContacts])
    
      
      if (contactStore.loadingInitial) return <LoadingComponent />

    return (
        <ContactTable />
    )
})
