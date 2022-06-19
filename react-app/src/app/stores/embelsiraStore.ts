import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Embelsira } from "../models/embelsira";

export default class EmbelsiraStore{
    embelsiraRegistry = new Map<string, Embelsira>();
    selectedEmbelsira: Embelsira | undefined = undefined;
    editMode = false;
    loading = true;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get embelsiratByCmimi(){
        return Array.from(this.embelsiraRegistry.values()).sort((a,b) => 
        a.cmimi - b.cmimi);
    }

    private setEmbelsira = (embelsira: Embelsira) => {
        this.embelsiraRegistry.set(embelsira.id, embelsira);
    }

    private getEmbelsira = (id: string) => {
        return this.embelsiraRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadEmbelsirat = async () => {
        this.setLoadingInitial(true);
        try {
            const embelsirat = await agent.Embelsirat.list();
            embelsirat.forEach(embelsira => {
                this.setEmbelsira(embelsira);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadEmbelsira = async (id: string) => {
        let embelsira = this.getEmbelsira(id);
        if(embelsira) {
            this.selectedEmbelsira = embelsira;
            return embelsira;
        }else{
            this.loadingInitial = true;
            try {
                embelsira = await agent.Embelsirat.details(id);
                this.setEmbelsira(embelsira);
                runInAction(() => {
                    this.selectedEmbelsira = embelsira;
                })
                this.setLoadingInitial(false);
                return embelsira;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    createEmbelsira = async (embelsira: Embelsira) => {
        this.loading = false;
        try {
            await agent.Embelsirat.create(embelsira);
            runInAction(() => {
                this.embelsiraRegistry.set(embelsira.id, embelsira);
                this.selectedEmbelsira = embelsira;
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

    updateEmbelsira = async (embelsira: Embelsira) => {
        this.loading = false;
        try {
            await agent.Embelsirat.update(embelsira);
            runInAction(() => {
                this.embelsiraRegistry.set(embelsira.id, embelsira);
                this.selectedEmbelsira = embelsira;
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

    deleteEmbelsira = async (id: string) => {
        window.location.reload();
        try {
            await agent.Embelsirat.delete(id);
            runInAction(() => {
                this.embelsiraRegistry.delete(id);
            })
        } catch (error) {
            console.log(error);
        }
    }
}