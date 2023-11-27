import React from 'react';
import Link from 'next/link';

const UserHome: React.FC = () => {
  return (
    <div className="w-full rounded-xl p-4 bg-stone-900/90">
      <h1 className="text-4xl font-bold mb-8">Home Dashboard</h1>
      <Link href="/create" className="text-blue-500 underline mb-4">New Idea</Link>
    </div>
  );
};

export default UserHome;
