import React from "react";
import { FormDemo } from "./components/Form";
import { FaqDemo } from "./components/FAQ";

const page = () => {
  return (
    <div className="flex flex-col md:flex-row">
      
      <div className="w-full ">
        <FaqDemo />
      </div>
    </div>
  );
};

export default page;
