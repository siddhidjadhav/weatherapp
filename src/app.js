const path = require('path');
const express = require('express');
const hbs = require('hbs');
const cors = require('cors');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
//express is a function which allows us to create a new express application

const publicDirectoryPath = path.join(__dirname, '../public');
const templatesPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express()
const name = 'Siddhi Jadhav'
const port = process.env.PORT || 3000

app.set('view engine', 'hbs');
app.set('views', templatesPath);
hbs.registerPartials(partialsPath);
app.use(cors({
    origin: '*'
}));
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "Hey dont worry we are here to help you",
        name,
        title: 'Ask for help here'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error: 'please provide a valid address'
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {} ) => {
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, data) => {
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                data,
                location,
                address
            })
        })
    })
})

//the callback to get is a request handler function telling the server what it should do with the request.

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name,
        error: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        error: "Page not FOUND",
        name
    });
})

app.listen(port, () => {
    console.log('server is up');
})