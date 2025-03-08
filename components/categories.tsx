"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from "lucide-react"

const categories = [
  { 
    name: "State Books", 
    items: [
      { name: "UP Board", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80" },
      { name: "MP Board", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80" },
      { name: "Rajasthan Board", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80" },
      { name: "Gujarat Board", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80" }
    ]
  },
  { 
    name: "Books & Solutions", 
    items: [
      { name: "Class 6", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80" },
      { name: "Class 7", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80" },
      { name: "Class 8", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80" },
      { name: "Class 9", image: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&q=80" },
      { name: "Class 10", image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80" }
    ]
  },
  { 
    name: "Bihar Board", 
    items: [
      { name: "Class 9", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80" },
      { name: "Class 10", image: "https://images.unsplash.com/photo-1532294220147-279399e4e00f?auto=format&fit=crop&q=80" },
      { name: "Class 11", image: "https://images.unsplash.com/photo-1501349800519-48093d60bde0?auto=format&fit=crop&q=80" },
      { name: "Class 12", image: "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&q=80" }
    ]
  },
  { 
    name: "CBSE", 
    items: [
      { name: "Class 6", image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80" },
      { name: "Class 7", image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80" },
      { name: "Class 8", image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80" },
      { name: "Class 9", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80" },
      { name: "Class 10", image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&q=80" },
      { name: "Class 11", image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&q=80" },
      { name: "Class 12", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80" }
    ]
  },
  { 
    name: "CUET", 
    items: [
      { name: "Mathematics", image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80" },
      { name: "Physics", image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80" },
      { name: "Chemistry", image: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?auto=format&fit=crop&q=80" },
      { name: "Biology", image: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?auto=format&fit=crop&q=80" }
    ]
  },
]

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState("State Books")
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
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
          scrollPrev()
          break
        case 'ArrowRight':
          e.preventDefault()
          scrollNext()
          break
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  const activeItems = categories.find((cat) => cat.name === activeCategory)?.items || []

  return (
    <section className={`py-20 transition-colors duration-300 ${
      mounted && theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800' : 'bg-gradient-to-b from-gray-100 to-gray-200'
    }`}>
      <div className="container mx-auto px-6" ref={containerRef}>
        <motion.h2 
          className={`text-4xl font-extrabold mb-10 text-center transition-colors duration-300 ${
            mounted && theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover Your Learning Path
        </motion.h2>

        <motion.div 
          className="flex flex-wrap gap-4 mb-12 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          role="tablist"
          aria-label="Category selection"
        >
          {categories.map((category, index) => (
            <motion.button
              key={index}
              role="tab"
              aria-selected={activeCategory === category.name}
              aria-controls={`${category.name}-panel`}
              className={`px-6 py-3 rounded-full font-medium text-lg transition-all duration-300 ${
                activeCategory === category.name
                  ? "bg-gradient-to-r from-yellow-400 via-green-500 to-teal-400 text-black shadow-lg"
                  : mounted && theme === 'dark'
                    ? "bg-gray-700 hover:bg-yellow-500 hover:text-black text-white"
                    : "bg-white hover:bg-yellow-500 hover:text-black text-gray-900 shadow-md"
              }`}
              onClick={() => setActiveCategory(category.name)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        <div className="relative group" aria-label={`${activeCategory} items carousel`}>
          <motion.button
            onClick={scrollPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 opacity-70 hover:opacity-100 ${
              mounted && theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-white hover:bg-gray-100 text-gray-900 shadow-lg'
            } ${!canScrollPrev && 'opacity-30 cursor-not-allowed'}`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <div className="overflow-hidden" ref={emblaRef} tabIndex={0} role="region" aria-label="Category items">
            <div className="flex -ml-4">
              <AnimatePresence mode="wait">
                {activeItems.map((item, index) => (
                  <motion.div
                    key={`${activeCategory}-${item.name}`}
                    className="flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_23%] pl-4 min-w-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    role="tabpanel"
                    id={`${activeCategory}-panel`}
                    aria-labelledby={activeCategory}
                  >
                    <Link
                      href={`/${activeCategory.toLowerCase().replace(/\s+/g, "-")}/${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`block h-[420px] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 group ${
                        mounted && theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                      }`}
                      aria-label={`View ${item.name} materials`}
                    >
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={`${item.name} category image`}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          width={600}
                          height={400}
                          quality={85}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <span className="text-white text-sm p-4">Explore Now</span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className={`text-xl font-semibold mb-2 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-1 ${
                          mounted && theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}>
                          {item.name}
                        </h3>
                        <p className={`text-sm mb-4 flex-grow line-clamp-2 ${
                          mounted && theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          Comprehensive study materials and textbooks for {item.name} students.
                        </p>
                        <div className={`pt-2 flex justify-between items-center border-t ${
                          mounted && theme === 'dark' ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-600'
                        }`}>
                          <span className="text-sm">20+ Books</span>
                          <motion.span 
                            className="text-yellow-400 flex items-center text-sm font-medium"
                            initial={false}
                            animate={{ x: 0 }}
                            whileHover={{ x: 5 }}
                          >
                            Explore
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </motion.span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <motion.button
            onClick={scrollNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 opacity-70 hover:opacity-100 ${
              mounted && theme === 'dark'
                ? 'bg-gray-800 hover:bg-gray-700 text-white'
                : 'bg-white hover:bg-gray-100 text-gray-900 shadow-lg'
            } ${!canScrollNext && 'opacity-30 cursor-not-allowed'}`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            disabled={!canScrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}