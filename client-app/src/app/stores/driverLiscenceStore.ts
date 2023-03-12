import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { DriverLiscence, Liscence } from '../models/driverLiscence';
import { store } from "./store";

export default class DriverliscenceStore{
    liscence : DriverLiscence | null = null;
    uploading = false;
    loading = false;

    constructor(){
        makeAutoObservable(this);
    }

    uploadLiscence = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.DriverLiscences.uploadPhoto(file);
            const photo = response.data;
            console.log(photo);
            runInAction(()=>{
                if (this.liscence){
                    this.liscence.photo?.push(photo);
                    if(store.userStore.user)  {
                        //store.userStore.setLiscence(photo);
                        this.liscence.image= photo.url;
                        console.log(this.liscence.photo);
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
                if (this.liscence) {
                    this.liscence.photo = this.liscence.photo?.filter(p => p.id !== photo.id);
                    this.loading = false;
                }
            })
        } catch (error) {
            runInAction(() => this.loading = false);
            console.log(error);
        }
    }
}
