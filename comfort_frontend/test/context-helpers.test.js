import { calcTotalSpent } from "../src/context/helpers/calc-total-spent";
import exampleData from "./example-data.json";

describe("Context Helpers", () => {
  test("calc total spent", () => {
    const exampleOrders = exampleData.orders;
    const totalSpent = exampleOrders.reduce(calcTotalSpent, 0);
    expect(totalSpent).toBe(2933.87);
  });

  test("orders length", () => {
    const exampleOrders = exampleData.orders;
    const totalSpent = exampleOrders.reduce(calcTotalSpent, 0);
    expect(exampleOrders.length).toBe(7);
  });
});
