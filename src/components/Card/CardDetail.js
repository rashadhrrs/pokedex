import React from "react";
import typeColors from "../../helpers/typeColors";
import "./style.css";

function CardDetail({ pokemon }) {
  return (
    <div className="Card">
      <div className="Card__img">
        {pokemon.nickName === undefined ? (
          <img src={pokemon.sprites.front_default} alt="" />
        ) : (
          <div>
            <img src={pokemon.image} alt="" />
            <div className="Card__nickname">{pokemon.nickName}</div>
          </div>
        )}
      </div>
      <div className="Card__name">{pokemon.name}</div>
      <div className="Card__types">
        {pokemon.types.map((type, i) => {
          return (
            <div
              key={i}
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
          {pokemon.nickName === undefined ? (
            <p>{pokemon.moves[0].move.name}</p>
          ) : (
            <p>{pokemon.moves}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardDetail;
