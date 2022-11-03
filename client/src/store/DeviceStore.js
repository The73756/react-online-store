import { makeAutoObservable } from 'mobx';
import { SORT } from '../utils/consts';

export default class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._selectedType = {};
    this._selectedBrand = {};
    this._selectedSort = SORT.RATING;
    this._selectedOrder = 'desc';
    this._search = '';
    this._devices = [];
    this._page = 1;
    this._totalCount = 0;
    this._limit = 4;

    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }

  setBrands(brands) {
    this._brands = brands;
  }

  setDevices(devices) {
    this._devices = devices;
  }

  setSelectedType(type) {
    this.setPage(1);
    this._selectedType = type;
  }

  setSelectedBrand(brand) {
    this.setPage(1);
    this._selectedBrand = brand;
  }

  setSelectedSort(sort) {
    this._selectedSort = sort;
  }

  setSelectedOrder(order) {
    this._selectedOrder = order;
  }

  setSearch(search) {
    this._search = search;
  }

  setPage(page) {
    this._page = page;
  }

  setTotalCount(count) {
    this._totalCount = count;
  }

  get types() {
    return this._types;
  }

  get brands() {
    return this._brands;
  }

  get devices() {
    return this._devices;
  }

  get selectedType() {
    return this._selectedType;
  }

  get selectedBrand() {
    return this._selectedBrand;
  }

  get selectedSort() {
    return this._selectedSort;
  }

  get selectedOrder() {
    return this._selectedOrder;
  }

  get search() {
    return this._search;
  }

  get page() {
    return this._page;
  }

  get totalCount() {
    return this._totalCount;
  }

  get limit() {
    return this._limit;
  }
}
