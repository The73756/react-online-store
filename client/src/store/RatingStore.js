import { makeAutoObservable } from 'mobx';

export default class RatingStore {
  constructor() {
    this._ratedDevices = [];
    this._ratedDevicesCount = 0;
    makeAutoObservable(this);
  }

  setRatedDevices(devices) {
    this._ratedDevices = devices;
  }

  setRatedDevicesCount(count) {
    this._ratedDevicesCount = count;
  }

  get ratedDevices() {
    return this._ratedDevices;
  }

  get ratedDevicesCount() {
    return this._ratedDevicesCount;
  }
}
