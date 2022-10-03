type MyObject = { [key: string]: any };

function deepEqual(obj1: MyObject, obj2: MyObject) {
  if (obj1 === null && obj2 === null) {
  }
  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }
  for (const key in obj1) {
    if (Array.isArray(obj1[key])) {
      deepEqual(obj1[key], obj2[key]);
    } else if (typeof obj1[key] === "object") {
      deepEqual(obj1[key], obj2[key]);
    } else if (obj1[key] !== obj2[key]) {
      console.log(
        `Not equal!\nThe diff is in key "${key}" inside the object "${JSON.stringify(
          obj1,
          null,
          2
        )}"`
      );
      return false;
    }
  }
  return true;
}

const one = {
  name: "asad",
  age: 23,
  pets: ["cat", "mouse", "bird"],
  address: {
    street: "siaga raya 42B",
    country: "indonesia",
  },
  foo: null,
};

const two = {
  name: "asad",
  age: 23,
  pets: ["cat", "mouse", "bird"],
  address: {
    street: "siaga raya 42B",
    country: "indonesia",
  },
  foo: "bar",
};

// TEST
console.log(deepEqual(one, two));
// console.log(deepEqual(["cat", "mouse", "bird"], ["cat", "mouse", "bird"]));
