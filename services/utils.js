const { createHash } = require('crypto');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

const timeStamp = Math.floor(Date.now() / 1000);
const url = 'https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?fields=all&language=ENG&from=1&to=100&useSecondaryLanguage=false';
const apiKey = '684f98064c4f8f10d22b3ca1a70e743d';
const secret = '1490581b65';
const code = apiKey + secret + timeStamp;
const signature = hash(code);

module.exports = { url, apiKey, signature };
