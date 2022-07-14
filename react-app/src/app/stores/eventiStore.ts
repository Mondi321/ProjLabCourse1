import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Eventi } from "../models/eventi";

export default class EventiStore{
    eventiRegistry = new Map<string, Eventi>();
    selectedEventi: Eventi | undefined = undefined;
    loading = true;
    loadingInitial = false;

    constructor(){
        makeAutoObservable(this)
    }

    get eventet(){
        return Array.from(this.eventiRegistry.values());
    }

    loadEventet = async () => {
        this.setLoadingInitial(true);
        try {
            const eventet = await agent.Eventet.list();
            eventet.forEach(eventi => {
                this.setEventi(eventi);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadEventi = async (id: string) => {
        let eventi = this.getEventi(id);
        if(eventi) {
            this.selectedEventi = eventi;
            return eventi;
        }else{
            this.loadingInitial = true;
            try {
                eventi = await agent.Eventet.details(id);
                this.setEventi(eventi);
                runInAction(() => {
                    this.selectedEventi = eventi;
                })
                this.setLoadingInitial(false);
                return eventi;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }


    private setEventi = (eventi: Eventi) => {
        this.eventiRegistry.set(eventi.id, eventi);
    }

    private getEventi = (id: string) => {
        return this.eventiRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }


    createEventi = async (eventi: Eventi) => {
        this.loading = false;
        try {
            await agent.Eventet.create(eventi);
            runInAction(() => {
                this.eventiRegistry.set(eventi.id, eventi);
                this.selectedEventi = eventi;
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    updateEventi = async (eventi: Eventi) => {
        this.loading = false;
        try {
            await agent.Eventet.update(eventi);
            runInAction(() => {
                this.eventiRegistry.set(eventi.id, eventi);
                this.selectedEventi = eventi;
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    deleteEventi = async (id: string) => {
        window.location.reload();
        try {
            await agent.Eventet.delete(id);
            runInAction(() => {
                this.eventiRegistry.delete(id);
            })
        } catch (error) {
            console.log(error);
        }
    }

}