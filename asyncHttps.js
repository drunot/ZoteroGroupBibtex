const https = require("https");
function doRequest(options) {
  return new Promise((resolve, reject) => {
    let req = https.request(options, (res) => {
      allData = "";
      res.on("data", (de) => {
        allData += de;
      });
      res.on("end", function () {
        resolve(allData);
      });
    });

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
}

module.exports.asyncHttps = function (options) {
  return doRequest(options);
};
