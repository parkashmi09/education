"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"

// Define the type for blog posts
type BlogPost = {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  createdAt: Date,
  documentId: string // Add documentId
}

export default function LatestUpdates() {
  const [mounted, setMounted] = useState(false)
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: true,
    skipSnaps: true,
  })
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("http://64.227.133.141:1337/api/latest-updates?populate=*")
        const data = await response.json()
        
        // Transform API data to match the required format
        const formattedPosts = data.data.map((item: any) => ({
          id: item.id,
          documentId: item.documentId, // Add documentId
          title: item.title,
          excerpt: item.Excerpt,
          image: `http://64.227.133.141:1337${item.image[0]?.url || '/uploads/default.jpg'}`,
          date: new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          createdAt: new Date(item.createdAt) // Store the actual creation date for "New" tag calculation
        }))
        
        setBlogPosts(formattedPosts)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setLoading(false)
      }
    }
    
    fetchBlogPosts()
  }, [])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
    emblaApi.on("reInit", onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    setMounted(true)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          scrollPrev()
          break
        case "ArrowRight":
          e.preventDefault()
          scrollNext()
          break
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  // Get theme-based styles
  const getThemeStyles = () => {
    if (!mounted) return {}
    
    return {
      background: theme === "dark" 
        ? "bg-gray-900" 
        : "bg-[#FFFDF6]",
      cardBg: theme === "dark" 
        ? "bg-gray-800/90 hover:bg-gray-800" 
        : "bg-white hover:bg-gray-50",
      textPrimary: theme === "dark" ? "text-white" : "text-gray-900",
      textSecondary: theme === "dark" ? "text-gray-300" : "text-gray-600",
      textMuted: theme === "dark" ? "text-gray-400" : "text-gray-500",
      cardBorder: theme === "dark" 
        ? "border-[#BBC419]/30 hover:border-[#BBC419]/70" 
        : "border-gray-200 hover:border-[#BBC419]/50",
      cardShadow: theme === "dark" 
        ? "shadow-lg shadow-amber-900/10" 
        : "shadow-md shadow-gray-200/50",
      buttonBg: theme === "dark" 
        ? "bg-[#BBC419]/20 hover:bg-[#BBC419]/30 text-yellow-300" 
        : "bg-[#BBC419]/10 hover:bg-[#BBC419]/20 text-yellow-600",
      highlight: theme === "dark" ? "text-yellow-300" : "text-yellow-600",
      accent: theme === "dark" ? "text-[#BBC419]" : "text-yellow-500"
    }
  }

  const styles = getThemeStyles()

  // Loading state
  if (loading) {
    return (
      <section className={`py-20 transition-colors duration-500 ${
        mounted ? (theme === "dark" 
          ? "bg-gray-900" 
          : "bg-[#FFFDF6]")
        : "bg-gray-50"
      }`}>
        <div className="container mx-auto px-4 sm:px-6 flex justify-center items-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-t-transparent border-[#BBC419] rounded-full animate-spin"></div>
              <div className="absolute inset-1 border-4 border-t-transparent border-yellow-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <div className={`text-2xl font-medium ${mounted && theme === "dark" ? "text-yellow-300" : "text-yellow-600"} animate-pulse`}>
              Loading latest updates...
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={`py-16 md:py-24 transition-colors duration-500 ${styles.background}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8" ref={containerRef}>
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12">
          <motion.div
            className="mb-4 sm:mb-0"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className={`text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight ${styles.textPrimary}`}>
              Latest <span className={`${theme === "dark" ? "text-yellow-300" : "text-yellow-600"}`}>Updates</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-yellow-500 to-[#BBC419] rounded-full mt-2 transform transition-all duration-300 hover:w-32"></div>
          </motion.div>
          
          <Link
            href="/blog"
            className={`group flex items-center ${theme === "dark" ? "text-yellow-300" : "text-yellow-600"} hover:opacity-80 transition-all duration-300 font-semibold px-4 py-2 rounded-full ${styles.buttonBg}`}
          >
            <span>View All Updates</span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </motion.svg>
          </Link>
        </div>

        {/* Carousel Section */}
        <div className="relative group" aria-label="Latest updates carousel">
          {/* Navigation Arrows - Responsive positioning */}
          <motion.button
            onClick={scrollPrev}
            className={`absolute left-0 sm:left-[-20px] top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 ${
              styles.buttonBg
            } ${!canScrollPrev && "opacity-40 cursor-not-allowed"}`}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          <motion.button
            onClick={scrollNext}
            className={`absolute right-0 sm:right-[-20px] top-1/2 -translate-y-1/2 z-10 p-2 sm:p-3 md:p-4 rounded-full transition-all duration-300 ${
              styles.buttonBg
            } ${!canScrollNext && "opacity-40 cursor-not-allowed"}`}
            disabled={!canScrollNext}
            aria-label="Next slide"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.button>

          {/* Carousel Content */}
          <div className="overflow-hidden" ref={emblaRef} tabIndex={0} role="region" aria-label="Blog posts">
            <div className="flex -ml-4">
              <AnimatePresence mode="wait">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="flex-[0_0_100%] xs:flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] pl-4 min-w-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/blog/${post.documentId}`} // Use documentId in the route
                      className={`block h-[450px] sm:h-[480px] rounded-2xl overflow-hidden transform transition-all duration-500 group relative border ${styles.cardBorder} ${styles.cardBg} ${styles.cardShadow} hover:shadow-xl hover:-translate-y-1`}
                      aria-label={`Read more about ${post.title}`}
                    >
                      {/* Image Section */}
                      <div className="relative h-48 sm:h-60 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 rounded-t-2xl"
                          width={600}
                          height={400}
                          quality={90}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90 transition-opacity duration-300" />
                        
                        {/* Date Badge */}
                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                          {post.date}
                        </div>
                        
                        {/* Enhanced New Tag - Only shown if post is less than 24 hours old */}
                        {post.createdAt && (Date.now() - post.createdAt.getTime() < 24 * 60 * 60 * 1000) && (
                          <div className="absolute top-4 left-4 overflow-hidden">
                            <div className="relative">
                              <span className="flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-[#BBC419] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg group-hover:shadow-yellow-500/50 transition-all duration-300 border border-yellow-300/30">
                                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-white opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                New
                              </span>
                              <div className="absolute -inset-1 bg-yellow-300 blur-sm opacity-30 group-hover:opacity-60 animate-pulse transition-opacity duration-300 rounded-full"></div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-5 sm:p-6 flex flex-col flex-grow">
                        <h3
                          className={`text-xl sm:text-2xl font-extrabold mb-3 group-hover:text-yellow-500 transition-colors duration-300 line-clamp-2 ${styles.textPrimary}`}
                        >
                          {post.title}
                        </h3>
                        <p
                          className={`text-sm mb-4 flex-grow line-clamp-3 leading-relaxed ${styles.textSecondary}`}
                        >
                          {post.excerpt}
                        </p>
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                          <motion.div
                            className={`flex items-center text-sm font-semibold ${theme === "dark" ? "text-yellow-300" : "text-yellow-600"}`}
                            initial={false}
                            animate={{ x: 0 }}
                            whileHover={{ x: 5 }}
                          >
                            Read Full Article
                            <ChevronRight className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" />
                          </motion.div>
                        </div>
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#BBC419]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Pagination Dots for Mobile */}
          {blogPosts.length > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {blogPosts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    emblaApi?.selectedScrollSnap() === index
                      ? `w-6 ${theme === "dark" ? "text-yellow-300" : "text-yellow-600"} bg-current`
                      : `${theme === "dark" ? "bg-gray-600" : "bg-gray-300"}`
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for Responsive Styles */}
      <style jsx>{`
        @media (max-width: 480px) {
          .xs\\:flex-\\[0_0_90\\%\\] {
            flex: 0 0 90%;
          }
        }
      `}</style>
    </section>
  )
}