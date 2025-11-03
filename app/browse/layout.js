import Header from "@/components/HeaderComp";
import React from "react";

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default layout;
