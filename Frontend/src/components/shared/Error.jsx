import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Error = ({ message = "Page not found", code = "404" }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-red-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-8">
            <AlertCircle className="h-10 w-10 text-red-500" />
          </div>
          <h1 className="text-6xl font-bold text-gray-900 mb-4">{code}</h1>
          <p className="text-xl text-gray-600 mb-8">{message}</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Error;