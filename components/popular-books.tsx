import Link from "next/link"
import Image from "next/image"

const books = [
  {
    title: "NCERT Mathematics - Class 10",
    subject: "Mathematics",
    board: "CBSE",
    image: "https://source.unsplash.com/random/600x800/?mathematics,textbook",
    rating: 4.8,
  },
  {
    title: "Complete Physics Guide",
    subject: "Physics",
    board: "CBSE",
    image: "https://source.unsplash.com/random/600x800/?physics,textbook",
    rating: 4.7,
  },
  {
    title: "Biology Masterclass",
    subject: "Biology",
    board: "UP Board",
    image: "https://source.unsplash.com/random/600x800/?biology,textbook",
    rating: 4.9,
  },
  {
    title: "Chemistry Simplified",
    subject: "Chemistry",
    board: "Bihar Board",
    image: "https://source.unsplash.com/random/600x800/?chemistry,textbook",
    rating: 4.6,
  },
  {
    title: "English Literature Companion",
    subject: "English",
    board: "CBSE",
    image: "https://source.unsplash.com/random/600x800/?english,literature",
    rating: 4.5,
  },
  {
    title: "Social Science - Complete Study",
    subject: "Social Science",
    board: "MP Board",
    image: "https://source.unsplash.com/random/600x800/?social,science",
    rating: 4.7,
  },
  {
    title: "Hindi Vyakaran",
    subject: "Hindi",
    board: "Rajasthan Board",
    image: "https://source.unsplash.com/random/600x800/?hindi,language",
    rating: 4.4,
  },
  {
    title: "Computer Science Fundamentals",
    subject: "Computer Science",
    board: "CBSE",
    image: "https://source.unsplash.com/random/600x800/?computer,science",
    rating: 4.9,
  },
]

export default function PopularBooks() {
  return (
    <section className="py-16 bg-gray-900 dark:bg-gray-900 light:bg-gray-200 light:text-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Popular Books</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 group dark:bg-gray-800 light:bg-white"
            >
              <div className="h-64 overflow-hidden relative">
                <Image
                  src={book.image || "/placeholder.svg"}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  width={600}
                  height={800}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-green-500 text-xs rounded-full text-black">
                    {book.board}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 dark:text-white light:text-gray-900">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 dark:text-gray-400 light:text-gray-600">
                  Subject: {book.subject}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{book.rating} ★★★★☆</span>
                  <Link
                    href={`/books/${book.board.toLowerCase().replace(/\s+/g, "-")}/${book.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-teal-400 rounded hover:opacity-90 transition-colors duration-300 flex items-center text-black"
                  >
                    View Book
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

