const { createHash } = require("crypto");

function hash(string) {
  return createHash("sha256").update(string).digest("hex");
}

const timeStamp = Math.floor(Date.now() / 1000);
const url =
  "https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?fields=all&language=ENG&from=1&to=100&useSecondaryLanguage=false";
const apiKey = "6c0dde392c652449b985e359083ca6ac";
const secret = "bac8872407";
const code = apiKey + secret + timeStamp;
const signature = hash(code);

module.exports = {
  url,
  apiKey,
  signature,
};
