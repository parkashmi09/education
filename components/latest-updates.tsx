"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"

const blogPosts = [
  {
    title: "New CBSE Curriculum for 2023-24",
    excerpt: "Explore the updated curriculum with significant changes to help students prepare better.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&auto=format&fit=crop&w=600&h=400",
    date: "June 15, 2023",
  },
  {
    title: "5 Tips to Excel in Your Board Exams",
    excerpt: "Expert advice to help you maximize your performance in upcoming board examinations.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&auto=format&fit=crop&w=600&h=400",
    date: "June 10, 2023",
  },
  {
    title: "Digital Learning Tools for Modern Education",
    excerpt: "Discover the latest digital tools revolutionizing how students learn and interact with content.",
    image: "https://images.unsplash.com/photo-1516321310768-598d42c6b51f?q=80&auto=format&fit=crop&w=600&h=400",
    date: "June 5, 2023",
  },
  {
    title: "Understanding the New Education Policy",
    excerpt: "A comprehensive breakdown of the policy changes and their impact on students.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&auto=format&fit=crop&w=600&h=400",
    date: "May 28, 2023",
  },
  {
    title: "Preparing for Competitive Exams: A Guide",
    excerpt: "Strategic approaches to balance board exams and competitive entrance preparations.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&auto=format&fit=crop&w=600&h=400",
    date: "May 20, 2023",
  },
]

export default function LatestUpdates() {
  const [mounted, setMounted] = useState(false)
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

  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        mounted && theme === "dark"
          ? "bg-[#0A0B12]"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
      }`}
    >
      <div className="container mx-auto px-6" ref={containerRef}>
        {/* Header Section */}
        <div className="flex justify-between items-center mb-12">
          <motion.h2
            className={`text-4xl font-extrabold tracking-tight ${
              mounted && theme === "light" ? "text-gray-900" : "text-white"
            }`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Latest Updates
          </motion.h2>
          <Link
            href="/blog"
            className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-300 font-semibold"
          >
            View All
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 ml-2"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </motion.svg>
          </Link>
        </div>

        {/* Carousel Section */}
        <div className="relative group" aria-label="Latest updates carousel">
          {/* Navigation Arrows */}
          <motion.button
            onClick={scrollPrev}
            className={`absolute left-[-20px] top-1/2 -translate-y-1/2 z-10 p-4 rounded-full transition-all duration-300 ${
              mounted && theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700 text-white shadow-glow-dark"
                : "bg-white hover:bg-gray-100 text-gray-900 shadow-glow-light"
            } ${!canScrollPrev && "opacity-50 cursor-not-allowed"}`}
            // whileHover={{ scale: 1.1 }}
            // whileTap={{ scale: 0.95 }}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={scrollNext}
            className={`absolute right-[-20px] top-1/2 -translate-y-1/2 z-10 p-4 rounded-full transition-all duration-300 ${
              mounted && theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700 text-white shadow-glow-dark"
                : "bg-white hover:bg-gray-100 text-gray-900 shadow-glow-light"
            } ${!canScrollNext && "opacity-50 cursor-not-allowed"}`}
            // whileHover={{ scale: 1.1 }}
            // whileTap={{ scale: 0.95 }}
            disabled={!canScrollNext}
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Carousel Content */}
          <div className="overflow-hidden" ref={emblaRef} tabIndex={0} role="region" aria-label="Blog posts">
            <div className="flex -ml-4">
              <AnimatePresence mode="wait">
                {blogPosts.map((post, index) => (
                  <motion.div
                    key={index}
                    className="flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] pl-4 min-w-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link
                      href={`/blog/${post.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className={`block h-[480px] rounded-xl overflow-hidden transform transition-all duration-500 group relative border border-transparent hover:border-yellow-500/30 hover:shadow-2xl ${
                        mounted && theme === "dark" ? "bg-gray-800/80" : "bg-white"
                      } backdrop-blur-sm`}
                      aria-label={`Read more about ${post.title}`}
                    >
                      {/* Image Section */}
                      <div className="relative h-60 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 rounded-t-xl"
                          width={600}
                          height={400}
                          quality={90}
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90 transition-opacity duration-300" />
                        {/* Badge/Tag */}
                        <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md group-hover:bg-yellow-400 transition-colors duration-300">
                          New
                        </span>
                      </div>

                      {/* Content Section */}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3
                          className={`text-2xl font-extrabold mb-3 group-hover:text-yellow-500 transition-colors duration-300 line-clamp-2 ${
                            mounted && theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {post.title}
                        </h3>
                        <p
                          className={`text-sm mb-4 flex-grow line-clamp-3 leading-relaxed ${
                            mounted && theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {post.excerpt}
                        </p>
                        <div
                          className={`pt-4 flex justify-between items-center ${
                            mounted && theme === "dark" ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <span className="text-sm font-medium">{post.date}</span>
                          <motion.span
                            className="text-yellow-500 flex items-center text-sm font-semibold"
                            initial={false}
                            animate={{ x: 0 }}
                            whileHover={{ x: 5 }}
                          >
                            Read More
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
        </div>
      </div>

      {/* Custom CSS for Glow Effect */}
      <style jsx>{`
        .shadow-glow-light {
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }
        .shadow-glow-dark {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.15);
        }
      `}</style>
    </section>
  )
}