"use client"
import Hero from "@/components/hero"
import Categories from "@/components/categories"
import LatestUpdates from "@/components/latest-updates"
import PopularBooks from "@/components/popular-books"
import Newsletter from "@/components/newsletter"
import StayConnected from "@/components/stayConnected"
import TestimonialSlider from "@/components/testimonials"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white transition-all duration-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 light:from-gray-100 light:via-gray-200 light:to-gray-100">
      <main>
        <Hero />
        <LatestUpdates />
        <Categories />
        {/* <PopularBooks /> */}
        <TestimonialSlider/>
        <StayConnected/>
        {/* <Newsletter /> */}
      </main>
    </div>
  )
}

