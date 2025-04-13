"use client"

import { useState, useEffect, useRef } from "react"
import { Star, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

// Sample testimonial data (unchanged)
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Student",
    date: "March 15, 2024",
    rating: 5,
    comment:
      "The content exceeded my expectations. The quality is outstanding and the support team was incredibly helpful throughout the entire process.",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Student",
    date: "April 2, 2024",
    rating: 4,
    comment:
      "Support was prompt and helpful. I'll definitely be using this resource again. The interface is intuitive and the performance is excellent.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Student",
    date: "April 18, 2024",
    rating: 5,
    comment:
      "I love how versatile this platform is. It's become an essential part of my daily routine. The attention to detail is remarkable and the design is both beautiful and functional.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
  },
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setMounted(true)
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 7000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      className={`py-12 transition-colors duration-500 ${
        mounted && theme === "dark"
          ? "bg-gradient-to-br from-gray-950 to-gray-900"
          : "bg-gradient-to-br from-gray-50 to-white"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h2
            className={`text-5xl md:text-6xl font-extrabold tracking-tight ${
              mounted && theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
          Student{" "}
            <span
              className={
                mounted && theme === "dark" ? "text-[#EECD44]" : "text-[#EECD44]"
              }
            >
        Success Stories
            </span>
          </h2>
          <p
            className={`mt-6 max-w-2xl mx-auto text-xl leading-relaxed ${
              mounted && theme === "dark" ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Real stories from students transforming their educational journey
          </p>
          <motion.div
            className="mt-4 h-1 w-32 mx-auto rounded-full bg-gradient-to-r from-[#EECD44] to-amber-300"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* Testimonial Slider */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, y: 50, rotateX: 10 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -50, rotateX: -10 }}
              transition={{
                duration: 0.8,
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
              className={`relative rounded-2xl p-10 overflow-hidden ${
                mounted && theme === "dark"
                  ? "bg-gray-800/40 backdrop-blur-md border border-gray-700/30"
                  : "bg-white/70 backdrop-blur-md border border-gray-100/50"
              }`}
              style={{
                boxShadow:
                  mounted && theme === "dark"
                    ? "0 20px 40px rgba(0, 0, 0, 0.4)"
                    : "0 20px 40px rgba(0, 0, 0, 0.1)",
              }}
            >
              {/* Decorative Background Pattern */}
              <div
                className={`absolute inset-0 opacity-10 ${
                  mounted && theme === "dark" ? "bg-gray-900" : "bg-gray-100"
                }`}
                style={{
                  backgroundImage: `radial-gradient(${
                    mounted && theme === "dark" ? "#EECD44/20" : "#EECD44/40"
                  } 2px, transparent 2px)`,
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Testimonial Content */}
              <div className="relative z-10">
                <p
                  className={`text-xl leading-loose mb-8 font-medium ${
                    mounted && theme === "dark"
                      ? "text-gray-100"
                      : "text-gray-800"
                  }`}
                >
                  {currentTestimonial.comment}
                </p>

                {/* Star Rating */}
                <div className="flex space-x-2 mb-8">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                    >
                      <Star
                        className={`w-6 h-6 ${
                          i < currentTestimonial.rating
                            ? "text-[#EECD44] fill-[#EECD44]"
                            : mounted && theme === "dark"
                            ? "text-gray-600"
                            : "text-gray-300"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Profile Info */}
                <div className="flex items-center gap-5">
                  <motion.div
                    className="relative w-16 h-16"
                    whileHover={{ scale: 1.08, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <img
                      src={currentTestimonial.image}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <div
                      className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                        mounted && theme === "dark"
                          ? "bg-gray-900"
                          : "bg-white"
                      } border-2 border-[#EECD44]`}
                    >
                      <span
                        className={`text-xs font-bold ${
                          mounted && theme === "dark"
                            ? "text-[#EECD44]"
                            : "text-[#EECD44]"
                        }`}
                      >
                        {currentTestimonial.rating}
                      </span>
                    </div>
                  </motion.div>
                  <div>
                    <h3
                      className={`text-xl font-bold ${
                        mounted && theme === "dark"
                          ? "text-white"
                          : "text-gray-900"
                      }`}
                    >
                      {currentTestimonial.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm ${
                          mounted && theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {currentTestimonial.role}
                      </span>
                      {/* <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          mounted && theme === "dark"
                            ? "bg-gray-700 text-[#EECD44]"
                            : "bg-amber-100 text-[#EECD44]"
                        }`}
                      >
                        Verified
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8 px-4">
            <motion.button
              onClick={() =>
                setCurrentIndex(
                  (prev) =>
                    (prev - 1 + testimonials.length) % testimonials.length
                )
              }
              whileHover={{ scale: 1.15, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-full ${
                mounted && theme === "dark"
                  ? "bg-gray-800/50 text-[#EECD44]"
                  : "bg-white/80 text-[#EECD44]"
              } shadow-lg`}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              onClick={() =>
                setCurrentIndex((prev) => (prev + 1) % testimonials.length)
              }
              whileHover={{ scale: 1.15, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-full ${
                mounted && theme === "dark"
                  ? "bg-gray-800/50 text-[#EECD44]"
                  : "bg-white/80 text-[#EECD44]"
              } shadow-lg`}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 gap-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`rounded-full transition-all duration-500 ${
                  currentIndex === index
                    ? "w-10 h-3"
                    : "w-3 h-3 hover:w-4 hover:h-4"
                } ${
                  currentIndex === index
                    ? "bg-gradient-to-r from-[#EECD44] to-amber-300"
                    : mounted && theme === "dark"
                    ? "bg-gray-600"
                    : "bg-gray-300"
                }`}
                whileHover={{ scale: 1.4 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-current={currentIndex === index ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}