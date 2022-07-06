import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Banka } from "../models/banka";
import { Contact } from "../models/contact";
import { Embelsira } from "../models/embelsira";
import { Gjinia } from "../models/gjinia";
import { Pije } from "../models/pije";
import { Qyteti } from "../models/qyteti";
import { Shteti } from "../models/shteti";
import { User, UserFormValues } from "../models/user";
import { Ushqimi } from "../models/ushqimi";
import { Stafi } from "../models/stafi";
import { store } from "../stores/store";
import { Rezervimi } from "../models/rezervimi";
import { Eventi } from "../models/eventi";

const sleep =(delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5148/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) {
        if(config.headers){
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
})

axios.interceptors.response.use(async response => {
        await sleep(1000);
        return response;
}, (error: AxiosError) => {
    const {status, data, config}:any = error.response!;
    switch (status) {
        case 400:
            if (typeof data === 'string'){
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')){
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            } 
            break;
        case 401:
            toast.error('unathorized');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T> (url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Pijet = {
    list: () => requests.get<Pije[]>('/pije'),
    details: (id: string) => requests.get<Pije>(`/pije/${id}`),
    create: (pije: Pije) => requests.post<void>('/pije', pije),
    update: (pije: Pije) => requests.put<void>(`/pije/${pije.id}`, pije),
    delete: (id: string) => requests.delete<void>(`/pije/${id}`)
}

const Ushqimet ={
    list: () => requests.get<Ushqimi[]>('/ushqimi'),
    details: (id: string) => requests.get<Ushqimi>(`/ushqimi/${id}`),
    create: (ushqimi: Ushqimi) => requests.post<void>('/ushqimi', ushqimi),
    update: (ushqimi: Ushqimi) => requests.put<void>(`/ushqimi/${ushqimi.id}`, ushqimi),
    delete: (id: string) => requests.delete<void>(`/ushqimi/${id}`)
}

const Embelsirat = {
    list: () => requests.get<Embelsira[]>('/embelsira'),
    details: (id: string) => requests.get<Embelsira>(`/embelsira/${id}`),
    create: (embelsira: Embelsira) => requests.post<void>('/embelsira', embelsira),
    update: (embelsira: Embelsira) => requests.put<void>(`/embelsira/${embelsira.id}`, embelsira),
    delete: (id: string) => requests.delete<void>(`/embelsira/${id}`)
}

const Account ={
    current: () => requests.get<User>('/account'),
    login: (user: UserFormValues) => requests.post<User>('/account/login', user),
    register: (user: UserFormValues) => requests.post<User>('/account/register', user)
}

const Contacts = {
    list: () => requests.get<Contact[]>('/contact'),
    details: (id: string) => requests.get<Contact>(`/contact/${id}`),
    create: (contact: Contact) => requests.post<void>('/contact', contact),
    update: (contact: Contact) => requests.put<void>(`/contact/${contact.id}`, contact),
    delete: (id: string) => requests.delete<void>(`/contact/${id}`)
}

const Shtetet = {
    list: () => requests.get<Shteti[]>('/shteti'),
    details: (id: number) => requests.get<Shteti>(`/shteti/${id}`),
    create: (shteti: Shteti) => requests.post<void>('/shteti', shteti),
    update: (shteti: Shteti) => requests.put<void>(`/shteti/${shteti.shtetiId}`, shteti),
    delete: (id: number) => requests.delete<void>(`/shteti/${id}`)
}

const Qytetet = {
    list: () => requests.get<Qyteti[]>('/qyteti'),
    details: (id: number) => requests.get<Qyteti>(`/qyteti/qytetiid/${id}`),
    listByShteti: (id: string) => requests.get<Qyteti[]>(`/qyteti/${id}`),
    create: (qyteti: Qyteti) => requests.post<void>('/qyteti', qyteti),
    update: (qyteti: Qyteti) => requests.put<void>(`/qyteti/${qyteti.qytetiId}`, qyteti),
    delete: (id: number) => requests.delete<void>(`/qyteti/${id}`)
}

const Gjinite = {
    list: () => requests.get<Gjinia[]>('/gjinia'),
    details: (id: number) => requests.get<Gjinia>(`/gjinia/${id}`),
    create: (gjinia: Gjinia) => requests.post<void>('/gjinia', gjinia),
    update: (gjinia: Gjinia) => requests.put<void>(`/gjinia/${gjinia.gjiniaId}`, gjinia),
    delete: (id: number) => requests.delete<void>(`/gjinia/${id}`)
}

const Bankat = {
    list: () => requests.get<Banka[]>('/banka'),
    details: (id: number) => requests.get<Banka>(`/banka/${id}`),
    create: (banka: Banka) => requests.post<void>('/banka', banka),
    update: (banka: Banka) => requests.put<void>(`/banka/${banka.bankaId}`, banka),
    delete: (id: number) => requests.delete<void>(`/banka/${id}`)
}

const Stafis = {
    list: () => requests.get<Stafi[]>('/stafi'),
    details: (id: number) => requests.get<Stafi>(`/stafi/${id}`),
    create: (stafi: Stafi) => requests.post<void>('/stafi', stafi),
    update: (stafi: Stafi) => requests.put<void>(`/stafi/${stafi.stafiId}`, stafi),
    delete: (id: number) => requests.delete<void>(`/stafi/${id}`)
}

const Rezervimet = {
    list: () => requests.get<Rezervimi[]>('/rezervimi'),
    details: (id: string) => requests.get<Rezervimi>(`/rezervimi/${id}`),
    create: (rezervimi: Rezervimi) => requests.post<void>('/rezervimi', rezervimi),
    update: (rezervimi: Rezervimi) => requests.put<void>(`/rezervimi/${rezervimi.id}`, rezervimi),
    delete: (id: string) => requests.delete<void>(`/rezervimi/${id}`)
}

const Eventet = {
    list: () => requests.get<Eventi[]>('/eventi'),
    details: (id: string) => requests.get<Eventi>(`/eventi/${id}`),
    create: (eventi: Eventi) => requests.post<void>('/eventi', eventi),
    update: (eventi: Eventi) => requests.put<void>(`/eventi/${eventi.id}`, eventi),
    delete: (id: string) => requests.delete<void>(`/eventi/${id}`)
}

const agent ={
    Ushqimet,
    Account,
    Pijet,
    Embelsirat,
    Contacts,
    Shtetet,
    Qytetet,
    Gjinite,
    Bankat,
    Stafis,
    Rezervimet,
    Eventet
}

export default agent;