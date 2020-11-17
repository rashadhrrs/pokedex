import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
// /import Card from "../components/Card/Card";
import { getPokemon, getAllPokemon } from "../services/pokemon";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
//import { fade, makeStyles } from "@material-ui/core/styles";
import "./Pokedex.css";

// const useStyles = makeStyles((theme) => ({
//   pokedexContainer: {
//     paddingTop: "20px",
//     paddingLeft: "50px",
//     paddingRight: "50px",
//   },
//   cardMedia: {
//     margin: "auto",
//   },
//   cardContent: {
//     textAlign: "center",
//   },
//   searchContainer: {
//     display: "flex",
//     backgroundColor: fade(theme.palette.common.white, 0.15),
//     paddingLeft: "20px",
//     paddingRight: "20px",
//     marginTop: "5px",
//     marginBottom: "5px",
//   },
//   searchIcon: {
//     alignSelf: "flex-end",
//     marginBottom: "5px",
//   },
//   searchInput: {
//     width: "200px",
//     margin: "5px",
//   },
// }));

const Pokedex = (props) => {
  //const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
      console.log(response);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  return (
    <>
      <Navbar />
      <div>
        {loading ? (
          <h1 style={{ textAlign: "center" }}>Loading...</h1>
        ) : (
          <>
            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>

            <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                console.log(pokemonData);
                return (
                  <Card
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push(`/${pokemon.id}`)}
                  >
                    <CardMedia
                      className="card-media"
                      image={pokemon.sprites.front_default}
                      style={{ width: "130px", height: "130px", margin: "auto" }}
                    />
                    <CardContent style={{textAlign: "center", textTransform: "capitalize"}}>
                      <Typography>{pokemon.name}</Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* <div className="grid-container">
              {pokemonData.map((pokemon, i) => {
                console.log(pokemonData);
                return (
                  <Card
                    key={i}
                    pokemon={pokemon}
                    onClick={() => alert("ntapppp")}
                  />
                );
              })}
            </div> */}
            <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Pokedex;
