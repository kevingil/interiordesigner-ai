import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const HomeSidebar: React.FC = () => {
    const router = useRouter();
    const { pathname } = router;
    const isActiveLink = (path: string) => {
        return pathname === path ? 'active' : '';
    };
  return (
    <div className="flex flex-col-reverse sm:flex-row gap-2 w-[200px] max-h-max">
                <aside className="w-full">
                    <ul className="p-2 rounded-xl bg-stone-900/90">
                        <li>
                            <Link href="/home" className={`block mb-2 px-4 p-2 rounded hover:bg-stone-800 ${isActiveLink('/home')}`}>
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/home/images" className={`block mb-2 px-4 p-2 rounded hover:bg-stone-800  ${isActiveLink('/home/images')}`}>
                                Images
                            </Link>
                        </li>
                        <li>
                            <Link href="/home/billing" className={`block mb-2 px-4 p-2 rounded hover:bg-stone-800  ${isActiveLink('/home/billing')}`}>
                                Billing
                            </Link>
                        </li>
                    </ul>
                </aside>
            </div>
  );
};

export default HomeSidebar;
