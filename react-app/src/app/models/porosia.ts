import { UserProfile } from "./userProfile";

export interface PorosiaDetails{
    id?: string;
    ushqimiId?: string;
    pijeId?: string;
    embelsiraId?: string;
    porosiaId?: string;
    cmimiArtikullit: number;
    sasia?: number;
    emri: string;
}

export interface Porosia{
    id?: string;
    numriPorosise: string;
    metodaPageses: string;
    totali: number;
    appUserId?: string;
    user?: UserProfile;
    porosiaDetails: PorosiaDetails[]
}