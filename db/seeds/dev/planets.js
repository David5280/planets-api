const planets = require('../../../planetData.js');
const moons = require('../../../moons.js');

const mashData = (planets, moons) => {
  return planets.reduce((acc, planet) => {
    planet.moonsArr = [];
    moons.forEach(moon => {
      if (moon.hostPlanet === planet.title) {
        planet.moonsArr.push(moon.moons)
      } 
    })
    acc.push(planet)
    return acc;
  }, [])
}

const data = mashData(planets, moons)

const createPlanets = (knex, planet) => {
  return knex('planets').insert(
    planet, 'id')
  .then(planetId => {
    let moonPromises = [];

    planets.moonsArr.forEach(moon => {
      moonPromises.push(
        createMoon(knex, {
          moon: moon,
          hostPlanet: moon.hostPlanet,
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

      planets.forEach(planet => {
        planetPromises.push(createPlanets(knex, planet));
      });

      return Promise.all(planetPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
