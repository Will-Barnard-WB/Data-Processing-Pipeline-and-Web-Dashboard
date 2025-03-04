import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const Dashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await axios.get("http://localhost:5050/");
      setStocks(response.data.stocks || []);
    } catch (err) {
      setError("Error fetching stock data");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Stock Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Date/Time</th>
            <th className="border border-gray-300 px-4 py-2">Symbol</th>
            <th className="border border-gray-300 px-4 py-2">Open Price</th>
            <th className="border border-gray-300 px-4 py-2">Close Price</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{stock.datetime}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.symbol}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.open_price}</td>
              <td className="border border-gray-300 px-4 py-2">{stock.close_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
