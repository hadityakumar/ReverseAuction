import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductButton() {
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const sellerId = 'SELLER_ID'; // Replace with actual seller ID

    const res = await fetch('/api/sellerproducts/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sellerId,
        name: productName,
        originalPrice: price,
        description,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert('Product added successfully');
      setShowModal(false);
      router.push('/sellerproducts'); // Redirect after adding product
    } else {
      alert('Error adding product: ' + data.error);
    }
  };

  return (
    <>
      {/* Button to open modal */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-4 right-4 block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Add
      </button>

      {/* Modal */}
      {showModal && (
        <div id="crud-modal" className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Product
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal body */}
            <form onSubmit={handleSubmit} className="p-4">
              <div className="grid gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    placeholder="Product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Price
                  </label>
                  <input
                    type="number"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    placeholder="Product price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                    placeholder="Product description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add new product
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
