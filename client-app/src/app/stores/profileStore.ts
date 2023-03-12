import { makeAutoObservable, reaction, runInAction } from "mobx";
import agent from "../api/agent";
import { Liscence } from "../models/driverLiscence";
import { Photo, Profile, Records, UserRide } from "../models/profile";
import { store } from "./store";

export default class ProfileStore {
    profile: Profile | null = null;
    loadingProfile = false;
    uploading = false;
    loading = false;
    followings: Profile[] = [];
    loadingFollowings = false;
    activeTab = 0;
    userRides: UserRide[] = [];
    loadingRides = false;
    //liscence?: Liscence | null;

    constructor() {
        makeAutoObservable(this);

        reaction(
            () => this.activeTab,
            activeTab => {
                if (activeTab === 3 || activeTab === 4) {
                    const predicate = activeTab === 3 ? 'followers' : 'following';
                    this.loadFollowings(predicate);
                } else {
                    this.followings = [];
                }
            }
        )
    }

    setActiveTab = (activeTab: any) => {
        this.activeTab = activeTab;
    }

    get isCurrentUser() {
        if (store.userStore.user && this.profile) {
            return store.userStore.user.username === this.profile.username;
        }
        return false;
    }

    loadProfile = async (username?: string) => {
        this.loadingProfile = true;
        try {
            const profile = await agent.Profiles.get(username);
            runInAction(() => {
                this.profile = profile;
                this.loadingProfile = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loadingProfile = false);
        }
    }

    uploadPhoto = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.Profiles.uploadPhoto(file);
            const photo = response.data;
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos?.push(photo);
                    if (photo.isMain && store.userStore.user) {
                        store.userStore.setImage(photo.url);
                        this.profile.image = photo.url;
                    }
                }
                this.uploading = false;
            })
        } catch (error) {   
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }

    setMainPhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.setMainPhoto(photo.id);
            store.userStore.setImage(photo.url);
            runInAction(() => {
                if (this.profile && this.profile.photos) {
                    this.profile.photos.find(p => p.isMain)!.isMain = false;
                    this.profile.photos.find(p => p.id === photo.id)!.isMain = true;
                    this.profile.image = photo.url;
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);
        }
    }

    deletePhoto = async (photo: Photo) => {
        this.loading = true;
        try {
            await agent.Profiles.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.photos = this.profile.photos?.filter(p => p.id !== photo.id);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);
        }
    }

    updateProfile = async (profile: Partial<Profile>) => {
        this.loading = true;
        try {
            await agent.Profiles.updateProfile(profile);
            runInAction(() => {
                if (profile.displayName && profile.displayName !== store.userStore.user?.displayName) {
                    store.userStore.setDisplayName(profile.displayName);
                }
                this.profile = {...this.profile, ...profile as Profile};
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    updateFollowing = async (username: string, following: boolean) => {
        this.loading = true;
        try {
            await agent.Profiles.updateFollowing(username);
            store.rideStore.updateAttendeeFollowing(username);
            runInAction(() => {
                if (this.profile && this.profile.username !== store.userStore.user?.username && this.profile.username === username) {
                    following ? this.profile.followersCount++ : this.profile.followersCount--;
                    this.profile.following = !this.profile.following;
                }
                if (this.profile && this.profile.username === store.userStore.user?.username) {
                    following ? this.profile.followingCount++ : this.profile.followingCount--;
                }
                this.followings.forEach(profile => {
                    if (profile.username === username) {
                        profile.following ? profile.followersCount-- : profile.followersCount++;
                        profile.following = !profile.following;
                    }
                })
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.loading = false);
        }
    }

    loadFollowings = async (predicate: string) => {
        this.loadingFollowings = true;
        try {
            const followings = await agent.Profiles.listFollowings(this.profile!.username, predicate);
            runInAction(() => {
                this.followings = followings;
                this.loadingFollowings = false;
            })
        } catch (error) {
            runInAction(() => this.loadingFollowings = false);
        }
    }

    loadUserRides = async (username: string, predicate?: string) => {
        this.loadingRides = true;
        try {
            const rides = await agent.Profiles.listRides(username, predicate!);
            runInAction(() => {
                this.userRides = rides;
                this.loadingRides = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loadingRides = false;
            })
        }
    }
    uploadLiscence = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.DriverLiscences.uploadPhoto(file);
            const photo = response.data;
            console.log(photo);
            runInAction(()=>{
                if (this.profile){
                    this.profile.driverLiscences?.push(photo);
                    if(store.userStore.user)  {
                        //store.userStore.setLiscence(photo);
                }}
                
                this.uploading = false;
            } )
            }
         catch (error) {   
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }
    deleteLiscence = async (photo: Liscence) => {
        this.loading = true;
        try {
            await agent.DriverLiscences.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.driverLiscences = this.profile.driverLiscences?.filter(p => p.id !== photo.id);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);
        }
    }
    uploadRecord = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.CriminalRecords.uploadPhoto(file);
            const photo = response.data;
            runInAction(()=>{
                if (this.profile){
                    this.profile.criminalRecords?.push(photo);
                    if(store.userStore.user)  {
                        //store.userStore.setRecord(photo);
                        
                    }}
                this.uploading = false;
            } )
            }
         catch (error) {   
            console.log(error);
            runInAction(() => this.uploading = false);
        }
    }
    deleteRecord = async (photo: Records) => {
        this.loading = true;
        try {
            await agent.CriminalRecords.deletePhoto(photo.id);
            runInAction(() => {
                if (this.profile) {
                    this.profile.criminalRecords = this.profile.criminalRecords?.filter(p => p.id !== photo.id);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);
        }
    }
}