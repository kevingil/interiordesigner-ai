import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='main w-full h-full'>
        <Navigation/>
        <main className='pt-[68px] pb-[200px]'>{children}</main>
        <Footer/>
    </div>
  );
};

export default Layout;
