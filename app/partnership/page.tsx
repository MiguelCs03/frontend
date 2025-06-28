"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CheckCircle, Send, Crown, Zap, Globe, Percent, Gift, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PartnershipPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    website: "",
    businessType: "",
    description: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const benefits = [
    {
      icon: <Percent className="w-12 h-12" />,
      title: "15% Development Discount",
      description: "Exclusive partner pricing on all development projects",
      value: "Save up to $30,000",
      color: "emerald",
    },
    {
      icon: <Gift className="w-12 h-12" />,
      title: "3 Months Free Maintenance",
      description: "Complete support including updates and optimization",
      value: "$5,000 Value",
      color: "blue",
    },
    {
      icon: <Headphones className="w-12 h-12" />,
      title: "Priority Support Queue",
      description: "24/7 dedicated support with guaranteed response times",
      value: "VIP Access",
      color: "purple",
    },
    {
      icon: <Crown className="w-12 h-12" />,
      title: "Flexible Badge Removal",
      description: "Remove badge anytime after project completion",
      value: "No strings attached",
      color: "yellow",
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Performance Optimization",
      description: "Advanced monitoring and 99.9% uptime guarantee",
      value: "Enterprise Grade",
      color: "cyan",
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Global CDN & Hosting",
      description: "Premium hosting with global CDN for 6 months free",
      value: "$2,000 Value",
      color: "green",
    },
  ]

  const handleSubmit = () => {
    const emailBody = `
Partnership Application

Company: ${formData.companyName}
Contact: ${formData.contactName}
Email: ${formData.email}
Phone: ${formData.phone}
Website: ${formData.website}
Business Type: ${formData.businessType}
Description: ${formData.description}

Submitted: ${new Date().toLocaleString()}
  `

    const mailtoLink = `mailto:partnerships@weltivation.com?subject=Partnership Application - ${formData.companyName}&body=${encodeURIComponent(emailBody)}`
    window.open(mailtoLink)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <NavBar />
        <div className="pt-32 pb-16 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-bold mb-6">Application Submitted!</h1>
              <p className="text-xl text-gray-400 mb-8">
                We'll review your application and contact you within 24 hours.
              </p>
              <Button onClick={() => (window.location.href = "/")} className="bg-emerald-500 hover:bg-emerald-600">
                Return Home
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <NavBar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight">
              <span className="text-white">Partner with </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400">
                Weltivation
              </span>
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              Display our badge on your website and unlock exclusive benefits worth over $50,000
            </p>

            {/* Simple Badge Display - Similar to Home Page */}
            <motion.div
              className="inline-flex items-center space-x-3 px-6 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-full shadow-xl mb-12"
              whileHover={{ scale: 1.05 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <span className="text-gray-300 text-sm">powered by</span>
              <img src="/images/weltivation-logo.png" alt="Weltivation" className="w-32 h-8 object-contain" />
              <Badge className="bg-emerald-500 text-white text-xs">Partner</Badge>
            </motion.div>

            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400 mb-2">Partnership Value: $50,000+</div>
              <p className="text-gray-400">Exclusive benefits and savings for partners</p>
            </div>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 h-full">
                  <div className={`text-${benefit.color}-400 mb-6`}>{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">{benefit.description}</p>
                  <div className={`text-${benefit.color}-400 font-bold text-lg`}>{benefit.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-12 text-center mb-16"
          >
            <h3 className="text-3xl font-bold text-black mb-4">Total Partnership Value</h3>
            <div className="text-6xl font-black text-black mb-4">$50,000+</div>
            <p className="text-black/80 text-xl">Average savings and benefits per partnership</p>
          </motion.div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gray-800/30 backdrop-blur-xl border border-gray-700 rounded-3xl p-12">
              <div className="text-center mb-12">
                <h3 className="text-3xl font-bold text-white mb-4">Apply for Partnership</h3>
                <p className="text-gray-400 text-lg">
                  Join our network and start saving immediately. Review within 24 hours.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Company Name *</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Contact Name *</label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Website URL</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                    placeholder="https://yourwebsite.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">Business Type *</label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none transition-colors text-lg"
                  >
                    <option value="">Select business type</option>
                    <option value="startup">Startup</option>
                    <option value="small-business">Small Business</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="agency">Agency</option>
                    <option value="nonprofit">Non-Profit</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-12">
                <label className="block text-sm font-medium text-gray-300 mb-3">Project Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-6 py-4 bg-gray-900/50 border border-gray-600 rounded-xl text-white focus:border-emerald-500 focus:outline-none transition-colors resize-none text-lg"
                  placeholder="Tell us about your project and how we can help..."
                />
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-6 text-xl font-medium shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl"
                >
                  <Send className="w-6 h-6 mr-3" />
                  Submit Partnership Application
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
