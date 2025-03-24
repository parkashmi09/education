"use client"

import { useState, useEffect, useRef } from "react"
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
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleMouseEnter = (category: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setHoveredCategory(category)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setHoveredCategory(null)
    }, 200)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex space-x-1">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(category.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors rounded-md hover:bg-accent">
                    {category.name}
                  </button>
                  {hoveredCategory === category.name && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-popover rounded-md shadow-lg overflow-hidden border"
                         onMouseEnter={() => handleMouseEnter(category.name)}
                         onMouseLeave={handleMouseLeave}>
                      <div className="py-1">
                        {category.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={`/${category.name.toLowerCase().replace(/\s+/g, "-")}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                            className="block px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                          >
                            {item}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>

          {/* Right Side Actions */}
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
              className="lg:hidden relative inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t bg-background">
            <div className="space-y-1 px-4 pb-3 pt-2">
              {categories.map((category) => (
                <div key={category.name} className="space-y-1">
                  <button
                    className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
                    onClick={() => setHoveredCategory(hoveredCategory === category.name ? null : category.name)}
                  >
                    {category.name}
                  </button>
                  {hoveredCategory === category.name && (
                    <div className="pl-6 space-y-1">
                      {category.items.map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/${category.name.toLowerCase().replace(/\s+/g, "-")}/${item.toLowerCase().replace(/\s+/g, "-")}`}
                          className="block px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
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
          </div>
        )}
      </div>
    </header>
  )
}
