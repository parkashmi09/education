'use client'
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"

type BlogPost = {
  id: number
  documentId?: string
  title: string
  excerpt: string
  image: string
  date: string
  createdAt: Date
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  // Fetch blog posts from API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch("http://64.227.133.141:1337/api/latest-updates?populate=*")
        const data = await response.json()
        
        // Transform API data to match the required format
        const formattedPosts = data.data.map((item: any) => ({
          id: item.id,
          documentId: item.documentId || item.id.toString(), // Use documentId if available, otherwise use id as string
          title: item.title,
          excerpt: item.Excerpt,
          image: `http://64.227.133.141:1337${item.image[0]?.url || '/uploads/default.jpg'}`,
          date: new Date(item.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          createdAt: new Date(item.createdAt)
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

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className={`container mx-auto px-6 py-12 transition-colors duration-300 ${
      theme === "dark" ? "bg-[#0A0B12]" : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
    }`}>
      <h1 className={`text-4xl font-bold mb-8 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}>Blog Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <motion.div
            key={post.id}
            className={`rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:shadow-2xl ${
              theme === "dark" ? "bg-gray-800/80 text-white" : "bg-white text-gray-900"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <Link href={`/blog/${post.documentId || post.id}`} aria-label={`Read more about ${post.title}`}>
              <div className="relative h-60 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transform transition-transform duration-700"
                  width={600}
                  height={400}
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-90 transition-opacity duration-300" />
                {post.createdAt && (Date.now() - post.createdAt.getTime() < 24 * 60 * 60 * 1000) && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    New
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-extrabold mb-3">{post.title}</h3>
                <p className="text-sm mb-4">{post.excerpt}</p>
                <span className="text-sm font-medium">{post.date}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}