const dataFetcher = require("./dataFetcher");
const express = require("express");
const fs = require("fs");
var app = express();
const renumber = require("./renumber");
const port = 80;

const error404 = fs.readFileSync("./404.htm", "utf8");

app.get("/:user/:name", async (request, response) => {
  reqUser = request.params.user;
  reqNameSplit = request.params.name.split(".");
  if (reqNameSplit.pop() != "bib") {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.write(error404);
    response.end();
  } else {
    reqName = reqNameSplit.join(".");
    console.log(`User: ${reqUser}, BibName: ${reqName}`);
    data = await dataFetcher.fetchData(reqUser, reqName);
    if (data === undefined) {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.write(error404);
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.write(renumber.renumber(data));
      response.end();
    }
  }
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
