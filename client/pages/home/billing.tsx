import React from 'react';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import HomeSidebar from '@/components/HomeSidebar';

const Billing: React.FC = () => {
    const handleStripeButtonClick = () => {
        // Handle Stripe button click logic here
    };

    const user = "John Doe";
    const email = "johndoe@example.com";

    return (
        <div className="w-full h-full">
            <Navigation />
            <div className="flex mx-auto gap-4 max-w-[900px] ">
            <HomeSidebar />
            <div className="w-full rounded-xl p-4 bg-stone-900/90">
                <h1 className='text-2xl mb-2'>User Billing</h1>
                <p>User: {user}</p>
                <p>Email: {email}</p>
                <button onClick={handleStripeButtonClick} className='p-2 m-2 rounded-xl bg-purple-700'>
                    Stripe
                </button>
            </div>
            </div>
            <Footer />
        </div>
    );
};

export default Billing;
