// 'use client';
// import { useState, useEffect, Suspense } from 'react';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function BuyerDashboard() {
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState(''); // Create a state for the search query

//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [selectedSellers, setSelectedSellers] = useState([]);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [buyerId, setBuyerId] = useState(null);

//   const notifySuccess = () => toast.success('Auction started successfully', {
//     position: "top-right",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//   });

//   const notifyError = () => toast.error('Please select exactly 3 products to start the auction', {
//     position: "top-right",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//   });

//   const notifySellerError = () => toast.error('Please select different sellers for the products', {
//     position: "top-right",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//   });

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = JSON.parse(atob(token.split('.')[1]));
//       setBuyerId(decodedToken.userId);
//     }

//     const searchParams = new URLSearchParams(window.location.search); // Fetch search parameters directly
//     const search = searchParams.get('search');
//     setSearchQuery(search || '');

//     const fetchProducts = async () => {
//       const response = await fetch('/api/products');
//       const data = await response.json();
//       setProducts(data.products || []); 

//       if (searchQuery) {
//         const filtered = (data.products || []).filter((product) =>
//           product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           product.description?.toLowerCase().includes(searchQuery.toLowerCase())
//         );
//         setFilteredProducts(filtered);
//       } else {
//         setFilteredProducts(data.products || []); 
//       }
//     };

//     fetchProducts();
//   }, [searchQuery]); 

//   const handleProductSelect = (product) => {
//     if (!product || !product.seller) return;

//     setSelectedProducts((prevSelectedProducts) => {
//       if (prevSelectedProducts.includes(product)) {
//         return prevSelectedProducts.filter((p) => p !== product);
//       }
//       return [...prevSelectedProducts, product];
//     });

//     if (!selectedSellers.includes(product.seller._id)) {
//       setSelectedSellers((prevSelectedSellers) => [...prevSelectedSellers, product.seller._id]);
//     }
//   };

//   const startAuction = async () => {
//     if (selectedProducts.length !== 3) {
//       notifyError();
//       return;
//     }

//     const response = await fetch('/api/auctions/start', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ buyer: buyerId, selectedSellers, selectedProducts }),
//     });

//     if (response.ok) {
//       notifySuccess();
//       setTimeout(() => {
//         router.push('/buyer/auctions');
//       }, 2000);
//     } else {
//       notifySellerError();
//     }
//   };





'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BuyerDashboard() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(''); 

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [buyerId, setBuyerId] = useState(null);

  const notifySuccess = () => toast.success('Auction started successfully', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const notifyError = () => toast.error('Please select exactly 3 products to start the auction', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const notifySellerError = () => toast.error('Please select different sellers for the products', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setBuyerId(decodedToken.userId);
    }

    // Function to update search query every 1000ms
    const interval = setInterval(() => {
      const searchParams = new URLSearchParams(window.location.search); // Fetch search parameters directly
      const search = searchParams.get('search');
      setSearchQuery(search || '');
    }, 500); // 1000ms interval

    // Fetch products and apply filtering
    const fetchProducts = async () => {
      const response = await fetch('/api/products', { cache: 'no-store' });
      const data = await response.json();
      setProducts(data.products || []);

      if (searchQuery) {
        const filtered = (data.products || []).filter((product) =>
          product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description?.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts(data.products || []);
      }
    };

    fetchProducts();

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [searchQuery]); // Re-run whenever searchQuery is updated

  const handleProductSelect = (product) => {
    if (!product || !product.seller) return;

    setSelectedProducts((prevSelectedProducts) => {
      if (prevSelectedProducts.includes(product)) {
        return prevSelectedProducts.filter((p) => p !== product);
      }
      return [...prevSelectedProducts, product];
    });

    if (!selectedSellers.includes(product.seller._id)) {
      setSelectedSellers((prevSelectedSellers) => [...prevSelectedSellers, product.seller._id]);
    }
  };

  const startAuction = async () => {
    if (selectedProducts.length !== 3) {
      notifyError();
      return;
    }

    const response = await fetch('/api/auctions/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ buyer: buyerId, selectedSellers, selectedProducts }),
    });

    if (response.ok) {
      notifySuccess();
      setTimeout(() => {
        router.push('/buyer/auctions');
      }, 2000);
    } else {
      notifySellerError();
    }
  };

  return (
    <div className="relative scrollbar-thin scrollbar-webkit">
      <h1 className="font-mono text-2xl px-4 pb-3 mt-2">Select 3 Products to Start Auction</h1>
      <Suspense fallback={<div>Loading...</div>}>
      {/* Display products */}
      {filteredProducts.length === 0 ? (
        <div className="relative">
          <div className="absolute inset-0 backdrop-blur-md bg-white/30 -z-10"></div>
          <div className="flex justify-center items-center h-[70vh]">
            <p className="text-xl">No products found.</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className={`w-full ml-3 max-w-xs bg-black border border-gray-600 rounded-lg shadow hover:scale-[1.05] ${selectedProducts.includes(product) ? 'scale-[1.05]' : ''
                }`}
              onClick={() => handleProductSelect(product)}
            >
              <img className="p-4 rounded-t-lg" src="/cloud.png" alt="product image" />
              <div className="px-4 pb-4">
                <h5 className="text-xl font-semibold tracking-tight text-white">
                  {product.name}
                </h5>
                <p className="text-gray-400 text-sm">
                  Seller: {product.seller?.name || 'Unknown Seller'}
                </p>
                <p className="text-gray-300">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">
                    ${product.originalPrice}
                  </span>
                  <button
                    className="text-white font-medium rounded-lg text-sm px-5 py-2.5 hover:scale-110 text-center size-20"
                  >
                    <img
                      src={selectedProducts.includes(product) ? '/remove.svg' : '/add.svg'}
                      className="invert"
                      alt={selectedProducts.includes(product) ? 'Remove product' : 'Select product'}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={startAuction}
        className="block text-black fixed bottom-10 right-10 rounded-full text-md font-bold px-5 py-5 text-center bg-white hover:scale-110"
      >
        Start Auction
      </button>
      </Suspense>
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
    </div>
  );
}

