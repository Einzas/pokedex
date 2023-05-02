import React, { useState } from "react";
import "./Footer.css";
const Footer = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const toggleMusic = () => {
    const audioElement = document.getElementById("background-music");
    if (isMusicPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };
  return (
    <section className="relative">
      <div className="h-16 bg-red-600"></div>
      <div className="h-12 bg-black"></div>
      <div className="h-20 aspect-square rounded-full bg-white  border-[8px] border-black absolute bottom-0 left-1/2 -translate-x-1/2 after:content-[''] after:h-14 after:aspect-square after:rounded-full after:bg-zinc-900 after:absolute after:border-[7px] after:border-black after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 ">
        <div
          onClick={toggleMusic}
          className={`${
            isMusicPlaying ? "blink" : ""
          } bg-black h-10 w-10 rounded-full absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-white z-10 left-1/2 cursor-pointer hover:text-red-500`}
        ></div>
      </div>
      <audio id="background-music" src="/songs/intro.mp3" loop />
    </section>
  );
};

export default Footer;
