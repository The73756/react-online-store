export const calcTotalBasketPrice = (basketDevices) => {
  return basketDevices.reduce((final, position) => {
    let addedPrice = 0;
    if (position.variants.length) {
      addedPrice = position.variants.reduce(
        (total, variant) => total + variant.device_variant.cost,
        0,
      );
    }

    return final + (!position.count ? 1 : position.count * (position.device.price + addedPrice));
  }, 0);
};
