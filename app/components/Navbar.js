'use client';

import React, { useState, useEffect } from 'react';
import SearchBar from './Searchbar';
import Loginbutton from './Loginbutton';
import Signupbutton from './Signupbutton';
import Logoutbutton from './Logoutbutton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [bgColor, setBgColor] = useState('bg-black');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    // Function to get userType from token
    const getUserType = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            return decodedToken.userType; // Extract the userType
        }
        return null;
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/');
    };

    const handleNavigation = (path) => {
        const userType = getUserType();
        if (userType === 'seller') {
            router.push(`/seller/${path}`);
        } else if (userType === 'buyer') {
            router.push(`/buyer/${path}`);
        } else {
            router.push('/');
        }
    };

    const checkLoginStatus = () => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    };

    useEffect(() => {
        checkLoginStatus(); 

        window.addEventListener('login', checkLoginStatus);

        return () => {
            window.removeEventListener('login', checkLoginStatus);
        };
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            if (scrollY > 50) {
                setBgColor('bg-black');
            } else {
                setBgColor('bg-black');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`fixed shadow-2xl opacity-85 top-0 left-0 right-0 flex items-center p-6 bg-blend-screen px-15 z-50 transition-colors duration-500 ${bgColor}`}>
            <ul className='flex gap-6'>
                {isLoggedIn && (
                    <>
                        <li className='hover:scale-125 cursor-pointer' onClick={() => handleNavigation('products')}>Products</li>
                        <li className='hover:scale-125 cursor-pointer' onClick={() => handleNavigation('auctions')}>Auctions</li>
                    </>
                )}
                <Link href='/about'>
                <li className='hover:scale-125'>About</li>
                </Link>
                <li className='hover:scale-125'>FAQ</li>
            </ul>



            <Link href='/' className='absolute left-1/2 transform -translate-x-1/2 flex'>
                <img src="/logo.png" alt="logo" className='size-10' />
                <h1 className='text-4xl font-mono'>JAZZEE</h1>
            </Link>



            <div className='flex items-center gap-4 ml-auto'>
                <SearchBar />
                {!isLoggedIn && (
                    <>
                        <Link href='/login'>
                            <Loginbutton />
                        </Link>
                        <Link href='/signup'>
                            <Signupbutton />
                        </Link>
                    </>
                )}
                {isLoggedIn && (
                    <div onClick={handleLogout}>
                        <Logoutbutton />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
