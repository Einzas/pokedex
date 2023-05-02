import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useParams } from "react-router-dom";
import axios from "axios";
import  "../components/pokedex/Pokemon.css";
const backgroundByType = {
  normal: "bg-normal",
  fighting: "bg-red-500",
  flying: "bg-yellow-300",
  poison: "bg-purple-500",
  ground: "bg-yellow-900",
  rock: "bg-yellow-600",
  bug: "bg-green-500",
  ghost: "bg-purple-700",
  steel: "bg-gray-500",
  fire: "bg-orange-500",
  water: "bg-blue-500",
  grass: "bg-emerald-300",
  electric: "bg-yellow-400",
  psychic: "bg-purple-500",
  ice: "bg-blue-200",
  dragon: "bg-purple-900",
  dark: "bg-gray-800",
  fairy: "bg-pink-300",
  unknown: "bg-gray-400",
  shadow: "bg-gray-700",
};

const gradientByType = {
  normal: "bg-normal",
  fighting: "bg-gradient-to-b from-orange-800 to-orange-700",
  flying: "bg-gradient-to-b from-yellow-200 to-yellow-300",
  poison: "bg-gradient-to-b from-purple-400 to-purple-500",
  ground: "bg-gradient-to-b from-yellow-800 to-yellow-900",
  rock: "bg-gradient-to-b from-yellow-500 to-yellow-600",
  bug: "bg-gradient-to-b from-green-500 to-lime-500",
  ghost: "bg-gradient-to-b from-purple-600 to-purple-700",
  steel: "bg-gradient-to-b from-gray-400 to-gray-500",
  fire: "bg-gradient-to-b from-orange-600 to-orange-400",
  water: "bg-gradient-to-b from-blue-700 to-blue-500",
  grass: "bg-gradient-to-b from-teal-300 to-lime-200",
  electric: "bg-gradient-to-b from-yellow-300 to-yellow-400",
  psychic: "bg-gradient-to-b from-purple-400 to-purple-500",
  ice: "bg-gradient-to-b from-blue-100 to-blue-200",
  dragon: "bg-gradient-to-b from-purple-800 to-purple-900",
  dark: "bg-gradient-to-b from-gray-700 to-gray-800",
  fairy: "bg-gradient-to-b from-pink-200 to-pink-300",
  unknown: "bg-gradient-to-b from-gray-300 to-gray-400",
  shadow: "bg-gradient-to-b from-gray-600 to-gray-700",
};

const textColorsByType = {
  normal: "text-normal",
  fighting: "text-red-500",
  flying: "text-yellow-500",
  poison: "text-purple-500",
  ground: "text-yellow-900",
  rock: "text-yellow-600",
  bug: "text-green-500",
  ghost: "text-purple-700",
  steel: "text-gray-500",
  fire: "text-orange-600",
  water: "text-blue-500",
  grass: "text-emerald-800",
  electric: "text-yellow-400",
  psychic: "text-purple-500",
  ice: "text-blue-200",
  dragon: "text-purple-900",
  dark: "text-gray-800",
  fairy: "text-pink-300",
  unknown: "text-gray-400",
  shadow: "text-gray-700",
};
const PokemonId = () => {
  const [pokemon, setPokemon] = useState({});
  const { id } = useParams();
  const getPercentStatBar = (stat_base) => {
    return (stat_base * 100) / 255;
  };

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios
      .get(URL)
      .then((response) => {
        setPokemon(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <section className="bg-gray-100">
      <Header />
      {pokemon !== null ? (
        <section className="px-2 py-16 ">
          <article className="max-w-[768px] bg-  bg-white mx-auto shadow-xl p-2">
            <section
              className={`relative h-[150px]  ${
                pokemon.types && gradientByType[pokemon.types[0].type.name]
                  ? gradientByType[pokemon.types[0].type.name]
                  : ""
              }`}
            >
              <div className="w-[200px] absolute left-1/2 -translate-x-1/2 -top-14 mx-auto">
                <img
                  src={
                    pokemon?.sprites?.other["official-artwork"].front_default ?? "/images/who.png"
                  }
                  alt={pokemon?.name}
                />
              </div>
            </section>
            <div className="sm:mx-16">
              <section className=" mt-8">
                <div
                  className={`${
                    pokemon.types &&
                    textColorsByType[pokemon?.types[0]?.type.name]
                  }`}
                >
                  <div className="grid  place-content-center ">
                    <h3 className="border px-2 ">#{pokemon.id}</h3>
                  </div>
                  <div className="grid mt-4 grid-cols-[1fr_auto_1fr] items-center gap-2 capitalize font-bold">
                    <hr />
                    <h2 className="text-2xl">{pokemon?.name}</h2>
                    <hr />
                  </div>
                </div>
                <div className="flex mt-4 justify-center gap-6 text-center">
                  <div>
                    <h5 className="text-[10px]">Weight</h5>
                    <span className="text-sm">{pokemon.weight}</span>
                  </div>
                  <div>
                    <h5 className="text-[10px]">Height</h5>
                    <span className="text-sm">{pokemon.height}</span>
                  </div>
                </div>
                <section className="grid sm:grid-cols-2 gap-4">
                  <section className="text-center">
                    <h3 className="text-sm">Types</h3>
                    <section className="grid grid-cols-2 mt-2 gap-4 capitalize">
                      {pokemon.types?.map((type) => (
                        <article
                          className={`p-2 px-8 border-[1px] text-white border-gray-300 text-center ${
                            backgroundByType[type.type.name]
                          } ${pokemon.types.length === 1 ? "col-span-2 w-[180px] mx-auto": "" } `}
                          key={type.type.name}
                        >
                          <h5>{type.type.name}</h5>
                        </article>
                      ))}
                    </section>
                  </section>
                  <section className="text-center">
                    <h3 className="text-sm">Abylities</h3>
                    <section className="grid grid-cols-2 mt-2 gap-4 capitalize">
                      {pokemon.abilities?.map((ability) => (
                        <article
                          className={`p-2 truncate  px-8 border-[1px] border-gray-300 text-center`}
                          key={ability.ability.name}
                        >
                          {ability.ability.name}
                        </article>
                      ))}
                    </section>
                  </section>
                </section>
              </section>
              <section className="mt-5 py-16">
                <h3 className="text-3xl font-semibold">Stats</h3>
                <section>
                  {pokemon.stats?.map((stat) => (
                    <article className="mt-4" key={stat.stat.name}>
                      <section className="flex justify-between">
                        <h5 className="capitalize">{stat.stat.name}:</h5>
                        <span>{stat.base_stat}/150</span>
                      </section>
                      <div className="bg-gray-100 h-6 rounded-md">
                        <div
                          className={`h-full bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-md `}
                          style={{
                            width: `${getPercentStatBar(stat.base_stat)}%`,
                          }}
                        ></div>
                      </div>
                    </article>
                  ))}
                </section>
              </section>
            </div>
          </article>
          <article className="max-w-[768px]  mt-10 bg-white mx-auto shadow-xl p-2">
            <section className="mt-5 sm:mx-16">
              <h3 className="text-3xl">Moves</h3>
              <section className="mt-5 py-5 ">
                <article>
                  <section className="flex flex-wrap text-center  text-white gap-3 ">
                    {pokemon.moves?.map((move) => (
                      <h5 key={move.move.name} className="capitalize bg-gray-400 p-3 rounded-full">
                        {move.move.name}
                      </h5>
                    ))}
                  </section>
                </article>
              </section>
            </section>
          </article>
        </section>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
    </section>
  );
};

export default PokemonId;
