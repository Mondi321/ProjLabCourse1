import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ContactStore from "./contactStore";
import EmbelsiraStore from "./embelsiraStore";
import PijeStore from "./pijeStore";
import UserStore from "./userStore";
import UshqimiStore from "./ushqimiStore";

interface Store{
    ushqimiStore: UshqimiStore;
    commonStore: CommonStore;
    userStore: UserStore;
    pijeStore: PijeStore;
    embelsiraStore: EmbelsiraStore;
    contactStore: ContactStore;
}

export const store: Store ={
    ushqimiStore: new UshqimiStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    pijeStore: new PijeStore(),
    embelsiraStore: new EmbelsiraStore(),
    contactStore: new ContactStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}