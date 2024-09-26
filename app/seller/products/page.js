'use client';
import { useState, useEffect } from 'react';

export default function SellerProducts() {
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState(null);
    const [sellerId, setSellerId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        originalPrice: '',
        description: '',
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            setToken(token);
            setSellerId(decodedToken.userId);
        }
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            if (sellerId && token) {
                const response = await fetch(`/api/sellerproducts?sellerId=${sellerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setProducts(data.products);
            }
        };

        fetchProducts();
    }, [sellerId, token]);

    const deleteProduct = async (productId) => {
        const confirmDelete = confirm('Are you sure you want to delete this product?');
        if (!confirmDelete) return;
        const response = await fetch('/api/deleteproduct', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, sellerId }),
        });

        const result = await response.json();
        if (result.success) {
            setProducts(products.filter((product) => product._id !== productId));
        } else {
            console.error(result.error);
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/sellerproducts/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ ...formData, sellerId }),
            });

            const result = await response.json();
            if (response.ok) {
                setProducts([...products, result.product]);
                setShowModal(false);
                setFormData({ name: '', originalPrice: '', description: '' });
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="relative">
            <h1 className="font-mono text-2xl px-4 pb-3 mt-2">Your Listed Products</h1>

            {/* Add Product Button */}
            <button
                onClick={() => setShowModal(true)}
                className="block text-white fixed bottom-10 right-10 font-medium rounded-lg text-sm px-5 py-2.5 text-center size-24 transition-transform duration-400 ease-in-out transform hover:scale-150"
                type="button"
            >
                <img src="/add.svg" className="invert" alt="Add product" />
            </button>


            {showModal && (
                <div
                    id="crud-modal"
                    className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-60"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full bg-black rounded-lg shadow">
                        {/* Modal header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-600 rounded-t">
                            <h3 className="text-lg font-semibold text-white">
                                Create New Product
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-400 bg-transparent hover:bg-gray-800 hover:text-gray-200 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                            >
                                <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 14 14"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 1"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form className="p-4" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleFormChange}
                                        className="w-full p-2.5 text-sm bg-transparent text-white border-b-2 border-gray-500 focus:border-green-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="originalPrice"
                                        className="block mb-2 text-sm font-medium text-white"
                                    >
                                        Price
                                    </label>
                                    <input
                                        type="number"
                                        id="originalPrice"
                                        name="originalPrice"
                                        value={formData.originalPrice}
                                        onChange={handleFormChange}
                                        className="w-full p-2.5 text-sm bg-transparent text-white border-b-2 border-gray-500 focus:border-green-500 outline-none"
                                        placeholder="$999"
                                        required
                                    />
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="description"
                                        className="block mb-2 text-sm font-medium text-white"
                                    >
                                        Product Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows="4"
                                        value={formData.description}
                                        onChange={handleFormChange}
                                        className="w-full p-2.5 text-sm bg-transparent text-white border-b-2 border-gray-500 focus:border-green-500 outline-none"
                                        required
                                    ></textarea>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-400 rounded-lg focus:ring-4 focus:outline-none focus:ring-green-500"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                                Add new product
                            </button>
                        </form>
                    </div>
                </div>
            )}


            {/* Display products */}
            {products.length === 0 ? (
                <div className="relative">
                    <div className="absolute inset-0 backdrop-blur-md -z-10"></div>
                    <div className="flex justify-center items-center h-[70vh]">
                        <p className="text-xl">No products found.</p>
                    </div>
                </div>
            ) : (
                <div className="flex flex-wrap gap-4">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="w-full ml-3 max-w-xs bg-black border border-gray-600 rounded-lg shadow hover:scale-[1.05]"
                        >
                            <img className="p-4 rounded-t-lg" src="/cloud.png" alt="product image" />
                            <div className="px-4 pb-4">
                                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                    {product.name}
                                </h5>
                                <p className="text-gray-700 dark:text-gray-400">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                        ${product.originalPrice}
                                    </span>
                                    <button
                                        onClick={() => deleteProduct(product._id)}
                                        className="text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:scale-110 text-center"
                                    >
                                        <img src="/trash.svg" className='size-6 invert' alt="Delete the product" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
