import React from "react";
import { Button } from "../components";

const handleClick = () => {};
const MainPage = () => {
  return (
    <div className="container bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg">
      <Button label="Button" onClick={handleClick} />
    </div>
  );
};

export default MainPage;
