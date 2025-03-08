import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="relative w-10 h-10 mr-2">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-6DWmfsC9w5r8n1kj4A94wqusBIHgdq.png"
          alt="EduBlog Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-green-500 to-teal-400">
        EduBlog
      </span>
    </Link>
  )
}

