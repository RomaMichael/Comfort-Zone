import {
  filterBySearchValue,
  filterByBrand,
  filterByCategory,
  filterByColor,
} from "../src/components/Products/filter-helpers";
import exampleData from "./example-data.json";

describe("filters", () => {
  test("filterBySearchValue", () => {
    const exampleProducts = exampleData.products;
    const filtered = filterBySearchValue("modern", exampleProducts);
    expect(filtered.length).toBe(2);
    expect(filtered[0].name).toBe("Modern Poster");
  });

  test("filterByCategory", () => {
    const exampleProducts = exampleData.products;
    const filtered = filterByCategory("living room", exampleProducts);
    expect(filtered.length).toBe(7);
  });

  test("filterByBrand", () => {
    const filtered = filterByBrand("Ikea", exampleData.products);
    expect(filtered.length).toBe(6);
  });

  test("filterByColor", () => {
    const exampleProducts = exampleData.products;
    const filtered = filterByColor("red", exampleProducts);
    expect(filtered.length).toBe(9);
  });
});
