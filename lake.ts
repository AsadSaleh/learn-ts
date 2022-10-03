// Ada matriks 2 dimensi n*n yang elemennya terdiri dari . dan +
// Titik, itu kita anggap sebagai danau. + kita anggap sebagai daratan.

// contoh input:
// 5
// . . . . .
// + + + + +
// . . . . .
// . . . . .
// + + + + +
// contoh output: 2

// contoh input:
// 2
// . +
// + .
// outputnya: 1

// contoh input:
// 3
// . . +
// + + .
// + . .
// outpunya: 1

type Matrix_2D = Array<Array<"." | "+">>;

type El = { val: "." | "+"; label: string };
type MaybeEl = El | null;
type RichLake = Array<Array<El>>;
type ReduceObj = { [key: string]: Array<El> };

// sample input:
const lakes: Matrix_2D = [
  [".", ".", ".", ".", "."],
  ["+", "+", ".", "+", "+"],
  [".", ".", ".", ".", "."],
  [".", ".", ".", ".", "."],
  ["+", "+", "+", "+", "+"],
];

const adjacentElementDict = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  // [0, 0],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function solve() {
  const richLake = lakes.map((arrayEl) =>
    arrayEl.map((el) => ({ val: el, label: "" }))
  );

  function getElement(x: number, y: number): MaybeEl {
    let res = null;
    if (x >= 0 && y >= 0) {
      res = richLake[x][y];
    }
    return res;
  }

  function setElementLabel(x: number, y: number, label: string): void {
    if (x >= 0 && y >= 0) {
      richLake[x][y].label = label;
    }
  }

  function getAdjacentElements(x: number, y: number): MaybeEl[] {
    const res = adjacentElementDict.map(([adjX, adjY]) =>
      getElement(x + adjX, y + adjY)
    );
    console.log({ getAdjacentElements: res });
    return res;
  }

  function isAdjacentElAlreadyLabeledLake(x: number, y: number): MaybeEl {
    const adjacentElements = getAdjacentElements(x, y);

    let element = null;
    for (const el of adjacentElements) {
      if (el?.val === "." && el?.label) {
        element = el;
        break;
      }
    }
    return element;
  }

  let lakeCount = 0;

  richLake.forEach((arrLake, i) => {
    arrLake.forEach((el, j) => {
      console.log({ i, j });
      const currentEl = el;

      // If it's a lake
      // If sebelahnya udah lake => kasih label yang sama dengan sebelahnya,
      // else sebelahnya belum lake => buat label baru.
      if (currentEl.val === ".") {
        const element = isAdjacentElAlreadyLabeledLake(i, j);
        if (element) {
          console.log("haiyaaaa:", element);
          richLake[i][j].label = element.label;
        } else {
          // Buat label baru
          richLake[i][j].label = `lake-${lakeCount}`;
          lakeCount += 1;
        }
      } else {
        currentEl.label = "land";
      }

      // If it's not a lake
      // do nothing.
    });
  });
  console.log({ richLake: JSON.stringify(richLake, null, 2) });

  // Setelah gue punya rich lake beserta labelnya.
  // grouping berdasarkan label:
  const obj = richLake
    .map(([x]) => x)
    .reduce<ReduceObj>((acc, cur) => {
      const label = cur.label;
      if (acc[label]) {
        acc[label].push(cur);
      } else {
        acc[label] = [cur];
      }
      return acc;
    }, {});
  console.log({ obj });

  const result = Object.keys(obj).filter((key) => key.includes("lake")).length;
  console.log({ result });

  return result;
}

solve();
