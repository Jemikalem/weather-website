const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5c815cdb5ab9274eab336e8a58a19ac0&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    
    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services!', undefined) //in case of no connexion at the Internet
        } else if (body.success === 'false') {
            callback('An error occurred !\n' + body.error, undefined) //if does not match with the address or any other error..
        } else {
            callback(undefined, {
                forecast: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast