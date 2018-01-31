'use strict';

const express = require('express');
const app = express();
//const expressLayouts = require('express-ejs-layouts');
const Chuck = require('chucknorris-io');
const client = new Chuck();

//configure app
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//app.use(expressLayouts);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/random', (req, res) => {
    client
        .getRandomJoke()
        .then(response => {
            res.send(`<p> ${response.value}</p>`);
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/categories', (req, res) => {
    if (!req.query.cat) {
        client
            .getJokeCategories()
            .then(response => {
                res.render('categories', { data: response });
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        client
            .getRandomJoke(req.query.cat)
            .then(response => {
                res.render('joke-by-category', { data: response });
            })
            .catch(err => {
                // handle error
            });
    }

});

app.get('/search', (req, res) => { });

//start app
app.listen(3000, () => {
    console.log('Easy web dev. 3000!');
});