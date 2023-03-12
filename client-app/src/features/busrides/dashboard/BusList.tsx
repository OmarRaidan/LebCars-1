import { observer } from "mobx-react-lite";
import React, { Fragment } from "react";
import { Header } from "semantic-ui-react";
import { BusRide } from "../../../app/models/busRide";
import { useStore } from "../../../app/stores/store";
import BusListItem from "./BusListItem";


interface Props {
    search: string;
  }

export default observer(function BusList({ search }: Props) {
    const { busStore } = useStore();
    const { groupedRides } = busStore;

    if (search === '') {
        return (
            <>
                {groupedRides.map(([group, rides]) => (
                    <Fragment key={group}>
                        <Header sub color='teal'>
                            {group}
                        </Header>
                        {rides.map(ride => (
                            <BusListItem key={ride.id} ride={ride} />
                        ))}
                    </Fragment>
                ))}
            </>
        )
    }

    else { 

        let filteredRides: BusRide[];

        return (
            <>
                {groupedRides.map(([group, rides]) => (
                    <Fragment key={group}>
                        <Header sub color='teal'>
                            {group}
                        </Header>
                        {filteredRides = rides.filter(ride => ride.departure.toLocaleLowerCase() === search)}
                        {filteredRides.map(ride => (
                            <BusListItem key={ride.id} ride={ride} />
                        ))}
                    </Fragment>
                ))}
            </>
        )

    }

    
})

