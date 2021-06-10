const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=2a0a906dc2df292afe2d2d9efe0ae271&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("Unable to connect to weather service", undefined);
      return;
    }
    if (body.error) {
      callback("Unable to find location", undefined);
      return;
    }

    callback(
      undefined,
      `${body.current.weather_descriptions[0]} - It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`
    );
  });
};

module.exports = forecast;
