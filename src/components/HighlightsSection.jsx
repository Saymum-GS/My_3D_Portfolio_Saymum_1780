// src/components/HighlightsSection.jsx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";

const galleryImages = [
  "/images/The first appearance.jpg",
  "/images/BTBF.png",
  "/images/Golam_.png",
  "/images/Grateful 2.0.1.jpg",
];

const HighlightsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const blocksRef = useRef([]);

  // 🔥 Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // ---- ANIMATIONS ----
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;

    gsap.fromTo(
      titleRef.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 70%" } }
    );

    blocksRef.current.forEach((block, i) => {
      gsap.fromTo(
        block,
        { y: 100, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          delay: i * 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );
    });
  }, []);

  // ---- MODAL FUNCTIONS ----
  const openModal = (index) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const prevImage = useCallback(() => {
    setActiveIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  }, []);

  const nextImage = useCallback(() => {
    setActiveIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  }, []);

  // ---- KEYBOARD CONTROL ----
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isModalOpen, prevImage, nextImage]);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-black text-red-300 pt-24 pb-32 px-6"
    >
      <h1
        ref={titleRef}
        className="text-center text-4xl md:text-6xl font-bold text-red-500 mb-20 opacity-0"
      >
        Highlights
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {/* ---------------------- ECA ---------------------- */}
        <div
          ref={(el) => blocksRef.current.push(el)}
          className="bg-[#ff000020] backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-red-500/20"
        >
          <h2 className="text-2xl font-semibold text-red-400 mb-3">
            Extra-Curricular Activities
          </h2>
          <ul className="space-y-3 text-sm">
            <li>• Assistant Press Secretary – DIU CPC (2024–2025)</li>
            <li>• Active participant in seminars, workshops & tech events</li>
            <li>• Writing, public speaking & volunteer activities</li>
            <li>• Cultural & academic event organizing experience</li>
          </ul>
        </div>

        {/* ---------------------- GALLERY ---------------------- */}
        <div
          ref={(el) => blocksRef.current.push(el)}
          className="bg-[#ff000020] backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-red-500/20"
        >
          <h2 className="text-2xl font-semibold text-red-400 mb-3">
            Image Gallery
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {galleryImages.map((src, i) => (
              <img
                key={i}
                src={src}
                loading="lazy"
                onClick={() => openModal(i)}
                className="rounded-lg cursor-pointer opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300"
              />
            ))}
          </div>

          <p className="text-red-300 text-xs mt-3 opacity-70 text-center">
            (Some memories that I nourish.)
          </p>
        </div>

        {/* ---------------------- ACHIEVEMENTS ---------------------- */}
        <div
          ref={(el) => blocksRef.current.push(el)}
          className="bg-[#ff000020] backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-red-500/20"
        >
          <h2 className="text-2xl font-semibold text-red-400 mb-3">
            Achievements
          </h2>
          <ul className="space-y-3 text-sm">
            <li>• Published articles in newspapers (Tech, Science & Society)</li>
            <li>• Solved 100+ problems on Codeforces</li>
            <li>• Recognized for communication & writing excellence</li>
            <li>• Consistent academic performance – CGPA 3.85+</li>
          </ul>
        </div>
      </div>

      {/* ---------------------- MODAL VIEWER ---------------------- */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative max-w-3xl w-full p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[activeIndex]}
              className="w-full rounded-xl shadow-xl animate-[zoomIn_0.3s_ease]"
            />

            {/* Controls */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-0 -translate-y-1/2 text-red-300 text-4xl px-4"
            >
              ❮
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-0 -translate-y-1/2 text-red-300 text-4xl px-4"
            >
              ❯
            </button>

            <button
              onClick={closeModal}
              className="absolute top-4 right-6 text-red-300 text-3xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HighlightsSection;
