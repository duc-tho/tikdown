import { observable, action, makeAutoObservable } from 'mobx';

export class OverlayStore {
     @observable showOverlay = false;

     constructor() {
          makeAutoObservable(this)
      }

     @action
     setShowOverlay = (newVal: boolean) => {
          this.showOverlay = newVal;
     }
}