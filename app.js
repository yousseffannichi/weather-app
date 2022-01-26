const dotenv = require('dotenv');
const { forecast } = require('./utils/forecast');
const { geocode } = require('./utils/geocode');
dotenv.config({ path: './config.env' });

// const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=37.8267,-122.4223&units=f`;

// request({ url, json: true }, (err, response) => {
//     if (err) {
//         console.log(err.message);
//     } else if (response.body.error) {
//         console.log(`Error: ${response.body.error.info}`);
//     } else {
//         const data = response.body.current;
//         console.log(
//             `It 's ${data.weather_descriptions.at(0)}. It is currently ${
//         data.temperature
//       } degrees and it feels like there is ${
//         data.feelslike
//       } out, and there is a ${data.precip} % chance of rain `
//         );
//     }
// });

//_ Geocoding Challenge:
// Address => Lat/Lag ==> Weather

// const Geourl = `
// https://api.mapbox.com/geocoding/v5/mapbox.places/Boston.json?access_token=${process.env.MAP_TOKEN}&limit=1`;

// request({ url: Geourl, json: true }, (error, response) => {
//     if (error) {
//         console.log(`There was an error conneting to the weather service`);
//     } else if (response.body.error) {
//         console.log(`Error: ${response.body.error}`);
//     } else {
//         const data = response.body;
//         const [{ center }] = data.features;
//         console.log(
//             `The latitude for Boston is ${center.at(
//         0
//       )}, and the longitude is ${center.at(1)}.`
//         );
//     }
// });

const location = process.argv[2];
if (!location) {
    return console.log('Please provide a location');
} else {
    geocode(location, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return console.log(error);
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error);
            }

            console.log(location);
            console.log(forecastData);
        });
    });
}