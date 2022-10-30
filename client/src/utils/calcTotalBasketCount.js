export const calcTotalBasketCount = (basketDevices) => {
  return basketDevices.reduce((total, device) => total + device.count, 0);
};
