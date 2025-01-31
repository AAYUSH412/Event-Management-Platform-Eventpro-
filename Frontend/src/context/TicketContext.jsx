// src/context/TicketContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { endpoints } from '../config/api';


const TicketContext = createContext({});

export const TicketProvider = ({ children }) => {
  const { user } = useAuth();
  const [userTickets, setUserTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserTickets = async () => {
      if (!user) {
        setUserTickets([]);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${endpoints.tickets}?userId=${user.id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch tickets');
        }

        const data = await response.json();
        setUserTickets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTickets();
  }, [user]);

  const value = {
    userTickets,
    loading,
    error
  };

  return <TicketContext.Provider value={value}>{children}</TicketContext.Provider>;
};

export const useTickets = () => useContext(TicketContext);