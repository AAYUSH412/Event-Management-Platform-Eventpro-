import { 
  Calendar, 
  MapPin, 
  Mail, 
  Phone, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowRight,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const quickLinks = [
    
    { name: 'Home', href: '#' },
    { name: 'Events', href: '/event' },
    { name: 'Contact', href: '/contact' }
  ];

  const services = [
    { name: 'Corporate Events',  },
    { name: 'Weddings',  },
    { name: 'Conferences',  },
    { name: 'Private Parties',  },
    { name: 'Virtual Events',  }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Linkedin, href: '#' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300">
      <div className="relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>

        {/* Main Content */}
        <motion.div 
          className="relative max-w-7xl mx-auto px-4 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={footerVariants}
        >
          <div className="grid md:grid-cols-4 gap-12">
            {/* Brand Section */}
            <motion.div className="space-y-6" variants={footerVariants}>
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Calendar className="h-8 w-8 text-indigo-400" />
                </div>
                <span className="text-2xl font-bold text-white">EventPro</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Creating unforgettable experiences through seamless event management.
                Join us in making every moment magical.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a 
                    key={index}
                    href={social.href}
                    className="hover:text-indigo-400 transition-colors duration-300 transform hover:scale-110"
                  >
                    <social.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={footerVariants}>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                Quick Links
                <ArrowRight className="h-4 w-4 ml-2 text-indigo-400" />
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href}
                      className="hover:text-indigo-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                        →
                      </span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div variants={footerVariants}>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                Services
                <ArrowRight className="h-4 w-4 ml-2 text-indigo-400" />
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <a 
                      href={service.href}
                      className="hover:text-indigo-400 transition-colors duration-300 flex items-center group"
                    >
                      <span className="mr-2 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300">
                        →
                      </span>
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={footerVariants}>
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                Contact Us
                <ArrowRight className="h-4 w-4 ml-2 text-indigo-400" />
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 group">
                  <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors duration-300">
                    <MapPin className="h-5 w-5 text-indigo-400" />
                  </div>
                  <span className="group-hover:text-indigo-400 transition-colors duration-300">
                    123 Business Ave, Suite 100, New York, NY 10001
                  </span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors duration-300">
                    <Mail className="h-5 w-5 text-indigo-400" />
                  </div>
                  <span className="group-hover:text-indigo-400 transition-colors duration-300">
                    contact@eventpro.com
                  </span>
                </li>
                <li className="flex items-center space-x-3 group">
                  <div className="p-2 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors duration-300">
                    <Phone className="h-5 w-5 text-indigo-400" />
                  </div>
                  <span className="group-hover:text-indigo-400 transition-colors duration-300">
                    +1 (555) 123-4567
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <motion.div 
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
            variants={footerVariants}
          >
            <p className="flex items-center justify-center gap-1">
              &copy; {new Date().getFullYear()} EventPro. Made with 
              <Heart className="h-4 w-4 text-red-500 fill-current" /> by
              <a 
                href="#" 
                className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
              >
                Aayush Vaghela
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;