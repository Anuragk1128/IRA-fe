export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Welcome to IRA</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Home of Artificial Jewelleries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Get Started
            </a>
            <a 
              href="#features"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="bg-gray-800 m-0 p-0">
        <div className="container mx-auto m-0 p-0">
          <div className="scrolling-text-container">
            <span className="scrolling-text text-lg font-small text-white gap-2">
               New Collections Coming Soon  • Handcrafted Jewelry • Limited Edition Pieces • Premium Quality • Affordable Luxury •  New Collections Coming Soon  • Handcrafted Jewelry • Limited Edition Pieces • Premium Quality • Affordable Luxury
            </span>
          </div>
          
        </div>
      </section>

      {/* Footer */}
      <div className="bg-gray-900 py-8 text-center text-gray-400">
        <div className="container mx-auto px-4 font-bold ">
          <p> Products Coming Soon </p>
        </div>
      </div>
    </div>
  );
}
