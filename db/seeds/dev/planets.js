const planets = require('../../../original data/planetData.js');
const moons = require('../../../original data/moons.js');

const mashData = () => {
  return planets.reduce((acc, planet) => {
    planet.moonsArr = [];
    moons.forEach(moon => {
      if (moon.hostPlanet === planet.title) {
        moon.moons.forEach(moon => {
          planet.moonsArr.push(moon)
        })
      }; 
    })
    acc.push(planet)
    return acc.sort();
  }, [])
};

const data = mashData()

const createPlanets = (knex, planet) => {
  return knex('planets').insert({
      title: planet.title,
      milesFromSun: planet.milesFromSun,
      climate: planet.climate,
      sunRevolution: planet.sunRevolution,
      atmosphere: planet.atmosphere,
      moons: planet.moons,
      description: planet.description,
      travelTime: planet.travelTime,
      diameter: planet.diameter,
      gravity: planet.gravity,
      averageTemp: planet.averageTemp,
      dayLength: planet.dayLength,
      image: planet.image,
      namesake: planet.namesake,
      discovery: planet.discovery,
      successfulMissions: planet.successfulMissions,
      image2: planet.image2,
      cutout: planet.cutout
    }, 'id')
  .then(planetId => {
    let moonPromises = [];
      planet.moonsArr.forEach(moon => {
        moonPromises.push(
          createMoon(knex, {
            moon: moon,
            planetId: planetId[0]
          })
        )
    });

    return Promise.all(moonPromises);
  })
};

const createMoon = (knex, moon) => {
  return knex('moons').insert(moon);
};

exports.seed = (knex) => {
  return knex('moons').del() // delete moons first
    .then(() => knex('planets').del()) // delete all planets
    .then(() => {
      let planetPromises = [];

      data.forEach(planet => {
        planetPromises.push(createPlanets(knex, planet));
      });

      return Promise.all(planetPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
