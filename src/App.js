import React from "react";
import Pokedex from "./pages/Pokedex";
import Pokemon from "./pages/PokemonDetail";
import { Route, Switch } from "react-router-dom";
import MyPokemon from "./pages/MyPokemon";

const App = () => (
  <Switch>
    <Route exact path="/" render={(props) => <Pokedex {...props} />} />
    <Route
      exact
      path="/pokemon/:pokemonId"
      render={(props) => <Pokemon {...props} />}
    />
    <Route exact path="/myPokemon" render={(props) => <MyPokemon {...props} />}/>
  </Switch>
);

export default App;
