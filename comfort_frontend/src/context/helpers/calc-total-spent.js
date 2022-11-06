export const calcTotalSpent = (accumalator, order) =>
  accumalator +
  order.reduce((prev, order) => {
    return prev + order.price * order.counter;
  }, 0);
