import gsap from "gsap";
import { useEffect, useRef } from "react";

const CustomCursor = () => {
  // Refs for cursor elements
  const cursorRef = useRef(null);
  const cursorBorderRef = useRef(null);

  // hide Cursor on Mobile
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;
  if (isMobile) {
    return null;
  }

  useEffect(() => {
    //Get Cursor elements
    const cursor = cursorRef.current;
    const cursorBorder = cursorBorderRef.current;

    // Initial position Off-Screen
    gsap.set([cursor, cursorBorder], {
      xPercent: -50,
      yPercent: -50,
    });

    // Variables for cursor position with different speeds
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3.out" });
    const xToBorder = gsap.quickTo(cursorBorder, "x", {
      duration: 0.5,
      ease: "power.out",
    });
    const yToBorder = gsap.quickTo(cursorBorder, "y", {
      duration: 0.5,
      ease: "power3.out",
    });

    // Mouse move handler
    const handleMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xToBorder(e.clientX);
      yToBorder(e.clientY);
    };

    // Add mouse move Listener
    window.addEventListener("mousemove", handleMouseMove);

    // Click animations
    const handleMouseDown = () =>
      gsap.to([cursor, cursorBorder], { scale: 0.6, duration: 0.2 });
    const handleMouseUp = () =>
      gsap.to([cursor, cursorBorder], { scale: 1, duration: 0.2 });

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // CLEANUP (fixes the leak)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main Cursor dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[20px] h-[20px] bg-white rounded-full pointer-events-none z-[999] mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)", willChange: "transform" }}
      />
      {/* ring */}
      <div
        ref={cursorBorderRef}
        className="fixed top-0 left-0 w-[40px] h-[40px] border border-white rounded-full pointer-events-none z-[999] opacity-50 mix-blend-difference"
        style={{ transform: "translate(-50%, -50%)", willChange: "transform" }}
      />
    </>
  );
};

export default CustomCursor;
