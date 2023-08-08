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
      <div className="container  py-10 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg  h-screen">
        <div className="flex items-center   flex-col h-full">
          <div className=" md:mt-6 lg:mt-auto">
            <h1 className="font-extrabold text-transparent xs:text-4xl lg:text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-center">
              ClockWork
            </h1>
            <img src={MainLogo} alt="logo" className="w-[300px] " />
          </div>
          <div className="">
            <h2 className="font-extrabold text-transparent xs:text-xl lg:text-4xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Maximize Your Time,
              <br /> Achieve Your Goals
            </h2>
          </div>
          <ul className="flex items-center justify-center flex-col gap-4 md:w-full mt-auto ">
            <li className="xs:w-full md:w-2/4 ">
              <Button label="Log in" onClick={handleLoginOpen} />
            </li>
            <li className="xs:w-full md:w-2/4">
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
