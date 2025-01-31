import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useEventContext } from "../../context/EventContext";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { endpoints } from '../../config/api';


const VenuePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getEventById } = useEventContext();
  const event = getEventById(id);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Check venue availability
  const checkAvailability = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${endpoints.events}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to check venue availability");
      }
      const data = await response.json();

      if (data.availableSeats > 0) {
        navigate(`/event/${id}/select-tickets`);
      } else {
        setError("Sorry, this event is sold out");
      }
    } catch (err) {
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
                  index === 0
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {index + 1}
              </div>
              <span
                className={index === 0 ? "text-indigo-600" : "text-gray-600"}
              >
                {step}
              </span>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Venue Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center text-gray-600 mb-1">
                  <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                  <span className="font-medium">Date</span>
                </div>
                <p>{event.date}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center text-gray-600 mb-1">
                  <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                  <span className="font-medium">Time</span>
                </div>
                <p>{event.time}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl col-span-2">
                <div className="flex items-center text-gray-600 mb-1">
                  <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                  <span className="font-medium">Venue</span>
                </div>
                <p>{event.location}</p>
              </div>
            </div>

            {/* Venue Map or Additional Details can go here */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Venue Information</h3>
              <p>{event.description}</p>
            </div>

            {error && (
              <div className="mx-4 mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}

            <button
              onClick={checkAvailability}
              disabled={loading}
              className={`w-full bg-indigo-600 text-white px-8 py-3 rounded-xl 
          hover:bg-indigo-700 transition-colors duration-200 
          flex items-center justify-center gap-2
          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {loading
                ? "Checking Availability..."
                : "Continue to Select Tickets"}
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VenuePage;
