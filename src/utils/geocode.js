const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW1pdDEyMTAiLCJhIjoiY2t3cnA5eXBnMHZoMDJ1cnRtY2U2cXp2NCJ9.fkhC-bLHh0Nxwh8lESE79A&limit=1'

    request({url, json: true}, (error, response) => {
        if(error) {
            callback("Unable to Connect", undefined);
        }else if(response.body.features.length === 0){
            callback("Location not available", undefined);
        }else {
            callback(undefined, {
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1], 
                longitude: response.body.features[0].center[0]
            });
        }
    })
}

module.exports = geocode;