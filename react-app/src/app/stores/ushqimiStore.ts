import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Ushqimi } from "../models/ushqimi";

export default class UshqimiStore{
    ushqimiRegistry = new Map<string, Ushqimi>();
    selectedUshqimi: Ushqimi | undefined = undefined;
    editMode = false;
    loading = true;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get ushqimetByCmimi(){
        return Array.from(this.ushqimiRegistry.values()).sort((a,b) => 
        a.cmimi - b.cmimi);
    }

    loadUshqimet = async () => {
        this.setLoadingInitial(true);
        try {
            const ushqimet = await agent.Ushqimet.list();
            ushqimet.forEach(ushqimi => {
                this.setUshqimi(ushqimi);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadUshqimi = async (id: string) => {
        let ushqimi = this.getUshqimi(id);
        if(ushqimi) {
            this.selectedUshqimi = ushqimi;
            return ushqimi;
        }else{
            this.loadingInitial = true;
            try {
                ushqimi = await agent.Ushqimet.details(id);
                this.setUshqimi(ushqimi);
                runInAction(() => {
                    this.selectedUshqimi = ushqimi;
                })
                this.setLoadingInitial(false);
                return ushqimi;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }


    private setUshqimi = (ushqimi: Ushqimi) => {
        this.ushqimiRegistry.set(ushqimi.id, ushqimi);
    }

    private getUshqimi = (id: string) => {
        return this.ushqimiRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createUshqimi = async (ushqimi: Ushqimi) => {
        this.loading = false;
        try {
            await agent.Ushqimet.create(ushqimi);
            runInAction(() => {
                this.ushqimiRegistry.set(ushqimi.id, ushqimi);
                this.selectedUshqimi = ushqimi;
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

    updateUshqimi = async (ushqimi: Ushqimi) => {
        this.loading = false;
        try {
            await agent.Ushqimet.update(ushqimi);
            runInAction(() => {
                this.ushqimiRegistry.set(ushqimi.id, ushqimi)
                this.selectedUshqimi = ushqimi;
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

    deleteUshqimi = async (id: string) => {
        window.location.reload();
        try {
            await agent.Ushqimet.delete(id);
            runInAction(() => {
                this.ushqimiRegistry.delete(id);
            })
        } catch (error) {
            console.log(error);
        }
    }

}