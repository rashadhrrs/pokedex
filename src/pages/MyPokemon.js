import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import "./Pokedex.css";
import CardMyList from "../components/Card/CardMyList";
import db from "../firebase";
import { Button } from "@material-ui/core";
import swal from "sweetalert";

const MyPokemon = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    db.collection("myPokemon")
      .get()
      .then((snapshot) => {
        setPokemonData(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  function handleDelete(pokemon) {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        db.collection("myPokemon")
          .where("nickName", "==", pokemon.nickName)
          .get()
          .then((snapshot) => {
            snapshot.docs[0].ref.delete();
          });
        swal("Your Pokemon has been released!", {
          icon: "success",
        }).then(() => {
          db.collection("myPokemon")
            .get()
            .then((snapshot) => {
              console.log(snapshot);
              setPokemonData(snapshot.docs.map((doc) => doc.data()));
            });
        });
      } else {
        swal("Your pokemon is still here!");
      }
    });
  }

  return (
    <>
      <Navbar />
      {pokemonData.length !== 0 ? (
        <div className="grid-container" style={{ marginTop: "40px" }}>
          {pokemonData.map((pokemon, i) => {
            return (
              <div>
                <CardMyList key={i} pokemon={pokemon} />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    style={{
                      backgroundColor: "#9D1309",
                      color: "white",
                      width: "140px",
                    }}
                    variant="contained"
                    onClick={() => handleDelete(pokemon)}
                  >
                    Release
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          {" "}
          <span style={{ fontSize: "60px" }}>List is empty</span>{" "}
        </div>
      )}
    </>
  );
};

export default MyPokemon;
