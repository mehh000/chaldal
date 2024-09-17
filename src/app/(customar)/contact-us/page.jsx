'use client'

import React, { useState } from 'react';
import cl from './ContactUs.module.css';
import { FiPhoneCall, FiMail, FiMapPin } from 'react-icons/fi';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form Data:', formData);
  };

  return (
    <div className={cl.contact_container}>
      <div className={cl.contact_info}>
        <h2>Contact Us</h2>
        <p>We’d love to hear from you. Please reach out to us with any queries, feedback, or support.</p>
        <div className={cl.contact_details}>
          <div className={cl.detail}>
            <FiPhoneCall className={cl.icon} />
            <p>+1 234 567 890</p>
          </div>
          <div className={cl.detail}>
            <FiMail className={cl.icon} />
            <p>support@chaldalbd.com</p>
          </div>
          <div className={cl.detail}>
            <FiMapPin className={cl.icon} />
            <p>123 Main St, Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>

      <div className={cl.contact_form_container}>
        <form onSubmit={handleSubmit} className={cl.contact_form}>
          <div className={cl.form_group}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className={cl.form_group}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className={cl.form_group}>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message here..."
              required
            />
          </div>

          <button type="submit" className={cl.submit_button}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
