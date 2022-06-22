import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Banka } from "../models/banka";

export default class BankaStore {
    bankaRegistry = new Map<number, Banka>();
    loading = true;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get bankat() {
        return Array.from(this.bankaRegistry.values());
    }

    private setBanka = (banka: Banka) => {
        this.bankaRegistry.set(banka.bankaId!, banka);
    }

    private getBanka = (bankaId: number) => {
        return this.bankaRegistry.get(bankaId);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadBankat = async () => {
        this.setLoadingInitial(true);
        try {
            const bankat = await agent.Bankat.list();
            bankat.forEach(banka => {
                this.setBanka(banka);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadBanka = async (bankaId: number) => {
        let banka = this.getBanka(bankaId);
        this.loadingInitial = true;
        try {
            banka = await agent.Bankat.details(bankaId);
            this.setBanka(banka);
            this.setLoadingInitial(false);
            return banka;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }



    createBanka = async (banka: Banka) => {
        this.loading = false;
        try {
            await agent.Bankat.create(banka);
            runInAction(() => {
                this.bankaRegistry.set(banka.bankaId!, banka);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }


    updateBanka = async (banka: Banka) => {
        this.loading = false;
        try {
            await agent.Bankat.update(banka);
            runInAction(() => {
                this.bankaRegistry.set(banka.bankaId!, banka);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    deleteBanka = async (bankaId: number) => {
        window.location.reload();
        try {
            await agent.Bankat.delete(bankaId);
            runInAction(() => {
                this.bankaRegistry.delete(bankaId);
            })
        } catch (error) {
            console.log(error);
        }
    }
}