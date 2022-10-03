// A function for reversing word order in a paragraph, but only
// taking words which length are greater than 5.
function doStuff(text) {
  if (typeof text !== "string") {
    console.error("This function expect a string");
    return "";
  }
  return text
    .toLocaleLowerCase()
    .split(" ")
    .reverse()
    .filter((text) => text.length > 5)
    .join(", ");
}
