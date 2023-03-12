import { Profile } from "./profile";

export interface BusRide {
    id: string;
    departure: string;
    destination: string;
    departureDate: Date | null;
    returnDate: Date | null;
    passengerNumber: string;
    cost: string;
    description: string;
    baggage: string;
    baggageCost: string;
    driverUsername: string;
    isCancelled: boolean;
    isGoing:boolean;
    isDriver: boolean;
    driver?: Profile;
    attendees: Profile[];
}

export class BusRide implements BusRide {
  constructor(init?: BusRideFormValues) {
    Object.assign(this, init);
  }
}

export class BusRideFormValues {
  id?: string = undefined;
  departure: string = '';
  destination: string = '';
  departureDate: Date | null = null;
  returnDate: Date | null = null;
  passengerNumber: string = '';
  cost: string = '';
  description: string = '';
  baggage: string = '';
  baggageCost: string = '';

  constructor(ride?: BusRideFormValues) {
    if (ride) {
      this.id = ride.id;
      this.departure = ride.departure;
      this.destination = ride.destination;
      this.departureDate = ride.departureDate;
      this.returnDate = ride.returnDate;
      this.passengerNumber = ride.passengerNumber;
      this.cost = ride.cost;
      this.description = ride.description;
      this.baggage = ride.baggage;
      this.baggageCost = ride.baggageCost;
    }
  }
}