export function filterBySearchValue(searchValue, products) {
  return products.filter((product) =>
    product.name.toLowerCase().includes(searchValue.toLowerCase())
  );
}

export function filterByCategory(filterCategory, products) {
  return products.filter((product) => product.category === filterCategory);
}

export function filterByColor(filterColor, products) {
  return products.filter((product) => product.colors.includes(filterColor));
}

export function filterByBrand(filterBrand, products) {
  if (filterBrand === "All") {
    return products;
  }

  return products.filter((product) => product.brand === filterBrand);
}

export function filterByPrice(filterPrice, products) {
  return products.filter((product) => product.price < Number(filterPrice));
}

export function filterByShipping(shippingState, products) {
  return products.filter((product) => product.shipping == false);
}
