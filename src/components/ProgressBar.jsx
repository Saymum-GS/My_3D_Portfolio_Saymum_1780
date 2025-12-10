import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useEffect, useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

const ProgressBar = () => {
    const progressFillRef = useRef(null)

    useEffect(() => {
        // Create scroll progress animation
        const animation = gsap.to(progressFillRef.current, {
            width: "100%",
            ease: "none",
            scrollTrigger: {
                trigger: document.documentElement,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.3,
                onUpdate: (self) => {
                    const progress = self.progress.toFixed(2)

                    if (progress > 0.75) {
                        gsap.to(progressFillRef.current, { backgroundColor: "#7E22CE", duration: 0.5 })
                    } else if (progress > 0.5) {
                        gsap.to(progressFillRef.current, { backgroundColor: "#A85587", duration: 0.5 })
                    } else if (progress > 0.1) {
                        gsap.to(progressFillRef.current, { backgroundColor: "#B53389", duration: 0.5 })
                    } else {
                        gsap.to(progressFillRef.current, { backgroundColor: "#C54BBC", duration: 0.5 })
                    }
                }
            }
        })

        return () => {
            animation.scrollTrigger?.kill()
        }
    }, [])

    return (
        <div className="fixed top-0 left-0 w-full h-[5px] bg-gray-800 z-50">
            <div
                ref={progressFillRef}
                className="h-full w-0 bg-[#A1045a]"
                style={{ width: "0%" }}
            />
        </div>
    )
}

export default ProgressBar
