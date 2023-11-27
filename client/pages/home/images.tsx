import React from 'react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import HomeSidebar from '@/components/HomeSidebar';

const Images: React.FC = () => {
    return (
        <div className="w-full h-full">
            <Navigation />
            <div className="flex mx-auto gap-4 max-w-[900px] ">
            <HomeSidebar />
            <div className="w-full rounded-xl p-4 bg-stone-900/90">
                <h1 className='text-2xl mb-2'>Images</h1>
                <div className='flex flex-cols'>
                    <div className="w-full min-h-[100px] bg-gray-300"></div>
                    <div className="w-full min-h-[100px] bg-gray-400"></div>
                </div>
                <div className='flex flex-cols'>
                    <div className="w-full min-h-[100px] bg-gray-600"></div>
                    <div className="w-full min-h-[100px] bg-gray-200"></div>
                </div>
            </div>
            </div>
            <Footer />
        </div>
    );
};

export default Images;
