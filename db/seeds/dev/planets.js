const planets = require('../../../planetData.js');
const moons = require('../../../moons.js');

const createPlanet = (knex, planet) => {
  return knex('moons').insert({
    title: planet.title,
    milesFromSun: planet.milesFromSun,
    climate: planet.climate,
    sunRevolution: planet.sunRevolution,
    atmosphere: planet.atmosphere,
    moons: planet.moons,
    description: planets.description,
    travelTime: planets.travelTime,
    diameter: planets.diameter,
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
    moonPromises.push(
      createMooon(knex, {
        
      })
    )
  })
}

exports.seed = function(knex) {
  return knex('moons').del()
    .then(() => knex('planets').del())

  .then(() => {
    Promise.all([
      knex('planets').insert(
        planets.map(planet => {
          return {
            title: planet.title,
            milesFromSun: planet.milesFromSun,
            climate: planet.climate,
            sunRevolution: planet.sunRevolution,
            atmosphere: planet.atmosphere,
            moons: planet.moons,
            description: planets.description,
            travelTime: planets.travelTime,
            diameter: planets.diameter,
            gravity: planet.gravity,
            averageTemp: planet.averageTemp,
            dayLength: planet.dayLength,
            image: planet.image,
            namesake: planet.namesake,
            discovery: planet.discovery,
            successfulMissions: planet.successfulMissions,
            image2: planet.image2,
            cutout: planet.cutout
          }
        }, 'id')
      )
      .then(planetId => {
        let moonPromises = [];

      })
    ]);
  })
};
