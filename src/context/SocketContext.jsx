import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  const [stockData, setStockData] = useState({});

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("stockData", (data) => {
      setStockData(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ stockData }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
