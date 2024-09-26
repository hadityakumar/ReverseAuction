'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className='font-mono h-full flex flex-col justify-center items-center text-center mt-64 p-8 bg-black bg-opacity-50'>
        <div className="animate-slidein300 opacity-0 flex">
          <div className="text-4xl font-bold mb-4">Welcome to Jazzee</div>
        </div>

        <h1 className="animate-slidein300 opacity-0 text-5xl font-bold mb-6">
          The Future of Reverse Auctions
          <br />
          Seamlessly connecting buyers and sellers.
        </h1>

        <p className="animate-slidein500 opacity-0 text-2xl mb-8">
          Redefining SAAS procurement with streamlined efficiency.
          <br />
          Your all-in-one solution for smarter procurement decisions.
        </p>
        <Link href="/signup">
          <div className="animate-slidein700 opacity-0 text-3xl font-semibold flex group">
            <div className="relative overflow-hidden">
              <span className="block relative z-10 group-hover:text-white transition duration-500">
                Get Started Today
              </span>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </div>
            <img
              loading="lazy"
              src="right.svg"
              className="size-9 invert"
              alt="Arrow icon"
            />
          </div>
        </Link>
      </div>
    </>
  );

}
