import React from "react";
import RegisterModal from "../components/modals/RegisterModal";

const handleClick = () => {};
const MainPage = () => {
  return (
    <div className="container bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg ">
      <h1>Main page Hello!</h1>
      <button>Open</button>
      <RegisterModal />
    </div>
  );
};

export default MainPage;
