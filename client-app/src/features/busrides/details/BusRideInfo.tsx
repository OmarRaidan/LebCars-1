import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { FaCar, FaSuitcase } from "react-icons/fa";
import { AiOutlineFieldNumber } from "react-icons/ai";
import { BusRide } from '../../../app/models/busRide';

interface Props {
    ride: BusRide
}

export default observer(function RideDetailedInfo({ ride }: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <p>{ride.description}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>
                          Departure: {format(ride.departureDate!, 'dd MMM yyyy h:mm aa')} <br /> 
                          Return: {format(ride.departureDate!, 'dd MMM yyyy h:mm aa')}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>Departure:{ride.departure} <br /> Destination: {ride.destination}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='dollar sign' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>Cost: {ride.cost}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='users' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>Number Of Passengers:{ride.passengerNumber}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <FaCar size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>
                          Car Model: {ride.driver?.carModel}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <AiOutlineFieldNumber size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>
                          Car Number: {ride.driver?.carNumber}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='dollar sign' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>
                          Cost Per Baggage: {ride.baggageCost}
                        </span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <FaSuitcase size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={11}>
                    {(ride.baggage === 'true') ? (
                        <span>Baggages are allowed</span>
                    ) : (
                        <span>Baggages are not allowed</span>
                    )}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})