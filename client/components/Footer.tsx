
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react'


const Footer = () => {


    let [isShowing, setIsShowing] = useState(false)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsShowing(true);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);
    return (
        <Transition
            className=""
            show={isShowing}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 -translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-1"
        >
            <nav className="rounded mx-auto max-w-[850px] px-4">
                <div className="h-36 mt-6 flex flex-row justify-between items-center">
                    <div className="text-2xl font-semibold ">
                        <a href="https://github.com/kevingil/interior-designer">Github</a>
                    </div>
                    <ul className="space-x-4 flex gap-4">
                        <li>
                            <p>Made with ❤️ in SF</p>
                        </li>

                    </ul>
                </div>

            </nav>
        </Transition>
    );
};

export default Footer;
