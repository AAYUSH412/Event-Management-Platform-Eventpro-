import { Calendar, Users, MapPin, Star, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Homeimage from "../../assets/homepage.png";

// In Home.jsx
const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Marketing Director",
    avatar: 1,
    text: "EventPro transformed our corporate event into an unforgettable experience. The attention to detail and professional service exceeded our expectations.",
  },
  {
    name: "Michael Chen",
    role: "Event Organizer",
    avatar: 7,
    text: "The platform's user-friendly interface and real-time updates made managing multiple events simultaneously a breeze. My clients were thoroughly impressed with the seamless booking experience.",
  },
  {
    name: "Emily Rodriguez",
    role: "Wedding Planner",
    avatar: 9,
    text: "As a wedding planner, I need reliable tools. EventPro's comprehensive features and excellent customer support have made it my go-to platform for all wedding arrangements.",
  },
];

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 overflow-hidden [background-size:200%_200%] animate-gradient-xy">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 animate-gradient-xy"></div>

          {/* Subtle mesh overlay */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>

          {/* Glowing orbs */}
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-purple-600/30 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-indigo-600/30 rounded-full filter blur-3xl animate-pulse delay-700"></div>
        </div>

        {/* Hero Content */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-8rem)]">
              <div className="text-white space-y-8 text-center lg:text-left">
                <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-lg rounded-full text-sm font-semibold animate-fade-in-up">
                  EVENT MANAGEMENT PLATFORM
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in-up animation-delay-200">
                  Create
                  <span className="relative">
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-pink-400 blur-xl opacity-30"></span>
                    <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
                      {" "}
                      Magical{" "}
                    </span>
                  </span>
                  Moments
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 animate-fade-in-up animation-delay-400">
                  Transform your events into unforgettable experiences with our
                  cutting-edge event management platform.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-600">
                  <Link
                    to={"/event"}
                    className="group bg-white text-indigo-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-100 transition-all duration-300 flex items-center gap-2 hover:gap-4"
                  >
                    Explore Events
                    <ArrowRight className="h-5 w-5 transition-all duration-300" />
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block relative animate-fade-in-up animation-delay-800">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-2xl opacity-30 transform rotate-3"></div>
                <img
                  src={Homeimage}
                  alt="Event Management"
                  className="relative rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 -mt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {[
              { value: "500+", label: "Events Organized" },
              { value: "50k+", label: "Happy Attendees" },
              { value: "100+", label: "Venues" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="text-3xl sm:text-4xl font-bold text-indigo-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm sm:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose EventPro?</h2>
            <p className="text-gray-600 text-lg">
              Discover the features that make us the leading choice for event
              management
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Smart Planning",
                description:
                  "AI-powered tools to streamline your event planning process.",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description:
                  "Real-time collaboration tools to keep your team synchronized.",
              },
              {
                icon: MapPin,
                title: "Venue Management",
                description:
                  "Comprehensive venue database with virtual tours and booking.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="bg-indigo-100 rounded-xl p-4 inline-block mb-6 group-hover:bg-indigo-600 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-indigo-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <a
                  href="#"
                  className="text-indigo-600 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                >
                  Learn More <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 text-lg">
            {`Don't just take our word for it - hear from some of our satisfied clients`}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-6">{`"${testimonial.text}"`}</p>
              <div className="flex items-center gap-4">
                <img
                  src={`https://i.pravatar.cc/150?img=${testimonial.avatar}`}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="bg-white rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-4">
                Ready to Create Your Next Event?
              </h2>
              <p className="text-gray-600 text-lg">
                Join thousands of successful event planners. Start your journey
                today.
              </p>
            </div>
            <button className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition whitespace-nowrap">
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

// Add these styles to your CSS file
const style = document.createElement("style");
style.textContent = `
@keyframes blob {
  0% { transform: translate(0px, 0px) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0px, 0px) scale(1); }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
}

.animation-delay-400 {
  animation-delay: 0.4s;
}

.animation-delay-600 {
  animation-delay: 0.6s;
}

.animation-delay-800 {
  animation-delay: 0.8s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
`;
document.head.appendChild(style);
