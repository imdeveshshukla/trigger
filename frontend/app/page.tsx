import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { TriggerLogo } from "@/components/trigger-logo"
import { WorkflowNode } from "@/components/workflow-node"
import { WorkflowConnection } from "@/components/workflow-connection"
import { TestimonialCarousel } from "@/components/testimonial-carousel"
import { Mail, MessageCircle, CreditCard, Zap, ArrowRight, Play, Users, BarChart3, Shield, Clock } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <TriggerLogo className="w-8 h-8" />
              <span className="text-xl font-bold text-foreground">Trigger</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#workflows" className="text-muted-foreground hover:text-foreground transition-colors">
                Workflows
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="pulse-glow">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              {"Automate Everything, Effortlessly"}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-balance mb-6">
              {"The complete "}
              <span className="text-primary">automation</span>
              {" platform for everyone"}
            </h1>

            <p className="text-xl text-muted-foreground text-balance mb-8 max-w-2xl mx-auto">
              {
                "Connect your favorite apps and automate repetitive tasks. Send emails, messages, payments, and more with simple drag-and-drop workflows."
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/signup">
                <Button size="lg" className="text-lg px-8 py-6 pulse-glow">
                  <Play className="w-5 h-5 mr-2" />
                  Start Automating Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 bg-transparent">
                Watch Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Sample Workflow Visualization */}
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                  <WorkflowNode
                    icon={<Mail className="w-5 h-5" />}
                    title="New Email"
                    description="Gmail trigger"
                    color="bg-red-500"
                  />
                  <WorkflowConnection animated className="hidden md:block" />
                  <WorkflowNode
                    icon={<MessageCircle className="w-5 h-5" />}
                    title="Send Message"
                    description="WhatsApp notification"
                    color="bg-green-500"
                  />
                  <WorkflowConnection animated className="hidden md:block" />
                  <WorkflowNode
                    icon={<CreditCard className="w-5 h-5" />}
                    title="Process Payment"
                    description="Stripe integration"
                    color="bg-purple-500"
                  />
                </div>
                <p className="text-center text-muted-foreground mt-6">
                  {
                    "Example: Automatically send WhatsApp notifications and process payments when you receive important emails"
                  }
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10M+</div>
              <div className="text-muted-foreground">Tasks Automated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">App Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Happy Users</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-balance mb-4">{"Why choose Trigger?"}</h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              {"Built for everyone, from beginners to power users. Create powerful automations without any coding."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{"Lightning Fast"}</h3>
              <p className="text-muted-foreground">
                {"Set up automations in minutes, not hours. Our intuitive interface makes complex workflows simple."}
              </p>
            </Card>

            <Card className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{"Team Collaboration"}</h3>
              <p className="text-muted-foreground">
                {"Share workflows with your team, set permissions, and collaborate on automation projects."}
              </p>
            </Card>

            <Card className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{"Advanced Analytics"}</h3>
              <p className="text-muted-foreground">
                {"Track performance, monitor success rates, and optimize your workflows with detailed insights."}
              </p>
            </Card>

            <Card className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{"Enterprise Security"}</h3>
              <p className="text-muted-foreground">
                {"Bank-level encryption, SOC 2 compliance, and advanced security features to protect your data."}
              </p>
            </Card>

            <Card className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{"24/7 Reliability"}</h3>
              <p className="text-muted-foreground">
                {"Your automations run around the clock with 99.9% uptime and automatic error handling."}
              </p>
            </Card>

            <Card className="p-6 border-border/50 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <ArrowRight className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{"Easy Integration"}</h3>
              <p className="text-muted-foreground">
                {"Connect with 500+ popular apps and services. No technical knowledge required."}
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* User Testimonials Section */}
        <div
          className={`mb-12 transition-all duration-1000 delay-400 opacity-100 translate-y-0`}
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of users who have transformed their workflows with Trigger
            </p>
          </div>
          <TestimonialCarousel />
        </div>

      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-balance mb-4">{"Ready to automate your workflow?"}</h2>
          <p className="text-xl text-muted-foreground text-balance mb-8">
            {"Join thousands of users who save hours every week with Trigger automations."}
          </p>
          <Link href="/signup">
            <Button size="lg" className="text-lg px-8 py-6 pulse-glow">
              <Play className="w-5 h-5 mr-2" />
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <TriggerLogo className="w-6 h-6" />
              <span className="text-lg font-semibold">Trigger</span>
            </div>
            <div className="text-muted-foreground text-sm">{"© 2024 Trigger. All rights reserved."}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
