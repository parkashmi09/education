"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative h-[600px] overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80"
          alt="Education Banner - Modern Library Interior"
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
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
        <motion.h1 
          className={`text-4xl md:text-6xl font-bold mb-4 max-w-2xl transition-colors duration-300 ${
            mounted && theme === 'light' ? 'text-white' : 'text-white'
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.span 
            className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-500 to-teal-400"
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
            Empower Learning
          </motion.span>{" "}
          with Quality Resources
        </motion.h1>
        <motion.p 
          className={`text-xl md:text-2xl mb-8 max-w-2xl transition-colors duration-300 ${
            mounted && theme === 'dark' ? 'text-gray-200' :
            mounted && theme === 'light' ? 'text-gray-100' :
            'text-gray-200'
          }`}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Access comprehensive educational materials for all your academic needs.
        </motion.p>
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className={`px-8 py-6 bg-gradient-to-r from-yellow-400 via-green-500 to-teal-400 rounded-md text-lg font-semibold hover:opacity-90 shadow-lg transition-all duration-300 ${
              mounted && theme === 'dark' ? 'text-black' : 'text-black'
            }`}>
              Explore Books
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className={`px-8 py-6 bg-transparent border-2 rounded-md text-lg font-semibold transition-all duration-300 ${
                mounted && theme === 'dark' 
                  ? 'border-white text-white hover:bg-white hover:text-black' :
                mounted && theme === 'light' 
                  ? 'border-white text-white hover:bg-white hover:text-gray-900' :
                'border-white text-white hover:bg-white hover:text-black'
              }`}
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
