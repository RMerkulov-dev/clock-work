import React from "react";
import { ClipLoader } from "react-spinners";
import { LoaderProps } from "../../../typing";

const Loader = ({ label }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center gap-2 w-full h-full">
      <p>{label}</p>
      <ClipLoader size={25} />
    </div>
  );
};

export default Loader;
