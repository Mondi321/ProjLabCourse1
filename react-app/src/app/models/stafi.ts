import { Qyteti } from './qyteti';
import {Shteti} from './shteti';
import {Gjinia} from './gjinia';
import {Banka} from './banka';

export interface Stafi{
    stafiId?: number;
    emri: string;
    mbiemri: string;
    detyra: string;
    shtetiId: string;
    shteti?: Shteti;
    qytetiId: number;
    qyteti?: Qyteti;
    gjiniaId: number;
    gjinia?: Gjinia;
    bankaId: number;
    banka?: Banka;
    adresa: string;
    dataLindjes: string;
}