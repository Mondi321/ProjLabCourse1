import { UserProfile } from "./userProfile";

export interface Review{
    id: string;
    mesazhi: string;
    ratingValue: number;
    appUserId?: string;
    user?: UserProfile;
}