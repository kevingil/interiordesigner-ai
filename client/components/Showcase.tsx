import { Dialog, Transition } from '@headlessui/react'
import { useEffect, useState, Fragment } from 'react';
import Image from 'next/image'


function Showcase() {
  const [isOpen, setIsOpen] = useState(false);
  let [isShowing, setIsShowing] = useState(false)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsShowing(true);
    }, 500);
  
    return () => {
      clearTimeout(timeoutId);
    };
  }, []); 
  const [latestImages, setLatestImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  let api_gallery_latest_url = "";
  let blurredImage = "data:image/png;base64,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";

  function closeModal() {
    setIsOpen(false);
    setSelectedImageIndex(null);
  }

  function openModal(index: any) {
    setSelectedImageIndex(index);
    setIsOpen(true);
  }

  if (process.env.NODE_ENV === 'development') {
    api_gallery_latest_url = "https://localhost:5000/api/gallery_latest"
  } else {
    api_gallery_latest_url = "https://147.182.233.135:5000/api/gallery_latest"
  }

  useEffect(() => {
    async function fetchLatestImages() {
      try {
        const response = await fetch(api_gallery_latest_url);
        const data = await response.json();
        setLatestImages(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error retreiving images, server might be offline:", error);
      }
    }

    fetchLatestImages();
  }, []);



  return (
    <div className='max-w-[900px] mx-auto'>
      <Transition
                  className=""
                  show={isShowing}
                  enter="transition-all ease-in-out duration-300"
                  enterFrom="opacity-0 translate-y-6"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition-all ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
      <div className="bg-stone-900/50 backdrop-blur-sm rounded-xl shadow p-4 w-full mt-2">
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
          {isLoading ? (
            <>
              {[...Array(4)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-slate-700 rounded-xl max-h-[200px] w-full">
                    <div className='w-[70%] m-auto p-4'>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-gray-500">
                        <path d="M0 96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zM323.8 202.5c-4.5-6.6-11.9-10.5-19.8-10.5s-15.4 3.9-19.8 10.5l-87 127.6L170.7 297c-4.6-5.7-11.5-9-18.7-9s-14.2 3.3-18.7 9l-64 80c-5.8 7.2-6.9 17.1-2.9 25.4s12.4 13.6 21.6 13.6h96 32H424c8.9 0 17.1-4.9 21.2-12.8s3.6-17.4-1.4-24.7l-120-176zM112 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            !isLoading && latestImages.map((image, index) => {
              return (
                <div key={index} className="max-h-full overflow-hidden cursor-pointer sm:p-1">
                  <div className="h-full flex object-cover" key={index} onClick={() => openModal(index)}>
                    <Image
                      key={index}
                      src={image[4]}
                      width={300}
                      height={300}
                      placeholder="blur"
                      blurDataURL={blurredImage}
                      alt=""
                      priority={false}
                      className='rounded-xl shadow hover:shadow-xl object-cover h-full aspect-square cursor-pointer'
                    />
                  </div>
                
              </div>
              );
            })
          )}
        </div>
      </div>
      </Transition>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-2 sm:p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full bg-zinc-900 max-w-3xl transform overflow-hidden rounded-2xl py-4 sm:py-6 px-6 sm:px-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white pb-2"
                  >
                    Render
                  </Dialog.Title>
                  <div className="mt-2 w-full">
                    {selectedImageIndex !== null && (
                      <Image
                        src={latestImages[selectedImageIndex][4]}
                        width={768}
                        height={600}
                        alt=""
                        priority={false}
                        className="rounded-xl w-full"
                        placeholder="blur" blurDataURL={blurredImage}
                      />
                    )}

                    {selectedImageIndex !== null && (
                      <div className='flex mt-4 gap-2 font-semibold text-xs sm:text-sm'>
                        <span className='px-2'>Date: {latestImages[selectedImageIndex][2]}</span>
                        <span className='px-2'>API: {latestImages[selectedImageIndex][3]}</span>
                        <span className='px-2'>Render time: {(Number(latestImages[selectedImageIndex][1])).toFixed(2) + "s"}</span>
                      </div>
                    )}

                  </div>

                  <div className="mt-6 flex justify-end gap-4">
                    {selectedImageIndex !== null && (
                      <a href={latestImages[selectedImageIndex][4]}
                        download={latestImages[selectedImageIndex][4]} target="_blank"
                        className="inline-flex justify-center rounded-md border-none border-transparent bg-zinc-500 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 focus:bg-zinc-700 focus:outline-none focus-visible:ring-0 focus-visible:ring-0 focus-visible:ring-0">
                        Open
                      </a>
                    )}
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:bg-purple-700 focus:outline-none focus-visible:ring-0 focus-visible:ring-0 focus-visible:ring-0"
                      onClick={closeModal}>
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>

  );
}

export default Showcase;
