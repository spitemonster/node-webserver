const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();
let port = 8888;

hbs.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}\n\tMethod: ${req.method} \n\tURL: ${req.url}`;
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append server log');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintenance');
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (str) => {
  return str.toUpperCase();
});

app.use(express.static(`${__dirname}/public`));

app.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Howdy there',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to fulfill this request'
  });
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
