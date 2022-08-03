import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const CharacterDetail = () => {
  const [itemDetails, setItemDetails] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => setItemDetails(res.data));
  }, []);

  return (
    <div className="details-container">
    <div className="character-details">
      <div>
        <h1>
          <b>{itemDetails.name}</b>
        </h1>
        <img
          className="img-details"
          src={itemDetails.sprites?.other["official-artwork"].front_default}
          alt=""
        />
      </div>
      <div className="details-general">
      <div className="details-stats">
        <div>
          <h3><b>Height: </b><span>0.{itemDetails.height} m</span></h3>
        </div>
        <div>
          <h3><b>Weight: </b><span>{itemDetails.weight}00 g</span></h3>
        </div>
        <div>
          <h3><b>Type: </b><br /><span>{itemDetails.types?.[0]?.type.name} {itemDetails.types?.[1]?.type.name}</span></h3>
        </div>
      </div>
      <div className="details-combat">
        {itemDetails.stats?.map(stat=>(
          <div key={stat.stat.name}><h3>{stat.stat.name}</h3><span>{stat.base_stat} pts</span></div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default CharacterDetail;
