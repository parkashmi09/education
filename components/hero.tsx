"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80",
    title: "Discover New Ways of Learning",
    description: "Access comprehensive educational resources and innovative learning methods",
    gradient: "from-blue-600 via-purple-500 to-pink-500"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80",
    title: "Expert Guidance & Support",
    description: "Learn from industry experts and experienced educators",
    gradient: "from-yellow-400 via-green-500 to-teal-400"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80",
    title: "Interactive Learning Experience",
    description: "Engage with our community and enhance your knowledge",
    gradient: "from-orange-500 via-red-500 to-purple-500"
  }
]

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section className="relative h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src={slides[currentSlide].image}
            alt="Education Banner"
            className={`w-full h-full object-cover object-center transition-all duration-300 ${
              mounted && theme === 'dark' ? 'brightness-75' : 
              mounted && theme === 'light' ? 'brightness-95' : 
              'brightness-[0.85]'
            }`}
            width={1920}
            height={1080}
            priority
            quality={100}
          />
          <div className={`absolute inset-0 transition-all duration-300 ${
            mounted && theme === 'dark' 
              ? 'bg-gradient-to-br from-black/95 via-black/85 to-black/50' :
            mounted && theme === 'light' 
              ? 'bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-700/40' :
            'bg-gradient-to-br from-black/95 via-black/85 to-black/50'
          }`} />
        </motion.div>
      </AnimatePresence>

      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.h1 
          key={`title-${currentSlide}`}
          className="text-4xl md:text-6xl font-bold mb-4 max-w-2xl text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className={`text-transparent bg-clip-text bg-gradient-to-r ${slides[currentSlide].gradient}`}
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ backgroundSize: "200% 200%" }}
          >
            {slides[currentSlide].title}
          </motion.span>
        </motion.h1>
        
        <motion.p 
          key={`desc-${currentSlide}`}
          className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {slides[currentSlide].description}
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className={`px-8 py-6 bg-gradient-to-r ${slides[currentSlide].gradient} rounded-md text-lg font-semibold hover:opacity-90 shadow-lg transition-all duration-300 text-white`}>
              Start Learning
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="px-8 py-6 bg-transparent border-2 border-white text-white rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-all duration-300"
            >
              Browse Courses
            </Button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  )
}
