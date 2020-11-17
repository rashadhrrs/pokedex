/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { Typography, Link, CircularProgress, Button } from "@material-ui/core";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import CardDetail from "../components/Card/CardDetail";
import { getPokemon, getAllPokemon } from "../services/pokemon";

const PokemonDetail = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  // const initialURL = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
  // const [pokemonData, setPokemonData] = useState([])
  const [pokemon, setPokemon] = useState(undefined);

  // useEffect(() => {
  //   async function fetchData() {
  //     let response = await getAllPokemon(initialURL)
  //     await loadPokemon(response.results)
  //     //await load(response.result)
  //     console.log(pokemonData)
  //   }
  //   fetchData();
  // }, [])

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  // const generatePokemonDetailJSX = (pokemon) => {
  //   const { name, id, species, height, weight, types, sprites } = pokemon;
  //   const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
  //   const { front_default } = sprites;
  //   return (
  //     <>
  //       <Typography variant="h1">
  //         {`${id}.`} {(name)}
  //         <img src={front_default} />
  //       </Typography>
  //       <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
  //       <Typography variant="h3">Pokemon Info</Typography>
  //       <Typography>
  //         {"Species: "}
  //         <Link href={species.url}>{species.name} </Link>
  //       </Typography>
  //       <Typography>Height: {height} </Typography>
  //       <Typography>Weight: {weight} </Typography>
  //       <Typography variant="h6"> Types:</Typography>
  //       {types.map((typeInfo) => {
  //         const { type } = typeInfo;
  //         const { name } = type;
  //         return <Typography key={name}> {`${name}`}</Typography>;
  //       })}
  //     </>
  //   );
  // };

  // return (
  //   <>
  //     {pokemon === undefined && <CircularProgress />}
  //     {pokemon !== undefined && pokemon && generatePokemonJSX(pokemon)}
  //     {pokemon === false && <Typography> Pokemon not found</Typography>}

  //     {pokemon !== undefined && (
  //       <Button variant="contained" onClick={() => history.push("/")}>
  //         back to pokedex
  //       </Button>
  //     )}
  //   </>
  // );

  return (
    <>
      <Navbar />
      <div>
        {pokemon === undefined && <CircularProgress />}
        {pokemon !== undefined && pokemon && (
          <div className="grid-container" style={{ marginTop: "40px" }}>
            <CardDetail pokemon={pokemon} />
          </div>
        )}
        {pokemon === false && <Typography> Pokemon not found</Typography>}
      </div>
      {pokemon !== undefined && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button
            style={{
              backgroundColor: "#30a7d7",
              color: "white",
              marginTop: "20px",
            }}
            variant="contained"
            onClick={() => history.push("/")}
          >
            back to pokedex
          </Button>
        </div>
      )}
    </>
  );
};

export default PokemonDetail;
