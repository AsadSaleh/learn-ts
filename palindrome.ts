function optimzedPalindromeChecker(input: string): boolean {
  const maxIndex = Math.floor(input.length / 2);

  for (let i = 0; i < maxIndex; i++) {
    if (input[i] !== input[input.length - 1 - i]) {
      return false;
    }
  }
  return true;
}

function unoptimizedPalindromeChecker(input: string): boolean {
  if (input === reverseWordWithoutBuiltin(input)) {
    return true;
  }
  return false;
}

// Ini kayaknya dulu gue bikin gini. Aneh juga sih pas gue baca ulang.
function reverseWord(input: string): string {
  const inputArray = input.split("");
  const arrayLength = inputArray.length;
  const resultArray = Array.from({ length: arrayLength });

  inputArray.forEach((char, index) => {
    resultArray[arrayLength - 1 - index] = char;
  });

  const resultString = resultArray.join("");
  return resultString;
}

function reverseWordWithBuiltin(input: string): string {
  return input.split("").reverse().join();
}

function reverseWordWithoutBuiltin(input: string): string {
  let res = "";
  for (let i = 0; i < input.length; i++) {
    res = res + input[input.length - 1 - i];
  }
  return res;
}

// test:
console.log(optimzedPalindromeChecker("asad saleh umar") === false);
console.log(optimzedPalindromeChecker("racecar") === true);
console.log(optimzedPalindromeChecker("asaddasa") === true);
console.log(optimzedPalindromeChecker("abccccccccba") === true);
console.log(optimzedPalindromeChecker("abbbaaabbba") === true);
