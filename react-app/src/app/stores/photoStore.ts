import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { store } from "./store";

export default class PhotoStore{
    uploading = false;

    constructor(){
        makeAutoObservable(this);
    }

    uploadPhoto = async (file: Blob) => {
        this.uploading = true;
        try {
            const response = await agent.Photos.upload(file);
            const photo = response.data;
            runInAction(() => {
                if (store.userStore.user){
                    store.userStore.user.photo = photo;
                    store.userStore.user.image = photo.url;
                }
                this.uploading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => this.uploading = false)
        }
    }

    deletePhoto = async () => {
        window.location.reload();
        try {
            await agent.Photos.delete();
            if(store.userStore.user) store.userStore.user.image = undefined;
        } catch (error) {
            console.log(error);
        }
    }
}