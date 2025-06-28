"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { CodeRain } from "@/components/code-rain"
import {
  MessageCircle,
  Search,
  Code,
  TestTube,
  Rocket,
  LifeBuoy,
  CheckCircle,
  Clock,
  Users,
  Target,
  Lightbulb,
  FileText,
  Zap,
  Shield,
  TrendingUp,
  Calendar,
  ArrowRight,
  Play,
} from "lucide-react"

export default function ProcessPage() {
  const [activeStep, setActiveStep] = useState(0)

  const processSteps = [
    {
      id: "discovery",
      title: "Discovery & Planning",
      duration: "1-2 weeks",
      icon: <MessageCircle className="w-6 h-6" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      description: "We dive deep into understanding your business, goals, and technical requirements.",
      activities: [
        "Stakeholder interviews and requirements gathering",
        "Technical architecture planning and system design",
        "User research and competitive analysis",
        "Project roadmap and timeline creation",
        "Risk assessment and mitigation planning",
      ],
      deliverables: [
        "Detailed project specification document",
        "Technical architecture diagram",
        "Project timeline and milestones",
        "Resource allocation plan",
        "Risk management strategy",
      ],
    },
    {
      id: "design",
      title: "Design & Prototyping",
      duration: "2-3 weeks",
      icon: <Search className="w-6 h-6" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      description: "Creating user-centered designs and interactive prototypes to validate concepts.",
      activities: [
        "User experience (UX) design and user journey mapping",
        "User interface (UI) design and visual identity",
        "Interactive prototyping and wireframing",
        "Design system creation and component library",
        "Usability testing and design iteration",
      ],
      deliverables: [
        "Complete UI/UX designs",
        "Interactive prototypes",
        "Design system and style guide",
        "User testing results",
        "Final design specifications",
      ],
    },
    {
      id: "development",
      title: "Development & Integration",
      duration: "4-12 weeks",
      icon: <Code className="w-6 h-6" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      description: "Building your solution with clean, scalable code and modern technologies.",
      activities: [
        "Frontend and backend development",
        "Database design and implementation",
        "API development and third-party integrations",
        "Security implementation and data protection",
        "Performance optimization and scalability planning",
      ],
      deliverables: [
        "Fully functional application",
        "Clean, documented codebase",
        "API documentation",
        "Security audit report",
        "Performance benchmarks",
      ],
    },
    {
      id: "testing",
      title: "Testing & Quality Assurance",
      duration: "1-2 weeks",
      icon: <TestTube className="w-6 h-6" />,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      description: "Rigorous testing to ensure your solution works flawlessly across all scenarios.",
      activities: [
        "Automated testing suite development",
        "Manual testing across devices and browsers",
        "Performance and load testing",
        "Security penetration testing",
        "User acceptance testing (UAT)",
      ],
      deliverables: [
        "Comprehensive test suite",
        "Testing reports and bug fixes",
        "Performance optimization results",
        "Security assessment report",
        "UAT sign-off documentation",
      ],
    },
    {
      id: "deployment",
      title: "Deployment & Launch",
      duration: "1 week",
      icon: <Rocket className="w-6 h-6" />,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      description: "Seamless deployment to production with monitoring and optimization.",
      activities: [
        "Production environment setup and configuration",
        "Deployment automation and CI/CD pipeline",
        "Monitoring and alerting system setup",
        "Performance monitoring and optimization",
        "Go-live support and issue resolution",
      ],
      deliverables: [
        "Live production system",
        "Deployment documentation",
        "Monitoring dashboards",
        "Backup and recovery procedures",
        "Launch success metrics",
      ],
    },
    {
      id: "support",
      title: "Support & Maintenance",
      duration: "Ongoing",
      icon: <LifeBuoy className="w-6 h-6" />,
      color: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      description: "Continuous support, updates, and enhancements to keep your solution running smoothly.",
      activities: [
        "24/7 monitoring and incident response",
        "Regular security updates and patches",
        "Performance optimization and scaling",
        "Feature enhancements and new development",
        "Technical support and troubleshooting",
      ],
      deliverables: [
        "Monthly performance reports",
        "Security update notifications",
        "Feature enhancement roadmap",
        "Support ticket resolution",
        "System health monitoring",
      ],
    },
  ]

  const methodologies = [
    {
      title: "Agile Development",
      description: "2-week sprints with regular demos and feedback",
      icon: <Zap className="w-6 h-6" />,
      benefits: ["Faster delivery", "Regular feedback", "Flexible scope"],
    },
    {
      title: "DevOps Integration",
      description: "Automated testing, deployment, and monitoring",
      icon: <Shield className="w-6 h-6" />,
      benefits: ["Reliable deployments", "Quick issue resolution", "Scalable infrastructure"],
    },
    {
      title: "User-Centered Design",
      description: "Design decisions based on user research and testing",
      icon: <Users className="w-6 h-6" />,
      benefits: ["Better user experience", "Higher adoption", "Reduced support needs"],
    },
    {
      title: "Quality Assurance",
      description: "Comprehensive testing at every stage",
      icon: <CheckCircle className="w-6 h-6" />,
      benefits: ["Bug-free releases", "Performance optimization", "Security compliance"],
    },
  ]

  const tools = [
    {
      category: "Project Management",
      tools: ["Jira", "Asana", "Linear", "Notion"],
      icon: <Target className="w-5 h-5" />,
    },
    {
      category: "Design & Prototyping",
      tools: ["Figma", "Adobe Creative Suite", "Sketch", "InVision"],
      icon: <Lightbulb className="w-5 h-5" />,
    },
    {
      category: "Development",
      tools: ["VS Code", "GitHub", "Docker", "AWS/Vercel"],
      icon: <Code className="w-5 h-5" />,
    },
    {
      category: "Testing & QA",
      tools: ["Jest", "Cypress", "Selenium", "Postman"],
      icon: <TestTube className="w-5 h-5" />,
    },
    {
      category: "Communication",
      tools: ["Slack", "Zoom", "Microsoft Teams", "Discord"],
      icon: <MessageCircle className="w-5 h-5" />,
    },
    {
      category: "Documentation",
      tools: ["GitBook", "Confluence", "Notion", "Markdown"],
      icon: <FileText className="w-5 h-5" />,
    },
  ]

  const metrics = [
    {
      title: "On-Time Delivery",
      value: "98%",
      description: "Projects delivered on schedule",
      icon: <Clock className="w-6 h-6" />,
      color: "text-green-500",
    },
    {
      title: "Client Satisfaction",
      value: "4.9/5",
      description: "Average client rating",
      icon: <Users className="w-6 h-6" />,
      color: "text-blue-500",
    },
    {
      title: "Bug-Free Releases",
      value: "95%",
      description: "Releases without critical bugs",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "text-purple-500",
    },
    {
      title: "Performance Improvement",
      value: "40%",
      description: "Average performance gain",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "text-orange-500",
    },
  ]

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <CodeRain />
      </div>
      <NavBar />

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our <span className="text-primary">Development Process</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that delivers exceptional results through careful planning, expert execution, and
              continuous collaboration.
            </p>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Our 6-Step Process</h2>

            {/* Step Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {processSteps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(index)}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${
                    activeStep === index
                      ? "bg-primary/20 text-primary border border-primary/50"
                      : "bg-background/80 backdrop-blur-sm text-muted-foreground border border-border hover:text-foreground hover:border-primary/30"
                  }`}
                >
                  {index + 1}. {step.title}
                </button>
              ))}
            </div>

            {/* Active Step Details */}
            <div
              className={`${processSteps[activeStep].bgColor} ${processSteps[activeStep].borderColor} border rounded-xl p-8`}
            >
              <div className="flex items-center space-x-4 mb-6">
                <div
                  className={`w-12 h-12 ${processSteps[activeStep].bgColor} rounded-lg flex items-center justify-center`}
                >
                  {processSteps[activeStep].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{processSteps[activeStep].title}</h3>
                  <p className="text-muted-foreground">Duration: {processSteps[activeStep].duration}</p>
                </div>
              </div>

              <p className="text-lg mb-8">{processSteps[activeStep].description}</p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <Play className="w-4 h-4 mr-2 text-primary" />
                    Key Activities
                  </h4>
                  <ul className="space-y-2">
                    {processSteps[activeStep].activities.map((activity, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-4 flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-primary" />
                    Deliverables
                  </h4>
                  <ul className="space-y-2">
                    {processSteps[activeStep].deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Methodologies */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Our Methodologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {methodologies.map((methodology, index) => (
                <div
                  key={index}
                  className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    {methodology.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{methodology.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{methodology.description}</p>
                  <div className="space-y-1">
                    {methodology.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center space-x-2">
                        <CheckCircle className="w-3 h-3 text-primary" />
                        <span className="text-xs text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools & Technologies */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Tools & Technologies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((toolCategory, index) => (
                <div key={index} className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      {toolCategory.icon}
                    </div>
                    <h3 className="font-semibold">{toolCategory.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {toolCategory.tools.map((tool, toolIndex) => (
                      <span
                        key={toolIndex}
                        className="px-3 py-1 bg-muted/50 text-muted-foreground text-sm rounded-full border border-border"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Success Metrics */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold mb-8 text-center">Our Track Record</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-background/80 backdrop-blur-sm border border-border rounded-xl p-6 text-center"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    {metric.icon}
                  </div>
                  <div className={`text-3xl font-bold ${metric.color} mb-2`}>{metric.value}</div>
                  <h3 className="font-semibold mb-1">{metric.title}</h3>
                  <p className="text-sm text-muted-foreground">{metric.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="bg-primary/5 border border-primary/20 rounded-xl p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Let's discuss how our proven process can help bring your vision to life. Schedule a free consultation to
              get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/consultation"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-300 font-medium"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Free Consultation
              </a>
              <a
                href="/portfolio"
                className="inline-flex items-center px-6 py-3 bg-background border border-border text-foreground rounded-lg hover:border-primary/50 transition-all duration-300 font-medium"
              >
                View Our Work
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
