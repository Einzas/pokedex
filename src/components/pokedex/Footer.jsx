import React, { useState } from "react";
import Modal from "./Modal";

const Footer = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const toggleModal = () => {
    setIsModalShow(!isModalShow);
  };
  return (
    <footer className="text-center py-2 mb-3">
      <span onClick={toggleModal} className="text-red-500 cursor-pointer">
        © Derechos reservados ©
      </span>
      {isModalShow && (
        <Modal isModalShow={isModalShow} setIsModalShow={setIsModalShow} />
      )}
    </footer>
  );
};

export default Footer;
