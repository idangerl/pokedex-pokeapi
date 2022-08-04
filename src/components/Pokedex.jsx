import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CharacterItem from "./CharacterItem";
import images from "../assets/img/images";
import { FcNext, FcPrevious } from "react-icons/fc";

const Pokedex = () => {
  const trainerName = useSelector((state) => state.trainerName);
  const [characters, setCharacters] = useState([]);
  const [inputCharacter, setInputCharacter] = useState("");
  const [typeItem, setTypeItem] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/?limit=1154&offset=0")
      .then((res) => setCharacters(res.data.results));

    axios
      .get(`https://pokeapi.co/api/v2/type/`)
      .then((res) => setTypeItem(res.data.results));
  }, []);

  const search = (e) => {
    e.preventDefault();
    navigate(`/pokedex/${inputCharacter}`);
  };

  const filterType = (e) => {
    axios.get(e.target.value).then((res) => setCharacters(res.data.pokemon));
    setPage(1);
  };

  const numberPokemons = 16;
  const lastIndex = page * numberPokemons;
  const firstIndex = lastIndex - numberPokemons;
  const pokemonPaginated = characters.slice(firstIndex, lastIndex);
  const lastPage = Math.ceil(characters.length / numberPokemons);

  return (
    <div className="pokedex-div">
      <img src={images.pokedexlogo} className="podedex-logo-pokedex" />
      <img src={images.pokeball} className="pokeball-pokedex" />
      <h1 className="welcome-name">
        Welcome <span className="name">{trainerName}</span>!, here you can find
        your pokémon.{" "}
      </h1>
      <div className="inputAndSearch">
        <div>
          <form onSubmit={search}>
            <input
              placeholder="search your pokemon"
              className="input-pokedex"
              type="text"
              value={inputCharacter}
              onChange={(e) => setInputCharacter(e.target.value)}
            />
            <button className="button-search">search</button>
          </form>
        </div>
        <div>
          <select className="select-pokedex" onChange={filterType}>
            <option>select a type of pokemon</option>
            {typeItem.map((item) => (
              <option key={item.url} value={item.url}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="ul-div">
        <ul className="pokedex-list">
          {pokemonPaginated?.map((character) => (
            <CharacterItem
              characterURL={
                character.url ? character.url : character.pokemon.url
              }
              key={character.name ? character.url : character.pokemon.url}
            />
          ))}
        </ul>
      <div className="buttons-page">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className='button-page'>
          <FcPrevious/>previus page
        </button>
        <button onClick={() => setPage(page + 1)} disabled={page === lastPage} className='button-page'>
        next page<FcNext/>
        </button>
      </div>
      </div>
    </div>
  );
};

export default Pokedex;
