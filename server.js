const express = require('express');
const morgan = require('morgan')
const Joi = require('joi')
const dbConnection = require('./db/seeds/dev/connection')
const app = express();
const environment = process.env.NODE_ENV || 'development';

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Planets API';

app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined'));
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Planets server is running');
});

app.get('/api/v1/planets', (req, res) => {
  dbConnection('planets')
    .select('*')
    .then(planets => {
      if (!planets.length) {
        return res.status(404).send("Can't find planets at this time.")
      }
      res.status(200).json(planets)
    })
    .catch(error => res.status(500).json({ error: error.message, stack: error.stack }))
});

app.get('/api/v1/moons', (req, res) => {
  dbConnection('moons')
    .select('*')
    .then(moons => {
      if (!moons.length) {
        return res.status(404).send("Can't find moons at this time.")
      }
      res.status(200).json(moons)
    })
    .catch(error => res.status(500).json({ error: error.message, stack: error.stack }))
});

app.get('/api/v1/planets/:id', (req, res) => {
  dbConnection('planets')
    .select('*')
    .limit(1)
    .where({ id:  req.params.id})
    .then(planet => {
      if (!planet.length) {
        return res.status(404).send("This planet does not exist.")
      }
      res.status(200).json(planet)
    })
    .catch(error => res.status(500).json({ error: error.message, stack: error.stack }))
});

app.get('/api/v1/moons/:id', (req, res) => {
  dbConnection('moons')
    .select('*')
    .limit(1)
    .where({ id:  req.params.id})
    .then(moon => {
      if (!moon.length) {
        return res.status(404).send("This moon does not exist.")
      }
      res.status(200).json(moon)
    })
    .catch(error => res.status(500).json({ error: error.message, stack: error.stack }))
});

app.post('/api/v1/planets', (req, res) => {
  const schema = {
    title: Joi.string().min(1).required(),
    milesFromSun: Joi.string().min(1).required(),
    climate: Joi.string().min(1).required(),
    sunRevolution: Joi.string().min(1).required(),
    atmosphere: Joi.string().min(1).required(),
    moons: Joi.string().min(1).required(),
    description: Joi.string().min(25).required(),
    travelTime: Joi.string().min(1).required(),
    diameter: Joi.string().min(1).required(),
    gravity: Joi.string().min(1).required(),
    averageTemp: Joi.string().min(1).required(),
    dayLength: Joi.string().min(1).required(),
    image: Joi.string().min(5).required(),
    namesake: Joi.string().min(1).required(),
    discovery: Joi.string().min(1).required(),
    successfulMissions: Joi.string().min(1).required(),
    image2: Joi.string().min(1).required(),
    cutout: Joi.string().min(1).required()
  };
  const result = Joi.validate(req.body, schema);
  if(result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const planet = {
    title: req.body.title,
    milesFromSun: req.body.milesFromSun,
    climate: req.body.climate,
    sunRevolution: req.body.sunRevolution,
    atmosphere: req.body.atmosphere,
    moons: req.body.moons,
    description: req.body.description,
    travelTime: req.body.travelTime,
    diameter: req.body.diameter,
    gravity: req.body.gravity,
    averageTemp: req.body.averageTemp,
    dayLength: req.body.dayLength,
    image: req.body.image,
    namesake: req.body.namesake,
    discovery: req.body.discovery,
    successfulMissions: req.body.successfulMissions,
    image2: req.body.image2,
    cutout: req.body.cutout
  }
  res.send(planet.title)
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});
  