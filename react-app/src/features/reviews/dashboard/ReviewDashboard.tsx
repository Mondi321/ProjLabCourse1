import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ReviewTable from "./ReviewTable";

export default observer(function ReviewDashboard() {

    const { reviewStore } = useStore();
    const { loadReviews } = reviewStore;

    useEffect(() => {
        loadReviews();
    }, [loadReviews])


    if (reviewStore.loadingInitial) return <LoadingComponent />

    return (
        <ReviewTable />
    )
})