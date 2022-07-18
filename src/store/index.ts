import { createContext, useContext } from "react";
import { OverlayStore } from "./overlay.store";
import { TabStore } from "./tab.store";


export const store = {
     tabStore: new TabStore(),
     overlayStore: new OverlayStore()
};

export type TStore = typeof store;
const StoreContext = createContext<null | TStore>(null);

export const Provider = StoreContext.Provider;

export function useStore() {
     const store = useContext(StoreContext);

     if (store === null)
          throw new Error("Store cannot be null, please add a context provider");
     
     return store;
}