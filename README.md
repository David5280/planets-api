# Space Out (Back End)
## Description
Space Out BE is a RESTful api built using NodeJS Express, Postgresql, and knex.  It provides information on all of the planets in our solar system, along with the names of their moons.  This API was built to work with another project of mine, [Space-Out](https://github.com/David5280/space-out), which was originally built using a [Google sheets to API converter](https://sheety.co/).  This API uses two tables with a single one-to-many relationship.


## Set Up

Clone down this repo, install the dependencies (npm install), and start the server (npm start).  It should be running on `localhost:3000`


# Endpoints
### All returned data is in JSON format

#### GET ALL PLANETS

| URL  | METHOD  | OPTIONS |  
|---|---|---|
| /api/v1/planets | "GET"  | Not Needed |<br />
**Response is an array of all planet objects in database:** [{<br /> **id**: 88,<br /> **title**: "Venus",<br /> **milesFromSun**: "67.24 million",<br /> **climate**: "The climate on Venus is widely known to be unpleasant...",<br /> **sunRevolution**: "224.7",<br /> **atmosphere**: "Carbon dioxide, nitrogen",<br /> **moons**: "0",<br /> **description**: "Second planet from the Sun...",<br /> **travelTime**: "1.25",<br /> **diameter**: "7,521 miles",<br /> **gravity**: "0.9",<br /> **averageTemp**: "896",<br /> **dayLength**: "243 Earth days",<br /> **image**: "image url",<br /> **namesake**: "Roman goddess of love and beauty",<br /> **discovery**: "Known to the ancients and visible to the naked eye",<br /> **successfulMissions**: "Mariner 2, Venera 4...",<br /> **image2**: "image2 url",<br /> **cutout**: "cutout url",<br /> **created_at**: "2019-08-18T03:58:43.108Z",<br /> **updated_at**: "2019-08-18T03:58:43.108Z"<br />}] |

#### GET ALL MOONS

| URL  | METHOD  | OPTIONS |
|---|---|---|
| /api/v1/moons | "GET"  | Not Needed |
**Response is an array of all moons in database:** [{<br /> **id**: 88,<br /> **moon**: "Deimos",<br /> **planetId**: 89,<br /> **created_at**: "2019-08-18T03:58:43.108Z",<br /> **updated_at**: "2019-08-18T03:58:43.108Z"<br />}] |

#### GET SPECIFIC PLANET

| URL  | METHOD  | OPTIONS |  
|---|---|---|
| /api/v1/planets/:id | "GET"  | Not Needed |<br />
**Response is a single planet object with matching id:** {<br /> **id**: 88,<br /> **title**: "Venus",<br /> **milesFromSun**: "67.24 million",<br /> **climate**: "The climate on Venus is widely known to be unpleasant...",<br /> **sunRevolution**: "224.7",<br /> **atmosphere**: "Carbon dioxide, nitrogen",<br /> **moons**: "0",<br /> **description**: "Second planet from the Sun...",<br /> **travelTime**: "1.25",<br /> **diameter**: "7,521 miles",<br /> **gravity**: "0.9",<br /> **averageTemp**: "896",<br /> **dayLength**: "243 Earth days",<br /> **image**: "image url",<br /> **namesake**: "Roman goddess of love and beauty",<br /> **discovery**: "Known to the ancients and visible to the naked eye",<br /> **successfulMissions**: "Mariner 2, Venera 4...",<br /> **image2**: "image2 url",<br /> **cutout**: "cutout url",<br /> **created_at**: "2019-08-18T03:58:43.108Z",<br /> **updated_at**: "2019-08-18T03:58:43.108Z"<br />} |

#### GET SPECIFIC MOON

| URL  | METHOD  | OPTIONS |
|---|---|---|
| /api/v1/moons/:id | "GET"  | Not Needed |
**Response is a single moon object with matching id:** {<br /> **id**: 88,<br /> **moon**: "Deimos",<br /> **planetId**: 89,<br /> **created_at**: "2019-08-18T03:58:43.108Z",<br /> **updated_at**: "2019-08-18T03:58:43.108Z"<br />} |

#### POST NEW PLANET

| URL  | METHOD  | OPTIONS |
|---|---|---|
| /api/v1/planets | "POST"  | **title**: *string* name of planet,<br />**milesFromSun**: *string*,<br /> **climate**: *string* brief description,<br /> **sunRevolution**: *string* length of one year,<br />**atmosphere**: *string* list of gases present,<br />**moons**: *string* number of moons,<br />**description**: *string* description of planet,<br />**travelTime**: *string* length relative to one earth year,<br />**diameter**: *string* miles in diameter,<br />**gravity**: *string* relative to Earth's gravity,<br />**averageTemp**: *string* Farenheight,<br />**dayLength**: *string* Number of Earth Days,<br />**image**: *string* image url,<br />**namesake**: *string* ,<br />**discovery**: *string* year and name if available,<br />**successfulMissions**: *string* list of successful spacecrafts,<br />**image2**: *string* second image url,<br />**cutout**: *string* cutout of planet |<br />
**Response is the newly generated id of the new planet**: {<br />**id**: 20 <br />} |

#### POST NEW MOON

| URL  | METHOD  | OPTIONS |
|---|---|---|
| /api/v1/moons | "POST"  | **moon**: *string* name of moon,<br />**hostPlanet**: *string* name of planet it orbits |<br />
**Response is the newly generated id of the new moon**: {<br />**id**: 89 <br />} |

#### DELETE EXISTING PLANET

| URL  | METHOD  | OPTIONS |
|---|---|---|
| /api/v1/planets/:id | "DELETE"  | Not Needed |
**Response is a confirmation of deletion**: {<br />**message**: "Planet [name of deleted planet] has been deleted." <br />} |

#### DELETE EXISTING MOON

| URL  | METHOD  | OPTIONS |
|---|---|---|
| /api/v1/moons/:id | "DELETE"  | Not Needed |
**Response is a confirmation of deletion**: {<br />**message**: "Moon [name of deleted moon] has been deleted." <br />} |
