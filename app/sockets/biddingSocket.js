const biddingSocket = (io) => {
    io.on('connection', (socket) => {
      socket.on('join-auction', (auctionId) => {
        socket.join(auctionId);
      });
  
      socket.on('place-bid', (data) => {
        io.to(data.auctionId).emit('bid-update', data);
      });
    });
  };
  
  export default biddingSocket;
  