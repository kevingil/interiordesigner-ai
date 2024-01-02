import React, { Fragment, useState } from "react";
import Showcase from "../components/Showcase";
import Layout from "../components/Layout";


function Gallery() {
  return (
    <Layout>
    <section className="max-w-[900px] mx-auto mt-12 rounded-xl p-4 bg-black/50 feature">
        <h1 className="text-2xl">Contact</h1>
        <p className="mt-4">To contact me about this project, you can reach out to me at:</p>
        <ul className="list-disc list-inside">
        <li>
        <a href="mailto:kevin_gil@live.com">
          kevin_gil@live.com</a>
        </li>
        <li>
        <a href="
        https://www.linkedin.com/in/kevingil/">LinkedIn</a>
        </li>
        </ul>
        <p className="mt-4">Thank you</p>
    </section>
    </Layout>
  );
}

export default Gallery;
