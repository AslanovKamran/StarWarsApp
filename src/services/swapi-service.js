class SwapiService {

  _apiBaseUrl = 'https://swapi.dev/api';


  _extractIdFromObject(object) {
    const idRegEx = /\/([0-9]*)\/$/;
    const id = object.url.match(idRegEx)[1];
    return id;
  }

  
  _transformPlanet = (planet) => {
    const id = this._extractIdFromObject(planet);
    return {
      id: id,
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    }
  }

  _transformStarship = (starship) => {
    return {
      id: this._extractIdFromObject(starship),
      name: starship.name,
      model: starship.model,
      manufacturer: starship.manufacturer,
      costInCredits: starship.costInCredits,
      length: starship.length,
      crew: starship.crew,
      passengers: starship.passengers,
      cargoCapacity: starship.cargoCapacity
    };
  }

  _transformPerson = (person) => {
    return {
      id: this._extractIdFromObject(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birthYear,
      eyeColor: person.eyeColor
    };
  }


  async getResourceAsync(url) {
    const request = `${this._apiBaseUrl}${url}`;
    const response = await fetch(request);

    console.log(`Request = ${request}`);

    if (!response.ok) {
      throw new Error(`Couldn't fetch url ${url}; Error status code : ${response.status}`)
    }

    const body = await response.json();
    return body;
  }


  async getAllPeople() {
    const peopleUrl = `/people/`;
    const people = await this.getResourceAsync(peopleUrl);
    return people.results.map(person => this._transformPerson(person));
  }

  async getPersonById(id) {
    const personUrl = `/people/${id}/`;
    const person = await this.getResourceAsync(personUrl);
    return this._transformPerson(person);
  }


  
  async getAllPlanets() {
    const planetsUrl = `/planets/`;
    const planets = await this.getResourceAsync(planetsUrl);
    return planets.results.map(planet => this._transformPlanet(planet));
  }

  async getPlanetById(id) {
    const planetUrl = `/planets/${id}/`;
    const result = await this.getResourceAsync(planetUrl);
    return this._transformPlanet(result);

  }



  async getAllStarships() {
    const starshipsUrl = `/starships/`;
    const starships = await this.getResourceAsync(starshipsUrl);
    return starships.results.map(starship => this._transformStarship(starship));
  }

  async getStarshipById(id) {
    const starshipUrl = `/starships/${id}/`;
    const starship = await this.getResourceAsync(starshipUrl);
    return this._transformStarship(starship);
  }

}
export default SwapiService;