const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5c815cdb5ab9274eab336e8a58a19ac0&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    
    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to location services!', undefined) //in case of no connexion at the Internet
        } else if (body.success === 'false') {
            callback('An error occurred !\n' + body.error, undefined) //if does not match with the address or any other error..
        } else {
            //console.log(body)
            callback(undefined, {
                forecast: 'Today the weather is ' + body.current.weather_descriptions[0] + 'The temperature is ' + body.current.temperature + ' degrees out, and it is feeling like ' + body.current.feelslike +' degrees out' + ' and the pressure is ' + body.current.pressure
            })
        }
    })
}

module.exports = forecast