import Link from 'next/link';
import React from 'react';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react'
import Typed from 'typed.js';
import SidebarMock from './SidebarMock';


const Hero = () => {
  const el = React.useRef(null);
  let [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (el.current) {
      const typed = new Typed(el.current, {
        strings: ['next project.', 'next remodel.', 'dream home.'],
        typeSpeed: 100,
        smartBackspace: true,
        loop: true,
      });

      return () => {
        typed.destroy();
      };
    }


  }, [el.current]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsShowing(true);
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <div className='mx-auto'>
      <div className='bg-slate-900/10'>
        <section id="hero-section" className=' max-w-[900px] mx-auto'>
          <div className="text-content">
            <h3 className="main-heading">Brainstorm for your <br/><span className='text-white' ref={el} /></h3>
            <p className="subtext">With an easy to use interface <br /> powered by <span className='gradient_text'>AI.</span></p>
            <Transition
              className=""
              show={isShowing}
              enter="transition ease-out duration-500"
              enterFrom="opacity-0 -translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-1">
              <p className='text-center mx-4 my-8'>
                <Link id="home_create" href="/create" target="_self"
                  className='text-xs sm:text-xl mx-4 px-4 sm:px-8 py-2 sm:py-3 rounded-full'>Create Now</Link>
              </p>
            </Transition>
          </div>
          <div className='image-content'>
            <div className="hero-wrap">
              <picture className="hero-pictures">
                <Image width={300} height={200} alt="Kitchen design render." src="/images/e186b9b8-f20d-40a8-a344-65612195aeba.png" className="hero-picture1" />
              </picture>
              <picture className="hero-pictures">
                <Image width={300} height={200} alt="Living room design render." src="/images/0b3e69ea-846c-49c1-843b-003052c5506a.png" className="hero-picture2" />
              </picture>
              <picture className="hero-pictures">
                <Image width={300} height={200} alt="Living room design render 2." src="/images/93fa2314-ccb2-44c4-80cf-4e10953c9ad1.png" className="hero-picture3" />
              </picture>
            </div>
          </div>
        </section>
        </div>
        <div className='flex flex-col sm:flex-row p-4 mt-12 mb-[200px] gap-12 max-w-[900px] mx-auto'>
          <div className='w-full'>
                <Image width={300} height={200}  alt="A description for the second image." src="/images/5f5de522-ff66-47bf-881f-6189f3cba4cc.png" className="w-full shadow-lg rounded-lg" />
          </div>
          <div className='w-full my-auto feature'>
                <h3 className='text-3xl font-semibold mb-4'>
                Browse our gallery.
                </h3>
                <p className='mb-4'>
                  See what other people have generated with Interior Designer AI.
                </p>
          </div>
        </div>
        <div className='flex flex-col sm:flex-row p-4 mb-[100px] gap-12 max-w-[900px] mx-auto'>
          <div className='w-full my-auto feature'>
                <h3 className='text-3xl font-semibold mb-4'>
                Simple to use interface.
                </h3>
                <p className='mb-4'>
                  No need to learn complex software. Just pick a room type and style to get new ideas fast.
                </p>
          </div>
          <div className='w-full flex justify-center'>
          <SidebarMock/>
          </div>
        </div>
      </div>
    </>

  );
};

export default Hero;
