"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface Testimonial {
  id: number
  name: string
  username: string
  avatar: string
  content: string
  rating: number
  company?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Chen",
    username: "@sarahchen",
    avatar: "/professional-woman-smiling.png",
    content:
      "Trigger has completely transformed how I handle my daily tasks. The email to WhatsApp automation alone saves me 2 hours every day. It's like having a personal assistant!",
    rating: 5,
    company: "Marketing Director",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    username: "@marcusdev",
    avatar: "/professional-bearded-man.png",
    content:
      "I've tried Zapier and n8n, but Trigger is just different. The interface is so intuitive that I built my first workflow in under 5 minutes. Game changer for small businesses.",
    rating: 5,
    company: "Startup Founder",
  },
  {
    id: 3,
    name: "Emily Watson",
    username: "@emilywatson",
    avatar: "/professional-woman-glasses.png",
    content:
      "The payment processing workflow has streamlined our entire billing system. Our customers love the instant confirmations, and we've reduced manual work by 80%.",
    rating: 5,
    company: "E-commerce Owner",
  },
  {
    id: 4,
    name: "David Kim",
    username: "@davidkim",
    avatar: "/professional-asian-man.png",
    content:
      "Trigger's automation capabilities are incredible. I've connected my CRM, email, and calendar in ways I never thought possible. It's automation made simple.",
    rating: 5,
    company: "Sales Manager",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    username: "@lisathompson",
    avatar: "/professional-curly-hair-woman.png",
    content:
      "As a freelancer, time is money. Trigger helps me automate client communications and project updates. I can focus on what I do best while it handles the rest.",
    rating: 5,
    company: "Freelance Designer",
  },
  {
    id: 6,
    name: "Alex Johnson",
    username: "@alexjohnson",
    avatar: "/professional-short-hair.png",
    content:
      "The learning curve was practically non-existent. Within an hour, I had three workflows running. Trigger makes automation accessible to everyone, not just tech experts.",
    rating: 5,
    company: "Operations Manager",
  },
]

export function TestimonialCarousel() {
  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials]

  return (
    <div className="relative overflow-hidden py-8">
      <div className="flex animate-scroll-left space-x-6">
        {duplicatedTestimonials.map((testimonial, index) => (
          <Card
            key={`${testimonial.id}-${index}`}
            className="flex-shrink-0 w-80 border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/10"
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="w-12 h-12 ring-2 ring-primary/20">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.username}</p>
                  {testimonial.company && <p className="text-xs text-primary font-medium">{testimonial.company}</p>}
                </div>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gradient overlays for smooth edges */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  )
}
