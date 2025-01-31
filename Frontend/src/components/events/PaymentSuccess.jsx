import { useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Download,
  Share2,
  Calendar,
  MapPin,
  IndianRupee,
  ArrowRight
} from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { endpoints } from '../../config/api';


const PaymentSuccess = () => {
  const location = useLocation();
  const ticketId = location.state?.ticketId;
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicketDetails = async () => {
      try {
        const response = await fetch(`${endpoints.payments}/${ticketId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch ticket details");
        }
        const data = await response.json();
        setTicketData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (ticketId) {
      fetchTicketDetails();
    }
  }, [ticketId]);

  if (!ticketId) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  const qrCodeData = ticketData
    ? JSON.stringify({
        ticketId,
        eventTitle: ticketData.eventTitle,
        date: ticketData.eventDate,
        seats: ticketData.tickets.map((t) => t.seatNumbers).flat(),
      })
    : "";

  const printTicket = () => {
    window.print();
  };

  // Share ticket function
  const shareTicket = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Event Ticket",
          text: `My ticket for ${ticketData.eventTitle}`,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold">Payment Successful!</h2>
          </div>

          {ticketData && (
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">
                {ticketData.eventTitle}
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{ticketData.eventDate}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{ticketData.eventLocation}</span>
                </div>
              </div>

              <div className="flex justify-center mb-6">
                <QRCodeSVG
                  value={qrCodeData}
                  size={200}
                  level="H"
                  includeMargin={true}
                />
              </div>

              <div className="space-y-2 mb-6">
                {ticketData.tickets.map((ticket, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg mb-2">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">
                        {ticket.type} × {ticket.quantity}
                      </span>
                      <span className="font-semibold">
                        <IndianRupee className="h-4 w-4 inline" />
                        {ticket.price * ticket.quantity}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Seat Numbers: </span>
                      {ticket.seatNumbers.join(", ")}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add total amount section */}
              <div className="border-t border-dashed border-gray-200 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="font-medium">Total Amount</span>
                  <span className="font-bold text-indigo-600 flex items-center">
                    <IndianRupee className="h-4 w-4" />
                    {ticketData.totalAmount}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 mt-6">
                <div className="flex gap-4">
                  <button
                    onClick={printTicket}
                    className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-xl 
        hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Save Ticket
                  </button>
                  <button
                    onClick={shareTicket}
                    className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-xl 
        hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                </div>

                <Link
                  to="/event"
                  className="w-full bg-white text-indigo-600 px-4 py-2 rounded-xl border-2 border-indigo-600
      hover:text-indigo-500 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  Explore More Events
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
