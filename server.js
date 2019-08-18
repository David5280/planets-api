const express = require('express'); //import express 
const morgan = require('morgan'); //import morgan for better http logging
const dbConnection = require('./db/seeds/connection'); //import file that connects us to our postgres database
const app = express(); // define app as the express framework
const environment = process.env.NODE_ENV || 'development'; //set default environment
const configuration = require('./knexfile')[environment]; //import knex configuration dile
const database = require('knex')(configuration) //define database

app.set('port', process.env.PORT || 3000); //default to port 3000 unless a process.env.PORT variable is passed in.
app.locals.title = 'Planets API';  //store app title in app.locals

app.use(morgan(process.env.NODE_ENV !== 'production' ? 'dev' : 'combined')); //use HTTP request logger middleware
app.use(express.json()); //use JSON parsing middleware

app.listen(app.get('port'), () => { //listen for connections to specified port
  console.log(`${app.locals.title} is running on http://localhost:${app.get ('port')}.`); //upon successful connection to client, console log message
});

app.get('/', (request, response) => { //set endpoint for root page
  response.send('Planets server is running'); //send response with confirmation
});

app.get('/api/v1/planets', (req, res) => { //set endpoint for getting all planets
  dbConnection('planets') //connect to database
    .select('*') //grab everything
    .then(planets => { //then
      if (!planets.length) { //if the planets array is empty
        return res.status(404).send("Can't find planets at this time.") //return 404 error
      }
      res.status(200).json(planets) //if the planets array is populated, return the data
    })
    .catch(error => res.status(500).json({ error: error.message, stack: error.stack })) //return status 500 & error in case of server error
});

app.get('/api/v1/moons', (req, res) => { //set endpoint for getting all moons
  dbConnection('moons') //connect to moons database
    .select('*') //grab everything
    .then(moons => { //then
      if (!moons.length) { //if the moons array has no length
        return res.status(404).send("Can't find moons at this time.") //return status 404 with message
      }
      res.status(200).json(moons) //otherwise, return the data
    })
    .catch(error => res.status(500).json({ error: error.message, stack: error.stack })) //return status 500 & error in case of server error
});

app.get('/api/v1/planets/:id', (req, res) => { //set endpoint for getting specific planet
  dbConnection('planets') //connect to planets database
    .select('*') //grab everything - with these specifications:
    .limit(1) //limit to one object
    .where({ id:  req.params.id}) //object id must match the provided request parameter of id
    .then(planet => { //then
      if (!planet.length) { //if returned data is empty
        return res.status(404).send("This planet does not exist.") //return status 404 error
      }
      res.status(200).json(planet) //otherwise, return planet object
    })
    .catch(error => res.status(500).json({ error: error.message, stack: error.stack })) //throw status 500 error in case of server error
});

app.get('/api/v1/moons/:id', (req, res) => { //set endpoint for getting specific moon
  dbConnection('moons') //connect to moons database
    .select('*') //grab everything - with these specifications:
    .limit(1) //limit to one object
    .where({ id:  req.params.id}) //object id must match the provided request parameter of id
    .then(moon => { //then
      if (!moon.length) { //if returned data is empty
        return res.status(404).send("This moon does not exist.") //return status 404 error
      }
      res.status(200).json(moon) //otherwise, return the data
    })
    .catch(error => res.status(500).json({ error: error.message, stack: error.stack })) //throw status 500 error in case of server error
});

app.post('/api/v1/planets', (req, res) => { //set endpoint for adding new planew
  for (let requiredParameter of ['title', 'milesFromSun', 'climate', 'sunRevolution', 'atmosphere', 'moons', 'description', 'travelTime', 'diameter', 'gravity', 'averageTemp', 'dayLength', 'image', 'namesake', 'discovery', 'successfulMissions', 'image2', 'cutout']) { //defining all required parameters
    if (!req.body[requiredParameter]) { //if the request body is missing an of these
      return res  
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` }); //return 422, unprocessable entity error
    }
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
  } //defining planet with req.body information to work with database

  database('planets').insert(planet, 'id') //connect to planets database, insert new planet
    .then(planet => { //then
      res.status(201).json({ id: planet[0] }) //return status 201 response with id of new planet
    })
    .catch(error => {
      res.status(500).json({ error: error.message, stack: error.stack }) //throw status 500 error in case of server error
    })
});

app.post('/api/v1/moons', async (req, res) => { //set endpoint for adding new moon
  for (let requiredParameter of ['title', 'hostPlanet']) { //define required parameters
    if (!req.body[requiredParameter]) { //if the request body is missing any of those required parameters
      return res 
        .status(422)
        .send({ error: `You're missing a "${requiredParameter}" property.` }); //return 422, unprocessable entity error
    }
  }

  getForeignId = async () => { //define async function to match moon to host planet
    const planets = await dbConnection('planets') 
      .select('title', 'id') //capture all planet ids and titles in variable
    const matchingPlanet = await planets.find(planet => { //iterate through current planets in database
        if (planet.title === req.body.hostPlanet) { //match planet with specified hostPlanet
          return planet.id
        }
      })
      if (!await matchingPlanet) { //if no hostPlanet is found
        return res.status(404).send(`No host planet named ${req.body.hostPlanet} was found.`) //throw 404 not found error
      }
    return await matchingPlanet.id //otherwise, return the planets id to be used as the moons foreign id
  }

  const moon = {
    moon: req.body.title,
    planetId: await getForeignId()
  } //define our moon object to work with database

  await database('moons').insert(await moon, 'id') //connect to moons database, insert new moon
    .then(moon => { //then
      res.status(201).json({ id: moon[0] }) //return 201, created with id of new moon object 
    })
    .catch(error => {
      res.status(500).json({ error: error.message, stack: error.stack })
    }) //throw status 500 error in case of server error
});

app.delete('/api/v1/planets/:id', (req, res) => { //set endpoint for deleting specific planet
  const requestId = req.params.id; //capture provided id in variable
  dbConnection('planets') //connect to planets database
    .where({ id: requestId }) //find the data whose id matches the provided id
    .del() //delete that data
    .then(() => res.status(202).json({ //then return 202, successful
      message: `Planet ${requestId} has been deleted.` //with confirmation
    }))
    .catch(error => res.status(500).send(error)) //throw status 500 error in case of server error
});

app.delete('/api/v1/moons/:id', (req, res) => { //set endpoint for deleting one moon
  const requestId = req.params.id; //capture provided id in a variable
  dbConnection('moons') //connect to moons database
    .where({ id: requestId }) //find data whose id matches provided id
    .del() //delete that data
    .then(() => res.status(202).json({  //then return 202, successful
      message: `Moon ${requestId} has been deleted.` //with message
    }))
    .catch(error => res.status(500).send(error)) //throw status 500 error in case of server error
});


  