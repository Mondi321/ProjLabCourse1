import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Gjinia } from "../models/gjinia";

export default class GjiniaStore {
    gjiniaRegistry = new Map<number, Gjinia>();
    loading = true;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get gjinite() {
        return Array.from(this.gjiniaRegistry.values());
    }

    private setGjinia = (gjinia: Gjinia) => {
        this.gjiniaRegistry.set(gjinia.gjiniaId!, gjinia);
    }

    private getGjinia = (gjiniaId: number) => {
        return this.gjiniaRegistry.get(gjiniaId);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadGjinite = async () => {
        this.setLoadingInitial(true);
        try {
            const gjinite = await agent.Gjinite.list();
            gjinite.forEach(gjinia => {
                this.setGjinia(gjinia);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadGjinia = async (gjiniaId: number) => {
        let gjinia = this.getGjinia(gjiniaId);
        this.loadingInitial = true;
        try {
            gjinia = await agent.Gjinite.details(gjiniaId);
            this.setGjinia(gjinia);
            this.setLoadingInitial(false);
            return gjinia;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }



    createGjinia = async (gjinia: Gjinia) => {
        this.loading = false;
        try {
            await agent.Gjinite.create(gjinia);
            runInAction(() => {
                this.gjiniaRegistry.set(gjinia.gjiniaId!, gjinia);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }


    updateGjinia = async (gjinia: Gjinia) => {
        this.loading = false;
        try {
            await agent.Gjinite.update(gjinia);
            runInAction(() => {
                this.gjiniaRegistry.set(gjinia.gjiniaId!, gjinia);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    deleteGjinia = async (gjiniaId: number) => {
        window.location.reload();
        try {
            await agent.Gjinite.delete(gjiniaId);
            runInAction(() => {
                this.gjiniaRegistry.delete(gjiniaId);
            })
        } catch (error) {
            console.log(error);
        }
    }
}