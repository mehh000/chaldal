import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import cl from './style.module.css';

function Footer() {
  return (
    <footer className={cl.footer}>
      <div className={cl.container}>
        {/* Subscribe Section */}
        <div className={cl.subscribe_section}>
          <h3>Subscribe to Our Hot Deals</h3>
          <form className={cl.subscribe_form}>
            <input
              type="email"
              className={cl.email_input}
              placeholder="Enter your email"
              required
            />
            <button type="submit" className={cl.subscribe_btn}>
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Info Section */}
        <div className={cl.footer_info}>
          <div className={cl.logo_section}>
            <h2>Chaldalbd</h2>
            <p>Delivering fresh groceries to your doorsteps with the best deals.</p>
          </div>

          <div className={cl.contact_info}>
            <h4>Contact Us</h4>
            <p>Email: mdhimal2040@gmail.com</p>
            <p>Phone: +880-123-456789</p>
          </div>

          {/* Social Icons */}
          <div className={cl.social_icons}>
            <h4>Follow Us</h4>
            <div className={cl.icons}>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="mailto:mdhimal2040@gmail.com">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className={cl.footer_bottom}>
          <p>&copy; {new Date().getFullYear()} Chaldalbd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
