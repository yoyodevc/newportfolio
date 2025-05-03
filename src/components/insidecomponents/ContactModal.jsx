import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import { FiSend, FiX, FiCheck, FiAlertTriangle } from 'react-icons/fi';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('');
    
    const formElement = document.createElement('form');
    Object.entries(formData).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.name = key;
      input.value = value;
      formElement.appendChild(input);
    });
    
    emailjs
      .sendForm('service_fb246zm', 'template_cxamiqk', formElement, '_X_pfUtSA5pcxGYW9')
      .then(
        (result) => {
          setIsLoading(false);
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => {
            handleClose();
          }, 3000);
        },
        (error) => {
          setIsLoading(false);
          setSubmitStatus('error');
        }
      );
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSubmitStatus('');
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 p-4 transition-all duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div 
        className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-xl shadow-black/30 transition-all duration-500"
        style={{ 
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          opacity: isVisible ? 1 : 0
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-300">Get In Touch</h3>
          <button 
            onClick={handleClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 active:scale-95"
          >
            <FiX className="text-white w-5 h-5" />
          </button>
        </div>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center gap-3">
            <FiCheck className="text-green-400 w-5 h-5" />
            <p className="text-green-400">Message sent successfully! I'll get back to you soon.</p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center gap-3">
            <FiAlertTriangle className="text-red-400 w-5 h-5" />
            <p className="text-red-400">Failed to send message. Please try again.</p>
          </div>
        )}

        {/* Form Fields */}
        <div className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm text-gray-400 ml-1">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm text-gray-400 ml-1">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300"
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="message" className="text-sm text-gray-400 ml-1">Your Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="I'd like to discuss a project..."
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50 transition-all duration-300 resize-none"
            />
          </div>

          {/* Submit Button */}
          <button 
            onClick={handleSubmit} 
            disabled={isLoading}
            className="w-full py-4 rounded-2xl bg-white/10 backdrop-blur-md shadow-sm shadow-black/20 hover:shadow-black/20 hover:bg-white/20 font-medium flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <FiSend className="w-5 h-5" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>I'll respond to your message as soon as possible.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;