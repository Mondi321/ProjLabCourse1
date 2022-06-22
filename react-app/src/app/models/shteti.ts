import { Qyteti } from "./qyteti";

export interface Shteti{
    shtetiId?: number;
    emri: string;
    emriPostal: string;
    qytetet?: Qyteti[]
}