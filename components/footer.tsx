"use client"

import Link from "next/link"
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react"
import Logo from "./logo"

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Empowering students with quality educational resources to excel in their academic journey.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                <Youtube className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-gray-600 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/cbse" className="text-gray-600 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                  CBSE
                </Link>
              </li>
              <li>
                <Link href="/state-boards" className="text-gray-600 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                  State Boards
                </Link>
              </li>
              <li>
                <Link href="/cuet" className="text-gray-600 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                  CUET
                </Link>
              </li>
              <li>
                <Link href="/study-materials" className="text-gray-600 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                  Study Materials
                </Link>
              </li>
              <li>
                <Link href="/sample-papers" className="text-gray-600 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
                  Sample Papers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mt-1 mr-3 text-[#549F1D] dark:text-[#BBC419]"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">123 Education Street, Knowledge City, 12345</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mt-1 mr-3 text-[#549F1D] dark:text-[#BBC419]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">info@TARGETBOARDs.com</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 mt-1 mr-3 text-[#549F1D] dark:text-[#BBC419]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                  />
                </svg>
                <span className="text-gray-600 dark:text-gray-400">+1 (123) 456-7890</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} TARGETBOARD. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-xs text-gray-500 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-xs text-gray-500 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/cookies" className="text-xs text-gray-500 hover:text-[#549F1D] dark:text-gray-400 dark:hover:text-[#BBC419] transition-colors duration-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
