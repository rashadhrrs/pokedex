import React, { useEffect, useState } from "react";
import { Typography, CircularProgress, Button } from "@material-ui/core";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import CardDetail from "../components/Card/CardDetail";
import db from "../firebase";
import swal from "sweetalert";

const PokemonDetail = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);
  const [nickName, setNickname] = useState("");
  const [success, setSuccess] = useState(undefined);

  const handleRegister = (pokemon) => {
    db.collection("myPokemon").add({
      pokemonId: pokemon.id,
      name: pokemon.name,
      weight: pokemon.weight,
      height: pokemon.height,
      types: pokemon.types,
      moves: pokemon.moves[0].move.name,
      image: pokemon.sprites.front_default,
      nickName: nickName,
    });
    swal({
      title: "Register success!",
      icon: "success",
    }).then(() => {
      history.push("/")
    })
  }

  function handleCatch() {
     const random1 = Math.floor(Math.random() * Math.floor(2));
    if (random1 === 0) {
      swal({
        title: "Good job!",
        icon: "success",
      });
      setSuccess("success");
    } else {
      swal({
        title: "Pokemon runaway!",
        icon: "error",
      })
    }
  }

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

  return (
    <>
      <Navbar />
      <div>
        {pokemon === undefined && <CircularProgress />}
        {pokemon !== undefined && pokemon && (
          <div>
            <div className="grid-container" style={{ marginTop: "40px" }}>
              <CardDetail pokemon={pokemon} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <Button
                style={{
                  backgroundColor: "#00FF33",
                  color: "white",
                  width: "240px",
                }}
                variant="contained"
                onClick={() => handleCatch(pokemon)}
              >
                Catch The Pokemon!
              </Button>
            </div>
          </div>
        )}
        {pokemon === false && <Typography> Pokemon not found</Typography>}
      </div>
      {success !== undefined && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <input
            style={{ marginRight: "20px" }}
            onChange={(e) => setNickname(e.target.value)}
            value= {nickName}
          />
          <Button
            style={{
              backgroundColor: "#30a7d7",
              color: "white",
            }}
            onClick={() => handleRegister(pokemon)}
          >
            Register to Pokedex
          </Button>
        </div>
      )}
    </>
  );
};

export default PokemonDetail;
