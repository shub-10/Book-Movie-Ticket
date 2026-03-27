import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";



const SeatLayout = () => {
  const { showId } = useParams();
  const serverBaseUrl = import.meta.env.VITE_SERVER_BASE_URL;
  const navigate = useNavigate();
  const [show, setShow] = useState(null);
  const [bookedSeats, setBookedSeats] = useState(null);
  const [selected, setSelected] = useState({});
  useEffect(() => {
    const load = async () => {
      const [showRes, bookedRes] = await Promise.all([
        await axios.get(`${serverBaseUrl}/api/v2/show/${showId}`),
        await axios.get(`${serverBaseUrl}/api/v2/booking/details/${showId}`)
      ])
      setShow(showRes.data.show);
      setBookedSeats(bookedRes.data.Booked);
    }
    load();
  }, [showId]);
 

  
  const makeSeats = (total, booked) => {
    const seats = Array.from({ length: total}, (_, i) => ({
      id: i + 1,
      status: booked.includes(i+1) ? "booked" : "available"
    }));
    return seats;
  };

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
  const totalSelected = Object.values(selected).reduce(
    (sum, set) => sum + (set?.size || 0),
    0
  );
  const goToPayment = () => {
    if (totalSelected === 0) return;
    if(!localStorage.getItem('token')){
      navigate('/login',{ state: { from: `/payment/${showId}`, selected } });
    }
    else navigate(`/payment/${showId}`, { state: { selected } });
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {totalSelected > 0 && (
        <div className="sticky top-0 z-20 bg-white border-b px-4 py-3 flex justify-between items-center rounded-full">
          <span className="text-sm text-gray-700">
            {totalSelected} seat{totalSelected > 1 ? "s" : ""} selected
          </span>
          <button
            onClick={goToPayment}
            className="px-4 py-2 rounded-full bg-black text-white text-sm"
          >
            Proceed
          </button>
        </div>
      )}

      <h1 className="text-2xl font-semibold">{show.movie?.title}</h1>
      <p className="text-gray-500">{show.theatre?.name} • {show.showtime}</p>
      <div className="mt-6 flex flex-col items-center">
        <div className="w-72 h-6 border-t-4 border-blue-300 rounded-[999px]"></div>
        <p className="text-xs text-gray-500 mt-1 tracking-widest">SCREEN THIS WAY</p>
      </div>
      {show.seatTypes.map((tier) => {
        let booked = [];
        const match = bookedSeats.find(item => item.type === tier.type)
        if(match) booked = match.seats;
        
        const seats = makeSeats(tier.totalSeats/2, booked);
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
                    onClick={() => { toggleSeat(tier.type, seat.id);  }}
                    className={
                      isBooked
                        ? "bg-gray-200 text-gray-400 rounded-md text-xs"
                        : isSelected
                          ? "bg-blue-200 text-white border border-gray-400 rounded-md p-2 text-xs font-semibold"
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
