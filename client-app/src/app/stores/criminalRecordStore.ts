import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { CriminalRecords, Records } from "../models/criminalRecord";
import { store } from "./store";

export default class CriminalRecordStore{
    record : CriminalRecords | null = null;
    upload = false;
    load = false;

    constructor(){
        makeAutoObservable(this);
    }

    uploadRecord = async (file: Blob) => {
        this.upload = true;
        try {
            const response = await agent.CriminalRecords.uploadPhoto(file);
            const photo = response.data;
            runInAction(()=>{
                if (this.record){
                    this.record?.photo?.push(photo);
                    if(store.userStore.user)  {
                        //store.userStore.setRecord(photo.url);
                        this.record.image = photo.url;
                    }}
                this.upload = false;
            } )
            }
         catch (error) {   
            console.log(error);
            runInAction(() => this.upload = false);
        }
    }

    deleteRecord = async (photo: Records) => {
        this.load = true;
        try {
            await agent.CriminalRecords.deletePhoto(photo.id);
            runInAction(() => {
                if (this.record) {
                    this.record.photo = this.record.photo?.filter(p => p.id !== photo.id);
                    this.load = false;
                }
            })
        } catch (error) {
            runInAction(() => this.load = false);
            console.log(error);
        }
    }

}
