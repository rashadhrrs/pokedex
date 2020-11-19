import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { getPokemon, getAllPokemon } from "../services/pokemon";
import { Card, CardMedia, CardContent, Typography } from "@material-ui/core";
import "./Pokedex.css";
import db from "../firebase";

const Pokedex = (props) => {
  const { history } = props;
  const [pokemonData, setPokemonData] = useState([]);
  const [myPokemon, setMyPokemon] = useState([]);
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
    }
    fetchData();
  }, []);

  useEffect(() => {
    db.collection("myPokemon")
      .get()
      .then((snapshot) => {
        setMyPokemon(snapshot.docs.map((doc) => doc.data()));
      });
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
      <div style={{ margin: "40px" }}>
        <span style={{ fontSize: "30px", color: "white" }}>
          Pokemon owned: {myPokemon.length}{" "}
        </span>
      </div>
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
                return (
                  <Card
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={() => history.push(`/pokemon/${pokemon.id}`)}
                  >
                    <CardMedia
                      className="card-media"
                      image={pokemon.sprites.front_default}
                      style={{
                        width: "130px",
                        height: "130px",
                        margin: "auto",
                      }}
                    />
                    <CardContent
                      style={{
                        textAlign: "center",
                        textTransform: "capitalize",
                      }}
                    >
                      <Typography>{pokemon.name}</Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
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
