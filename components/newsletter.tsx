import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen } from "lucide-react"

export default function Newsletter() {
  return (
    <section className="py-16 bg-gray-800 dark:bg-gray-800 light:bg-gray-100 light:text-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-gray-900 to-teal-900 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden dark:from-gray-900 dark:to-teal-900 light:from-gray-200 light:to-teal-100">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 rounded-full bg-yellow-400 opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-64 h-64 rounded-full bg-teal-400 opacity-20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-gray-300 mb-6 dark:text-gray-300 light:text-gray-700">
                Stay updated with the latest educational resources, study materials, and tips to excel in your academic
                journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-auto flex-grow dark:bg-gray-800 dark:border-gray-700 light:bg-white light:border-gray-300"
                />
                <Button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-teal-400 rounded-md text-lg font-semibold hover:opacity-90 transform hover:scale-105 transition-all duration-300 shadow-lg text-black">
                  Subscribe
                </Button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <BookOpen className="w-32 h-32 text-primary opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

