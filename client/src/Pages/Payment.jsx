import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { MdCurrencyRupee } from "react-icons/md";
import { CgUnavailable } from "react-icons/cg";

export const Payment = () => {

  const location = useLocation();
  const seats = location.state?.selected;
  const [show, setShow] = useState(null);
  const { showId } = useParams();
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`${serverBaseUrl}/api/v2/show/${showId}`);
      setShow(res.data.show);
    }
    load();
  }, [showId]);

  if (!show) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
      </div>
    );

  }
  const d = new Date(show.showdate);
  const weekday = d.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "short"
  })
  const shortdate = d.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short"
  })
  const seatsByType = Object.entries(seats || {}).map(([type, set]) => ({
    type,
    seats: Array.from(set)
  }));
  const totalAmount = show.seatTypes.reduce((sum, tier) => {
    const match = seatsByType.find(x => x.type === tier.type);
    const bookedSeats = match ? match.seats.length : 0;
    return sum + bookedSeats * tier.price;
  }, 0);


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-5">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-200 pb-4">
              <div>
                <p className="text-lg font-semibold">{show.movie?.title}</p>
                <p className="text-sm text-gray-500">
                  {show.movie?.certificate || "UA"} | {show.movie?.Languages} | {show.theatre?.seatTypes.map(t => t.type).join(" | ")}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {show.theatre?.name}, {show.theatre?.location}
                </p>
              </div>
              <img src={show.movie?.poster} className="w-14 h-20 rounded-lg object-cover" alt="" />
            </div>

            {/* Date */}
            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm text-gray-700">{weekday}, {shortdate}</p>
              <p className="text-sm text-gray-900 font-medium">{show.showtime}</p>
            </div>

            {/* Tickets */}
            <div className="border-b border-gray-200 pb-4">
              <p className="text-sm font-semibold mb-2">Tickets</p>
              {seatsByType.map((group) => (
                <div key={group.type} className="text-sm text-gray-600 flex gap-2">
                  <span>{group.type}</span>
                  <span>•</span>
                  <span>{group.seats.length} seat(s)</span>
                </div>
              ))}
            </div>

            {/* Notice */}
            <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-100 rounded-lg px-3 py-2">
              <CgUnavailable size={16} className="text-yellow-500" />
              Cancellation is unavailable
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4">
            <p className="text-lg font-semibold">Payment summary</p>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Order amount</span>
              <span className="flex items-center"><MdCurrencyRupee size={14} />{totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Booking charge (incl. GST)</span>
              <span className="flex items-center"><MdCurrencyRupee size={14} />{Math.floor(Math.random() * (51) + 50)}</span>
            </div>

            <div className="border-t border-gray-200 pt-3 flex justify-between text-sm font-semibold">
              <span>To be paid</span>
              <span className="flex items-center"><MdCurrencyRupee size={14} />{totalAmount + 59}</span>
            </div>

            <button className="w-full bg-black text-white rounded-xl font-semibold py-2.5">
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>

  )
}
