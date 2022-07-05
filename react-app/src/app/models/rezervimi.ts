import { UserProfile } from "./userProfile";

export interface Rezervimi{
    id: string;
    data: string;
    nrPersonave: string;
    mesazhi: string;
    appUserId?: string;
    user?: UserProfile;
}