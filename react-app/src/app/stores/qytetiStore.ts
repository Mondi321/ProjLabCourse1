import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Qyteti } from "../models/qyteti";

export default class QytetiStore {
    qytetiRegistry = new Map<number, Qyteti>();
    loading = true;
    loadingInitial = false;
    qytetetArray: Qyteti[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    get qytetet() {
        return Array.from(this.qytetiRegistry.values());
    }

    private setQyteti = (qyteti: Qyteti) => {
        this.qytetiRegistry.set(qyteti.qytetiId!, qyteti);
    }

    private getQyteti = (qytetiId: number) => {
        return this.qytetiRegistry.get(qytetiId);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadQytetet = async () => {
        this.setLoadingInitial(true);
        try {
            const qytetet = await agent.Qytetet.list();
            qytetet.forEach(qyteti => {
                this.setQyteti(qyteti);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }
    
    loadQytetetByShtetiId = async (id: string) => {
        this.setLoadingInitial(true);
        try {
            const qytetet = await agent.Qytetet.listByShteti(id);
            runInAction(() => {
                this.qytetetArray = qytetet;
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadQyteti = async (qytetiId: number) => {
        let qyteti = this.getQyteti(qytetiId);
        this.loadingInitial = true;
        try {
            qyteti = await agent.Qytetet.details(qytetiId);
            this.setQyteti(qyteti);
            this.setLoadingInitial(false);
            return qyteti;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }



    createQyteti = async (qyteti: Qyteti) => {
        this.loading = false;
        try {
            await agent.Qytetet.create(qyteti);
            runInAction(() => {
                this.qytetiRegistry.set(qyteti.qytetiId!, qyteti);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }


    updateQyteti = async (qyteti: Qyteti) => {
        this.loading = false;
        try {
            await agent.Qytetet.update(qyteti);
            runInAction(() => {
                this.qytetiRegistry.set(qyteti.qytetiId!, qyteti);
                this.loading = true;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = true;
            })
        }
    }

    deleteQyteti = async (qytetiId: number) => {
        window.location.reload();
        try {
            await agent.Qytetet.delete(qytetiId);
            runInAction(() => {
                this.qytetiRegistry.delete(qytetiId);
            })
        } catch (error) {
            console.log(error);
        }
    }
}