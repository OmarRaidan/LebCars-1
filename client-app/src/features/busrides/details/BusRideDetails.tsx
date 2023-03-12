import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import RideDetailedChat from "../../rides/details/RideDetailedChat";
import BusRideHeader from "./BusRideHeader";
import BusRideInfo from "./BusRideInfo";
import BusRideSidebar from "./BusRideSidebar";


export default observer(function RideDetails() {

    const { busStore } = useStore();
    const { selectedRide: ride, loadRide, loadingInitial, clearSelectedRide } = busStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadRide(id);
        return () => clearSelectedRide();
    }, [id, loadRide, clearSelectedRide]);

    if (loadingInitial || !ride) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <BusRideHeader ride={ride} />
                <BusRideInfo ride={ride} />
                
            </Grid.Column>
            <Grid.Column width={6}>
                <BusRideSidebar ride={ride}/>
            </Grid.Column>
        </Grid>
    )
})