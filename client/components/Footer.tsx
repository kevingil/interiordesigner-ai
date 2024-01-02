
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react'
import Link from 'next/link';


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
		<footer className="max-w-[900px] mx-auto text-white pb-16 px-4 flex justify-between">
			<div className='text-left m-auto mx-0'>
				<p className="text-sm">
					Made with ❤️ in SF
				</p>
			</div>
			<div className="flex flex-col text-right">
				<p className="fill-white ">
					<Link href="/"
						className=" py-2 font-semibold hover:text-violet-400	">Home</Link>
				</p>
				
				<p className="fill-white ">
					<Link href="/contact"
						className=" py-2 font-semibold hover:text-violet-400	">Contact</Link>
				</p>

                <p className="fill-white ">
					<Link href="https://github.com/kevingil" target="_blank"
						className=" py-2 font-semibold hover:text-violet-400	">Github<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-4 h-4 mx-1 mb-[3px] inline">
							<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
						  </svg>
						  </Link>
				</p>
			</div>
		</footer>
    );
};

export default Footer;
