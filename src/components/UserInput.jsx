import React, { useState } from "react";
import { changeUser } from "../store/trainerName.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import images from "../assets/img/images";

const UserInput = () => {
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    dispatch(changeUser(userName));
    navigate("/pokedex");
  };

  return (
    <div className="login-div">
      <div>
        <div className="pokeballDiv">
          <img src={images.pokeball} className="pokeball-login" />
        </div>
        <div>
          <img src={images.pokedexlogo} className="pokedex-login" />
        </div>
        <div className="form-div">
          <form onSubmit={submit}>
            <input
              className="input-name"
              type="text"
              placeholder="name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <br />
            <button className="button">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserInput;
