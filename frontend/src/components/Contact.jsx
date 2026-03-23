import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import axios from '../api/axios';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    try {
      await axios.post('/contact', formData);
      setStatus({ loading: false, success: true, error: '' });
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(prev => ({ ...prev, success: false })), 5000);
    } catch (error) {
      setStatus({ 
        loading: false, 
        success: false, 
        error: error.response?.data?.message || 'Something went wrong. Please try again.' 
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
          <h2 className="text-3xl font-extrabold sm:text-4xl text-gray-900 dark:text-white">
            Get In Touch
          </h2>
          <div className="mt-2 w-20 h-1 bg-blue-600 mx-auto rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md">
                Feel free to reach out to me for any questions or opportunities. 
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Email</h4>
                <a href="mailto:johndoe@example.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  xyz@example.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                <Phone size={24} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Phone</h4>
                <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-400 hover:text-blue-600">
                  +1 (234) 567-890
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">Location</h4>
                <span className="text-gray-600 dark:text-gray-400">
                  Jaipur, Rajasthan, IN
                </span>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {status.success && (
                <div className="p-4 bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 rounded-md">
                  Thank you! Your message has been sent successfully.
                </div>
              )}
              {status.error && (
                <div className="p-4 bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 rounded-md">
                  {status.error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="auth-form-input w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow outline-none text-gray-900 dark:text-white" 
                  placeholder="Andy Dufresne" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="auth-form-input w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow outline-none text-gray-900 dark:text-white" 
                  placeholder="xyz@example.com" 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4" 
                  className="auth-form-input w-full p-3 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 transition-shadow outline-none text-gray-900 dark:text-white resize-none" 
                  placeholder="Your message here..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status.loading}
                className="w-full btn-primary py-3 rounded-lg flex items-center justify-center gap-2 font-medium"
              >
                {status.loading ? (
                  <>Sending <Loader2 size={18} className="animate-spin" /></>
                ) : (
                  <>Send Message <Send size={18} /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
