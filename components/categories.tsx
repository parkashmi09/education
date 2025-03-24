"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from "lucide-react"

const categories = [
  { 
    name: "State Books", 
    items: [
      { name: "UP Board" },
      { name: "MP Board" },
      { name: "Rajasthan Board" },
      { name: "Gujarat Board" },
    ],
    bgColor: "bg-primary-800", // Teal (default, matches the image)
  },
  { 
    name: "Books & Solutions", 
    items: [
      { name: "Class 6" },
      { name: "Class 7" },
      { name: "Class 8" },
      { name: "Class 9" },
      { name: "Class 10" },
    ],
    bgColor: "bg-primary-700", // Green
  },
  { 
    name: "Bihar Board", 
    items: [
      { name: "Class 9" },
      { name: "Class 10" },
      { name: "Class 11" },
      { name: "Class 12" },
    ],
    bgColor: "bg-primary-600", // Darker yellow
  },
  { 
    name: "CBSE", 
    items: [
      { name: "Class 6" },
      { name: "Class 7" },
      { name: "Class 8" },
      { name: "Class 9" },
      { name: "Class 10" },
      { name: "Class 11" },
      { name: "Class 12" },
    ],
    bgColor: "bg-primary-500", // Yellow
  },
  { 
    name: "CUET", 
    items: [
      { name: "Mathematics" },
      { name: "Physics" },
      { name: "Chemistry" },
      { name: "Biology" },
    ],
    bgColor: "bg-primary-400", // Medium teal
  },
]

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState("State Books")
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false, 
    align: 'start',
    dragFree: true,
    skipSnaps: true
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    setMounted(true)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          if (emblaApi && canScrollPrev) scrollPrev()
          break
        case 'ArrowRight':
          e.preventDefault()
          if (emblaApi && canScrollNext) scrollNext()
          break
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [emblaApi, canScrollPrev, canScrollNext])

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const activeItems = categories.find((cat) => cat.name === activeCategory)?.items || []
  const activeBgColor = categories.find((cat) => cat.name === activeCategory)?.bgColor || "bg-primary-800"

  return (
    <section className={`py-12 transition-colors duration-300 ${
      mounted && theme === 'dark' ? 'bg-gray-900' : activeBgColor
    }`}>
      <div className="container mx-auto px-6" ref={containerRef}>
        {/* Header Section */}
        <motion.div 
          className="flex items-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="bg-green-400 text-white text-sm font-semibold px-4 py-1 rounded-full mr-4">
            FREE
          </span>
          <h2 className="text-3xl font-bold text-white">Study Materials</h2>
        </motion.div>

        {/* Category Tabs (Slider) */}
        <motion.div 
          className="relative flex items-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          role="tablist"
          aria-label="Category selection"
        >
          <motion.button
            onClick={scrollPrev}
            className={`p-3 rounded-full transition-all duration-300 mr-4 ${
              canScrollPrev ? 'bg-white text-primary-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!canScrollPrev}
            aria-label="Previous category"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>
          <div className="flex-1 overflow-hidden" ref={emblaRef}>
            <div className="flex gap-3">
              {categories.map((category, index) => (
                <motion.button
                  key={index}
                  role="tab"
                  aria-selected={activeCategory === category.name}
                  aria-controls={`${category.name}-panel`}
                  className={`min-w-[150px] px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                    activeCategory === category.name
                      ? "bg-white text-primary-800 shadow-lg"
                      : "bg-transparent border border-white text-white hover:bg-white hover:text-primary-800"
                  }`}
                  onClick={() => setActiveCategory(category.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>
          </div>
          <motion.button
            onClick={scrollNext}
            className={`p-3 rounded-full transition-all duration-300 ml-4 ${
              canScrollNext ? 'bg-white text-primary-800' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!canScrollNext}
            aria-label="Next category"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

        {/* Description */}
        <motion.p 
          className="text-white text-sm mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {activeCategory} can be of great use if you are trying to excel in your school exams. The journey starts right from when you step into 1st class as every class holds great value as you grow. Although higher classes students such as Class 10th to 12th should have a better knowledge of all the concepts... <span className="text-orange-400 cursor-pointer">Read More...</span>
        </motion.p>

        {/* Items Grid */}
        <div className="relative group" aria-label={`${activeCategory} items grid`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="wait">
              {activeItems.map((item, index) => (
                <motion.div
                  key={`${activeCategory}-${item.name}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  role="tabpanel"
                  id={`${activeCategory}-panel`}
                  aria-labelledby={activeCategory}
                >
                  <Link
                    href={`/${activeCategory.toLowerCase().replace(/\s+/g, "-")}/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="block bg-white rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-6 flex items-center"
                    aria-label={`View ${item.name} materials`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {item.name}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}