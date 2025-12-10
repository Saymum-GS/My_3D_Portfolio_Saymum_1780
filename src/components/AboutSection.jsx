// src/components/AboutSection.jsx
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef } from "react";

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const starsRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const title = titleRef.current;
    const section = sectionRef.current;
    const intro = introRef.current;

    // Title animation
    gsap.fromTo(
      title,
      { y: 100, opacity: 0 },
      {
        y: -300,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Intro animation
    gsap.fromTo(
      intro,
      { y: 100, opacity: 0, filter: "blur(10px)" },
      {
        y: -400,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1.5,
        scrollTrigger: {
          trigger: section,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Stars animation
    starsRef.current.forEach((star, index) => {
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = 0.5 + Math.random() * 5;

      gsap.to(star, {
        x: direction * (100 + index * 20),
        y: direction * -50 - index * 10,
        rotation: direction * 360,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: speed,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) trigger.kill();
      });
    };
  }, []);

  const addToStars = useCallback((el) => {
    if (el && !starsRef.current.includes(el)) starsRef.current.push(el);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="h-screen relative overflow-hidden bg-gradient-to-b from-black to-[#FF000050]"
    >
      {/* Star elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            ref={addToStars}
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${10 + i * 3}px`,
              height: `${10 + i * 3}px`,
              backgroundColor: "white",
              opacity: 0.2 + Math.random() * 0.4,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Section Title */}
      <div className="container mx-auto px-4 h-full flex flex-col items-center justify-center">
        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold sm:mb-16 text-center text-red-500 opacity-0"
        >
          About Me
        </h1>
      </div>

      {/* Profile & Intro */}
      <div
        ref={introRef}
        className="absolute lg:bottom-[-20rem] md:bottom-[-10rem] bottom-[-20rem] left-0 w-full flex md:flex-row flex-col justify-between lg:px-24 px-5 items-center opacity-0"
      >
        <div className="lg:max-w-[45rem] max-w-[27rem] text-red-200 md:mt-20 sm:mt-[-40rem] mt-[-32rem] space-y-4">
          <h3 className="text-sm md:text-2xl font-bold tracking-wide">
            Undergraduate Computer Science and Engineering student at Daffodil International University with strong problem-solving skills and proficiency in C, C++, Java, and Python. Experienced in communication, leadership, content creation, data mining, and telesales. Adaptable across diverse roles and committed to continuous learning in web development and academic research.
          </h3>

          {/* <h3 className="text-sm md:text-xl font-semibold">
            <strong>Education:</strong> B.Sc. in CSE - Daffodil International University (Expected June 2026), CGPA 3.85/4.00; College: Rangpur Government College.
          </h3> */}

          {/* <h3 className="text-sm md:text-xl font-semibold">
            <strong>Skills:</strong> Communication, Teamwork, Critical Thinking, Time Management, Leadership, Adaptability, Project Management.
          </h3>

          <h3 className="text-sm md:text-xl font-semibold">
            <strong>Work Experience:</strong> Assistant Press Secretary at DIU CPC (2024–2025), Content Writer / Data Mining Assistant / Domestic Caller at Rashed Kanchan Organization (2025), Telesales Specialist Training at Skytech (2025).
          </h3> */}
{/*
          <h3 className="text-sm md:text-xl font-semibold">
            <strong>Writing & Authorship:</strong> Author of three unpublished books and multiple published articles in newspapers covering technology, science, and social issues.
          </h3>

          <h3 className="text-sm md:text-xl font-semibold">
            <strong>Programming Proficiency:</strong> 100+ solved problems on Codeforces, growing skills in C, C++, Java, Python, developing full-stack web applications.
          </h3> */}
        </div>

        <img
          // src="/images/person.png"
          src="/images/person1.png"
          alt="profile-img"
          className="lg:h-[40rem] md:h-[25rem] h-[20rem] mix-blend-lighten"
        />
      </div>
    </section>
  );
};

export default AboutSection;
