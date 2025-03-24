"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card } from "@/components/ui/card"
import { Facebook, Instagram, Linkedin, Twitter, Youtube, Share2, BookOpen, GraduationCap } from 'lucide-react'
import Image from 'next/image'

const socialLinks = [
  {
    name: 'Facebook',
    Icon: Facebook,
    href: '#',
    color: 'text-blue-600 hover:text-blue-700',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    // description: 'Join our student community'
  },
  {
    name: 'Instagram',
    Icon: Instagram,
    href: '#',
    color: 'text-pink-500 hover:text-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-950/30',
    // description: 'Daily study tips & updates'
  },
  {
    name: 'Youtube',
    Icon: Youtube,
    href: '#',
    color: 'text-red-600 hover:text-red-700',
    bgColor: 'bg-red-50 dark:bg-red-950/30',
    // description: 'Video lectures & tutorials'
  },
  {
    name: 'Twitter',
    Icon: Twitter,
    href: '#',
    color: 'text-blue-400 hover:text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    // description: 'Latest education news'
  },
  {
    name: 'LinkedIn',
    Icon: Linkedin,
    href: '#',
    color: 'text-blue-700 hover:text-blue-800',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    // description: 'Professional networking'
  }
]

const StayConnected = () => {
  return (
    <section className="w-full py-12 bg-white dark:bg-gray-950">
      <Card className="container mx-auto px-4 md:px-6 rounded-3xl bg-gradient-to-br from-[#BBC419]/5 to-[#549F1D]/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-8 h-8 text-[#549F1D]" />
              <BookOpen className="w-8 h-8 text-[#BBC419]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">
              Stay Connected With{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#549F1D] to-[#BBC419]">
                Self
              </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#BBC419] to-[#83FDE5]">
                Studys
              </span>
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
              {socialLinks.map((social) => {
                const IconComponent = social.Icon
                return (
                  <motion.div
                    key={social.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative"
                  >
                    <Link
                      href={social.href}
                      className={`flex items-center p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 ${social.bgColor} ${social.color}`}
                    >
                      <IconComponent className="w-6 h-6 mr-3 transition-transform group-hover:scale-110" />
                      <span className="font-medium">{social.name}</span>
                    </Link>
                    {/* <div className="absolute -bottom-2 left-0 right-0 px-4 py-1 text-xs text-gray-600 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {social.description}
                    </div> */}
                  </motion.div>
                )
              })}
            </div>
          </div>
          
          <div className="relative h-[400px] w-full overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1000&auto=format&fit=crop"
              alt="Students studying together and sharing knowledge"
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#549F1D]/30 via-[#BBC419]/20 to-transparent">
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-sm font-medium text-[#549F1D]">
                  <Share2 className="w-4 h-4" />
                  <span>Share your learning journey with us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  )
}

export default StayConnected