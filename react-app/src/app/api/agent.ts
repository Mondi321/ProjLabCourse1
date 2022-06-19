import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { Contact } from "../models/contact";
import { Embelsira } from "../models/embelsira";
import { Pije } from "../models/pije";
import { User, UserFormValues } from "../models/user";
import { Ushqimi } from "../models/ushqimi";
import { store } from "../stores/store";

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

const agent ={
    Ushqimet,
    Account,
    Pijet,
    Embelsirat,
    Contacts
}

export default agent;