import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { Transition } from '@headlessui/react';



const Navigation = () => {
  let [isShowing, setIsShowing] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsShowing(true);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);
  return (
    <nav className="rounded p-2 mx-auto my-2 w-full flex justify-between items-center max-w-[900px]">
      <div className="text-2xl font-semibold home_title_nav">
        <Link href="/">Interior Designer.AI</Link>
      </div>
      <div className="space-x-4 flex justify-end gap-4 text-white">
      <Link href="/gallery">Gallery</Link>
      <Link href="/contact">Contact</Link>
        <a href="https://github.com/kevingil/interior-designer">Github</a>
      </div>
    </nav>
  );
};

export default Navigation;
