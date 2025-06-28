"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import {
  Globe,
  Smartphone,
  Cog,
  Package,
  Building2,
  Laptop,
  ArrowRight,
  Star,
  TrendingUp,
  Users,
  Award,
  Zap,
  Shield,
  Rocket,
  Target,
  BarChart,
  Lightbulb,
  Layers,
  Code,
  Database,
  Cloud,
  Lock,
  Gauge,
  Sparkles,
  Activity,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    id: "website",
    title: "Website Development",
    subtitle: "Modern, Fast & Scalable",
    description:
      "Transform your digital presence with cutting-edge websites that convert visitors into customers. Built with the latest technologies for maximum performance and user experience.",
    icon: <Globe className="w-8 h-8" />,
    color: "emerald",
    gradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-500/10 to-green-600/10",
    features: [
      { icon: <Rocket className="w-5 h-5" />, text: "Lightning-fast loading speeds" },
      { icon: <Shield className="w-5 h-5" />, text: "Enterprise-grade security" },
      { icon: <Target className="w-5 h-5" />, text: "Conversion-optimized design" },
      { icon: <Gauge className="w-5 h-5" />, text: "99.9% uptime guarantee" },
    ],
    stats: [
      { label: "Average Speed Increase", value: "340%" },
      { label: "Conversion Rate Boost", value: "127%" },
      { label: "Client Satisfaction", value: "98%" },
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel"],
    cta: "Start Your Website",
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    subtitle: "Native & Cross-Platform",
    description:
      "Create powerful mobile experiences that engage users and drive business growth. From concept to app store, we deliver apps that users love and businesses depend on.",
    icon: <Smartphone className="w-8 h-8" />,
    color: "blue",
    gradient: "from-blue-500 to-cyan-600",
    bgGradient: "from-blue-500/10 to-cyan-600/10",
    features: [
      { icon: <Users className="w-5 h-5" />, text: "Cross-platform compatibility" },
      { icon: <Zap className="w-5 h-5" />, text: "Real-time synchronization" },
      { icon: <Lock className="w-5 h-5" />, text: "Advanced security features" },
      { icon: <BarChart className="w-5 h-5" />, text: "Built-in analytics" },
    ],
    stats: [
      { label: "App Store Rating", value: "4.8★" },
      { label: "User Retention", value: "85%" },
      { label: "Development Speed", value: "2x Faster" },
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    cta: "Build Your App",
  },
  {
    id: "digital",
    title: "Digital Systems",
    subtitle: "Automation & Integration",
    description:
      "Streamline your operations with intelligent digital systems that automate workflows, integrate seamlessly, and scale with your business growth.",
    icon: <Laptop className="w-8 h-8" />,
    color: "purple",
    gradient: "from-purple-500 to-pink-600",
    bgGradient: "from-purple-500/10 to-pink-600/10",
    features: [
      { icon: <Cog className="w-5 h-5" />, text: "Workflow automation" },
      { icon: <Database className="w-5 h-5" />, text: "Data integration" },
      { icon: <Cloud className="w-5 h-5" />, text: "Cloud-native architecture" },
      { icon: <Layers className="w-5 h-5" />, text: "API-first design" },
    ],
    stats: [
      { label: "Efficiency Increase", value: "250%" },
      { label: "Cost Reduction", value: "60%" },
      { label: "Error Reduction", value: "95%" },
    ],
    technologies: ["Node.js", "Python", "AWS", "Docker", "Kubernetes"],
    cta: "Automate Now",
  },
  {
    id: "mechanical",
    title: "Mechanical Engineering",
    subtitle: "Design & Prototyping",
    description:
      "Bring your physical products to life with precision engineering, rapid prototyping, and manufacturing-ready designs that meet the highest industry standards.",
    icon: <Cog className="w-8 h-8" />,
    color: "orange",
    gradient: "from-orange-500 to-red-600",
    bgGradient: "from-orange-500/10 to-red-600/10",
    features: [
      { icon: <Lightbulb className="w-5 h-5" />, text: "Innovative design solutions" },
      { icon: <Code className="w-5 h-5" />, text: "CAD modeling & simulation" },
      { icon: <Package className="w-5 h-5" />, text: "Rapid prototyping" },
      { icon: <Award className="w-5 h-5" />, text: "Quality assurance" },
    ],
    stats: [
      { label: "Design Accuracy", value: "99.7%" },
      { label: "Time to Prototype", value: "72hrs" },
      { label: "Manufacturing Ready", value: "100%" },
    ],
    technologies: ["SolidWorks", "AutoCAD", "ANSYS", "3D Printing", "CNC"],
    cta: "Design Product",
  },
  {
    id: "product",
    title: "Product Development",
    subtitle: "From Idea to Market",
    description:
      "Transform innovative ideas into market-ready products with our comprehensive development process, from initial concept through successful launch.",
    icon: <Package className="w-8 h-8" />,
    color: "cyan",
    gradient: "from-cyan-500 to-blue-600",
    bgGradient: "from-cyan-500/10 to-blue-600/10",
    features: [
      { icon: <Target className="w-5 h-5" />, text: "Market research & validation" },
      { icon: <Rocket className="w-5 h-5" />, text: "MVP development" },
      { icon: <TrendingUp className="w-5 h-5" />, text: "Go-to-market strategy" },
      { icon: <Star className="w-5 h-5" />, text: "Post-launch optimization" },
    ],
    stats: [
      { label: "Success Rate", value: "92%" },
      { label: "Time to Market", value: "40% Faster" },
      { label: "ROI Average", value: "3.2x" },
    ],
    technologies: ["Lean Startup", "Agile", "Design Thinking", "Analytics", "A/B Testing"],
    cta: "Launch Product",
  },
  {
    id: "architecture",
    title: "Architecture Design",
    subtitle: "Spaces That Inspire",
    description:
      "Create stunning architectural designs that blend functionality with aesthetics, delivering spaces that inspire and environments that enhance human experience.",
    icon: <Building2 className="w-8 h-8" />,
    color: "indigo",
    gradient: "from-indigo-500 to-purple-600",
    bgGradient: "from-indigo-500/10 to-purple-600/10",
    features: [
      { icon: <Lightbulb className="w-5 h-5" />, text: "Sustainable design principles" },
      { icon: <Layers className="w-5 h-5" />, text: "3D visualization & VR" },
      { icon: <Shield className="w-5 h-5" />, text: "Building code compliance" },
      { icon: <Award className="w-5 h-5" />, text: "Award-winning designs" },
    ],
    stats: [
      { label: "Projects Completed", value: "150+" },
      { label: "Client Satisfaction", value: "96%" },
      { label: "On-Time Delivery", value: "98%" },
    ],
    technologies: ["AutoCAD", "Revit", "SketchUp", "3ds Max", "Lumion"],
    cta: "Design Space",
  },
]

export function ServicesViewportSection() {
  const [activeService, setActiveService] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])

  // Intersection observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            const index = serviceRefs.current.findIndex((ref) => ref === entry.target)
            if (index !== -1) {
              setActiveService(index)
            }
          }
        })
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" },
    )

    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToService = (index: number) => {
    setActiveService(index)
    serviceRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })
  }

  return (
    <section className="relative py-20 px-4 sm:px-6 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-blue-500/5 to-purple-500/5" />
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(16,185,129,0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, rgba(59,130,246,0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 50% 80%, rgba(147,51,234,0.05) 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, rgba(16,185,129,0.05) 0%, transparent 50%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
        {/* Faint Code Background */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div
            className="absolute inset-0 bg-repeat"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.8'%3E%3Ctext x='5' y='15' fontFamily='monospace' fontSize='10'%3E%7B%3C/text%3E%3Ctext x='5' y='30' fontFamily='monospace' fontSize='8'%3E%20%20const%3C/text%3E%3Ctext x='5' y='45' fontFamily='monospace' fontSize='8'%3E%20%20%20%20api%3C/text%3E%3Ctext x='5' y='60' fontFamily='monospace' fontSize='10'%3E%7D%3C/text%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "80px 80px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 rounded-full border border-emerald-500/20 mb-6 backdrop-blur-sm"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          >
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">Premium Services</span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl font-black mb-6 leading-tight">
            <span className="text-white">Services That </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
              Transform
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions designed to accelerate your business growth and digital transformation
          </p>
        </motion.div>

        <div className="relative">
          {/* Fixed Navigation Dots - Only show when services section is visible */}
          {isVisible && (
            <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
              <div className="flex flex-col items-center space-y-6">
                {services.map((service, index) => (
                  <div key={service.id} className="relative flex items-center group">
                    {/* Connecting Line */}
                    {index < services.length - 1 && (
                      <div className="absolute top-6 left-1/2 w-0.5 h-6 bg-gray-700 transform -translate-x-1/2" />
                    )}

                    {/* Enhanced Dot Button */}
                    <motion.button
                      onClick={() => scrollToService(index)}
                      className={`relative w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                        activeService === index
                          ? `bg-${service.color}-500 border-${service.color}-500 shadow-lg shadow-${service.color}-500/50`
                          : "bg-transparent border-gray-600 hover:border-gray-400"
                      }`}
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.9 }}
                      animate={
                        activeService === index
                          ? {
                              scale: [1, 1.2, 1],
                              boxShadow: [
                                `0 0 0 0 rgba(${service.color === "emerald" ? "16,185,129" : service.color === "blue" ? "59,130,246" : service.color === "purple" ? "147,51,234" : service.color === "orange" ? "249,115,22" : service.color === "cyan" ? "6,182,212" : "99,102,241"}, 0.4)`,
                                `0 0 0 10px rgba(${service.color === "emerald" ? "16,185,129" : service.color === "blue" ? "59,130,246" : service.color === "purple" ? "147,51,234" : service.color === "orange" ? "249,115,22" : service.color === "cyan" ? "6,182,212" : "99,102,241"}, 0)`,
                                `0 0 0 0 rgba(${service.color === "emerald" ? "16,185,129" : service.color === "blue" ? "59,130,246" : service.color === "purple" ? "147,51,234" : service.color === "orange" ? "249,115,22" : service.color === "cyan" ? "6,182,212" : "99,102,241"}, 0.4)`,
                              ],
                            }
                          : {}
                      }
                      transition={{
                        duration: 2,
                        repeat: activeService === index ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                      }}
                    >
                      {activeService === index && (
                        <motion.div
                          className="absolute inset-0 rounded-full bg-white/20"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.button>

                    {/* Service Label */}
                    <motion.div
                      className={`absolute left-8 whitespace-nowrap px-4 py-2 rounded-lg backdrop-blur-sm border transition-all duration-300 ${
                        activeService === index
                          ? `bg-${service.color}-500/20 border-${service.color}-500/50 text-${service.color}-400 opacity-100`
                          : "bg-gray-900/80 border-gray-700/50 text-gray-400 opacity-0 group-hover:opacity-100"
                      }`}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{
                        opacity: activeService === index ? 1 : 0,
                        x: activeService === index ? 0 : -10,
                      }}
                    >
                      <span className="text-sm font-medium">{service.title}</span>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Content */}
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                ref={(el) => (serviceRefs.current[index] = el)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: false, amount: 0.3 }}
                className="min-h-[80vh] flex items-center"
              >
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* Content */}
                  <motion.div
                    className={`space-y-8 ${index % 2 === 1 ? "lg:order-2" : ""}`}
                    initial={{ opacity: 0, x: index % 2 === 1 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <div>
                      <motion.div
                        className={`inline-flex items-center space-x-3 px-4 py-2 bg-gradient-to-r ${service.bgGradient} rounded-full border border-${service.color}-500/20 mb-6`}
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                      >
                        <div className={`text-${service.color}-400`}>{service.icon}</div>
                        <span className={`text-sm font-medium text-${service.color}-400`}>{service.subtitle}</span>
                      </motion.div>

                      <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">{service.title}</h3>

                      <p className="text-lg text-gray-400 leading-relaxed mb-8">{service.description}</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      {service.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                          viewport={{ once: false }}
                          className="flex items-center space-x-3"
                        >
                          <div className={`text-${service.color}-400`}>{feature.icon}</div>
                          <span className="text-gray-300">{feature.text}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {service.stats.map((stat, statIndex) => (
                        <motion.div
                          key={statIndex}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: statIndex * 0.1 }}
                          viewport={{ once: false }}
                          className={`text-center p-4 bg-gradient-to-br ${service.bgGradient} rounded-xl border border-${service.color}-500/20`}
                        >
                          <div className={`text-2xl font-bold text-${service.color}-400 mb-1`}>{stat.value}</div>
                          <div className="text-xs text-gray-400">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.map((tech, techIndex) => (
                        <motion.div
                          key={techIndex}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: techIndex * 0.05 }}
                          viewport={{ once: false }}
                        >
                          <Badge className="bg-gray-800/50 text-gray-300 border-gray-700/50 hover:border-gray-600">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        className={`bg-gradient-to-r ${service.gradient} hover:shadow-lg hover:shadow-${service.color}-500/25 text-white px-8 py-3 text-lg font-medium`}
                      >
                        {service.cta}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Enhanced UI Graphics */}
                  <motion.div
                    className={`${index % 2 === 1 ? "lg:order-1" : ""}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <ServiceUIGraphic service={service} index={index} />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Enhanced UI Graphics Components
function ServiceUIGraphic({ service, index }: { service: any; index: number }) {
  const getServiceGraphic = () => {
    switch (service.id) {
      case "website":
        return <WebsiteUIGraphic service={service} />
      case "mobile":
        return <MobileUIGraphic service={service} />
      case "digital":
        return <DigitalSystemsUIGraphic service={service} />
      case "mechanical":
        return <MechanicalUIGraphic service={service} />
      case "product":
        return <ProductUIGraphic service={service} />
      case "architecture":
        return <ArchitectureUIGraphic service={service} />
      default:
        return <WebsiteUIGraphic service={service} />
    }
  }

  return (
    <div className="relative">
      {/* Background Glow */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-5 rounded-3xl blur-3xl`}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      {/* Main UI Container */}
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 overflow-hidden">
        {getServiceGraphic()}
      </div>
    </div>
  )
}

function WebsiteUIGraphic({ service }: { service: any }) {
  return (
    <div className="space-y-6">
      {/* Enhanced Browser Window */}
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
        <div className="flex items-center space-x-2 px-4 py-3 bg-gray-700">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
          <div className="flex-1 bg-gray-600 rounded px-3 py-1 ml-4">
            <span className="text-xs text-gray-300">https://yourwebsite.com</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-4 h-4 bg-gray-600 rounded"></div>
            <div className="w-4 h-4 bg-gray-600 rounded"></div>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 min-h-[200px]">
          <div className="space-y-4">
            <motion.div
              className="h-6 bg-gradient-to-r from-emerald-500 to-green-500 rounded w-3/4"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
            <div className="h-3 bg-gray-600 rounded w-full"></div>
            <div className="h-3 bg-gray-600 rounded w-2/3"></div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="h-16 bg-gradient-to-br from-gray-700 to-gray-600 rounded"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                ></motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Performance Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div className="bg-gray-800 rounded-lg p-4 border border-emerald-500/20" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Speed Score</span>
            <Gauge className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400">98/100</div>
          <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
            <motion.div
              className="bg-emerald-500 h-1 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "98%" }}
              transition={{ duration: 2, ease: "easeOut" }}
            ></motion.div>
          </div>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-lg p-4 border border-green-500/20" whileHover={{ scale: 1.05 }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400">Uptime</span>
            <Activity className="w-4 h-4 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-green-400">99.9%</div>
          <div className="flex space-x-1 mt-2">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-4 bg-green-500 rounded-sm"
                animate={{ height: [8, 16, 8] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
              ></motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function MobileUIGraphic({ service }: { service: any }) {
  return (
    <div className="flex justify-center space-x-4">
      {/* Enhanced Phone Mockup */}
      <div className="relative">
        <motion.div
          className="w-48 h-96 bg-gray-900 rounded-3xl border-4 border-gray-700 overflow-hidden shadow-2xl"
          animate={{ rotateY: [0, 5, 0, -5, 0] }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="h-6 bg-gray-800 flex items-center justify-center">
            <div className="w-16 h-1 bg-gray-600 rounded-full"></div>
          </div>
          <div className="p-4 space-y-4 bg-gradient-to-b from-gray-900 to-black">
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              ></motion.div>
              <div className="flex-1">
                <div className="h-3 bg-gray-700 rounded w-3/4 mb-1"></div>
                <div className="h-2 bg-gray-800 rounded w-1/2"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { from: "blue-500", to: "cyan-500" },
                { from: "purple-500", to: "pink-500" },
                { from: "emerald-500", to: "green-500" },
                { from: "orange-500", to: "red-500" },
              ].map((gradient, i) => (
                <motion.div
                  key={i}
                  className={`h-20 bg-gradient-to-br from-${gradient.from} to-${gradient.to} rounded-lg`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.5 }}
                ></motion.div>
              ))}
            </div>
            <div className="space-y-2">
              <motion.div
                className="h-3 bg-gray-700 rounded"
                animate={{ width: ["100%", "80%", "100%"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              ></motion.div>
              <div className="h-3 bg-gray-700 rounded w-4/5"></div>
              <div className="h-3 bg-gray-700 rounded w-3/5"></div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Enhanced App Analytics */}
      <div className="space-y-4">
        {[
          { label: "Downloads", value: "2.4M", color: "blue", icon: Users },
          { label: "Rating", value: "4.8★", color: "yellow", icon: Star },
          { label: "Retention", value: "85%", color: "green", icon: TrendingUp },
        ].map((metric, i) => (
          <motion.div
            key={i}
            className={`bg-gray-800 rounded-lg p-4 w-32 border border-${metric.color}-500/20`}
            whileHover={{ scale: 1.1, y: -5 }}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.7 }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-400">{metric.label}</span>
              <metric.icon className={`w-3 h-3 text-${metric.color}-400`} />
            </div>
            <div className={`text-lg font-bold text-${metric.color}-400`}>{metric.value}</div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

function DigitalSystemsUIGraphic({ service }: { service: any }) {
  return (
    <div className="space-y-6">
      {/* Enhanced Dashboard */}
      <div className="bg-gray-800 rounded-lg p-6 border border-purple-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">System Dashboard</h3>
          <div className="flex space-x-2">
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            ></motion.div>
            <span className="text-xs text-green-400">Online</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "CPU Usage", value: "23%", color: "purple" },
            { label: "Memory", value: "1.2GB", color: "cyan" },
            { label: "Requests", value: "15.2K", color: "emerald" },
          ].map((stat, i) => (
            <motion.div key={i} className="bg-gray-700 rounded p-3" whileHover={{ scale: 1.05 }}>
              <div className="text-xs text-gray-400">{stat.label}</div>
              <div className={`text-lg font-bold text-${stat.color}-400`}>{stat.value}</div>
              <div className="w-full bg-gray-600 rounded-full h-1 mt-1">
                <motion.div
                  className={`bg-${stat.color}-500 h-1 rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.random() * 80 + 20}%` }}
                  transition={{ duration: 2, ease: "easeOut" }}
                ></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Workflow Automation */}
      <div className="bg-gray-800 rounded-lg p-4 border border-purple-500/10">
        <div className="text-sm text-gray-400 mb-3">Active Workflows</div>
        <div className="space-y-2">
          {[
            { name: "Data Processing", status: "Running", color: "green" },
            { name: "Email Automation", status: "Scheduled", color: "blue" },
            { name: "Report Generation", status: "Complete", color: "emerald" },
          ].map((workflow, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between py-2 px-3 bg-gray-700/50 rounded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  className={`w-2 h-2 rounded-full bg-${workflow.color}-400`}
                  animate={workflow.status === "Running" ? { opacity: [0.5, 1, 0.5] } : {}}
                  transition={{ duration: 1, repeat: workflow.status === "Running" ? Number.POSITIVE_INFINITY : 0 }}
                ></motion.div>
                <span className="text-sm text-white">{workflow.name}</span>
              </div>
              <span className={`text-xs px-2 py-1 rounded bg-${workflow.color}-500/20 text-${workflow.color}-400`}>
                {workflow.status}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MechanicalUIGraphic({ service }: { service: any }) {
  return (
    <div className="space-y-6">
      {/* Enhanced CAD Interface */}
      <div className="bg-gray-800 rounded-lg p-6 border border-orange-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">CAD Workspace</h3>
          <div className="flex space-x-2">
            <motion.div
              className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded flex items-center justify-center"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Code className="w-3 h-3 text-white" />
            </motion.div>
          </div>
        </div>
        <div className="bg-gray-900 rounded p-4 h-40 relative overflow-hidden border border-orange-500/10">
          {/* Enhanced 3D Grid */}
          <div className="absolute inset-0 opacity-30">
            <svg className="w-full h-full" viewBox="0 0 200 100">
              <defs>
                <pattern id="cad-grid" width="15" height="15" patternUnits="userSpaceOnUse">
                  <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#f97316" strokeWidth="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cad-grid)" />
            </svg>
          </div>

          {/* Enhanced 3D Object */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative"
              animate={{
                rotateX: [0, 15, 0, -15, 0],
                rotateY: [0, 25, 0, -25, 0],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 rounded-lg shadow-2xl">
                {/* 3D Effect Lines */}
                <div className="absolute inset-2 border border-orange-300/50 rounded"></div>
                <div className="absolute inset-4 border border-orange-200/30 rounded"></div>
              </div>
              {/* Shadow */}
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black/30 rounded-full blur-sm"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              ></motion.div>
            </motion.div>
          </div>

          {/* CAD Tools */}
          <div className="absolute top-2 left-2 flex space-x-1">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-orange-400/60 rounded-sm"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
              ></motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Design Specs */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div className="bg-gray-800 rounded-lg p-4 border border-orange-500/20" whileHover={{ scale: 1.05 }}>
          <div className="text-xs text-gray-400 mb-1">Precision</div>
          <div className="text-lg font-bold text-orange-400">±0.01mm</div>
          <div className="text-xs text-orange-300 mt-1">Ultra High</div>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-lg p-4 border border-red-500/20" whileHover={{ scale: 1.05 }}>
          <div className="text-xs text-gray-400 mb-1">Material</div>
          <div className="text-lg font-bold text-red-400">Al-6061</div>
          <div className="text-xs text-red-300 mt-1">Aerospace Grade</div>
        </motion.div>
      </div>
    </div>
  )
}

function ProductUIGraphic({ service }: { service: any }) {
  return (
    <div className="space-y-6">
      {/* Product Analytics Dashboard */}
      <div className="bg-gray-800 rounded-lg p-6 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Product Analytics</h3>
          <TrendingUp className="w-5 h-5 text-cyan-400" />
        </div>
        <div className="space-y-4">
          {[
            { label: "Market Validation", value: 92, color: "cyan" },
            { label: "Development Progress", value: 68, color: "blue" },
            { label: "User Feedback Score", value: 87, color: "green" },
          ].map((metric, i) => (
            <div key={i} className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{metric.label}</span>
              <div className="flex items-center space-x-2">
                <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className={`bg-${metric.color}-500 h-2 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${metric.value}%` }}
                    transition={{ duration: 2, ease: "easeOut", delay: i * 0.3 }}
                  ></motion.div>
                </div>
                <span className={`text-sm text-${metric.color}-400 font-medium`}>{metric.value}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Launch Timeline */}
      <div className="bg-gray-800 rounded-lg p-4 border border-cyan-500/10">
        <div className="text-sm text-gray-400 mb-3">Launch Timeline</div>
        <div className="space-y-3">
          {[
            { phase: "MVP Complete", date: "Week 8", status: "done" },
            { phase: "Beta Testing", date: "Week 12", status: "active" },
            { phase: "Market Launch", date: "Week 16", status: "pending" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between py-2 px-3 bg-gray-700/30 rounded"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  className={`w-3 h-3 rounded-full ${
                    item.status === "done" ? "bg-green-400" : item.status === "active" ? "bg-cyan-400" : "bg-gray-600"
                  }`}
                  animate={
                    item.status === "active"
                      ? {
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: item.status === "active" ? Number.POSITIVE_INFINITY : 0 }}
                ></motion.div>
                <span className="text-sm text-white">{item.phase}</span>
              </div>
              <span className="text-xs text-gray-400 font-mono">{item.date}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ArchitectureUIGraphic({ service }: { service: any }) {
  return (
    <div className="space-y-6">
      {/* Blueprint View */}
      <div className="bg-gray-800 rounded-lg p-6 border border-indigo-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">Blueprint View</h3>
          <Building2 className="w-5 h-5 text-indigo-400" />
        </div>
        <div className="bg-indigo-950/30 rounded p-4 h-40 relative overflow-hidden border border-indigo-500/20">
          {/* Blueprint Grid */}
          <div className="absolute inset-0 opacity-40">
            <svg className="w-full h-full" viewBox="0 0 200 100">
              <defs>
                <pattern id="blueprint" width="12" height="12" patternUnits="userSpaceOnUse">
                  <path d="M 12 0 L 0 0 0 12" fill="none" stroke="#6366f1" strokeWidth="0.4" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#blueprint)" />
            </svg>
          </div>

          {/* Building Structure */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="space-y-1"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <motion.div
                className="w-24 h-2 bg-indigo-400 rounded shadow-lg"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              ></motion.div>
              <div className="w-20 h-12 bg-indigo-500/50 rounded border border-indigo-400 relative">
                {/* Windows */}
                <div className="absolute inset-2 grid grid-cols-3 gap-1">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="bg-indigo-300/30 rounded-sm"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                    ></motion.div>
                  ))}
                </div>
              </div>
              <div className="w-24 h-2 bg-indigo-400 rounded shadow-lg"></div>
            </motion.div>
          </div>

          {/* Measurement Lines */}
          <div className="absolute top-2 right-2 text-xs text-indigo-300 font-mono">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              2,450 ft²
            </motion.div>
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div className="bg-gray-800 rounded-lg p-4 border border-indigo-500/20" whileHover={{ scale: 1.05 }}>
          <div className="text-xs text-gray-400 mb-1">Square Footage</div>
          <div className="text-lg font-bold text-indigo-400">2,450 ft²</div>
          <div className="text-xs text-indigo-300 mt-1">Optimized Layout</div>
        </motion.div>
        <motion.div className="bg-gray-800 rounded-lg p-4 border border-purple-500/20" whileHover={{ scale: 1.05 }}>
          <div className="text-xs text-gray-400 mb-1">Completion</div>
          <div className="text-lg font-bold text-purple-400">14 weeks</div>
          <div className="text-xs text-purple-300 mt-1">Fast Track</div>
        </motion.div>
      </div>
    </div>
  )
}
