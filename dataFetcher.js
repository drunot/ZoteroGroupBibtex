const readUsers = require("./readUsers");
const https = require("https");
const asyncHttps = require("./asyncHttps");

async function getData(id, num, user) {
  returnStr = "";
  startIdxes = [];
  startIdx = 0;
  while (startIdxes < num) {
    startIdxes.push(startIdx);
    startIdx += 100;
  }
  return await Promise.all(
    startIdxes.map(async (idx) => {
      const options2 = {
        hostname: "api.zotero.org",
        port: 443,
        path:
          "/groups/" +
          id +
          "/items?format=bibtex&limit=100&start=" +
          idx.toString(),
        method: "GET",
      };
      if (!(user["key"] === undefined)) {
        options2["headers"] = {
          "Zotero-API-Key": user["key"],
        };
      }
      de = await asyncHttps.asyncHttps(options2);
      return de;
    })
  ).then(async (values) => {
    return values.join("");
  });
}

const fetchData = (username, bookname) => {
  const user = readUsers.getUsers("./users.json", username.toLowerCase());
  if (user === undefined) {
    return new Promise((resolve, reject) => {
      resolve(undefined);
    });
  }

  const options = {
    hostname: "api.zotero.org",
    port: 443,
    path: "/users/" + user["id"] + "/groups",
    method: "GET",
  };

  if (!(user["key"] === undefined)) {
    options["headers"] = {
      "Zotero-API-Key": user["key"],
    };
  }

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      allData = "";
      res.on("data", (d) => {
        allData += d;
      });
      res.on("end", function () {
        const allGroups = JSON.parse(allData.toString());
        allGroups.forEach((element) => {
          if (element["data"]["name"].toLowerCase() == bookname.toLowerCase()) {
            resolve(getData(element["id"], element["meta"]["numItems"], user));
          }
        });
        resolve(undefined);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
};

module.exports.fetchData = function (username, bookname) {
  return fetchData(username, bookname);
};
