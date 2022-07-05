import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Stafi } from "../models/stafi";

export default class StafiStore {
    stafiRegistry = new Map<number, Stafi>();
    loading = true;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get stafis() {
        return Array.from(this.stafiRegistry.values());
    }

    private setStafi = (stafi: Stafi) => {
        this.stafiRegistry.set(stafi.stafiId!, stafi);
    }

    private getStafi = (stafiId: number) => {
        return this.stafiRegistry.get(stafiId);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadStafis = async () => {
        this.setLoadingInitial(true);
        try {
            const stafis = await agent.Stafis.list();
            stafis.forEach(stafi => {
                this.setStafi(stafi);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadStafi = async (stafiId: number) => {
        let stafi = this.getStafi(stafiId);
        this.loadingInitial = true;
        try {
            stafi = await agent.Stafis.details(stafiId);
            this.setStafi(stafi);
            this.setLoadingInitial(false);
            return stafi;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }



    createStafi = async (stafi: Stafi) => {
        this.loading = false;
        try {
            await agent.Stafis.create(stafi);
            runInAction(() => {
                // this.setStafi(stafi);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    updateStafi = async (stafi: Stafi) => {
        this.loading = false;
        try {
            await agent.Stafis.update(stafi);
            runInAction(() => {
                this.stafiRegistry.set(stafi.stafiId!, stafi);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    deleteStafi = async (stafiId: number) => {
        window.location.reload();
        try {
            await agent.Stafis.delete(stafiId);
            runInAction(() => {
                this.stafiRegistry.delete(stafiId);
            })
        } catch (error) {
            console.log(error);
        }
    }
}
