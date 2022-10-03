// What is a fibonacci?
// f(0) = 0
// f(1) = 1
// f(n) = f(n-1) + f(n-2)

// Solution one. Simple.
let i = 0;

function fibonacci(index: number): number {
  if (index === 0) {
    return 0;
  }
  if (index === 1) {
    return 1;
  }
  i++;
  // console.log(index);
  return fibonacci(index - 1) + fibonacci(index - 2);
}

// console.log(fibonacci(9));
// console.log({ i });

// Solution two. Memoized.
type MapNumberNumber = { [a: number]: number };
let memo: MapNumberNumber = {};
let j = 0;
function optimizedFib(index: number): number {
  if (index === 0) {
    memo[0] = 0;
    return 0;
  }
  if (index === 1) {
    memo[1] = 1;
    return 1;
  }

  // console.log(index);
  if (memo[index] != null) {
    return memo[index];
  } else {
    j++;
    const result = optimizedFib(index - 1) + optimizedFib(index - 2);
    memo[index] = result;
    return result;
  }
}

console.log(optimizedFib(9));
console.log({ j, memo });
