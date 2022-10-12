import { makeAutoObservable } from 'mobx';

export default class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._devices = [
      {
        id: 1,
        name: 'Iphone 12 Pro',
        price: 25000,
        rating: 5,
        img: 'https://cdn.svyaznoy.ru/upload/iblock/fb8/ruru_iphone12pro_q121_graphite_pdp-image-1b.jpg/resize/483x483/hq/',
      },
      {
        id: 2,
        name: 'Iphone 12 Pro',
        price: 25000,
        rating: 5,
        img: 'https://cdn.svyaznoy.ru/upload/iblock/fb8/ruru_iphone12pro_q121_graphite_pdp-image-1b.jpg/resize/483x483/hq/',
      },
      {
        id: 3,
        name: 'Iphone 12 Pro',
        price: 25000,
        rating: 5,
        img: 'https://cdn.svyaznoy.ru/upload/iblock/fb8/ruru_iphone12pro_q121_graphite_pdp-image-1b.jpg/resize/483x483/hq/',
      },
      {
        id: 4,
        name: 'Iphone 12 Pro',
        price: 25000,
        rating: 5,
        img: 'https://cdn.svyaznoy.ru/upload/iblock/fb8/ruru_iphone12pro_q121_graphite_pdp-image-1b.jpg/resize/483x483/hq/',
      },
      {
        id: 5,
        name: 'Iphone 12 Pro',
        price: 25000,
        rating: 5,
        img: 'https://cdn.svyaznoy.ru/upload/iblock/fb8/ruru_iphone12pro_q121_graphite_pdp-image-1b.jpg/resize/483x483/hq/',
      },
      {
        id: 6,
        name: 'Iphone 12 Pro',
        price: 25000,
        rating: 5,
        img: 'https://cdn.svyaznoy.ru/upload/iblock/fb8/ruru_iphone12pro_q121_graphite_pdp-image-1b.jpg/resize/483x483/hq/',
      },
      {
        id: 7,
        name: 'Iphone 12 Pro',
        price: 25000,
        rating: 5,
        img: 'https://cdn.svyaznoy.ru/upload/iblock/fb8/ruru_iphone12pro_q121_graphite_pdp-image-1b.jpg/resize/483x483/hq/',
      },
      {
        id: 8,
        name: 'Iphone 12 Pro',
        price: 25000,
        rating: 5,
        img: 'https://cdn.svyaznoy.ru/upload/iblock/fb8/ruru_iphone12pro_q121_graphite_pdp-image-1b.jpg/resize/483x483/hq/',
      },
    ];

    this._selectedType = {};

    this._selectedBrand = {};

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
    this._selectedType = type;
  }

  setSelectedBrand(brand) {
    this._selectedBrand = brand;
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
}
