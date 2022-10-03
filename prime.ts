// What is a prime numbers?
// It's a number which is non-divisible by anything other than 1 or itself.

function checkPrimeNumber(input: number): void {
  if (input === 2) {
    console.log("2 is obviously a prime!!!!!!");
    return;
  }

  const maxIndex = Math.floor(Math.sqrt(input));
  for (let i = 2; i <= maxIndex; i++) {
    // console.log("im here");
    if (input % i === 0) {
      console.log(`❌ ${input} is not a prime. One of the roots is: `, i);
      return;
    }
  }
  console.log(`✅ ${input} is a prime!`);
  return;
}

// test case:
checkPrimeNumber(2);
checkPrimeNumber(3);
checkPrimeNumber(4);
checkPrimeNumber(5);
checkPrimeNumber(137);
checkPrimeNumber(377);
checkPrimeNumber(798237489232);
