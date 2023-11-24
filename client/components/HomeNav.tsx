import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react'
import Typed from 'typed.js';


const HomeNav = () => {
  const el = React.useRef(null);

  useEffect(() => {
    if (el.current) {
      const typed = new Typed(el.current, {
        strings: ['Design your dream home.', 'Design your dream kitchen.', 'Design your dream living room.', 'Design your dream bath.', 'Design your dream dining room.'],
        typeSpeed: 40,
        smartBackspace: true,
        loop: true,
      });

      return () => {
        typed.destroy();
      };
    }
  }, [el.current]);
  return (
    <>
      <Transition
        className=""
        show={true}
        enter="transition ease-out duration-400"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <nav className="rounded px-4 mx-auto h-20 flex justify-end items-center max-w-[900px]">
          <div className="space-x-4 flex justify-end gap-4 text-white">
            <a href="https://kevingil.com/contact">Contact</a>
            <a href="https://github.com/kevingil/interior-designer">Github</a>
          </div>
        </nav>
        <div className='h-64 px-6 sm:px-14 max-w-[900px] mx-auto'>
          <div className='text-left pt-8'>
            <p id='' className='text-2xl sm:text-3xl'><span className='text-4xl sm:text-5xl font-semibold'>Interior <span className='home_title'>Designer AI</span></span><br></br><span className='text-white' ref={el}/></p>
            <p className='text-right mx-4 my-8'>
              <Link id="home_create" href="/create"
                className='border-solid text-xs sm:text-xl border-2 border-sky-500 mx-4 px-4 sm:px-8 py-2 sm:py-3 rounded-[3rem]'>Create Now</Link></p>

          </div>
        </div>
      </Transition>
    </>

  );
};

export default HomeNav;
