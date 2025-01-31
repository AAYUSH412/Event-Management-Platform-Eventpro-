import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import { endpoints } from '../../config/api';


const RazorpayPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get data from location state
  const { ticketId, orderId, amount, currency, keyId } = location.state || {};

  // Redirect if missing required data
  useEffect(() => {
    if (!ticketId || !orderId || !amount || !currency || !keyId) {
      navigate('/');
    }
  }, [ticketId, orderId, amount, currency, keyId, navigate]);

  // RazorpayPayment.jsx
const handlePayment = async () => {
  try {
    setLoading(true);

    const options = {
      key: keyId,
      amount: amount * 100,
      currency: currency,
      name: "EventPro",
      description: "Event Ticket Purchase",
      order_id: orderId,
      handler: async (response) => {
        try {
          // Check response before making verify call
          if (!response.razorpay_payment_id || !response.razorpay_order_id || !response.razorpay_signature) {
            throw new Error('Invalid payment response');
          }

          const verifyResponse = await fetch(`${endpoints.payments}/verify`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          });

          if (!verifyResponse.ok) {
            const errorData = await verifyResponse.json();
            navigate('/payment-failure', {
              state: { 
                ticketId,
                error: errorData.message || 'Payment verification failed'
              },
              replace: true
            });
            return;
          }

          const verifyData = await verifyResponse.json();
          if (verifyData.status === 'success') {
            navigate('/payment-success', {
              state: { ticketId },
              replace: true
            });
          } else {
            throw new Error('Payment verification failed');
          }
        } catch (err) {
          setError(err.message);
          console.error('Verification error:', err);
        }
      },
      prefill: {
        name: user?.user_metadata?.full_name || '',
        email: user?.email || ''
      },
      notes: {
        ticketId: ticketId
      },
      theme: {
        color: "#4F46E5"
      }
    };

    // Create new instance for each payment attempt
    const razorpay = new window.Razorpay(options);
    razorpay.on('payment.failed', (response) => {
      navigate('/payment-failure', {
        state: { 
          ticketId,
          error: response.error.description 
        },
        replace: true
      });
    });
    razorpay.open();

  } catch (err) {
    setError(err.message);
    console.error('Payment error:', err);
  } finally {
    setLoading(false);
  }
};

  // Show loading state while checking data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Show payment UI
  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 text-center"
        >
          <h2 className="text-2xl font-bold mb-6">Complete Your Payment</h2>
          <div className="mb-8">
            <p className="text-gray-600">Amount to Pay: ₹{amount}</p>
            <p className="text-sm text-gray-500">Order ID: {orderId}</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl 
              hover:bg-indigo-700 transition-colors duration-200
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default RazorpayPayment;