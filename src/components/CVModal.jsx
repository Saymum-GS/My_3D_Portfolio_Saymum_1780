// src/components/CVModal.jsx
import { motion } from "framer-motion";

export default function CVModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-lg flex justify-center items-center z-[9999]"
    >
      <div className="relative w-[90%] h-[90%] bg-[#1a1a1a] rounded-xl shadow-2xl border border-red-600 overflow-hidden">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Close
        </button>

        {/* Download button */}
        <a
          href="https://drive.google.com/uc?export=download&id=1s835kc7QvAhWvYZrKI3cy_Gv_6tlergj"
          target="_blank"
          className="absolute top-4 left-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Download CV
        </a>

        {/* PDF viewer */}
        <iframe
          src="https://drive.google.com/file/d/1s835kc7QvAhWvYZrKI3cy_Gv_6tlergj/preview"
          className="w-full h-full rounded-xl"
          allow="autoplay"
        />
      </div>
    </motion.div>
  );
}
