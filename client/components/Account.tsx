import React, { ReactNode } from 'react';
import AccountNav from './AccountNav';

interface AccountProps {
  children: ReactNode;
}

const Account: React.FC<AccountProps> = ({ children }) => {
  return (
    <div>
      <header>
        <h1>Dashboard App</h1>
      </header>
      <AccountNav/>
      <main>{children}</main>
    </div>
  );
};

export default Account;
