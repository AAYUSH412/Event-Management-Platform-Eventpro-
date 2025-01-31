import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, RefreshCcw } from 'lucide-react';

const PaymentFailure = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { ticketId, error } = location.state || {};

  if (!ticketId) {
    return <Navigate to="/" />;
  }

  const handleRetry = () => {
    navigate(`/event`, { replace: true });
  };

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-4">Payment Failed</h2>
          <p className="text-gray-600 mb-6">
            {error || "Your payment could not be processed. Please try again."}
          </p>
          <p className="text-sm text-gray-500 mb-8">Ticket ID: {ticketId}</p>

          <button
            onClick={handleRetry}
            className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl 
              hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <RefreshCcw className="h-5 w-5" />
            Retry Payment
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PaymentFailure;