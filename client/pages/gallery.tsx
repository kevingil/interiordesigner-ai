import React, { Fragment, useState } from "react";
import Showcase from "../components/Showcase";
import Layout from "../components/Layout";


function Gallery() {
  return (
    <Layout>
      <div className="max-w-[900px] mx-auto">
      <h1 className='text-4xl text-left my-12 px-4'>Gallery</h1>
      <Showcase/>
      </div>
    </Layout>
  );
}

export default Gallery;
