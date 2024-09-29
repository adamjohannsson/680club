import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PencilRuler, Printer, Palette } from "lucide-react"
import Link from "next/link"

export default function PrintboardLanding() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <PencilRuler className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">Printboard</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-primary-foreground sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Create Your Dream Vision Board
                </h1>
                <p className="mx-auto max-w-[700px] text-primary-foreground md:text-xl">
                  Design and print your personalized vision board with Printboard. Bring your goals to life, one image at a time.
                </p>
              </div>
              <div className="space-x-4">
                <Button variant="secondary" size="lg">
                  Get Started
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-3 text-center">
                <PencilRuler className="h-12 w-12 text-primary" />
                <h2 className="text-xl font-bold">Easy Design Tools</h2>
                <p className="text-sm text-muted-foreground">
                  Intuitive drag-and-drop interface for effortless vision board creation.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Palette className="h-12 w-12 text-primary" />
                <h2 className="text-xl font-bold">Customizable Templates</h2>
                <p className="text-sm text-muted-foreground">
                  Choose from a variety of themes or start from scratch to make it truly yours.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-3 text-center">
                <Printer className="h-12 w-12 text-primary" />
                <h2 className="text-xl font-bold">High-Quality Printing</h2>
                <p className="text-sm text-muted-foreground">
                  Get your vision board delivered to your doorstep in stunning print quality.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to Visualize Your Dreams?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                  Join Printboard today and start creating your perfect vision board.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input
                    className="max-w-lg flex-1"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Button type="submit">Sign Up</Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  By signing up, you agree to our{" "}
                  <Link className="underline underline-offset-2" href="#">
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Printboard Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}