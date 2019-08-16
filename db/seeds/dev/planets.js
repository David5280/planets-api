const planets = require('../../../planetData.js');
const moons = require('../../../moons.js');

const createPlanet = (knex, planet) => {
  return knex('planets').insert(
    planet, 'id')
  .then(planetId => {
    console.log(planetId)
    // let moonPromises = [];

    // paper.footnotes.forEach(footnote => {
    //   footnotePromises.push(
    //     createFootnote(knex, {
    //       note: footnote,
    //       paper_id: paperId[0]
    //     })
    //   )
    // });

    return Promise.all(footnotePromises);
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
        planetPromises.push(createPlanet(knex, planet));
      });

      return Promise.all(paperPromises);
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
