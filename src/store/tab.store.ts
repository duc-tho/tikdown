import { observable, action, makeAutoObservable } from 'mobx';

export class TabStore {
     @observable tab = '/';

     constructor() {
          makeAutoObservable(this)
      }

     @action.bound
     setTab = (newTab: string) => {
          this.tab = newTab;
     }
}