import React from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export const Payment = () => {

  const location = useLocation();
  const seats = location.state?.selected;
  const [show, setShow] = useState(null);
  const { showId } = useParams();
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  console.log("seats: ", seats);
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
  return (
      <div className="flex flex-row gap-10 justify-center items-center translate-y-1/4">
        <div className="flex flex-col w-1/2 border border-gray-200 rounded-md p-2 gap-5">
          <div className="flex flex-row justify-between items-center pb-2 border-b border-gray-300 ">
            <div className="flex flex-col justify-start">
              <span className="text-lg font-semibold">{show.movie?.title}</span>
              <div className="flex flex-row gap-2">
                <span className="text-sm text-gray-500"> {show.movie?.Languages} </span>
                <div className="flex flex-row text-sm text-gray-500 gap-2">
                  {
                    show.theatre?.seatTypes.map((tier) => (
                      <div>| {tier.type}  </div>
                    ))
                  }
                </div>
              </div>
              <div className="text-sm text-gray-500">{show.theatre?.name} , {show.theatre?.location} </div>
            </div>
            <img src={show.movie?.poster} className="w-12 h-18 rounded-lg" alt="" />
          </div>
          <div className="flex flex-col pb-2 border-b border-gray-300">
            <span className="text-sm text-gray-900">{weekday},{shortdate} </span>
            <span className="text-sm text-gray-900">{show.showtime}</span>
          </div>

          <div className="flex flex-col">
            <span>Tickets</span>
            {seatsByType.map((group) => (
              <div key={group.type} className="text-sm text-gray-500 flex flex-row gap-2">
                <p>{group.type} - </p>
                <p> {group.seats.length}</p>
              </div>
            ))}

          </div>

        </div>
        <div className="w-1/5 flex flex-col">
          <span className="font-semibold text-md">Payment summary</span>
          <div className="w-full flex flex-col border border-gray-200 rounded-lg">
            <div className="flex flex-row justify-between items-center">
              <span className="text-sm text-gray-500">Order amount </span>
              <span>600</span>

            </div>
          </div>

        </div>

    </div>
  )
}
