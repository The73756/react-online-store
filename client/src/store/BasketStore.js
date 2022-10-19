import { makeAutoObservable } from 'mobx';

export default class BasketStore {
  constructor() {
    this._basketDevices = [];
    this._basketTotalCount = 0;
    makeAutoObservable(this);
  }

  setBasketDevices(devices) {
    this._basketDevices = devices;
  }

  setBasketTotalCount(count) {
    this._basketTotalCount = count;
  }

  get basketDevices() {
    return this._basketDevices;
  }

  get basketTotalCount() {
    return this._basketTotalCount;
  }
}
