import React from "react";
import "./style.css";

function Navbar() {
  return (
    <div className="Navbar">
      <a href="/" style={{ color: "#30a7d7", marginRight: "20px", fontSize: "20px", textDecoration: "none" }}>Pokedex</a>
      <a href="/myPokemon" style={{ color: "#30a7d7", fontSize: "20px", textDecoration: "none" }}>My Pokemon List</a>
    </div>
  );
}

export default Navbar;
