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
          ? "bg-gradient-to-b from-gray-900 to-gray-800"
          : "bg-gradient-to-b from-gray-100 to-gray-200"
      }`}
    >
      <div className="container mx-auto px-6" ref={containerRef}>
        <div className="flex justify-between items-center mb-10">
          <motion.h2
            className={`text-4xl font-extrabold transition-colors duration-300 ${
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
            className="flex items-center text-yellow-400 hover:text-teal-400 transition-colors duration-300 font-medium"
          >
            View All
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 ml-1"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </motion.svg>
          </Link>
        </div>

        <div className="relative group" aria-label="Latest updates carousel">
          <motion.button
            onClick={scrollPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 opacity-70 hover:opacity-100 ${
              mounted && theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-white hover:bg-gray-100 text-gray-900 shadow-lg"
            } ${!canScrollPrev && "opacity-30 cursor-not-allowed"}`}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            disabled={!canScrollPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

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
                      className={`block h-[420px] rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 group ${
                        mounted && theme === "dark" ? "bg-gray-800" : "bg-white"
                      }`}
                      aria-label={`Read more about ${post.title}`}
                    >
                      <div className="relative h-52 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          width={600}
                          height={400}
                          quality={85}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <span className="text-white text-sm p-4">Read Now</span>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-grow">
                        <h3
                          className={`text-xl font-semibold mb-2 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-1 ${
                            mounted && theme === "dark" ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {post.title}
                        </h3>
                        <p
                          className={`text-sm mb-4 flex-grow line-clamp-2 ${
                            mounted && theme === "dark" ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          {post.excerpt}
                        </p>
                        <div
                          className={`pt-2 flex justify-between items-center border-t ${
                            mounted && theme === "dark" ? "border-gray-700 text-gray-400" : "border-gray-200 text-gray-600"
                          }`}
                        >
                          <span className="text-sm">{post.date}</span>
                          <motion.span
                            className="text-yellow-400 flex items-center text-sm font-medium"
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

          <motion.button
            onClick={scrollNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 opacity-70 hover:opacity-100 ${
              mounted && theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700 text-white"
                : "bg-white hover:bg-gray-100 text-gray-900 shadow-lg"
            } ${!canScrollNext && "opacity-30 cursor-not-allowed"}`}
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