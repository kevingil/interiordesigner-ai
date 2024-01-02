import Link from 'next/link';
import React from 'react';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react'
import Typed from 'typed.js';


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
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <>
      <div className='max-w-[900px] mx-auto'>
        <section id="hero-section" className=''>
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
                  className='signup-button border-solid text-xs sm:text-xl border-2 border-sky-500 mx-4 px-4 sm:px-8 py-2 sm:py-3 rounded-[3rem]'>Create Now</Link>
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
        <section className='flex flex-col sm:flex-row p-4 mt-12 mb-[200px]'>
          <div className='w-full'>
                <Image width={300} height={200}  alt="A description for the second image." src="/images/5f5de522-ff66-47bf-881f-6189f3cba4cc.png" className="w-full shadow-lg rounded-lg" />
          </div>
          <div className='w-full'></div>
        </section>
        <section className='flex flex-col sm:flex-row p-4 mb-[200px]'>
          <div className='w-full bg-zinc-800 rounded-xl p-4'>
                <p className='text-3xl font-semibold px-8'>
                Simple to use interface.
                </p>
                <p className='p-8'>
                  No need to learn complex software. Just pick a room to get new ideas.
                </p>
          </div>
          <div className='w-full flex justify-center'>
          <Image width={165} height={400} alt="Sidebar." src="/images/render-sidebar.png" className=" max-h-[400px] shadow-2xl rounded-lg"/>
          </div>
        </section>
      </div>
    </>

  );
};

export default Hero;
