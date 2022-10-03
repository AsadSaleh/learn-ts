function anagramChecker(inputA: string, inputB: string): boolean {
  const sortedA = inputA
    .toLowerCase()
    .split("")
    .filter((e) => e != " ")
    .sort()
    .join("");
  const sortedB = inputB
    .toLowerCase()
    .split("")
    .filter((e) => e != " ")
    .sort()
    .join("");
  return sortedA === sortedB;
}

// What is anagram ?
// Anagram is when 2 words/phrases consist of exactly simmilar characters.
// So we can say: "monkeys write" is an anagram for "New York Times".

// Test case:
console.log(anagramChecker("New York Times", "monkeys write") === true);
console.log(anagramChecker("restful", "fluster") === true);
console.log(anagramChecker("Dormitory", "dirty room") === true);
console.log(
  anagramChecker("some random words", "totally not it's anagrams ") === false
);
