import React, { useState, useEffect } from 'react';
import { Listbox, Transition } from '@headlessui/react';

const space = ['Kitchen', 'Bath', 'Living Room', 'Dining Room'];
const style = ['Contemporary', 'Modern', 'Minimalist', 'Rustic', 'Industrial', 'Scandanavian', 'Maximalist', 'Mid-century modern'];
const color = ['Any', 'Glossy White', 'Matte Gray', 'Natural Maple', 'Walnut'];
const accent = ['Any', 'Satin Nickel', 'Polished Brass', 'Chrome', 'Matte Black', 'Bronze'];
const lighting = ['Sunlight', 'Ambient', 'Dark'];


function Sidebar(props: any) {

    let api_ping_url = '';
    let api_generate_url = '';

    if (process.env.NODE_ENV === 'development') {
        api_ping_url = "http://localhost:5000/api/ping"
        api_generate_url = "http://localhost:5000/api/stability_generate_test"
    } else {
        api_ping_url = "http://147.182.233.135:5000/api/ping"
        api_generate_url = "http://147.182.233.135:5000/api/stability_generate_test"
    }

    const [ping_message, setMessage] = useState("Testing connection");

    useEffect(() => {
        fetch(api_ping_url)
            .then((response) => response.json())
            .then((data) => {
                setMessage(data.message);
            })
            .catch((error) => {
                console.error('API error:', error)
                setMessage(`Offline`)
            });
    }, []);

    const [setspace, setSpaceSelect] = useState(space[0])
    const [setstyle, setStyleSelect] = useState(style[0])
    const [setcolor, setColorSelect] = useState(color[0])
    const [setaccent, setAccentSelect] = useState(accent[0])
    const [setlighting, setLightingSelect] = useState(lighting[0])
    const [setnum, setNumSelect] = useState(1)

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            const req = {
                space: setspace,
                style: setstyle,
                color: setcolor,
                accent: setaccent,
                lighting: setlighting,
                num: setnum,
            };
            props.setLoading(true);
            console.log(req);
            const response = await fetch(api_generate_url, {
                method: 'POST',
                body: JSON.stringify(req),
                headers: {
                    'Content-Type': 'application/json',
                },
            }

            );

            if (response.ok) {
                const responseData = await response.json();

                if (responseData.prompt) {
                    const prompt = responseData.prompt;
                    const img_qty = responseData.num;
                    const images = responseData.images;
                    props.updateResponse(responseData);
                    console.log('Prompt:', prompt);
                    console.log('Img qty:', img_qty);
                    console.log('Images:', images);
                } else {
                    console.error('API response does not contain combinedValues');
                }
            } else {
                console.error('API error:', response.statusText);
            } 
        } catch (error) {
            console.error('API error:', error);
        } finally {
            props.setLoading(false);
        }
    };


    return (
        <aside className="">
            <div className='bg-stone-900/50 backdrop-blur-sm rounded-xl p-4 sm:w-[250px]'>
                <p className='text-xl pb-4'>Generate <span className="inline text-sm hidden">({ping_message})</span></p>
                <div>
                    <form onSubmit={handleSubmit} className=''>
                        <div className="form">
                            <div>
                                <label className="block  mb-2">Space</label>

                                <Listbox value={setspace} onChange={setSpaceSelect}>
                                    <div className="relative mb-3">
                                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-zinc-600/50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className="block truncate">{setspace}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">

                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-50 cursor-pointer mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                {space.map((i) => (
                                                    <Listbox.Option
                                                        key={i}
                                                        className={({ active }) =>
                                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-zinc-100 text-zinc-900' : 'text-gray-900'
                                                            }`
                                                        }
                                                        value={i}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {i}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">

                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>


                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Style</label>
                                <Listbox value={setstyle} onChange={setStyleSelect}>
                                    <div className="relative mb-3">
                                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-zinc-600/50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className="block truncate">{setstyle}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">

                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-50 cursor-pointer mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                {style.map((i) => (
                                                    <Listbox.Option
                                                        key={i}
                                                        className={({ active }) =>
                                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-zinc-100 text-zinc-900' : 'text-gray-900'
                                                            }`
                                                        }
                                                        value={i}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {i}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">

                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Color</label>
                                <Listbox value={setcolor} onChange={setColorSelect}>
                                    <div className="relative mb-3">
                                        <Listbox.Button className="relative w-full  cursor-pointer rounded-lg bg-zinc-600/50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className="block truncate">{setcolor}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-50 cursor-pointer mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                {color.map((i) => (
                                                    <Listbox.Option
                                                        key={i}
                                                        className={({ active }) =>
                                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-zinc-100 text-zinc-900' : 'text-gray-900'
                                                            }`
                                                        }
                                                        value={i}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {i}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">

                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Accent</label>
                                <Listbox value={setaccent} onChange={setAccentSelect}>
                                    <div className="relative mb-3">
                                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-zinc-600/50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className="block truncate">{setaccent}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">

                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-50 cursor-pointer mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                {accent.map((i) => (
                                                    <Listbox.Option
                                                        key={i}
                                                        className={({ active }) =>
                                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-zinc-100 text-zinc-900' : 'text-gray-900'
                                                            }`
                                                        }
                                                        value={i}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {i}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">

                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2">Lighting</label>
                                <Listbox value={setlighting} onChange={setLightingSelect}>
                                    <div className="relative mb-3">
                                        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-zinc-600/50 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                            <span className="block truncate">{setlighting}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">

                                            </span>
                                        </Listbox.Button>
                                        <Transition
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <Listbox.Options className="absolute z-50 cursor-pointer mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                {lighting.map((i) => (
                                                    <Listbox.Option
                                                        key={i}
                                                        className={({ active }) =>
                                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-zinc-100 text-zinc-900' : 'text-gray-900'
                                                            }`
                                                        }
                                                        value={i}
                                                    >
                                                        {({ selected }) => (
                                                            <>
                                                                <span
                                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                        }`}
                                                                >
                                                                    {i}
                                                                </span>
                                                                {selected ? (
                                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-600">

                                                                    </span>
                                                                ) : null}
                                                            </>
                                                        )}
                                                    </Listbox.Option>
                                                ))}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>

                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">
                                Number of Images
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="4"
                                name="numberOfImages" value={setnum} onChange={(event) => setNumSelect(Number(event.target.value))}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-xl shadow-sm placeholder-gray-400
                                focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                disabled:bg-gray-50 text-gray-900 disabled:border-gray-200 disabled:shadow-none
                                invalid:border-pink-500" />
                        </div>
                        <button
                            id="submit_request"
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded"
                        >
                            Generate
                        </button>
                    </form>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
