import React from 'react';
import Link from 'next/link';
import { getCookieByKey } from '../helper/Cookie';

const role = getCookieByKey('role');

const BottomNavbar = () => {
  return (
    <>
        {role === 'warga' && (
            <nav className="fixed bottom-0 bg-gray-900 flex justify-around items-center w-full max-w-md py-4 px-4">
                <NavItem href="/dashboard" icon={<HomeIcon />} />
                <NavItem href="/dashboard/create-surat" icon={<AddIcon />}  />
                <NavItem href="/dashboard/profile" icon={<ProfileIcon />}  />
            </nav>
        )}
        {role !== 'warga' && (
            <nav className="fixed bottom-0 bg-gray-900 flex justify-around items-center w-full max-w-md py-4 px-4">
                <NavItem href="/dashboard" icon={<HomeIcon />} />
                <NavItem href="/dashboard/profile" icon={<ProfileIcon />}  />
            </nav>
        )}
    </>
  );
};

const NavItem = ({ href, label, icon }) => {
  return (
    <Link href={href}>
      <p className="flex flex-col items-center text-white">
        {icon}
        <span className="text-lg">{label}</span>
      </p>
    </Link>
  );
};

const ProfileIcon = () => {
    return (
        <svg className="h-10 w-10 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
    );
};

const HomeIcon = () => {
    return (
        <svg 
            className="h-10 w-10 text-white"  
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            strokeWidth="2" 
            stroke="currentColor" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round">  
            <path stroke="none" d="M0 0h24v24H0z"/>  
            <polyline points="5 12 3 12 12 3 21 12 19 12" />  
            <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  
            <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
        </svg>
    );
  };

const AddIcon = () => {
    return (
        <svg className="h-10 w-10 text-white"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
    );
  };
  

export default BottomNavbar;
