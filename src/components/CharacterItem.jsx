import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CharacterItem = ({ characterURL }) => {
  const [character, setCharacter] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(characterURL).then((res) => setCharacter(res.data));
  }, []);

  return (
    <div className='character-item'>
      <div className="pokemon-img-div"><img src={character.sprites?.other["official-artwork"].front_default} alt="" className="pokemon-img" onClick={() => navigate(`/pokedex/${character.id}`)}/></div>
      <div>
      <h3 className="character-name">{character.name}</h3>
      <div className="type-pokemon">{character.types?.[0]?.type.name}</div><div className="type-pokemon">{character.types?.[1]?.type.name}</div>
      </div>
    </div>
  );
};

export default CharacterItem;
