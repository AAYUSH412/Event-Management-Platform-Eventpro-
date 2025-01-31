import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  ArrowRight,
  IndianRupee,
} from "lucide-react";
import { useEventContext } from "../../context/EventContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden group">
        <img
          src={event.image || "/placeholder-image.jpg"} // Add a fallback image
          alt={event.title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "/placeholder-image.jpg"; // Fallback image on error
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <div className="flex items-center space-x-1">
            <IndianRupee className="h-4 w-4 text-indigo-600" />
            <span className="text-indigo-600 font-semibold">{event.price}</span>
          </div>
        </div>
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-indigo-600 font-semibold">
            {event.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-indigo-600 transition-colors duration-300">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300">
            <Calendar className="h-4 w-4 mr-2" />
            <span className="text-sm">{event.date}</span>
          </div>
          <div className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300">
            <Clock className="h-4 w-4 mr-2" />
            <span className="text-sm">{event.time}</span>
          </div>
          <div className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300">
            <MapPin className="h-4 w-4 mr-2" />
            <span className="text-sm">{event.location}</span>
          </div>
          <div className="flex items-center text-gray-600 hover:text-indigo-600 transition-colors duration-300">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm">
              {event.availableSeats} seats available
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <IndianRupee className="h-5 w-5 text-indigo-600" />
            <span className="text-xl font-bold text-indigo-600">
              {event.price}
            </span>
          </div>
          <Link to={`/event/${event._id}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-300"
            >
              Book Now
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const EventsList = () => {
  const {
    events,
    loading,
    error,
    searchQuery,
    selectedLocation,
    selectedDate,
    selectedCategory,
  } = useEventContext();

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center py-12 bg-red-50 rounded-xl">
          <h3 className="text-2xl font-semibold text-red-600">Error</h3>
          <p className="text-red-500 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      !selectedLocation ||
      event.location.toLowerCase().includes(selectedLocation.toLowerCase());

    const matchesDate = !selectedDate || event.date === selectedDate;

    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;

    return matchesSearch && matchesLocation && matchesDate && matchesCategory;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto px-4 py-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredEvents.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <h3 className="text-2xl font-semibold text-gray-600">
            No events found
          </h3>
          <p className="text-gray-500 mt-2">
            Try adjusting your search criteria
          </p>
        </motion.div>
      ) : (
        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{ marginTop: "2rem" }}
        >
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default EventsList;

EventCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    availableSeats: PropTypes.number.isRequired,
  }).isRequired,
};
