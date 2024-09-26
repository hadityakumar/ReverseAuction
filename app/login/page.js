'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const notify = () => toast.error('Incorrect Credentials', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });


  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      // Dispatch a custom event
      window.dispatchEvent(new Event('login'));
      if (data.user.userType === 'buyer') {
        router.push('/buyer/products');
      } else {
        router.push('/seller/products');
      }
    } else {
      notify();
    }
  };

  return (
    <>

<ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <main className="mx-auto flex h-[80%] w-[30%] items-center justify-center bg-black bg-opacity-90 text-white mt-[10%]">
        <section className="flex w-[30rem] flex-col space-y-10 p-10">
          <div className="text-center text-4xl font-medium">Log In</div>
  
          <form onSubmit={handleLogin} className="flex flex-col space-y-10">
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-green-500">
              <input
                type="email"
                placeholder="Email"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
  
            <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-green-500">
              <input
                type="password"
                placeholder="Password"
                className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
  
            <button
              type="submit"
              className="transform rounded-sm bg-green-600 py-2 font-bold duration-300 hover:bg-green-400"
            >
              LOG IN
            </button>
          </form>
  
          <a
            href="#"
            className="transform text-center font-semibold text-gray-500 duration-300 hover:text-gray-300"
          >
            FORGOT PASSWORD?
          </a>
  
          <p className="text-center text-lg">
            No account?{' '}
            <a
              href="/signup"
              className="font-medium text-green-500 underline-offset-4 hover:underline"
            >
              Create One
            </a>
          </p>
        </section>
      </main>
    </>
  );
  
}
