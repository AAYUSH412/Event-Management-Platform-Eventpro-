import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  IndianRupee,
  Share2,
  Heart,
  TicketPlus,
} from "lucide-react";
import { useEventContext } from "../../context/EventContext";
import { Link } from "react-router-dom";

const EventDetail = () => {
  const { id } = useParams();
  const { getEventById } = useEventContext();
  const event = getEventById(id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-600">Event not found</h1>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 py-8"
      >
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative rounded-2xl overflow-hidden shadow-lg"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-[400px] object-cover"
            />
            <div className="absolute top-4 right-4 flex space-x-2">
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                <Share2 className="h-5 w-5 text-gray-700" />
              </button>
              <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200">
                <Heart className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </motion.div>

          {/* Event Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                  {event.category}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {event.availableSeats} seats left
                </span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {event.title}
              </h1>
              <p className="text-gray-600">{event.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center text-gray-600 mb-1">
                  <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                  <span className="font-medium">Date</span>
                </div>
                <p>{event.date}</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center text-gray-600 mb-1">
                  <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                  <span className="font-medium">Time</span>
                </div>
                <p>{event.time}</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center text-gray-600 mb-1">
                  <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                  <span className="font-medium">Location</span>
                </div>
                <p>{event.location}</p>
              </div>
              <div className="p-4 bg-white rounded-xl shadow-sm">
                <div className="flex items-center text-gray-600 mb-1">
                  <Users className="h-5 w-5 mr-2 text-indigo-600" />
                  <span className="font-medium">Capacity</span>
                </div>
                <p>{event.availableSeats} seats available</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-6 bg-white rounded-xl shadow-sm">
              <div>
                <p className="text-gray-600 mb-1">Price per ticket</p>
                <div className="flex items-center">
                  <IndianRupee className="h-6 w-6 text-indigo-600" />
                  <span className="text-3xl font-bold text-indigo-600">
                    {event.price}
                  </span>
                </div>
              </div>
              <Link to={`/event/${id}/book`}>
                <button className="px-8 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2">
                  <TicketPlus className="h-5 w-5" />
                  <span>Book Now</span>
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Event Details Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Event Details
          </h2>
          <div className="prose max-w-none">
            <p>{event.description}</p>
            {/* Add more details as needed */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EventDetail;
