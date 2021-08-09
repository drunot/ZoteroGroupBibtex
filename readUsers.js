const fs = require("fs");
const getUsers = (path, username) => {
  toReturn = undefined;
  data = fs.readFileSync(path, "utf8");

  // parse JSON string to JSON object
  const users = JSON.parse(data);

  // print all databases
  users["users"].forEach((element) => {
    if (element["user"] == username) {
      toReturn = element;
    }
  });

  return toReturn;
};

module.exports.getUsers = function (path, username) {
  return getUsers(path, username);
};
