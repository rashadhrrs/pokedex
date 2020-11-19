import React from "react";
import typeColors from "../../helpers/typeColors";
import "./style.css";

function CardDetail({ pokemon }) {
  return (
    <div className="Card">
      <div className="Card__img">
        <img src={pokemon.image} alt="" />
      </div>
      <div className="Card__nickname">{pokemon.nickName}</div>
      <div className="Card__name">{pokemon.name}</div>
      <div className="Card__types">
        {pokemon.types.map((type) => {
          return (
            <div
              className="Card__type"
              style={{ backgroundColor: typeColors[type.type.name] }}
            >
              {type.type.name}
            </div>
          );
        })}
      </div>
      <div className="Card__info">
        <div className="Card__data Card__data--weight">
          <p className="title">Weight</p>
          <p>{pokemon.weight}</p>
        </div>
        <div className="Card__data Card__data--weight">
          <p className="title">Height</p>
          <p>{pokemon.height}</p>
        </div>
        <div className="Card__data Card__data--ability">
          <p className="title">Moves</p>
          <p>{pokemon.moves}</p>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
