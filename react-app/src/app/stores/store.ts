import { createContext, useContext } from "react";
import CommonStore from "./commonStore";
import ContactStore from "./contactStore";
import EmbelsiraStore from "./embelsiraStore";
import PijeStore from "./pijeStore";
import ShtetiStore from "./shtetiStore";
import UserStore from "./userStore";
import UshqimiStore from "./ushqimiStore";
import QytetiStore from "./qytetiStore";
import GjiniaStore from "./gjiniaStore";
import BankaStore from "./bankaStore";
import StafiStore from "./stafiStore";
import RezervimiStore from "./rezervimiStore";
import EventiStore from "./eventiStore";

interface Store{
    ushqimiStore: UshqimiStore;
    commonStore: CommonStore;
    userStore: UserStore;
    pijeStore: PijeStore;
    embelsiraStore: EmbelsiraStore;
    contactStore: ContactStore;
    shtetiStore : ShtetiStore;
    qytetiStore: QytetiStore;
    gjiniaStore: GjiniaStore;
    bankaStore: BankaStore;
    stafiStore: StafiStore;
    rezervimiStore: RezervimiStore;
    eventiStore: EventiStore;
}

export const store: Store ={
    ushqimiStore: new UshqimiStore(),
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    pijeStore: new PijeStore(),
    embelsiraStore: new EmbelsiraStore(),
    contactStore: new ContactStore(),
    shtetiStore: new ShtetiStore(),
    qytetiStore: new QytetiStore(),
    gjiniaStore: new GjiniaStore(),
    bankaStore: new BankaStore(),
    stafiStore: new StafiStore(),
    rezervimiStore: new RezervimiStore(),
    eventiStore: new EventiStore()
}

export const StoreContext = createContext(store);

export function useStore(){
    return useContext(StoreContext);
}