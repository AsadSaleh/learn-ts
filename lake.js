// Ada matriks 2 dimensi n*n yang elemennya terdiri dari . dan +
// Titik, itu kita anggap sebagai danau. + kita anggap sebagai daratan.
// sample input:
var lakes = [
    [".", ".", ".", ".", "."],
    ["+", "+", "+", "+", "+"],
    [".", ".", ".", ".", "."],
    [".", ".", ".", ".", "."],
    ["+", "+", "+", "+", "+"],
];
var adjacentElementDict = [
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
    var richLake = lakes.map(function (arrayEl) {
        return arrayEl.map(function (el) { return ({ val: el, label: "" }); });
    });
    function getElement(x, y) {
        var res = null;
        if (x >= 0 || y >= 0) {
            res = richLake[x][y];
        }
        console.log({ getElement: res });
        return res;
    }
    function getAdjacentElements(x, y) {
        var res = adjacentElementDict.map(function (_a) {
            var adjX = _a[0], adjY = _a[1];
            return getElement(x + adjX, y + adjY);
        });
        console.log({ getAdjacentElements: res });
        return res;
    }
    function isAdjacentElementAlreadyALake(x, y) {
        var adjacentElements = getAdjacentElements(x, y);
        var isAlreadyLake = false;
        var element = null;
        adjacentElements.forEach(function (el) {
            if ((el === null || el === void 0 ? void 0 : el.val) === ".") {
                isAlreadyLake = true;
                element = el;
            }
        });
        return {
            isAlreadyLake: isAlreadyLake,
            element: element
        };
    }
    var lakeCount = 0;
    richLake.forEach(function (arrLake, i) {
        arrLake.forEach(function (el, j) {
            var currentEl = getElement(i, j);
            // If it's a lake
            // If sebelahnya udah lake => kasih label yang sama dengan sebelahnya,
            // else sebelahnya belum lake => buat label baru.
            if ((currentEl === null || currentEl === void 0 ? void 0 : currentEl.val) === ".") {
                var element = isAdjacentElementAlreadyALake(i, j).element;
                if (element) {
                    currentEl.label = element.label;
                }
                else {
                    // Buat label baru
                    currentEl.label = "lake-".concat(lakeCount);
                    lakeCount += 1;
                }
            }
            // If it's not a lake
            // do nothing.
        });
    });
    console.log({ richLake: richLake });
    // Setelah gue punya rich lake beserta labelnya.
    // grouping berdasarkan label:
    var obj = richLake
        .map(function (_a) {
        var x = _a[0];
        return x;
    })
        .reduce(function (acc, cur) {
        var label = cur.label;
        if (acc[label]) {
            acc[label] = acc[label].push(cur);
        }
        else {
            acc[label] = [cur];
        }
        return acc;
    }, {});
    console.log({ obj: obj });
    var result = Object.keys(obj).length;
    console.log({ result: result });
    return result;
}
