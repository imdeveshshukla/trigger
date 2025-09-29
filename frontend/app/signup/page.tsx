"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { TriggerLogo } from "@/components/trigger-logo"
import { Eye, EyeOff, ArrowLeft, Github, Mail, Check } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { toast } from "sonner"
export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreeToTerms: false,
    subscribeToUpdates: true,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
        const res =await axios.post(`${BACKEND_URL}/api/v1/user/signup`,{
            username:formData.name,
            name:formData.name,
            email:formData.email,
            password:formData.password
        });
        toast.success("Account Created!!!");
    } catch (error) {
        toast.error("Getting Some Error");
    }
    setIsLoading(false)
    // Redirect to dashboard would happen here
  }

  const passwordStrength = {
    hasLength: formData.password.length >= 8,
    hasNumber: /\d/.test(formData.password),
    hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  }

  const isPasswordStrong = Object.values(passwordStrength).every(Boolean)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="grid-pattern absolute inset-0 opacity-20"></div>

      <div className="relative w-full max-w-md">
        {/* Back to home link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        <Card className="border-border/50 backdrop-blur-sm bg-card/80">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <TriggerLogo className="w-12 h-12" />
            </div>
            <CardTitle className="text-2xl font-bold">Create your account</CardTitle>
            <CardDescription>Start automating your workflows in minutes</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Social Signup Options */}
            {/* <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full bg-transparent">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Mail className="w-4 h-4 mr-2" />
                Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or create with email</span>
              </div>
            </div> */}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                    className="bg-background/50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    required
                    className="bg-background/50 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>

                {/* Password strength indicators */}
                {formData.password && (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${passwordStrength.hasLength ? "bg-green-500" : "bg-muted"}`}
                      />
                      <span className={passwordStrength.hasLength ? "text-green-500" : "text-muted-foreground"}>
                        At least 8 characters
                      </span>
                      {passwordStrength.hasLength && <Check className="w-3 h-3 text-green-500" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${passwordStrength.hasNumber ? "bg-green-500" : "bg-muted"}`}
                      />
                      <span className={passwordStrength.hasNumber ? "text-green-500" : "text-muted-foreground"}>
                        Contains a number
                      </span>
                      {passwordStrength.hasNumber && <Check className="w-3 h-3 text-green-500" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${passwordStrength.hasSpecial ? "bg-green-500" : "bg-muted"}`}
                      />
                      <span className={passwordStrength.hasSpecial ? "text-green-500" : "text-muted-foreground"}>
                        Contains special character
                      </span>
                      {passwordStrength.hasSpecial && <Check className="w-3 h-3 text-green-500" />}
                    </div>
                  </div>
                )}
              </div>

              {/* Terms and conditions */}
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="terms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                    required
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="terms"
                      className="text-sm font-normal leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the{" "}
                      <Link href="/terms" className="text-primary hover:text-primary/80 underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-primary hover:text-primary/80 underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="updates"
                    checked={formData.subscribeToUpdates}
                    onCheckedChange={(checked) => handleInputChange("subscribeToUpdates", checked as boolean)}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="updates"
                      className="text-sm font-normal leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Send me product updates and automation tips
                    </Label>
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full pulse-glow"
                disabled={isLoading || !formData.agreeToTerms || !isPasswordStrong}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>

            {/* Sign in link */}
            <div className="text-center text-sm">
              <span className="text-muted-foreground">Already have an account? </span>
              <Link href="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Security notice */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Your data is protected with enterprise-grade encryption</p>
        </div>
      </div>
    </div>
  )
}
