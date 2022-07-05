import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import RezervimiTable from "./RezervimiTable";

export default observer(function RezervimiDashboard() {

    const { rezervimiStore } = useStore();
    const { loadRezervimet } = rezervimiStore;

    useEffect(() => {
        loadRezervimet();
    }, [loadRezervimet])


    if (rezervimiStore.loadingInitial) return <LoadingComponent />

    return (
        <RezervimiTable />
    )
})