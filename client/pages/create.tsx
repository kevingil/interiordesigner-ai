import React, { Fragment, useState, useEffect } from "react";
import Layout from '../components/Layout';
import Sidebar from "../components/Sidebar";
import RenderArea from "../components/RenderArea";
import { Transition } from '@headlessui/react';

function Create() {

  let [isShowing, setIsShowing] = useState(false)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsShowing(true);
    }, 500);
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, []); 
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);


  const updateResponse = (api_res: any) => {
    setResponse(api_res);
  };

  return (
    <Layout>
      <div className="flex flex-col-reverse sm:flex-row gap-2 max-w-[900px] mx-auto">
      <Transition
        as={Fragment}
        show={isShowing}
        enter="transition-all ease-in-out duration-500 delay-[200ms]"
        enterFrom="opacity-0 translate-y-6"
        enterTo="opacity-100 translate-y-0"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      ><div className="bg-stone-900/50  rounded-xl shadow p-4 grow sm:max-h-[620px]"><RenderArea response={response} loading={loading} /></div>
      </Transition>
      <Transition
        as={Fragment}
        show={isShowing}
        enter="transition-opacity sm:transform sm:transition sm:ease-in-out duration-500 sm:duration-700"
        enterFrom="opacity-0 sm:translate-x-full"
        enterTo="opacity-100 sm:translate-x-0"
        leave="transition-opacity sm:transform sm:transition sm:ease-in-out duration-500 sm:duration-700"
        leaveFrom="opacity-100 sm:translate-x-0"
        leaveTo="opacity-0 sm:translate-x-full"
      ><div><Sidebar updateResponse={updateResponse} setLoading={setLoading} /></div>
      </Transition>
      </div>
    </Layout>
  );
}

export default Create;
