import Link from 'next/link';
import React, { useState, useEffect } from "react";
import { Transition } from '@headlessui/react';



const Navigation = () => {
  let [isShowing, setIsShowing] = useState(false);
  let [menuOpen, setMenuOpen] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsShowing(true);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);
  return (
    <div className='z-50 fixed grow-0 w-full bg-black/90 backdrop-blur-sm shadow-md border-b border-violet-950/50'>
<nav className="rounded px-2 mx-auto my-3 mb-4 flex justify-between items-center max-w-[900px]">
      <div className="text-2xl font-semibold home_title_nav">
        <Link href="/">Interior Designer.AI</Link>
      </div>
      <div className="space-x-4 hidden sm:flex justify-end gap-4 text-white">
      <Link href="/gallery">Gallery</Link>
      <Link href="/contact">Contact</Link>
      <a href="https://github.com/kevingil/interiordesigner-ai">Github ↗</a>
      </div>
      <div className="flex sm:hidden">
        <button
          type="button"
          className="text-white rounded-md border p-2 border-violet-900/50"
          aria-label="toggle menu"
          onClick={() => setMenuOpen(!menuOpen)} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>

          </button>
        </div>
    </nav>
     <Transition show={menuOpen}
     enter="transition ease-out duration-500"
     enterFrom="opacity-0 -translate-y-1"
     enterTo="opacity-100 translate-y-0"
     leave="transition ease-in duration-400"
     leaveFrom="opacity-100 translate-y-0"
     leaveTo="opacity-0 -translate-y-1">
        <div className="flex flex-col gap-4 text-2xl p-4 pb-8 sm:hidden">
        <Link href="/create">Create</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
          <a href="https://github.com/kevingil/interiordesigner-ai">Github ↗</a>
        </div>
      </Transition>
    </div>
    
  );
};

export default Navigation;
