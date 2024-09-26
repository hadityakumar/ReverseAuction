'use client';
import { useState, useEffect } from 'react';

export default function BuyerDashboard() {
  const [sellers, setSellers] = useState([]);
  const [selectedSellers, setSelectedSellers] = useState([]);
  const [products, setProducts] = useState([]);

  const startAuction = async () => {
    const response = await fetch('/api/auctions/start', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ buyer: 'buyerId', selectedSellers, selectedProducts })
    });
  };

  useEffect(() => {
    // Fetch sellers and products (implement fetching logic here)
  }, []);

  return (
    <div>
      <h1>Select Sellers to Start Auction</h1>
      
      <button onClick={startAuction}>Start Auction</button>
    </div>
  );
}
