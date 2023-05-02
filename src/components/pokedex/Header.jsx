import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setNameTrainer } from "../../store/slices/nameTrainer.slice";

const Header = () => {
  const dispatch = useDispatch();
  const handleClickLogout = () => {
    dispatch(setNameTrainer(""))
  }
  return (
    <section className="relative">
      <div className="h-16 bg-red-600 grid items-end">
        <Link to={"/pokedex/"} className="max-w-[200px] sm:max-w-[300px] ml-2 sm:ml-20  ">
            <img src="/images/pokedex.png" alt="" />
        </Link>
      </div>
      <div className="h-12 bg-black"></div>
      <div className="h-20 aspect-square rounded-full bg-white  border-[8px] border-black absolute -bottom-4 right-0 -translate-x-1/2 after:content-[''] after:h-14 after:aspect-square after:rounded-full after:bg-gray-700 after:absolute after:border-[7px] after:border-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 ">
        <i onClick={handleClickLogout} className="bx bx-log-out-circle absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10 left-1/2 cursor-pointer hover:text-red-500"></i>
      </div>
    </section>
  );
};

export default Header;
