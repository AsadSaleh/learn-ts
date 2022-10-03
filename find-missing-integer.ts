function findMissingConsecutiveInteger(array: Array<number>): number {
  let isMissing = false;
  let i = 1;
  let result = 0;
  while (!isMissing) {
    if (!isIncluded(array, i)) {
      isMissing = true;
      result = i;
      break;
    }
    i++;
  }
  return result;
}

function isIncluded<T>(array: Array<T>, target: T): boolean {
  let result = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i] === target) {
      result = true;
      break;
    }
  }
  return result;
}

console.log(findMissingConsecutiveInteger([4, 3, 2, 1, 8, 9, 10]));
console.log(findMissingConsecutiveInteger([5, 4, 3, 6, 2, 1, 8, 9, 10]));
console.log(findMissingConsecutiveInteger([-3, -2, -1]));
