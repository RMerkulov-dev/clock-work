import React, { useState } from "react";
import MainLogo from "../assets/images/main_logo.png";
import { useRegisterModal } from "../hooks/useRegisterModal";
import { useLoginModal } from "../hooks/useLoginModal";
import { Button } from "../components";
import RegisterModal from "../components/modals/RegisterModal";

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const handleClick = () => {
    registerModal.onOpen();
  };

  return (
    <>
      <div className="container p-3 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg h-screen  ">
        <div className="flex items-center justify-between flex-col h-full">
          <div className="">
            <h1 className="text-center font-bold text-gray-300 text-2xl">
              Welcome to ClockWork
            </h1>
            <img src={MainLogo} alt="logo" className="" />
          </div>
          <div className="">
            <h2 className="text-center font-bold text-gray-300 text-2xl w-full ">
              Maximize Your Time,
              <br /> Achieve Your Goals
            </h2>
          </div>
          <ul className="flex items-center justify-center flex-col gap-4 w-full ">
            <li className="w-full">
              <Button label="Log in" onClick={handleClick} />
            </li>
            <li className="w-full">
              <Button label="Register" onClick={handleClick} />
            </li>
          </ul>
        </div>
      </div>
      <RegisterModal />
    </>
  );
};

export default MainPage;
