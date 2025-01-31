// src/components/tickets/MyTickets.jsx
import { motion } from "framer-motion";
import { Calendar, MapPin, IndianRupee } from "lucide-react";
import { useTickets } from "../../context/TicketContext";
import { Link } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";

const MyTickets = () => {
  const { userTickets, loading, error } = useTickets();

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

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Tickets</h1>
        
        {userTickets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">You haven't purchased any tickets yet.</p>
            <Link
              to="/event"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {userTickets.map((ticket) => (
              <motion.div
                key={ticket._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Ticket Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{ticket.eventId.title}</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2" />
                      <span>{ticket.eventId.date}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{ticket.eventId.location}</span>
                    </div>
                  </div>
                  
                  {/* QR Code */}
                  <div className="flex justify-center mb-4">
                    <QRCodeSVG
                      value={ticket._id}
                      size={100}
                      level="H"
                    />
                  </div>

                  {/* Ticket Details */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="font-bold text-indigo-600 flex items-center">
                        <IndianRupee className="h-4 w-4" />
                        {ticket.totalAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTickets;