import React from "react";
import Footer from "../components/Footer";
import { useDispatch } from "react-redux";
import { setNameTrainer } from "../store/slices/nameTrainer.slice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setNameTrainer(e.target.nameTrainer.value));
    navigate("/pokedex");
  };

  return (
    <section className="min-h-screen grid  grid-rows-[1fr_auto]">
      <section className=" grid place-content-center">
        <article className="grid gap-6">
          <div className="max-w-sm">
            <img src="/images/pokedex.png" alt="" />
          </div>
          <div>
            <h2 className="text-red-500 font-bold text-center text-4xl">
              Hi Trainer!
            </h2>
            <p className="font-semibold text-center">
              Give me your name, to start:{" "}
            </p>
          </div>
          <form className="mx-auto" onSubmit={handleSubmit}>
            <input className="border py-2 px-4 border-b-[2px] shadow shadow-gray-200 border-gray-200" type="text" id="nameTrainer" placeholder="Your name..." />
            <button className="bg-red-500 text-white px-5 py-2">Start</button>
          </form>
        </article>
      </section>
      <Footer />
    </section>
  );
};

export default Home;
