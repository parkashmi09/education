"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import Logo from "./logo"

const categories = [
  { name: "State Books", items: ["UP Board", "MP Board", "Rajasthan Board", "Gujarat Board"] },
  { name: "Books & Solutions", items: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10"] },
  { name: "Bihar Board", items: ["Class 9", "Class 10", "Class 11", "Class 12"] },
  { name: "CBSE", items: ["Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "Class 11", "Class 12"] },
  { name: "CUET", items: ["Mathematics", "Physics", "Chemistry", "Biology"] },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openCategory, setOpenCategory] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact Us
          </Link>
          <div className="relative group">
            <button
              className="flex items-center hover:text-primary transition-colors duration-300"
              onClick={() => setOpenCategory(openCategory ? null : "main")}
            >
              Categories
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {openCategory === "main" && (
              <div className="absolute mt-2 w-64 bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 transition-all duration-200 dark:bg-gray-800 light:bg-white light:text-gray-900">
                <div className="py-2">
                  {categories.map((category, index) => (
                    <div key={index} className="relative">
                      <button
                        className="px-4 py-2 hover:bg-gray-700 cursor-pointer w-full text-left flex justify-between items-center dark:hover:bg-gray-700 light:hover:bg-gray-200"
                        onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
                      >
                        {category.name}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                      {openCategory === category.name && (
                        <div className="bg-gray-900 dark:bg-gray-900 light:bg-gray-100">
                          {category.items.map((item, idx) => (
                            <Link
                              key={idx}
                              href={`/${category.name.toLowerCase().replace(/\s+/g, "-")}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block px-6 py-2 hover:bg-gray-700 hover:text-primary transition-colors duration-200 dark:hover:bg-gray-700 light:hover:bg-gray-200"
                              onClick={() => setOpenCategory(null)}
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        <div className="flex items-center space-x-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </button>
          )}

          <button 
            className="md:hidden relative inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-2 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 hover:bg-gray-800 hover:text-primary rounded-md dark:hover:bg-gray-800 light:hover:bg-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 hover:bg-gray-800 hover:text-primary rounded-md dark:hover:bg-gray-800 light:hover:bg-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 hover:bg-gray-800 hover:text-primary rounded-md dark:hover:bg-gray-800 light:hover:bg-gray-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Us
            </Link>

            {/* Mobile Categories */}
            <div className="px-3 py-2">
              <button
                className="flex items-center justify-between w-full hover:text-primary"
                onClick={() => setOpenCategory(openCategory === "mobile-main" ? null : "mobile-main")}
              >
                Categories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              {openCategory === "mobile-main" && (
                <div className="mt-2 pl-4">
                  {categories.map((category, index) => (
                    <div key={index} className="py-1">
                      <button
                        className="flex items-center justify-between w-full hover:text-primary"
                        onClick={() =>
                          setOpenCategory(
                            openCategory === `mobile-${category.name}` ? "mobile-main" : `mobile-${category.name}`,
                          )
                        }
                      >
                        {category.name}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-4 h-4 ml-1"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>

                      {openCategory === `mobile-${category.name}` && (
                        <div className="mt-1 pl-4 space-y-1">
                          {category.items.map((item, idx) => (
                            <Link
                              key={idx}
                              href={`/${category.name.toLowerCase().replace(/\s+/g, "-")}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                              className="block py-1 hover:text-primary"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {item}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
