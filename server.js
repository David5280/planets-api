const express = require('express');
const morgan = require('morgan')
const app = express();
const dbConnection = require('./db/seeds/dev/connection')
const environment = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Planets API';

app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'))

app.get('/', (request, response) => {
  response.send('Planets server is running');
});

app.get('/api/v1/planets', (req, res) => {
  dbConnection('planets')
    .select('*')
    .then(planets => res.status(200).json(planets))
    .catch(error => res.status(500).json({ error: error.message, stack: error.stack }))
});

app.get('/api/v1/moons', (req, res) => {
  dbConnection('moons')
    .select('*')
    .then(moons => res.status(200).json(moons))
    .catch(error => res.status(500).json({ error: error.message, stack: error.stack }))
});

app.get('/api/v1/planets/:id', (req, res) => {
  dbConnection('planets')
    .select('*')
    .limit(1)
    .where({ id:  req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(500).json({ error: error.message, stack: error.stack }))
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
  