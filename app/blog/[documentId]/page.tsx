'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useParams, useRouter } from 'next/navigation'

type BlogPost = {
  id: number
  documentId: string
  title: string
  excerpt: string
  image: string
  date: string
  content: string
}

export default function BlogPostPage() {
  const params = useParams()
  const router = useRouter()
  const documentId = params.documentId as string
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()

  useEffect(() => {
    if (!documentId) return

    const fetchPost = async () => {
      try {
        const response = await fetch(`http://64.227.133.141:1337/api/latest-updates/${documentId}?populate=*`)
        const data = await response.json()
        
        const formattedPost = {
          id: data.data.id,
          documentId: data.data.documentId,
          title: data.data.title,
          excerpt: data.data.Excerpt,
          image: `http://64.227.133.141:1337${data.data.image[0]?.url || '/uploads/default.jpg'}`,
          date: new Date(data.data.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          content: data.data.description_content.map((item: any) => 
            item.children.map((child: any) => child.text).join(' ')
          ).join('\n')
        }
        
        setPost(formattedPost)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching blog post:", error)
        setLoading(false)
      }
    }

    fetchPost()
  }, [documentId])

  if (loading) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${
        theme === "dark" ? "bg-[#0A0B12] text-white" : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900"
      }`}>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-t-transparent border-yellow-500 rounded-full animate-spin"></div>
            <div className="absolute inset-1 border-4 border-t-transparent border-yellow-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <div className="text-2xl font-medium text-yellow-500 animate-pulse">
            Loading post...
          </div>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${
        theme === "dark" ? "bg-[#0A0B12] text-white" : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900"
      }`}>
        <div className="text-2xl font-medium">Post not found</div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen py-12 transition-colors duration-300 ${
      theme === "dark" ? "bg-[#0A0B12] text-white" : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 text-gray-900"
    }`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className={`text-lg mb-8 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{post.date}</p>
          
          <div className="relative h-96 mb-10 rounded-xl overflow-hidden shadow-xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700"
              priority
            />
          </div>
          
          <div className={`prose max-w-none ${theme === "dark" ? "prose-invert" : ""}`}>
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className={`text-lg leading-relaxed mb-6 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}>
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700">
            <button 
              onClick={() => router.back()}
              className="flex items-center text-yellow-500 hover:text-yellow-400 transition-colors duration-300 font-semibold"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Blog
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}