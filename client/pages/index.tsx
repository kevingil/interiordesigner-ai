import React, { Fragment, useState } from "react";
import Showcase from "../components/Showcase";
import Image from 'next/image'
import Layout from "../components/Layout";
import Hero from "@/components/Hero";


function Index() {
  return (
    <Layout>
      <Hero/>
    </Layout>
  );
}

export default Index;
