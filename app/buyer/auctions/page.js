'use client';
import { useState, useEffect } from 'react';

export default function Auctions() {
    const [auctions, setAuctions] = useState([]);
    const [timeLeft, setTimeLeft] = useState({});
    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    const buyerId = decodedToken.userId;

    useEffect(() => {
        const fetchAuctions = async () => {
            const response = await fetch(`/api/auctions?buyerId=${buyerId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setAuctions([...data.auctions]);

            const allAuctionsEnded = data.auctions.every(auction => auction.status === 'completed');
            if (allAuctionsEnded) {
                clearInterval(intervalId); 
            }
        };

        const intervalId = setInterval(fetchAuctions, 1000); 

        return () => clearInterval(intervalId); 
    }, [buyerId, token]);

    useEffect(() => {
        const calculateTimeLeft = () => {
            auctions.forEach(async (auction) => {
                const endTime = new Date(auction.endTime).getTime();
                const currentTime = new Date().getTime();
                const difference = endTime - currentTime;

                if (difference <= 0 && auction.status === 'ongoing') {
                    await fetch(`/api/updateAuctionStatus`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({ auctionId: auction._id })
                    });
                }
            });

            const updatedTimeLeft = auctions.reduce((acc, auction) => {
                const endTime = new Date(auction.endTime).getTime();
                const currentTime = new Date().getTime();
                const difference = endTime - currentTime;

                if (difference > 0) {
                    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                    const minutes = Math.floor((difference / (1000 * 60)) % 60);
                    const seconds = Math.floor((difference / 1000) % 60);
                    acc[auction._id] = `${hours}h ${minutes}m ${seconds}s`;
                } else {
                    acc[auction._id] = "Auction ended";
                }

                return acc;
            }, {});

            setTimeLeft(updatedTimeLeft);
        };

        if (auctions.length > 0) {
            calculateTimeLeft();
            const interval = setInterval(calculateTimeLeft, 1000); 
            return () => clearInterval(interval); 
        }
    }, [auctions]);

    const getLowestBid = (bids) => {
        if (bids.length === 0) return null;
        return bids.reduce((lowest, bid) => bid.amount < lowest.amount ? bid : lowest, bids[0]);
    };

    return (
        <div className="">
          <h1 className="text-2xl md:mx-44 mb-4 mt-8 text-white">Your Auctions</h1>
          {auctions.length === 0 ? (
            <p className="text-gray-300 flex justify-center">No ongoing auctions found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-4 p-4">
              {auctions.slice().reverse().map((auction) => {
                const lowestBid = getLowestBid(auction.bids);
      
                return (
                  <a
                    key={auction._id}
                    href="#"
                    className="block w-[80%] mx-auto p-6 bg-black bg-opacity-95 border border-white rounded-lg shadow hover:bg-gray-900 "
                  >
                    <ul className="font-normal text-gray-300">
                      {auction.sellers.map((seller, index) => (
                        <li key={seller._id}>
                          {seller.name} - {auction.products[index]?.name || 'Unknown'} - ${auction.products[index]?.originalPrice || 'N/A'}
                        </li>
                      ))}
                    </ul>
      
                    <h3 className="mt-4 text-xl font-semibold text-green-500">Bids</h3>
                    {auction.bids.length === 0 ? (
                      <p className="font-normal text-gray-300">No bids yet.</p>
                    ) : (
                      <ul className="font-normal text-gray-300">
                        {auction.bids.map((bid) => (
                          <li key={bid._id}>
                            {bid.seller.name} - Bid Price: ${bid.amount}
                          </li>
                        ))}
                      </ul>
                    )}
      
                    {lowestBid && (
                      <div>
                        <h3 className="mt-4 text-xl font-semibold text-green-500">Winning Bid</h3>
                        <p className="font-bold text-gray-300">
                          {lowestBid.seller.name} - Bid Price: ${lowestBid.amount}
                        </p>
                      </div>
                    )}
      
                    <h3 className="mt-4 text-xl font-semibold text-green-500">Time Left</h3>
                    <p className="font-normal text-gray-300">{timeLeft[auction._id] || 'Loading...'}</p>
                  </a>
                );
              })}
            </div>
          )}
        </div>
      );
      
}
