'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [name, setName] = useState(''); // State for name
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('buyer'); // Default to 'buyer'
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, userType }), 
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      router.push('/login'); 
    } else {
      alert(data.error);
    }
  };

  return (
    <>
      <main className="mx-auto flex h-[80%] w-[30%] items-center justify-center bg-black bg-opacity-90 text-white mt-[10%]">
        <section className="flex w-[30rem] flex-col space-y-10 p-10">
          <div className="text-center text-4xl font-medium">Sign Up</div>
  
          <form onSubmit={handleSignup} className="flex flex-col space-y-10">
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-green-500">
              <input
                type="text"
                placeholder="Name"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
  
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-green-500">
              <input
                type="email"
                placeholder="Email"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
  
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-green-500">
              <input
                type="password"
                placeholder="Password"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
  
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="buyer"
                  checked={userType === 'buyer'}
                  onChange={() => setUserType('buyer')}
                  className="mr-2"
                />
                Buyer
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="seller"
                  checked={userType === 'seller'}
                  onChange={() => setUserType('seller')}
                  className="mr-2"
                />
                Seller
              </label>
            </div>
  
            <button
              type="submit"
              className="transform rounded-sm bg-green-600 py-2 font-bold duration-300 hover:bg-green-400"
            >
              SIGN UP
            </button>
          </form>
  
          <a
            href="#"
            className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
          >
            FORGOT PASSWORD?
          </a>
  
          <p className="text-center text-lg">
            Already have an account?{' '}
            <a
              href="/login"
              className="font-medium text-green-500 underline-offset-4 hover:underline"
            >
              Log In
            </a>
          </p>
        </section>
      </main>
    </>
  );
  
}
