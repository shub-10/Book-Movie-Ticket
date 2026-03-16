import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const makeSeats = (total, booked = 0) => {
  const seats = Array.from({ length: total/2 }, (_, i) => ({
    id: i + 1,
    status: i < booked ? "booked" : "available"
  }));
  return seats;
};

const SeatLayout = () => {
  const { showId } = useParams();
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [selected, setSelected] = useState({});
  
  useEffect(() => {
    const load = async () => {
      const res = await axios.get(`${serverBaseUrl}/api/v2/show/${showId}`);
      setShow(res.data.show);
    } 
    load();
  }, [showId]);
  const checkedUserLogin = ()=>{
     if(!localStorage.getItem('token')) navigate('/login');
  }
  const toggleSeat = (type, seatId) => {
    setSelected((prev) => {
      const next = { ...prev };
      const set = new Set(next[type] || []);
      if (set.has(seatId)) set.delete(seatId);
      else set.add(seatId);
      next[type] = set;
      return next;
    });
  };

  if (!show) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
    </div>
  );
}

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-semibold">{show.movie?.title}</h1>
      <p className="text-gray-500">{show.theatre?.name} • {show.showtime}</p>
      <div className="mt-6 flex flex-col items-center">
        <div className="w-72 h-6 border-t-4 border-blue-300 rounded-[999px]"></div>
        <p className="text-xs text-gray-500 mt-1 tracking-widest">SCREEN THIS WAY</p>
      </div>
      {show.seatTypes.map((tier) => {
        const seats = makeSeats(tier.totalSeats, tier.totalSeats - tier.availableSeats);
        return (
          <div key={tier.type} className="mt-6">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">{tier.type}</h2>
              <span className="text-sm text-gray-500">₹{tier.price}</span>
            </div>

            <div className="grid grid-cols-10 gap-5 mt-3">
              {seats.map((seat) => {
                const isSelected = selected[tier.type]?.has(seat.id);
                const isBooked = seat.status === "booked";
                return (
                  <button
                    key={seat.id}
                    disabled={isBooked}
                    onClick={() => {toggleSeat(tier.type, seat.id); checkedUserLogin()}}
                    className={
                      isBooked
                        ? "bg-gray-200 text-gray-400 rounded-md text-xs"
                        : isSelected
                          ? "bg-gray-900 text-white rounded-md p-2 text-xs"
                          : "border border-gray-300 rounded-md p-2 text-xs"
                    }
                  >
                    {seat.id}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}


    </div>
  );
};

export default SeatLayout;
