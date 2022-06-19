import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Contact } from "../models/contact";

export default class ContactStore {
    contactRegistry = new Map<string, Contact>();
    editMode = false;
    loading = true;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get contacts() {
        return Array.from(this.contactRegistry.values());
    }

    private setContact = (contact: Contact) => {
        this.contactRegistry.set(contact.id, contact);
    }

    private getContact = (id: string) => {
        return this.contactRegistry.get(id);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    loadContacts = async () => {
        this.setLoadingInitial(true);
        try {
            const contacts = await agent.Contacts.list();
            contacts.forEach(contact => {
                this.setContact(contact);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadContact = async (id: string) => {
        let contact = this.getContact(id);
        this.loadingInitial = true;
        try {
            contact = await agent.Contacts.details(id);
            this.setContact(contact);
            this.setLoadingInitial(false);
            return contact;
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    createContact = async (contact: Contact) => {
        this.loading = false;
        try {
            await agent.Contacts.create(contact);
            runInAction(() => {
                this.contactRegistry.set(contact.id, contact);
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

    updateContact = async (contact: Contact) => {
        this.loading = false;
        try {
            await agent.Contacts.update(contact);
            runInAction(() => {
                this.contactRegistry.set(contact.id, contact);
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

    deleteContact = async (id: string) => {
        window.location.reload();
        try {
            await agent.Contacts.delete(id);
            runInAction(() => {
                this.contactRegistry.delete(id);
            })
        } catch (error) {
            console.log(error);
        }
    }
}