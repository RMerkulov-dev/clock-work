import React, { useState } from "react";
import MainLogo from "../assets/images/main_logo.png";
import { useRegisterModal } from "../hooks/useRegisterModal";
import { useLoginModal } from "../hooks/useLoginModal";
import { Button } from "../components";
import RegisterModal from "../components/modals/RegisterModal";
import LoginModal from "../components/modals/LoginModal";

const MainPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const handleLoginOpen = () => {
    loginModal.onOpen();
  };
  const handleRegisterOpen = () => {
    registerModal.onOpen();
  };

  return (
    <>
      <div className="container  p-5 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg  h-screen  ">
        <div className="flex items-center justify-between flex-col h-full">
          <div className="">
            <h1 className="font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              ClockWork
            </h1>
            <img src={MainLogo} alt="logo" className="w-[300px] " />
          </div>
          <div className="">
            <h2 className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Maximize Your Time,
              <br /> Achieve Your Goals
            </h2>
          </div>
          <ul className="flex items-center justify-center flex-col gap-4 w-full ">
            <li className="w-full">
              <Button label="Log in" onClick={handleLoginOpen} />
            </li>
            <li className="w-full">
              <Button label="Register" onClick={handleRegisterOpen} />
            </li>
          </ul>
        </div>
      </div>
      <RegisterModal />
      <LoginModal />
    </>
  );
};

export default MainPage;
