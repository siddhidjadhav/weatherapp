const request = require("request");

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=e6068d154836879ce1757075e151c680&query=' + latitude + ',' + longitude;

    request({url, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect", undefined);
        }else if(response.body.error){
            callback("Unable to get forecast", undefined);
        }else {
            callback(undefined, response.body.current.weather_descriptions + ". It is currently " + response.body.current.temperature + " degrees out. It feels like " + response.body.current.feelslike + " degrees outside")
        }
    })
}

module.exports = forecast;