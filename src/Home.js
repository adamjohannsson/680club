import React, { useState } from "react";
import { FaRulerCombined, FaPalette, FaPrint, FaUserPlus, FaBullseye, FaImage, FaRuler, FaCreditCard, FaTruck } from "react-icons/fa";
import { sendSignInLinkToEmail } from "firebase/auth";
import { auth } from "./firebaseConfig"; // Ensure this is your Firebase configuration
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"; // Import lucide icons

// Testimonial carousel component
const testimonials = [
  {
    quote: "Printboard transformed my goal-setting process. It's so motivating to see my dreams visualized every day!",
    author: "Sarah J.",
    role: "Entrepreneur",
  },
  {
    quote: "The quality of the prints is outstanding. My vision board looks professional and inspiring.",
    author: "Michael T.",
    role: "Fitness Coach",
  },
  {
    quote: "Creating my vision board was fun and intuitive. I love how easy it is to customize everything.",
    author: "Emily R.",
    role: "Artist",
  },
  {
    quote: "Printboard helped me stay focused on my goals. It's a game-changer for personal development.",
    author: "David L.",
    role: "Student",
  },
];

function SocialProofCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center">
      <div className="container max-w-4xl mx-auto px-4 md:px-6 flex flex-col items-center">
        <h2 className="text-3xl font-bold tracking-tighter text-center mb-2">What Our Customers Say</h2>
        <p className="text-center text-gray-600 mb-8">1,000 happy customers</p>
        <div className="relative w-full">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <Quote className="h-8 w-8 text-gray-800 mb-4" />
                    <blockquote className="text-lg mb-4">{testimonial.quote}</blockquote>
                    <cite className="block text-right">
                      <span className="font-semibold">{testimonial.author}</span>
                      <span className="block text-sm text-gray-500">{testimonial.role}</span>
                    </cite>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white p-2 rounded-full shadow-md"
            onClick={prevTestimonial}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white p-2 rounded-full shadow-md"
            onClick={nextTestimonial}
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>
        </div>
        <div className="flex justify-center mt-4 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full p-0 ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PrintboardLanding() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const actionCodeSettings = {
    url: "http://localhost:3000", // Update this with your app's URL for production
    handleCodeInApp: true,
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      setMessage("A magic link has been sent to your email. Please check your inbox.");
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const scrollToSection = () => {
    const section = document.getElementById("how-it-works");
    section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      {/* Header */}
      <header className="w-full px-4 lg:px-6 h-20 flex justify-between items-center" style={{ backgroundColor: '#212229' }}>
        <a className="flex items-center justify-center" href="#">
          <FaRulerCombined className="h-6 w-6 text-white" />
          <span className="ml-2 text-2xl font-bold text-white">Printboard</span>
        </a>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <button className="bg-white text-black text-sm px-4 py-2 rounded-lg">Sign In</button>
          <button className="border text-sm px-4 py-2 rounded-lg text-white border-white">Register</button>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 w-full text-center">
        <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32 flex flex-col justify-center items-center" style={{ backgroundColor: '#212229' }}>
          <div className="container px-4 md:px-6 flex flex-col items-center space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl">
              Create Your Dream Vision Board
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
              Design and print your personalized vision board with Printboard. Bring your goals to life, one image at a time.
            </p>
            <div className="space-x-4">
              <button className="bg-white text-black text-lg px-6 py-2 rounded-lg">
                Get Started
              </button>
              <button
                onClick={scrollToSection}
                className="border text-lg px-6 py-2 rounded-lg text-white border-white">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-8 md:py-12 lg:py-16 bg-gray-100 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">How It Works</h2>
              <p className="max-w-[900px] text-gray-700 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Creating your custom vision board is easy with Printboard. Follow these simple steps:
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-8 py-8 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <FaUserPlus className="h-10 w-10 text-gray-800" />
                <h3 className="text-2xl font-bold">1. Sign Up</h3>
                <p className="text-sm text-gray-600">Create your free Printboard account to get started.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <FaBullseye className="h-10 w-10 text-gray-800" />
                <h3 className="text-2xl font-bold">2. Enter Your Goals</h3>
                <p className="text-sm text-gray-600">Define your aspirations and dreams for your vision board.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <FaImage className="h-10 w-10 text-gray-800" />
                <h3 className="text-2xl font-bold">3. Generate Your Vision Board</h3>
                <p className="text-sm text-gray-600">Use our tools to create a board that inspires you.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <FaRuler className="h-10 w-10 text-gray-800" />
                <h3 className="text-2xl font-bold">4. Select Dimensions</h3>
                <p className="text-sm text-gray-600">Choose the perfect size for your vision board.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <FaCreditCard className="h-10 w-10 text-gray-800" />
                <h3 className="text-2xl font-bold">5. Payment</h3>
                <p className="text-sm text-gray-600">Securely pay for your custom vision board.</p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <FaTruck className="h-10 w-10 text-gray-800" />
                <h3 className="text-2xl font-bold">6. Shipping Details</h3>
                <p className="text-sm text-gray-600">Provide your address for fast and reliable delivery.</p>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="bg-gray-800 text-white px-6 py-2 rounded-lg text-lg">Create Your Vision Board Now</button>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <SocialProofCarousel />

        {/* Call to Action Section */}
        <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-100 flex flex-col justify-center items-center">
          <div className="container px-4 md:px-6 flex flex-col items-center space-y-4 text-center">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              Ready to Achieve Your Dreams?
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-600 md:text-xl">
              Join Printboard today.
            </p>
            <div className="w-full max-w-sm mx-auto space-y-2">
              <form className="flex flex-col items-center space-y-4" onSubmit={handleSignUp}>
                <input
                  className="flex-1 w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg">
                  Sign Up
                </button>
              </form>
              {message && <p className="text-sm text-gray-600">{message}</p>}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full px-4 lg:px-6 py-6 flex justify-center items-center" style={{ backgroundColor: '#212229' }}>
        <p className="text-sm text-gray-400">Made with ❤️ in Montreal</p>
      </footer>
    </div>
  );
}
