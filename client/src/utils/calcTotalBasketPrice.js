export const calcTotalBasketPrice = (basketDevices) => {
  return basketDevices.reduce((total, device) => total + device.count * device.price, 0);
};
