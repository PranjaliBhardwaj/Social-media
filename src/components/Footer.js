import { motion } from "framer-motion";
import { FaDiscord, FaInstagram, FaWhatsapp, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";
import "./Footer.css";

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      setIsVisible(scrollPosition >= pageHeight - 100);
      setScrollDirection(window.scrollY > lastScrollY ? "down" : "up");
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="footer-container"
    >
      <div className="footer-links">
        <div className="footer-left">
          <a className="text" href="https://www.cleverstudio.in/">Home</a>
          <a className="text" href="https://www.cleverstudio.in/portfolio">Portfolio</a>
          <a className="text">About</a>
          <a className="text">Our team</a>
          <a className="text">Contact</a>
        </div>
        <div className="footer-right">
          <a className="text" href="https://www.cleverstudio.in/services">Services</a>
          <a className="text" href="https://www.cleverstudio.in/Careers">Careers</a>
          <a className="text" href="https://www.cleverstudio.in/maintenance">Maintenance</a>
        </div>
      </div>

      <motion.div className="footer-title">
        <motion.span
          initial={{ y: 0 }}
          animate={scrollDirection === "up" ? { y: 100, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <text>Clever <i>Studio</i></text>
        </motion.span>
      </motion.div>

      {isVisible && (
        <div className="footer-icons" style={{ position: "fixed", bottom: "0", width: "100%" }}>
          <div className="footer-bottom">
            <p>© 2024 Clever Studio. All rights reserved.</p>
            <div className="footer-icon">
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <FaDiscord size={30} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={30} />
              </a>
              <a href="https://wa.me/yourphonenumber" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={30} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={30} />
              </a>
            </div>
          </div>
        </div>
      )}
    </motion.footer>
  );
}
