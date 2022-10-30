import { makeAutoObservable } from 'mobx';
import { calcTotalBasketPrice } from '../utils/calcTotalBasketPrice';
import { calcTotalBasketCount } from '../utils/calcTotalBasketCount';

export default class BasketStore {
  constructor() {
    this._basketDevices = [];
    this._basketTotalCount = 0;
    this._basketTotalPrice = 0;
    this._basketTotalPositions = 0;
    makeAutoObservable(this);
  }

  setBasketDevices(devices) {
    this._basketDevices = devices;
    this._basketTotalPrice = calcTotalBasketPrice(devices);
    this._basketTotalCount = calcTotalBasketCount(devices);
  }

  setBasketTotalCount(count) {
    this._basketTotalCount = count;
  }

  setBasketTotalPrice(price) {
    this._basketTotalPrice = price;
  }

  setBasketTotalPositions(positions) {
    this._basketTotalPositions = positions;
  }

  get basketDevices() {
    return this._basketDevices;
  }

  get basketTotalCount() {
    return this._basketTotalCount;
  }

  get basketTotalPrice() {
    return this._basketTotalPrice;
  }

  get basketTotalPositions() {
    return this._basketTotalPositions;
  }
}
