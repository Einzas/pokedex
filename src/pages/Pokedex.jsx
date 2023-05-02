import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";
import Footer from "../components/pokedex/Footer";

const Pokedex = () => {
  const URL_BASE = "https://pokeapi.co/api/v2/pokemon?limit=1281";
  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState("");
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [quantity, setQuantity] = useState(12);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  const nameTrainer = useSelector((store) => store.nameTrainer);

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value);
  };

  const pokemonByName = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(pokemonName.toLowerCase())
  );

  const paginationLogic = () => {
    const POKEMONS_PER_PAGE = quantity;
    const sliceStart = (currentPage - 1) * POKEMONS_PER_PAGE;
    const sliceEnd = sliceStart + POKEMONS_PER_PAGE;
    const pokemonInPage = pokemonByName.slice(sliceStart, sliceEnd);
    const lastPage = Math.ceil(pokemonByName.length / POKEMONS_PER_PAGE) || 1;
    const PAGES_PER_BLOCK = 5;
    const actualBlock = Math.ceil(currentPage / PAGES_PER_BLOCK);
    const pagesInBlock = [];
    const minPage = (actualBlock - 1) * PAGES_PER_BLOCK + 1;
    const maxPage = actualBlock * PAGES_PER_BLOCK;
    for (let i = minPage; i <= maxPage; i++) {
      if (i <= lastPage) pagesInBlock.push(i);
    }

    return {
      pokemonInPage,
      lastPage,
      pagesInBlock,
    };
  };

  const { pokemonInPage, lastPage, pagesInBlock } = paginationLogic();

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({
      behavior: "smooth",
    });
  };
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  useEffect(() => {
    if (!currentType) {
      axios
        .get(URL_BASE)
        .then((response) => setPokemons(response.data.results))
        .catch((error) => console.log(error));
    }
  }, [currentType]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type/";
    axios
      .get(URL)
      .then((response) => {
        const newTypes = response.data.results.map((type) => type.name);
        setTypes(newTypes);
      })
      .catch((error) => console.log(error));
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemonName, currentType]);

  const handleClickPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleClickNextPage = () => {
    if (currentPage < lastPage) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (currentType) {
      const URL = `https://pokeapi.co/api/v2/type/${currentType}`;
      axios

        .get(URL)
        .then((response) => {
          const pokemonsByType = response.data.pokemon.map(
            (pokemon) => pokemon.pokemon
          );
          setPokemons(pokemonsByType);
        })
        .catch((error) => console.log(error));
    }
  }, [currentType]);

  return (
    <section className="min-h-screen">
      <Header />
      <div className="mx-4 sm:px-16">
        <section className=" grid gap-6 py-6 ">
          <h3>
            <span id="top" className="text-red-500  font-bold">
              Welcome {nameTrainer}
            </span>
            , here you can find your favorite pokemon
          </h3>
          <form  onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-[auto_1fr] justify-between gap-4">
              <div className="flex">
                <input
                  className="border py-2 sm:w-[400px] px-3 border-b-[2px] shadow shadow-gray-200  border-gray-200"
                  id="pokemonName"
                  type="text"
                  placeholder="Search your pokemon"
                />
                <button className="bg-red-500 text-white px-3 sm:px-10 py-2">
                  Search
                </button>
              </div>
              <select
                className="py-2"
                onChange={(e) => setCurrentType(e.target.value)}
              >
                <option className="" value="">
                  All
                </option>
                {types.map((type) => (
                  <option className="capitalize " key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="flex items-center gap-3">
                <label>Quantity:</label>
                <select
                  className="py-3"
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  <option value=""> -</option>
                  <option value="4">4</option>
                  <option value="8">8</option>
                  <option value="12">12</option>
                  <option value="20">20</option>
                  <option value="32">32</option>
                  <option value="64">64</option>
                  <option value="128">128</option>
                  <option value="256">256</option>
                </select>
              </div>
            </div>
          </form>
        </section>

        <section className="grid gap-6 grid-cols-1 md:grid-cols-[repeat(2,minmax(0,1fr))] lg:grid-cols-[repeat(3,minmax(0,1fr))] xl:grid-cols-4 ">
          {pokemonInPage?.map((pokemon) => (
            <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url} />
          ))}
        </section>

        <ul className="flex gap-3 justify-center py-5 px-2 flex-wrap ">
          <li
            onClick={() => setCurrentPage(1)}
            className={`p-3 cursor-pointer font-bold rounded-md bg-red-500 text-white ${
              currentPage === 1 ? "invisible" : ""
            } `}
          >
            {"<<"}
          </li>
          <li
            onClick={handleClickPreviousPage}
            className={`p-3 cursor-pointer font-bold rounded-md bg-red-500 text-white ${
              currentPage === 1 ? "invisible" : ""
            } `}
          >
            {"<"}
          </li>
          {pagesInBlock.map((numberPage) => (
            <li
              key={numberPage}
              className={`p-3 cursor-pointer font-bold rounded-md ${
                numberPage === currentPage
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
              onClick={() => setCurrentPage(numberPage)}
            >
              {numberPage}
            </li>
          ))}
          <li
            onClick={handleClickNextPage}
            className={`p-3 cursor-pointer font-bold rounded-md bg-red-500 text-white ${
              currentPage === lastPage ? "invisible" : ""
            }`}
          >
            {">"}
          </li>
          <li
            onClick={() => setCurrentPage(lastPage)}
            className={`p-3 cursor-pointer font-bold rounded-md bg-red-500 text-white ${
              currentPage === lastPage ? "invisible" : ""
            }`}
          >
            {">>"}
          </li>
        </ul>
        {showScrollToTop && (
          <button
            className="fixed bottom-5 right-5 bg-red-500 px-3 py-2 rounded-[100%]"
            onClick={() => scrollTo("top")}
          >
            <i className="bx bx-chevron-up text-white"></i>
          </button>
        )}
      </div>
      <Footer></Footer>
    </section>
  );
};

export default Pokedex;
