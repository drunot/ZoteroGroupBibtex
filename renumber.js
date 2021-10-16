const fs = require("fs");
const renumber = (data) => {
  // regEx to search for lines where there is multiple entries
  const xFindLine = /(?<=[\r\n])@[^-\r\n]+(?=-\d+,[\r\n])/g;
  // String to find first part and remove it
  const xFindBefore = /^@[^{]+{/;
  // Get all results
  results = [...data.matchAll(xFindLine)];
  let lines = {};
  // Clean all results, and count reoccurenses
  results.forEach((result) => {
    entryName = result[0].replace(xFindBefore, "");
    if (lines[entryName] === undefined) {
      lines[entryName] = 1;
    } else {
      lines[entryName] += 1;
    }
  });
  // Foreach object that is showing multiple times
  Object.keys(lines).forEach((key) => {
    // regex to find each line with multiple inputs.
    xFindSpecific = RegExp("(?<=[\\r\\n])@[^{]+{" + key, "g");
    // regex to find number in that line.
    xFindNumer = /(-\d+,(?=[\n\r]))|(,(?=[\n\r]))/g;
    while (true) {
      // Move last index along to next find
      xFindSpecific.test(data);
      // If at end stop!
      if (xFindSpecific.lastIndex == 0) {
        break;
      }
      // Set index to seach after the number from to last index of the line finder.
      xFindNumer.lastIndex = xFindSpecific.lastIndex;
      // Find the index and match of number.
      lineMatch = xFindNumer.exec(data);
      // Manual find and replace of old number with new number. This will reverce the order.
      data =
        data.substr(0, xFindNumer.lastIndex - lineMatch[0].length) +
        (lines[key] == 0 ? "," : `-${lines[key]},`) +
        data.substr(xFindNumer.lastIndex);
      // Decrement counter.
      lines[key]--;
    }
  });
  return data;
};

module.exports.renumber = function (data) {
  return renumber(data);
};
