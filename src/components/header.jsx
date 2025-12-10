import emailjs from '@emailjs/browser';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FiGithub, FiLinkedin, FiMenu, FiTwitter, FiX } from 'react-icons/fi';
import CVModal from "./CVModal";

const Header = ({ contactFormOpen, openContactForm, closeContactForm }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = ["Home", "About", "Projects", "Experience", "Contact"];

  // EmailJS submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      form,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    ).then(
      () => {
        alert("Message sent successfully!");
        form.reset();
        closeContactForm();
      },
      () => {
        alert("Oops! Something went wrong. Try again.");
      }
    );
  };

  return (
    <header className="absolute w-full z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.3, duration: 1.2 }}
          className="flex items-center"
        >
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-500 to-gray-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-3">
            S
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
            Md Golam Sharoar Saymum
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="lg:flex hidden space-x-8">
          {navItems.map((item, index) => (
            <motion.a
              key={item}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring", stiffness: 100, damping: 20,
                delay: 0.7 + index * 0.2
              }}
              className='relative text-gray-800 dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-400 font-medium transition-colors duration-300 group'
              href={`#${item.toLowerCase()}`}
            >
              {item}
              <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300'></span>
            </motion.a>
          ))}
        </nav>

        {/* Social Icons - Desktop */}
        <div className='md:flex hidden items-center space-x-4'>
          <a className='text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300'
            href="https://github.com/Saymum-GS" target="_blank">
            <FiGithub className='w-6 h-5' />
          </a>

          <a className='text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300'
            href="#">
            <FiTwitter className='w-6 h-5' />
          </a>

          <a className='text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300'
            href="https://www.linkedin.com/in/md-golam-sharoar-saymum-145854297" target="_blank">
            <FiLinkedin className='w-6 h-5' />
          </a>
        </div>

        {/* BUTTONS WRAPPER — Hire Me + Download CV + View CV */}
        <div className="hidden md:flex items-center space-x-3">

          {/* View CV */}
          <motion.button
            onClick={() => setCvOpen(true)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className='px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-red-400 text-white font-bold hover:opacity-90 transition-all duration-500'
          >
            View CV
          </motion.button>

          {/* Download CV */}
          <motion.a
            href="https://drive.google.com/uc?export=download&id=1s835kc7QvAhWvYZrKI3cy_Gv_6tlergj"
            download
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className='px-4 py-2 rounded-xl bg-gradient-to-r from-gray-300 to-gray-100 text-gray-900 font-bold shadow hover:shadow-lg hover:shadow-violet-600/50 hover:bg-violet-600 hover:text-white transition-all duration-500'
          >
            Download CV
          </motion.a>

          {/* Hire Me */}
          <motion.button
            onClick={openContactForm}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, duration: 0.8 }}
            className='px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white transition-all duration-500'
          >
            Hire Me
          </motion.button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden flex items-center'>
          <motion.button whileTap={{ scale: 0.7 }} onClick={toggleMenu} className='text-gray-300'>
            {isOpen ? <FiX className='h-6 w-6' /> : <FiMenu className='h-6 w-6' />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.5 }}
        className='md:hidden overflow-hidden bg-white dark:bg-gray-900 shadow-lg px-4 py-5 space-y-5'
      >
        <nav className='flex flex-col space-y-3'>
          {navItems.map((item) => (
            <a key={item} onClick={toggleMenu} href={`#${item.toLowerCase()}`} className='text-gray-300 font-medium py-2'>
              {item}
            </a>
          ))}
        </nav>

        <div className='pt-4 border-t border-gray-200 dark:border-gray-700'>
          <div className='flex space-x-5'>
            <a href="https://github.com/Saymum-GS" className='text-gray-300' target="_blank">
              <FiGithub className='h-5 w-5' />
            </a>
            <a href="#" className='text-gray-300'>
              <FiTwitter className='h-5 w-5' />
            </a>
            <a href="https://www.linkedin.com/in/md-golam-sharoar-saymum-145854297" className='text-gray-300' target="_blank">
              <FiLinkedin className='h-5 w-5' />
            </a>
          </div>

          <button
            onClick={() => { toggleMenu(); openContactForm(); }}
            className='mt-4 block w-full px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-violet-400 font-bold'
          >
            Contact Me
          </button>

          {/* Mobile CV Download */}
          <a
            href="https://drive.google.com/uc?export=download&id=1s835kc7QvAhWvYZrKI3cy_Gv_6tlergj"
            download
            className='mt-3 block w-full px-4 py-2 rounded-lg bg-gray-300 text-gray-900 font-bold text-center'
          >
            Download CV
          </a>

          {/* Mobile View CV */}
          <button
            onClick={() => { toggleMenu(); setCvOpen(true); }}
            className='mt-3 block w-full px-4 py-2 rounded-lg bg-red-600 text-white font-bold text-center'
          >
            View CV
          </button>
        </div>
      </motion.div>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {contactFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 30, stiffness: 200, duration: 0.8 }}
              className='bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md p-6'
            >
              <div className='flex justify-between items-center mb-4'>
                <h1 className='text-2xl font-bold text-gray-300'>Get In Touch</h1>
                <button onClick={closeContactForm}><FiX className='w-5 h-5 text-gray-300' /></button>
              </div>

              <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                  <label htmlFor="name" className='block text-sm font-medium text-gray-300 mb-1'>Name</label>
                  <input id="name" name="name" type="text"
                    className='w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-violet-500'
                    required />
                </div>

                <div>
                  <label htmlFor="email" className='block text-sm font-medium text-gray-300 mb-1'>Email</label>
                  <input id="email" name="email" type="email"
                    className='w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-violet-500'
                    required />
                </div>

                <div>
                  <label htmlFor="message" className='block text-sm font-medium text-gray-300 mb-1'>Message</label>
                  <textarea id="message" name="message" rows="4"
                    className='w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 focus:ring-2 focus:ring-violet-500'
                    required />
                </div>

                <motion.button
                  type='submit'
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className='w-full px-4 py-2 bg-gradient-to-r from-violet-600 to-violet-400 rounded-lg font-bold shadow-md hover:shadow-lg hover:shadow-violet-600/50 transition-all duration-300'
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CV Modal */}
      <CVModal isOpen={cvOpen} onClose={() => setCvOpen(false)} />
    </header>
  );
};

export default Header;
