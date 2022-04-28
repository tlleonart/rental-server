const { createHash } = require('crypto');
// const axios = require('axios');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}

const timeStamp = Math.floor(Date.now() / 1000);
const url = 'https://api.test.hotelbeds.com/hotel-content-api/1.0/hotels?fields=all&language=ENG&from=1&to=20&useSecondaryLanguage=false';
const apiKey = '81146409974efa367e15602f75cff2dc';
const secret = '4d39a51043';
const code = apiKey + secret + timeStamp;
const signature = hash(code);

// const apiHotels = [];
// const getHotels = async () => {
//   try {
//     const apiReq = await axios.get(url, { headers: { 'Api-key': apiKey, 'X-Signature': signature } });
//     apiHotels.push(apiReq.data.hotels);
//     const allHotels = apiHotels[0].map((hotel) => {
//       const obj = {
//         id: hotel.code,
//         name: hotel.name.content,
//         description: hotel.description.content,
//         stars: hotel.S2C,
//         ranking: hotel.ranking,
//         countryCode: hotel.countryCode,
//         latitude: hotel.coordinates.latitude,
//         longitude: hotel.coordinates.longitude,
//         address: hotel.address.content,
//         city: hotel.city.content,
//         postalCode: hotel.postalCode,
//         email: hotel.email,
//         phones: hotel.phones[0].phoneNumber,
//         childrens: hotel.rooms[0].maxChildren,
//         maxPax: hotel.rooms[0].maxPax,
//         gallery: hotel.images[0],
//         amenities: hotel.facilities[0],
//       };
//       return obj;
//     });
//     return console.log(allHotels[1]);
//   } catch (error) {
//     console.error(error);
//   }
// };

// getHotels();

module.exports = { url, apiKey, signature };
