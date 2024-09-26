'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Import usePathname

const SearchBar = () => {
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname(); // Get the current path

  // Check if token exists and parse the user role
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  let buyerId;

  if (token) {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      buyerId = decodedToken.userType;
    } catch (error) {
      buyerId = null;
    }
  }

  // Debounce effect to handle dynamic search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      // If user is logged in and on a /products route
      if (buyerId && pathname.includes('/products')) {
        if (searchQuery.trim()) {
          if (buyerId === 'buyer') {
            router.push(`/buyer/products?search=${searchQuery}`);
          } else {
            router.push(`/seller/products?search=${searchQuery}`);
          }
        } else if (searchQuery === '') {
          if (buyerId === 'buyer') {
            router.push('/buyer/products');
          } else {
            router.push('/seller/products');
          }
        }
      }
    }, 100);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, router, pathname, buyerId]);


  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className={`w-36 focus-within:w-56 group-focus-within:bg-black group relative text-white hover:bg-black hover:border-black focus-within:border-black hover:shadow-lg rounded-full border border-white transition-all duration-300 ${focused ? 'bg-black' : 'bg-transparent'}`}
    >
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          className="w-6 h-6"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </span>
      <input
        type="search"
        name="q"
        className="p-3 text-sm bg-transparent placeholder-gray-100 pl-10 outline-none antialiased overflow-ellipsis transition-all duration-300"
        spellCheck="false"
        placeholder="Search..."
        autoComplete="off"
        inputMode="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </form>
  );
};

export default SearchBar;
