import { createContext, useContext } from "react";
import RideStore from "./rideStore";
import CommonStore from "./commonStore";
import CommentStore from "./commentStore";
import ModalStore from "./modelStore";
import UserStore from "./userStore";
import ProfileStore from "./profileStore";
import RatingStore from "./ratingStore";
import BusStore from "./busStore";
import driverLiscenceStore from "./driverLiscenceStore";
import criminalRecordStore from "./criminalRecordStore";


interface Store {
    rideStore: RideStore;
    busStore: BusStore;
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    commentStore: CommentStore;
    ratingStore: RatingStore;
    driverLiscenceStore: driverLiscenceStore;
    criminalRecordStore: criminalRecordStore;
}

export const store: Store = {
    rideStore: new RideStore(),
    busStore: new BusStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    profileStore: new ProfileStore(),
    commentStore: new CommentStore(),
    ratingStore: new RatingStore(),
    driverLiscenceStore: new driverLiscenceStore(),
    criminalRecordStore: new criminalRecordStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}