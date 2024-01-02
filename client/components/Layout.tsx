import React, { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className='main'>
        <Navigation/>
        <main>{children}</main>
        <Footer/>
    </div>
  );
};

export default Layout;
