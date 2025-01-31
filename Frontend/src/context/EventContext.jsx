import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { endpoints } from '../config/api';


const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(endpoints.events);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Get event by ID
  const getEventById = (id) => events.find((e) => e._id === id);

  const value = {
    events,
    loading,
    error,
    getEventById,
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    selectedDate,
    setSelectedDate,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
  };

  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};

EventProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useEventContext = () => useContext(EventContext);