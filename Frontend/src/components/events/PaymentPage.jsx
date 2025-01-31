import { motion } from "framer-motion";
import { IndianRupee, Calendar, MapPin } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useEventContext } from "../../context/EventContext";
import {
  useParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { endpoints } from '../../config/api';


const PaymentPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getEventById } = useEventContext();
  const event = getEventById(id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ticketData, setTicketData] = useState(null);
  const ticketId = location.state?.ticketId;

  // Fetch ticket details
  useEffect(() => {
    const fetchTicketDetails = async () => {
      if (!ticketId) {
        setError("No ticket ID found");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${endpoints.payments}/${ticketId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch ticket details");
        }

        setTicketData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching ticket details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketDetails();
  }, [ticketId]);

  // Handle proceed to payment
  // In handleProceedToPayment function:
  const handleProceedToPayment = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${endpoints.payments}/create/${ticketId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to create payment");
      }

      // Log the data being passed
      console.log("Payment data:", data);

      navigate(`/event/${id}/razorpay`, {
        state: {
          ticketId,
          orderId: data.orderId,
          amount: data.amount,
          currency: data.currency,
          keyId: data.keyId,
        },
        replace: true,
      });
    } catch (err) {
      setError(err.message);
      console.error("Payment creation error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  // Redirect if no ticket data
  if (!ticketId || !ticketData) {
    return <Navigate to={`/event/${id}/select-tickets`} />;
  }

  // Calculate totals
  const subtotal = ticketData.totalAmount;
  const tax = subtotal * 0.02; // 2% tax
  const finalAmount = subtotal + tax;

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          {/* Event Details */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Event Details
            </h2>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">{ticketData.eventTitle}</h3>
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{ticketData.eventDate}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{ticketData.eventLocation}</span>
              </div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="border-t border-gray-200 pt-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">Ticket Details</h3>
            {ticketData.tickets.map((ticket, index) => (
              <div
                key={index}
                className="flex justify-between items-center mb-3 p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{ticket.type}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {ticket.quantity}
                  </p>
                  <p className="text-sm text-gray-500">
                    Seat Numbers: {ticket.seatNumbers.join(", ")}
                  </p>
                </div>
                <div className="flex items-center text-indigo-600">
                  <IndianRupee className="h-4 w-4" />
                  <span className="font-semibold">
                    {ticket.price * ticket.quantity}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Summary */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  <span>{subtotal.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (2%)</span>
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  <span>{tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold">
                <span>Total Amount to Pay</span>
                <div className="flex items-center text-xl text-indigo-600">
                  <IndianRupee className="h-5 w-5" />
                  <span>{finalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleProceedToPayment}
            disabled={loading}
            className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl 
              hover:bg-indigo-700 transition-colors duration-200 mt-8
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Proceed to Payment"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentPage;
