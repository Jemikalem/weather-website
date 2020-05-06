const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname)
//console.log(path.join(__dirname, '../public'))

const app = express()

//create new constant to access to an env variable for deployment (or test)
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //res.send('<h1>Weather</h1>')
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jeremy'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Jeremy L.'
    })
})

/* app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        helper1: 'Jeremy',
        helper2: 'Rachel'
    })
}) */

/* app.get('/help', (req, res) => {
    res.send([{
        name: 'Jeremy'
    },{
        name: 'Rachel'
    }])
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')

}) */

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    } else {
        //// Callback Chaining
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {         
                return res.send({ error })
            }
            forecast(latitude, longitude, (error, { forecast } = {}) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    forecast: forecast,
                    location: location,
                    address: req.query.address
                })
            })
        })
    }
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        //by using the return here, the function will stop right here.
        //avoiding an error http header sent..
        return res.send({
            error: 'You must provide a search term'
        })
    } 

    //console.log(req.query)
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Jeremy'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Jeremy'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})