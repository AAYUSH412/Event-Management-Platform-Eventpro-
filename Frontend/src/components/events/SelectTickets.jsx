import { IndianRupee, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useEventContext } from "../../context/EventContext";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { endpoints } from '../../config/api';


const SelectTickets = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, session, loading: authLoading } = useAuth(); // Rename auth loading
  const { getEventById } = useEventContext();
  const event = getEventById(id);
  const [loading, setLoading] = useState(false); // Use this for booking loading state
  const [error, setError] = useState(null);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState({});


  useEffect(() => {
    // Only redirect if we're sure there's no session
    if (!authLoading && !session) {
      navigate("/signin", {
        state: { from: `/event/${id}/select-tickets` },
        replace: true,
      });
    }
  }, [session, authLoading, navigate, id]);

  // Fetch ticket types for the event
  useEffect(() => {
    const fetchTicketTypes = async () => {
      if (!session) return;
      try {
        const response = await fetch(`${endpoints.ticketTypes}?eventId=${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch ticket types");
        }
        const data = await response.json();
        setTicketTypes(data);

        // Initialize selected tickets state with all types set to 0
        const initialSelected = {};
        data.forEach((type) => {
          initialSelected[type.type] = 0;
        });
        setSelectedTickets(initialSelected);
      } catch (err) {
        setError(err.message);
      }
    };

    if (session && id) {
      fetchTicketTypes();
    }
  }, [session, id]);

  // Quantity control handlers
  const handleDecreaseQuantity = (ticketType) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [ticketType]: Math.max(0, prev[ticketType] - 1),
    }));
  };

  const handleIncreaseQuantity = (ticketType, maxQuantity) => {
    setSelectedTickets((prev) => ({
      ...prev,
      [ticketType]: Math.min(maxQuantity, (prev[ticketType] || 0) + 1),
    }));
  };

  const totalPrice = Object.entries(selectedTickets).reduce((total, [type, quantity]) => {
    const ticketType = ticketTypes.find(t => t.type === type);
    return total + (ticketType?.price || 0) * quantity;
  }, 0);

  const bookTickets = async () => {
    try {
      setLoading(true);
      setError(null);
  
      const tickets = Object.entries(selectedTickets)
        .filter(([_, quantity]) => quantity > 0)
        .map(([type, quantity]) => {
          const ticketType = ticketTypes.find((t) => t.type === type);
          return {
            type,
            quantity,
            price: ticketType.price,
          };
        });
  
      if (tickets.length === 0) {
        throw new Error("Please select at least one ticket");
      }
  
      const response = await fetch(endpoints.tickets, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          eventId: id,
          tickets,
          totalAmount: totalPrice,
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to book tickets");
      }
  
      if (!data._id) {
        throw new Error("No ticket ID received from server");
      }
  
      // Log before navigation
      console.log("Navigating to payment with ticketId:", data._id);
  
      // Navigate with state
      navigate(`/event/${id}/payment`, {
        state: { ticketId: data._id },
        replace: true
      });
  
    } catch (err) {
      console.error("Booking error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <Navigate to="/signin" />;
  if (!event)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-600">Event not found</h1>
      </div>
    );

  if (authLoading) {
    // Use authLoading here
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {["Venue", "Tickets", "Payment"].map((step, index) => (
            <div key={step} className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center 
                ${
                  index === 1
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={index === 1 ? "text-indigo-600" : "text-gray-600"}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        {/* Ticket Selection Container */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Select Tickets
          </h2>

          <div className="space-y-4">
            {ticketTypes.map((ticket) => (
              <div
                key={ticket.type}
                className="p-4 border border-gray-200 rounded-xl hover:border-indigo-600 transition-colors duration-200"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{ticket.name}</h3>
                    <div className="flex items-center text-indigo-600">
                      <IndianRupee className="h-4 w-4" />
                      <span className="text-xl font-bold">{ticket.price}</span>
                    </div>
                    <ul className="mt-2 space-y-1">
                      {ticket.benefits.map((benefit, index) => (
                        <li key={index} className="text-sm text-gray-600">
                          • {benefit}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm text-gray-500 mt-2">
                      {ticket.availableQuantity} tickets available
                    </p>
                  </div>

                  {/* Updated Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDecreaseQuantity(ticket.type)}
                      disabled={!selectedTickets[ticket.type]}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-50"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">
                      {selectedTickets[ticket.type] || 0}
                    </span>
                    <button
                      onClick={() =>
                        handleIncreaseQuantity(
                          ticket.type,
                          ticket.availableQuantity
                        )
                      }
                      disabled={
                        selectedTickets[ticket.type] >= ticket.availableQuantity
                      }
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total and Action Section */}
          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Total Amount:</span>
              <div className="flex items-center text-xl font-bold text-indigo-600">
                <IndianRupee className="h-5 w-5" />
                {totalPrice}
              </div>
            </div>

            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}

            <button
              onClick={bookTickets}
              disabled={loading || totalPrice === 0}
              className={`w-full px-8 py-3 rounded-xl flex items-center justify-center gap-2 
                ${
                  totalPrice === 0 || loading
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                } transition-colors duration-200`}
            >
              {loading ? "Processing..." : "Continue to Review & Pay"}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTickets;
