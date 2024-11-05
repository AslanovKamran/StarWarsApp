import React, { Component } from "react";
import './random-planet.css'
import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner/spinner";
import ErrorIndicator from "../error-indicator/error-indicator";

class RandomPlanet extends Component {


    swapiService = new SwapiService();

    state = {
        planet: {},
        loading: true,
        error: false
    };

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false,
            error: false
        });
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    }

    updatePlanet = () => {

        const id = Math.floor(Math.random() * 25) + 3;

        this.swapiService
            .getPlanetById(id)
            .then((planet) => this.onPlanetLoaded(planet))
            .catch(this.onError)
    }

   
    componentDidMount() {
        this.updatePlanet();
    }

    render() {
        const { planet, loading, error } = this.state;

        if (error) {
            return (<ErrorIndicator />)
        }

        const content = loading ? <Spinner /> : <PlanetView planet={planet} />;
        return (
            <>
                <div className="random-planet jumbotron rounded">
                    {content}
                </div>
            </>
        )
    }
}

const PlanetView = ({ planet }) => {

    const { id, name, population,
        rotationPeriod, diameter } = planet;

    return (
        <>
            <img className="planet-image"
                src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt={`Planet ${name}`} />
            <div>
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Population</span>
                        <span>{population}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Rotation Period</span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Diameter</span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default RandomPlanet