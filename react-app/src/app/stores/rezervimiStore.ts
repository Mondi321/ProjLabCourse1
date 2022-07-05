import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Rezervimi } from "../models/rezervimi";

export default class RezervimiStore{
    rezervimiRegistry = new Map<string, Rezervimi>();
    loading = true;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get rezervimet() {
        return Array.from(this.rezervimiRegistry.values());
    }

    private setRezervimi = (rezervimi: Rezervimi) => {
        this.rezervimiRegistry.set(rezervimi.id!, rezervimi);
    }

    private getRezervimi = (rezervimiId: string) => {
        return this.rezervimiRegistry.get(rezervimiId);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadRezervimet = async () => {
        this.setLoadingInitial(true);
        try {
            const rezervimet = await agent.Rezervimet.list();
            rezervimet.forEach(rezervimi => {
                this.setRezervimi(rezervimi);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }


    loadRezervimi = async (rezervimiId: string) => {
        let rezervimi = this.getRezervimi(rezervimiId);
        this.loadingInitial = true;
        try {
            rezervimi = await agent.Rezervimet.details(rezervimiId);
            this.setRezervimi(rezervimi);
            this.setLoadingInitial(false);
            return rezervimi;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }



    createRezervimi = async (rezervimi: Rezervimi) => {
        this.loading = false;
        try {
            await agent.Rezervimet.create(rezervimi);
            runInAction(() => {
                this.rezervimiRegistry.set(rezervimi.id!, rezervimi);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    updateRezervimi = async (rezervimi: Rezervimi) => {
        this.loading = false;
        try {
            await agent.Rezervimet.update(rezervimi);
            runInAction(() => {
                this.rezervimiRegistry.set(rezervimi.id!, rezervimi);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    deleteRezervimi = async (rezervimiId: string) => {
        window.location.reload();
        try {
            await agent.Rezervimet.delete(rezervimiId);
            runInAction(() => {
                this.rezervimiRegistry.delete(rezervimiId);
            })
        } catch (error) {
            console.log(error);
        }
    }
}