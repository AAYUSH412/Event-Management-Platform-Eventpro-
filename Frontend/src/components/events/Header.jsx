import { useState } from "react";
import { Search, Filter, Calendar, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useEventContext } from "../../context/EventContext";

const Header = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const {
    searchQuery,
    setSearchQuery,
    selectedLocation,
    setSelectedLocation,
    selectedDate,
    setSelectedDate,
    selectedCategory,
    setSelectedCategory,
  } = useEventContext();
  const categories = [
    "All",
    "Music",
    "Technology",
    "Sports",
    "Food",
    "Art",
    "Business",
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="relative bg-gradient-to-br from-indigo-900 to-purple-900 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-indigo-500/30 rounded-full filter blur-3xl"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-500/30 rounded-full filter blur-3xl"></div>
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Title */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Amazing Events
          </h1>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
            Find and book the perfect event for any occasion
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-xl p-4"
          >
            <div className="grid md:grid-cols-3 gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Location Input */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Date Input */}
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Advanced Filters Button */}
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
              >
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </button>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl hover:bg-indigo-700 transition-colors duration-200">
                Search Events
              </button>
            </div>
          </form>
        </motion.div>

        {/* Categories */}
        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-2 rounded-full ${
                selectedCategory === category
                  ? "bg-white text-indigo-600"
                  : "bg-white/10 text-white hover:bg-white/20"
              } backdrop-blur-md transition-colors duration-200`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Header;
