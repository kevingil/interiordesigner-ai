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
    <nav className="rounded p-2 mx-auto mt-2 mb-12 flex flex-row justify-between items-center max-w-[900px]">
      <Transition
                show={isShowing}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="w-full"
            >
      <div className="text-2xl font-semibold home_title_nav">
        <Link href="/">Interior Designer.AI</Link>
      </div>
      <div className="space-x-4 flex justify-end gap-4 text-white">
        <a href="https://kevingil.com/contact">Contact</a>
        <a href="https://github.com/kevingil/interior-designer">Github</a>
      </div>
      </Transition>
    </nav>
  );
};

export default Navigation;
