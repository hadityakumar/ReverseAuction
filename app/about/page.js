import Head from 'next/head';

export default function About() {
  return (
    <>
      <Head>
        <title>About Us - Jazzee</title>
        <meta name="description" content="Learn more about Jazzee, the future of reverse auctions and streamlined SAAS procurement." />
      </Head>

      <main className="font-mono h-screen flex items-center justify-center bg-black bg-opacity-50 text-white">
        <section className="w-[90%] max-w-4xl text-center space-y-6 p-8">
          <h1 className="text-4xl font-bold">Welcome to Jazzee</h1>
          <p className="text-lg">
            The Future of Reverse Auctions. Seamlessly connecting buyers and sellers.
          </p>
          <p className="text-lg">
            At Jazzee, we're redefining SAAS procurement with streamlined efficiency. Our platform empowers businesses to make smarter procurement decisions by enabling seamless connections between buyers and sellers through reverse auctions.
          </p>
          <p className="text-lg">
            Whether you're looking to cut costs, increase transparency, or improve your procurement strategy, Jazzee is your all-in-one solution for smarter, more efficient decision-making.
          </p>
        </section>
      </main>
    </>
  );
}
