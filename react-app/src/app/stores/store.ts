import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import UshqimiStore from "./ushqimiStore";

interface Store{
    ushqimiStore: UshqimiStore;
    commonStore: CommonStore;
    userStore: UserStore;
}

export const store: Store ={
    ushqimiStore: new UshqimiStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}