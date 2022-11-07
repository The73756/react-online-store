export const calcTotalBasketPrice = (basketDevices) => {
  return basketDevices.reduce(
    (total, position) => total + position.count * position.device.price,
    0,
  );
};
