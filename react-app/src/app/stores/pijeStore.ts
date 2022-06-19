import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Pije } from "../models/pije";

export default class PijeStore{
    pijeRegistry = new Map<string, Pije>();
    selectedPije: Pije | undefined = undefined;
    editMode = false;
    loading = true;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    private setPije = (pije: Pije) => {
        this.pijeRegistry.set(pije.id, pije);
    }

    private getPije = (id: string) => {
        return this.pijeRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    get pijetByCmimi(){
        return Array.from(this.pijeRegistry.values()).sort((a,b) => a.cmimi - b.cmimi);
    }

    loadPijet = async () => {
        this.setLoadingInitial(true);
        try {
            const pijet = await agent.Pijet.list();
            pijet.forEach(pije => {
                this.setPije(pije);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadPije = async (id: string) => {
        let pije = this.getPije(id);
        if(pije) {
            this.selectedPije = pije;
            return pije;
        }else{
            this.loadingInitial = true;
            try {
                pije = await agent.Pijet.details(id);
                this.setPije(pije);
                runInAction(() => {
                    this.selectedPije = pije;
                })
                this.setLoadingInitial(false);
                return pije;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    createPije = async (pije: Pije) => {
        this.loading = false;
        try {
            await agent.Pijet.create(pije);
            runInAction(() => {
                this.pijeRegistry.set(pije.id, pije);
                this.selectedPije = pije;
                this.editMode = false;
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    updatePije = async (pije: Pije) => {
        this.loading = false;
        try {
            await agent.Pijet.update(pije);
            runInAction(() => {
                this.pijeRegistry.set(pije.id, pije)
                this.selectedPije = pije;
                this.editMode = false;
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    deletePije = async (id: string) => {
        window.location.reload();
        try {
            await agent.Pijet.delete(id);
            runInAction(() => {
                this.pijeRegistry.delete(id);
            })
        } catch (error) {
            console.log(error);
        }
    }
}