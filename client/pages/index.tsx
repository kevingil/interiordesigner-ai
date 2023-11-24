import React, { Fragment, useState } from "react";
import Showcase from "../components/Showcase";
import Footer from "../components/Footer";
import HomeNav from "@/components/HomeNav";


function Index() {
  return (
    <div className="w-full h-full">
      <HomeNav/>
      <Showcase />
      <Footer/>
    </div>
  );
}

export default Index;
