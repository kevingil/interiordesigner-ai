import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment } from 'react';
import Image from 'next/image'

function RenderArea(props: any) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  function closeModal() {
    setIsOpen(false);
    setSelectedImageIndex(null);
  }

  function openModal(index: any) {
    setSelectedImageIndex(index);
    setIsOpen(true);
  }
  return (
    <div className="backdrop-blur-sm rounded-xl grow sm:h-full">
      <p className='text-xl'>Image Render</p>

      <div className="flex justify-center items-center w-ful h-full">
        {props.loading ? (
          <div className='w-full text-center'>
            <p>Generating... This can take up to 10s/image</p>
            <div className='m-8 flex content-center justify-center'>
              <Image src="/loading-grid.svg"
              alt="Loading"
              width={100}
              height={100}
              className='max-h-12' />
            </div>
          </div>
        ) : (
          props.response ? (
            <div className="text-white text-lg flex h-full ">
              <div className='flex flex-row flex-wrap gap-6 mt-6 sm:mt-0 content-center'>
                {props.response.images && Array.isArray(props.response.images) && props.response.images.length > 0 ? (
                  props.response.images.map((image: string, index: number, blurhash64: string) => (
                    <Image onClick={() => openModal(index)}
                      alt=""
                      key={index}
                      src={image}
                      width={300}
                      height={300}
                      blurDataURL={blurhash64}
                      className="mx-auto rounded-xl sm:max-h-[500px] cursor-pointer content-center"
                    />
                  ))
                ) : (
                  <div className="text-white text-lg">Failed to generate images.</div>
                )}
              </div>
            </div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="fill-gray-500 mx-auto my-28 h-[4rem]">
              <path d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z" />
            </svg>
          )
        )}
      </div>
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
                      <>
                        <p className='hidden'>Images Array: {JSON.stringify(props.response.images)}</p>
                        <Image
                          alt=""
                          src={props.response.images[selectedImageIndex]}
                          width={768}
                          height={600}
                          blurDataURL={"data:image/jpeg;base64," + props.response.blurhash64[selectedImageIndex]}
                          className="rounded-xl w-full"
                        />
                      </>
                    )}
                  </div>
                  <div className="mt-6 flex justify-end gap-4">
                    {selectedImageIndex !== null && (
                      <>
                      <a href={props.response.images[selectedImageIndex]} target="_blank"
                        download={props.response.images[selectedImageIndex]}
                        className="inline-flex justify-center rounded-md border-none border-transparent bg-zinc-500 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2">
                        Open
                      </a>
                      </>
                    )}
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
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


export default RenderArea;
