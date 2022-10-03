function fizbaz(n: number = 50) {
  Array.from({ length: n }, (v, i) => i + 1)
    .map((e) => {
      if (e % 3 === 0 && e % 5 === 0) {
        return "FizBaz";
      }
      if (e % 3 === 0) {
        return "Fiz";
      }
      if (e % 5 === 0) {
        return "Baz";
      }
      return e;
    })
    .forEach((e) => console.log(e));
}

fizbaz();
