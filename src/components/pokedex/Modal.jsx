import React from "react";

const Modal = ({ isModalShow,setIsModalShow }) => {
  const handleCloseModal = () => {
    setIsModalShow(false);
  };

  const handleClickOutsideModal = (e) => {
    if (e.target === e.currentTarget) {
      setIsModalShow(false);
    }
  }

  return (
    <div
      className={`fixed z-10 flex justify-center items-center  top-0 left-0 bottom-0 right-0 bg-black/40 transition-opacity ${
        isModalShow ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={handleClickOutsideModal}
    >
      <div className="bg-white relative p-5 rounded-md mx-10">
        <span className="font-semibold text-2xl"> Social Media</span>

        <div>
          <img className="w-44" src="/images/perfil.png" alt="" />
        </div>
        <span>Einzas</span>
        <div>
          <a href="https://github.com/Einzas" target="_blank">
            <i className="bx hover:text-red-500 bxl-github text-2xl "></i>
          </a>
          <a href="https://www.linkedin.com/in/jeimy-jara-bautista-37383a240/" target="_blank">
            <i className="bx hover:text-red-500 bxl-linkedin-square text-2xl "></i>
          </a>

        </div>
        <i
          onClick={handleCloseModal}
          className="bx bx-x cursor-pointer absolute top-2 right-2 text-2xl hover:text-red-500  transition-colors "
        ></i>
        <span className="text-[4px]">BackYardigans Ceo's</span>
      </div>
    </div>
  );
};

export default Modal;
