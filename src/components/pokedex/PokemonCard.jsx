import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const bordersByType = {
  normal: "border-normal",
  fighting: "border-orange-700",
  flying: "border-yellow-300",
  poison: "border-purple-800",
  ground: "border-yellow-800",
  rock: "border-stone-500",
  bug: "border-green-500",
  ghost: "border-blue-900",
  steel: "border-teal-900",
  fire: "border-orange-500",
  water: "border-blue-500",
  grass: "border-emerald-300",
  electric: "border-blue-800",
  psychic: "border-purple-500",
  ice: "border-cyan-300",
  dragon: "border-teal-600",
  dark: "border-gray-800",
  fairy: "border-pink-800",
  unknown: "border-gray-400",
  shadow: "border-gray-700",
};

const backgroundByType = {
  normal: "bg-normal",
  fighting: "bg-gradient-to-b from-orange-800 to-orange-700",
  flying: "bg-gradient-to-b from-yellow-200 to-yellow-300",
  poison: "bg-gradient-to-b from-purple-800 to-purple-400",
  ground: "bg-gradient-to-b from-yellow-900 to-yellow-700",
  rock: "bg-gradient-to-b from-stone-500 to-stone-400",
  bug: "bg-gradient-to-b from-green-500 to-lime-500",
  ghost: "bg-gradient-to-b from-indigo-900 to-indigo-700",
  steel: "bg-gradient-to-b from-teal-950 to-teal-900",
  fire: "bg-gradient-to-b from-orange-600 to-orange-400",
  water: "bg-gradient-to-b from-blue-700 to-blue-500",
  grass: "bg-gradient-to-b from-teal-300 to-lime-200",
  electric: "bg-gradient-to-b from-blue-900 to-blue-700",
  psychic: "bg-gradient-to-b from-purple-400 to-purple-500",
  ice: "bg-gradient-to-b from-cyan-400 to-cyan-200",
  dragon: "bg-gradient-to-b from-teal-600 to-teal-500",
  dark: "bg-gradient-to-b from-black to-gray-800",
  fairy: "bg-gradient-to-b from-pink-700 to-pink-500",
  unknown: "bg-gradient-to-b from-gray-300 to-gray-400",
  shadow: "bg-gradient-to-b from-gray-600 to-gray-700",
};

const textColorsByType = {
  normal: "text-gray-700",
  fighting: "text-orange-700",
  flying: "text-yellow-500",
  poison: "text-purple-500",
  ground: "text-yellow-900",
  rock: "text-stone-600",
  bug: "text-green-500",
  ghost: "text-indigo-700",
  steel: "text-teal-950",
  fire: "text-orange-600",
  water: "text-blue-500",
  grass: "text-emerald-800",
  electric: "text-blue-700",
  psychic: "text-purple-500",
  ice: "text-cyan-400",
  dragon: "text-teal-600",
  dark: "text-gray-800",
  fairy: "text-pink-800",
  unknown: "text-gray-400",
  shadow: "text-gray-700",
};

const PokemonCard = ({ pokemonUrl }) => {
  const [pokemon, setPokemon] = useState({});
  const types = pokemon?.types?.map((type) => type.type.name).join(" / ");
  useEffect(() => {
    axios
      .get(pokemonUrl)
      .then((response) => setPokemon(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      {pokemon?.name && (
        <Link to={`/pokedex/${pokemon?.id}`}
          className={`text-center border-8 bg- rounded-md ${
            bordersByType[pokemon?.types[0]?.type.name]
          }`}
        >
          {/* Upper section */}
          <section
            className={`h-[150px] relative  ${
              backgroundByType[pokemon.types[0].type.name]
            }`}
          >
            <div className="absolute -bottom-12 w-[200px] left-1/2 -translate-x-1/2 ">
              <img
                src={pokemon?.sprites.other["official-artwork"].front_default ?? "/images/who.png"}
                alt={pokemon?.name}
              />
            </div>
          </section>
          {/* Lower section */}
          <section>
            <h3 className={`mt-10 capitalize font-semibold text-2xl ${textColorsByType[pokemon?.types[0]?.type.name]} `}>{pokemon?.name}</h3>
            <h4 className="capitalize">{types}</h4>
            <span className="text-gray-400 text-[11px]">Type</span>
            <hr />
            <section className="grid grid-cols-2 pb-8 gap-2 p-2">
              {pokemon?.stats?.map((stat) => {
                return (
                  <div key={stat.stat.name}>
                    <h5 className="text-gray-400 text-[11px] text-sm uppercase">{stat.stat.name}</h5>
                    <span className={`font-semibold  ${textColorsByType[pokemon?.types[0]?.type.name]} `}>{stat.base_stat}</span>
                  </div>
                );
              })}
            </section>
          </section>
        </Link>
      )}
    </>
  );
};

export default PokemonCard;
