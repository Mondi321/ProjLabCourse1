import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Porosia } from "../models/porosia";

export default class PorosiaStore{
    porosiaRegistry = new Map<string, Porosia>();
    loading = true;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get porosite() {
        return Array.from(this.porosiaRegistry.values());
    }

    private setPorosia = (porosia: Porosia) => {
        this.porosiaRegistry.set(porosia.id!, porosia);
    }

    private getPorosia = (id: string) => {
        return this.porosiaRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadPorosite = async () => {
        this.setLoadingInitial(true);
        try {
            const porosite = await agent.Porosite.list();
            porosite.forEach(porosia => {
                this.setPorosia(porosia);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }


    loadPorosia = async (id: string) => {
        let porosia = this.getPorosia(id);
        this.loadingInitial = true;
        try {
            porosia = await agent.Porosite.details(id);
            this.setPorosia(porosia);
            this.setLoadingInitial(false);
            return porosia;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }



    createPorosia = async (porosia: Porosia) => {
        this.loading = false;
        try {
            await agent.Porosite.create(porosia);
            runInAction(() => {
                this.porosiaRegistry.set(porosia.id!, porosia);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    updatePorosia = async (porosia: Porosia) => {
        this.loading = false;
        try {
            await agent.Porosite.update(porosia);
            runInAction(() => {
                this.porosiaRegistry.set(porosia.id!, porosia);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    deletePorosia = async (id: string) => {
        window.location.reload();
        try {
            await agent.Porosite.delete(id);
            runInAction(() => {
                this.porosiaRegistry.delete(id);
            })
        } catch (error) {
            console.log(error);
        }
    }
}