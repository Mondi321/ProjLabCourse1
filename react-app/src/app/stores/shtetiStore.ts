import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Shteti } from "../models/shteti";

export default class ShtetiStore {
    shtetiRegistry = new Map<number, Shteti>();
    loading = true;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get shtetet() {
        return Array.from(this.shtetiRegistry.values());
    }

    private setShteti = (shteti: Shteti) => {
        this.shtetiRegistry.set(shteti.shtetiId!, shteti);
    }

    private getShteti = (shtetiId: number) => {
        return this.shtetiRegistry.get(shtetiId);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadShtetet = async () => {
        this.setLoadingInitial(true);
        try {
            const shtetet = await agent.Shtetet.list();
            shtetet.forEach(shteti => {
                this.setShteti(shteti);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadShteti = async (shtetiId: number) => {
        let shteti = this.getShteti(shtetiId);
        this.loadingInitial = true;
        try {
            shteti = await agent.Shtetet.details(shtetiId);
            this.setShteti(shteti);
            this.setLoadingInitial(false);
            return shteti;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }



    createShteti = async (shteti: Shteti) => {
        this.loading = false;
        try {
            await agent.Shtetet.create(shteti);
            runInAction(() => {
                this.shtetiRegistry.set(shteti.shtetiId!, shteti);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    updateShteti = async (shteti: Shteti) => {
        this.loading = false;
        try {
            await agent.Shtetet.update(shteti);
            runInAction(() => {
                this.shtetiRegistry.set(shteti.shtetiId!, shteti);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    deleteShteti = async (shtetiId: number) => {
        window.location.reload();
        try {
            await agent.Shtetet.delete(shtetiId);
            runInAction(() => {
                this.shtetiRegistry.delete(shtetiId);
            })
        } catch (error) {
            console.log(error);
        }
    }
}
