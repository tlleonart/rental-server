const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

const timeStamp = Math.floor(Date.now() / 1000);
const url = 'https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?fields=all&language=CAS&from=1&to=200&useSecondaryLanguage=false';
const apiKey = 'e58e7642f4275d4b90d210f2af96cb7e';
const secret = '4af634c7d1';
const code = apiKey + secret + timeStamp;
const signature = hash(code);

module.exports = {
  url,
  apiKey,
  signature,
};
