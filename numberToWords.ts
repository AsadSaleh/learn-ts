function recursiveNumToWords(amount: number): string {
  const numberInText = [
    "",
    "satu",
    "dua",
    "tiga",
    "empat",
    "lima",
    "enam",
    "tujuh",
    "delapan",
    "sembilan",
    "sepuluh",
    "sebelas",
  ];

  if (amount < 12) {
    return numberInText[amount] as string;
  }
  if (amount < 20) {
    return recursiveNumToWords(amount - 10) + " belas";
  }
  if (amount < 100) {
    return (
      recursiveNumToWords(Math.floor(amount / 10)) +
      " puluh " +
      recursiveNumToWords(amount % 10)
    );
  }
  if (amount < 200) {
    return "seratus " + recursiveNumToWords(amount - 100);
  }
  if (amount < 1_000) {
    return (
      recursiveNumToWords(Math.floor(amount / 100)) +
      " ratus " +
      recursiveNumToWords(amount % 100)
    );
  }
  if (amount < 2_000) {
    return "seribu " + recursiveNumToWords(amount - 1_000);
  }
  if (amount < 1_000_000) {
    return (
      recursiveNumToWords(Math.floor(amount / 1_000)) +
      " ribu " +
      recursiveNumToWords(amount % 1_000)
    );
  }
  if (amount < 1_000_000_000) {
    return (
      recursiveNumToWords(Math.floor(amount / 1_000_000)) +
      " juta " +
      recursiveNumToWords(amount % 1_000_000)
    );
  }
  if (amount < 1_000_000_000_000) {
    return (
      recursiveNumToWords(Math.floor(amount / 1_000_000_000)) +
      " milyar " +
      recursiveNumToWords(amount % 1_000_000_000)
    );
  }
  if (amount < 1_000_000_000_000) {
    return (
      recursiveNumToWords(Math.floor(amount / 1_000_000_000_000)) +
      " trilyun " +
      recursiveNumToWords(amount % 1_000_000_000_000)
    );
  }
  return "";
}

function trimExcessSpaces(input: string): string {
  return input.replace(/ +/g, " ").trim();
}

function numberToWords(amount: number): string {
  return trimExcessSpaces(recursiveNumToWords(amount));
}

// test
// console.log(numberToWords(200_000));
// console.log(numberToWords(250_000));
// console.log(numberToWords(252_000));
console.log(numberToWords(200_000) === "dua ratus ribu");
console.log(numberToWords(250_000) === "dua ratus lima puluh ribu");
console.log(numberToWords(252_000) === "dua ratus lima puluh dua ribu");
console.log(numberToWords(2_000_000) === "dua juta");
console.log(numberToWords(250_000_001) === "dua ratus lima puluh juta satu");
console.log(
  numberToWords(11_987_654) ===
    "sebelas juta sembilan ratus delapan puluh tujuh ribu enam ratus lima puluh empat"
);
