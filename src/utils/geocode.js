const request = require('request')

// A sigle re-usable function !
const geocode = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiamF5bGVlZmlzaDI1IiwiYSI6ImNrOW56MGJ2ZDAzbHMzZXAyODhtZ3hiNHQifQ.0RMNE691aaDsatp3PucUbQ&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined) //in case of no connexion at the Internet
        } else if (body.features.length === 0) {
            callback('Unable to find location! Try another search', undefined) //if does not match with the address
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode