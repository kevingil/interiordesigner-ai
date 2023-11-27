import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';
import UserHome from "./home/UserHome";
import HomeSidebar from "@/components/HomeSidebar";

const Home: React.FC = () => {
    let [isShowing, setIsShowing] = useState(false);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsShowing(true);
        }, 500);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

    const router = useRouter();

    const isAuthenticated = true; 
    // Will check cookies for isAuthenticated

    if (!isAuthenticated) {
        router.push('/login');
    }    

    return (
        <div className="w-full h-full ">
            <Navigation />
            <div className="flex mx-auto gap-4 max-w-[900px] ">
            <HomeSidebar />
            <UserHome />
            </div>
            <Footer />
        </div>
    );
};

export default Home;
