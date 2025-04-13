"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Menu, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import Logo from "./logo"

// Define types for API response
type Board = {
  id: number
  documentId: string
  board_name: string
}

type Class = {
  id: number
  documentId: string
  class: string
}

type Subject = {
  id: number
  documentId: string
  subject: string
}

type Category = {
  id: number
  documentId: string
  category_name: string
  boards: Board[]
  classes: Class[]
  subjects: Subject[]
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://64.227.133.141:1337/api/categories/?populate=*")
        const data = await response.json()
        setCategories(data.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setLoading(false)
      }
    }
    
    fetchCategories()
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

  // Helper function to get items for a category
  const getCategoryItems = (category: Category) => {
    if (category.boards && category.boards.length > 0) {
      return category.boards.map(board => board.board_name)
    } else if (category.classes && category.classes.length > 0) {
      return category.classes.map(cls => cls.class)
    } else if (category.subjects && category.subjects.length > 0) {
      return category.subjects.map(subject => subject.subject)
    }
    return []
  }

  // Helper function to get the document ID for an item
  const getItemDocumentId = (category: Category, itemName: string) => {
    if (category.boards && category.boards.length > 0) {
      const board = category.boards.find(b => b.board_name === itemName)
      return board?.documentId || ""
    } else if (category.classes && category.classes.length > 0) {
      const cls = category.classes.find(c => c.class === itemName)
      return cls?.documentId || ""
    } else if (category.subjects && category.subjects.length > 0) {
      const subject = category.subjects.find(s => s.subject === itemName)
      return subject?.documentId || ""
    }
    return ""
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex space-x-1">
              {!loading && categories.map((category) => (
                <div
                  key={category.id}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(category.category_name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors rounded-md hover:bg-accent">
                    {category.category_name}
                  </button>
                  {hoveredCategory === category.category_name && (
                    <div className="absolute top-full left-0 mt-1 w-56 bg-popover rounded-md shadow-lg overflow-hidden border"
                         onMouseEnter={() => handleMouseEnter(category.category_name)}
                         onMouseLeave={handleMouseLeave}>
                      <div className="py-1">
                        {getCategoryItems(category).map((item, idx) => (
                          <Link
                            key={idx}
                            href={`/${category.category_name.toLowerCase().replace(/\s+/g, "-")}/${getItemDocumentId(category, item)}`}
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
              {!loading && categories.map((category) => (
                <div key={category.id} className="space-y-1">
                  <button
                    className="w-full text-left px-3 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors"
                    onClick={() => setHoveredCategory(hoveredCategory === category.category_name ? null : category.category_name)}
                  >
                    {category.category_name}
                  </button>
                  {hoveredCategory === category.category_name && (
                    <div className="pl-6 space-y-1">
                      {getCategoryItems(category).map((item, idx) => (
                        <Link
                          key={idx}
                          href={`/${category.category_name.toLowerCase().replace(/\s+/g, "-")}/${getItemDocumentId(category, item)}`}
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
