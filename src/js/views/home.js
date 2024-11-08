import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Card from "../component/card";
import "../../styles/home.css";

export const Home = () => {
  const { store } = useContext(Context);
  const renderLoadingSpinner = () => (
    <div className="spinner-container d-flex justify-content-center align-items-center">
      <div className="spinner-grow text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  return (
    <div className="container mt-5">
      <h2>Characters</h2>
      <div className="d-flex overflow-x-scroll horizontal-scroll">
        {store.characters && store.characters.length > 0
          ? store.characters.map((character) => (
              <Card key={character.uid} data={character} type="people" />
            ))
          : renderLoadingSpinner()}
      </div>

      <h2>Planets</h2>
      <div className="d-flex overflow-x-scroll horizontal-scroll">
        {store.planets && store.planets.length > 0
          ? store.planets.map((planet) => (
              <Card key={planet.uid} data={planet} type="planets" />
            ))
          : renderLoadingSpinner()}
      </div>

      <h2>Starships</h2>
      <div className="d-flex overflow-x-scroll horizontal-scroll">
        {store.starships && store.starships.length > 0
          ? store.starships.map((starship) => (
              <Card key={starship.uid} data={starship} type="starships" />
            ))
          : renderLoadingSpinner()}
      </div>
    </div>
  );
};
