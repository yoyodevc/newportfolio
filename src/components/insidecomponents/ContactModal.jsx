import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSubmitStatus('');
    emailjs
      .sendForm('service_fb246zm', 'template_cxamiqk', e.target, '_X_pfUtSA5pcxGYW9')
      .then(
        (result) => {
          setIsLoading(false);
          setSubmitStatus('success');
          setFormData({ name: '', email: '', message: '' });
          setTimeout(() => {
            onClose();
          }, 2000);
        },
        (error) => {
          setIsLoading(false);
          setSubmitStatus('error');
        }
      );
  };

  if (!isOpen) return null;

  return (
<div className="fixed inset-0 flex justify-center items-center z-50">
  <div className="bg-white/20 backdrop-blur-md rounded-xl p-8 max-w-md w-full border border-white/30 shadow-lg shadow-black/30">
    <h3 className="text-xl text-white mb-4">Contact Me</h3>
    {submitStatus === 'success' && <p className="text-green-500">Message sent successfully!</p>}
    {submitStatus === 'error' && <p className="text-red-500">Failed to send message. Please try again.</p>}
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
      />
      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
      ></textarea>
      <button type="submit" className="w-full py-3 rounded-2xl bg-white/20 backdrop-blur-md shadow-sm shadow-black/20 hover:shadow-black/20 hover:bg-white/40 transition duration-300">
        Send Message
      </button>
    </form>
    <button onClick={onClose} className="mt-4 w-full py-2 rounded-2xl bg-gray-500 text-white hover:bg-gray-600 transition duration-300">
      Close
    </button>
  </div>
</div>

  );
};

export default ContactModal;
