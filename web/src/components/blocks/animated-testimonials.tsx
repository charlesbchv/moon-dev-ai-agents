"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

interface AnimatedTestimonialsProps {
  testimonials: Testimonial[];
  trustedCompanies?: string[];
  autoplay?: boolean;
  autoplayDelay?: number;
}

export function AnimatedTestimonials({
  testimonials,
  trustedCompanies,
  autoplay = true,
  autoplayDelay = 5000,
}: AnimatedTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, autoplayDelay);

    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, testimonials.length]);

  return (
    <div className="w-full">
      <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
        {/* Left Side - Title and Description */}
        <div className="space-y-6">
          <div className="inline-block">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">Trusted by developers</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Loved by the community
          </h2>

          <p className="text-lg text-muted-foreground max-w-md">
            Don't just take our word for it. See what developers and companies have to say about
            our starter template.
          </p>

          {/* Dots Indicator */}
          <div className="flex gap-2 pt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-foreground"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side - Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-lg"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <blockquote className="text-lg leading-relaxed mb-8 text-foreground">
                "{testimonials[currentIndex].content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-border"
                />
                <div>
                  <div className="font-semibold text-base">{testimonials[currentIndex].name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Trusted Companies */}
      {trustedCompanies && trustedCompanies.length > 0 && (
        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground mb-8">
            Trusted by developers from companies worldwide
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-60">
            {trustedCompanies.map((company, index) => (
              <div
                key={index}
                className="text-lg md:text-xl font-semibold text-muted-foreground hover:text-foreground transition-colors"
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
