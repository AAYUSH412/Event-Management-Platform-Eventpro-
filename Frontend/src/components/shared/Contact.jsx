import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowRight, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+1 (555) 123-4567',
      description: 'Monday to Friday, 9am to 6pm'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'contact@eventpro.com',
      description: 'Online support 24/7'
    },
    {
      icon: MapPin,
      title: 'Office',
      details: '123 Business Ave, Suite 100',
      description: 'New York, NY 10001'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-indigo-900 to-purple-900 py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 -top-48 -left-48 bg-indigo-500/30 rounded-full filter blur-3xl"></div>
          <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-purple-500/30 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center pt-20"
          >
            <h1 className="text-4xl font-bold text-white mb-4">Get in Touch</h1>
            <p className="text-indigo-100 text-lg max-w-2xl mx-auto">
              {`Have questions about EventPro? We're here to help. Send us a message and we'll respond as soon as possible.`}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <item.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-indigo-600 font-medium mb-1">{item.details}</p>
              <p className="text-gray-500">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="How can we help?"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center gap-2 group"
              >
                Send Message
                <Send className="h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </form>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    question: 'How do I book an event?',
                    answer: 'You can easily book an event through our platform by selecting your desired event and clicking the "Book Now" button. Follow the simple steps to complete your booking.'
                  },
                  {
                    question: 'What payment methods do you accept?',
                    answer: 'We accept all major credit cards, debit cards, and digital payment methods including PayPal and Google Pay.'
                  },
                  {
                    question: 'Can I cancel my booking?',
                    answer: 'Yes, you can cancel your booking up to 48 hours before the event starts. Please refer to our cancellation policy for more details.'
                  }
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 p-6 rounded-xl"
                  >
                    <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                      <ArrowRight className="h-5 w-5 text-indigo-600" />
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;