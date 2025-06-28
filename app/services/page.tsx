import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Service Card 1 */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Web Development</h2>
          <p className="text-gray-700 mb-4">
            We build responsive and scalable websites tailored to your business needs.
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Learn More
          </Link>
        </div>

        {/* Service Card 2 */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Mobile App Development</h2>
          <p className="text-gray-700 mb-4">We create native and cross-platform mobile apps for iOS and Android.</p>
          <Link
            href="/consultation"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Learn More
          </Link>
        </div>

        {/* Service Card 3 */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Digital Marketing</h2>
          <p className="text-gray-700 mb-4">We help you reach your target audience and grow your online presence.</p>
          <Link
            href="/consultation"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </Link>
        </div>

        {/* Service Card 4 */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">UI/UX Design</h2>
          <p className="text-gray-700 mb-4">
            We create intuitive and engaging user interfaces for web and mobile applications.
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Learn More
          </Link>
        </div>

        {/* Service Card 5 */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">Cloud Solutions</h2>
          <p className="text-gray-700 mb-4">
            We provide cloud-based solutions to help you scale your business and reduce costs.
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Get Started
          </Link>
        </div>

        {/* Service Card 6 */}
        <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
          <h2 className="text-2xl font-semibold mb-4">E-commerce Development</h2>
          <p className="text-gray-700 mb-4">
            We build secure and scalable e-commerce platforms to help you sell your products online.
          </p>
          <Link
            href="/consultation"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-12">
        <Link
          href="/consultation"
          className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg font-semibold hover:from-emerald-400 hover:to-green-500 transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]"
        >
          Get Started for Free
        </Link>
      </div>
    </div>
  )
}
