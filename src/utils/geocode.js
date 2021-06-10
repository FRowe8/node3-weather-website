const request = require("postman-request");

const geocode = (address, callback) => {
  address = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZnJvd2U4IiwiYSI6ImNrcGZ2MW5lcDJhYXgyem9neDU5cW1pNjUifQ.xtHFyJK2V8tyrp8SlrGzFg&limit=1`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to Geocoding service", undefined);
      return;
    }
    if (body.features.length === 0) {
      callback("Unable to find location", undefined);
      return;
    }
    callback(undefined, {
      latitude: body.features[0].center[1],
      longitude: body.features[0].center[0],
      location: body.features[0].place_name,
    });
  });
};

module.exports = geocode;
