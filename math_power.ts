function mathPower(base: number, power: number): number {
  if (base === 0 && power === 0) throw "Cannot do this!";
  if (base == 0) return 0;
  if (base == 1) return 1;
  if (power == 0) return 1;

  let result = base;
  //   console.log({ result });

  for (let i = 0; i < power - 1; i++) {
    result = result * base;
    // console.log({ i, result });
  }
  return result;
}

// test:
console.log("2^0", mathPower(2, 0) === 2 ** 0);
console.log("2^2", mathPower(2, 2) === 2 ** 2);
console.log("2^5", mathPower(2, 5) === 2 ** 5);
console.log("3^4", mathPower(3, 4) === 3 ** 4);
console.log("3^6", mathPower(3, 6) === 3 ** 6);
console.log("4^2", mathPower(4, 2) === 4 ** 2);
