const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs' ); 
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n',(error) => {
        if(error){
            console.log('Unable to append to log.');
        }
    });
    next();
});

app.use(express.static(__dirname + '/public'));  
hbs.registerHelper('getDate', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});
app.get('/', (req, res) => {
    
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Home Page'
        
    });
});

app.get('/about', (req, res) => {

    res.render('about.hbs', {
        pageTitle:'About Page'

    });
});

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Portfolio Page',
        welcomeMessage: 'This is portfolio page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is at port ${port}`)
});