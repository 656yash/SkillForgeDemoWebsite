import { useState, useEffect } from "react";
import { Link } from "react-router";
import {
  Star,
  BookOpen,
  Users,
  Award,
  Target,
  Briefcase,
  GraduationCap,
  Clock,
  TrendingUp,
  Download,
  Check,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Sparkles,
  Code,
  Database,
  Brain,
  BarChart3,
  FileText,
  MessageSquare,
  HeartHandshake,
  Zap,
  Globe
} from "lucide-react";
import { trackPageView } from "../lib/firebase";

export function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    trackPageView("Home");
  }, []);

  const courses = [
    {
      id: 1,
      title: "Data Science Bootcamp",
      instructor: "Dr. Sarah Johnson",
      duration: "12 weeks",
      rating: 4.8,
      students: 8420,
      price: "₹7,999",
      image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    },
    {
      id: 2,
      title: "Power BI Mastery",
      instructor: "Michael Chen",
      duration: "8 weeks",
      rating: 4.9,
      students: 6230,
      price: "₹5,499",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    },
    {
      id: 3,
      title: "Machine Learning A-Z",
      instructor: "Prof. David Kumar",
      duration: "16 weeks",
      rating: 4.7,
      students: 9150,
      price: "₹9,999",
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    },
    {
      id: 4,
      title: "Generative AI Fundamentals",
      instructor: "Emma Martinez",
      duration: "10 weeks",
      rating: 4.9,
      students: 12500,
      price: "₹8,999",
      image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    },
    {
      id: 5,
      title: "SQL for Analytics",
      instructor: "Robert Williams",
      duration: "6 weeks",
      rating: 4.8,
      students: 7890,
      price: "₹3,999",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    },
    {
      id: 6,
      title: "Data Engineering with AWS",
      instructor: "Priya Sharma",
      duration: "14 weeks",
      rating: 4.7,
      students: 5640,
      price: "₹10,999",
      image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    }
  ];

  const learningPaths = [
    {
      title: "Data Analyst",
      icon: BarChart3,
      skills: ["Excel", "SQL", "Power BI", "Python", "Statistics"],
      duration: "6 months",
      salary: "₹4-8 LPA",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Data Scientist",
      icon: Brain,
      skills: ["Python", "Machine Learning", "Deep Learning", "Statistics", "Big Data"],
      duration: "9 months",
      salary: "₹8-15 LPA",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "AI Engineer",
      icon: Sparkles,
      skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"],
      duration: "10 months",
      salary: "₹10-20 LPA",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Data Engineer",
      icon: Database,
      skills: ["SQL", "Python", "Spark", "AWS", "ETL Pipelines"],
      duration: "8 months",
      salary: "₹6-12 LPA",
      color: "from-green-500 to-teal-500"
    }
  ];

  const testimonials = [
    {
      name: "Rahul Verma",
      role: "Data Analyst at Deloitte",
      company: "Deloitte",
      image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
      story: "SkillForge helped me transition from a non-tech background to landing my dream job at Deloitte. The hands-on projects made all the difference!"
    },
    {
      name: "Sneha Patel",
      role: "AI Engineer at Infosys",
      company: "Infosys",
      image: "https://images.unsplash.com/photo-1619852182277-79aa23f82c8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
      story: "The AI curriculum is cutting-edge and industry-relevant. Within 6 months, I secured a role with a 120% salary hike!"
    },
    {
      name: "Amit Singh",
      role: "Business Analyst at TCS",
      company: "TCS",
      image: "https://images.unsplash.com/photo-1593698054469-2bb6fdf4b512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
      story: "Amazing mentorship and career support. The placement team helped me prepare for interviews and negotiate my offer."
    }
  ];

  const companies = [
    "Google", "Microsoft", "Amazon", "Infosys", "TCS", "Accenture", "Deloitte", "IBM"
  ];

  const features = [
    {
      icon: Briefcase,
      title: "Industry Projects",
      description: "Work on real-world projects from top companies"
    },
    {
      icon: Target,
      title: "Job Ready Curriculum",
      description: "Learn skills that companies actively hire for"
    },
    {
      icon: Award,
      title: "Certificates",
      description: "Get recognized certifications to boost your resume"
    },
    {
      icon: MessageSquare,
      title: "Mentor Support",
      description: "1-on-1 guidance from industry experts"
    },
    {
      icon: HeartHandshake,
      title: "Placement Assistance",
      description: "Dedicated support to land your dream job"
    },
    {
      icon: Users,
      title: "Community Access",
      description: "Join 25,000+ learners and alumni network"
    }
  ];

  const resources = [
    {
      icon: FileText,
      title: "Data Science Roadmap PDF",
      description: "Complete learning path for aspiring data scientists"
    },
    {
      icon: Code,
      title: "SQL Cheat Sheet",
      description: "Quick reference guide for SQL queries"
    },
    {
      icon: Brain,
      title: "AI Career Guide",
      description: "Navigate your path to becoming an AI engineer"
    },
    {
      icon: BarChart3,
      title: "Power BI Handbook",
      description: "Master data visualization techniques"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "999",
      features: [
        "Access to 5 beginner courses",
        "Basic projects",
        "Course completion certificates",
        "Community forum access",
        "Email support"
      ],
      highlighted: false
    },
    {
      name: "Professional",
      price: "4,999",
      features: [
        "Access to all 300+ courses",
        "20+ industry projects",
        "Professional certificates",
        "1-on-1 mentor sessions (4/month)",
        "Resume review & interview prep",
        "Priority support"
      ],
      highlighted: true
    },
    {
      name: "Career Accelerator",
      price: "9,999",
      features: [
        "Everything in Professional",
        "Unlimited mentor sessions",
        "Dedicated career coach",
        "Guaranteed placement support",
        "Mock interviews with FAANG experts",
        "LinkedIn profile optimization",
        "Lifetime course access"
      ],
      highlighted: false
    }
  ];

  const faqs = [
    {
      question: "How do certifications work?",
      answer: "Upon completing a course and passing the final assessment, you'll receive a verified certificate that can be shared on LinkedIn and added to your resume. Our certificates are recognized by 150+ hiring partners."
    },
    {
      question: "Are projects included in the courses?",
      answer: "Yes! Every course includes hands-on projects that mirror real-world scenarios. You'll build a portfolio of 5-10 projects depending on your learning path."
    },
    {
      question: "Is placement assistance available?",
      answer: "Absolutely. Our Professional and Career Accelerator plans include dedicated placement support, including resume reviews, interview preparation, and direct introductions to hiring partners."
    },
    {
      question: "Can beginners join these courses?",
      answer: "Yes! We offer courses for all skill levels. Our beginner-friendly courses start with fundamentals and gradually progress to advanced topics with plenty of practice exercises."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent rounded-full text-sm text-primary">
                <Sparkles className="w-4 h-4" />
                <span>Trusted by 25,000+ Students</span>
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-secondary leading-tight">
                Master Data Science, AI & Analytics Skills That Companies Hire For
              </h1>
              <p className="text-xl text-muted-foreground">
                Learn from industry experts through hands-on projects, certifications, and career-focused learning paths.
              </p>
              <div className="flex gap-4">
                <Link to="/courses" className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                  Explore Courses
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/signup" className="px-8 py-4 bg-white border-2 border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-all">
                  Start Learning
                </Link>
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {[
                  { value: "25,000+", label: "Students" },
                  { value: "300+", label: "Lessons" },
                  { value: "150+", label: "Hiring Partners" },
                  { value: "95%", label: "Success Rate" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800"
                  alt="Students learning"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 to-transparent" />
              </div>

              {/* Floating Cards */}
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-xl backdrop-blur-sm border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg Salary Hike</div>
                    <div className="text-lg font-bold text-secondary">120%</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl backdrop-blur-sm border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Certifications</div>
                    <div className="text-lg font-bold text-secondary">Industry Recognized</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section id="courses" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-4">Featured Courses</h2>
            <p className="text-xl text-muted-foreground">Choose from our most popular industry-ready programs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border group hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary">
                    {course.price}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-semibold text-secondary">{course.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <GraduationCap className="w-4 h-4" />
                    <span>{course.instructor}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{course.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()} students enrolled</span>
                  </div>
                  <Link to={`/courses/${course.id}`} className="block w-full py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium text-center">
                    View Course
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses" className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all">
              View All Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section id="paths" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-4">Choose Your Career Path</h2>
            <p className="text-xl text-muted-foreground">Structured learning journeys designed for career success</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {learningPaths.map((path, index) => {
              const Icon = path.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-border group hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br ${path.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-secondary mb-3">{path.title}</h3>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{path.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-green-600">{path.salary}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-secondary">Skills Covered:</div>
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/learning-paths" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all">
              Explore All Paths
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose SkillForge */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-4">Why Choose SkillForge</h2>
            <p className="text-xl text-muted-foreground">Everything you need to launch your tech career</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-border">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-4">Student Success Stories</h2>
            <p className="text-xl text-muted-foreground">Join thousands who transformed their careers</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-border">
                <div className="flex items-center gap-4 mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-secondary">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-xs font-semibold text-primary">{testimonial.company}</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">&quot;{testimonial.story}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Partners */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-4">Our Hiring Partners</h2>
            <p className="text-xl text-muted-foreground">Learn skills that top companies value</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {companies.map((company, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all border border-border flex items-center justify-center">
                <div className="text-2xl font-bold text-secondary/30">{company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Dashboard Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-4">Track Your Progress</h2>
            <p className="text-xl text-muted-foreground">Monitor your learning journey with our interactive dashboard</p>
          </div>

          <div className="bg-gradient-to-br from-secondary to-purple-900 rounded-3xl p-8 shadow-2xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { label: "Courses Completed", value: "8", icon: BookOpen, color: "from-blue-400 to-blue-600" },
                { label: "Learning Hours", value: "127", icon: Clock, color: "from-green-400 to-green-600" },
                { label: "Certifications", value: "5", icon: Award, color: "from-orange-400 to-orange-600" },
                { label: "Skill Progress", value: "82%", icon: TrendingUp, color: "from-purple-400 to-purple-600" }
              ].map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                    <div className={`w-12 h-12 bg-gradient-to-br ${metric.color} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-sm text-white/70 mb-1">{metric.label}</div>
                    <div className="text-3xl font-bold text-white">{metric.value}</div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h3 className="text-xl font-semibold text-white mb-4">Current Learning Path: Data Scientist</h3>
              <div className="space-y-3">
                {["Python Fundamentals", "Statistics & Probability", "Machine Learning", "Deep Learning"].map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm text-white/90">
                      <span>{course}</span>
                      <span>{index === 0 ? "100%" : index === 1 ? "75%" : index === 2 ? "45%" : "0%"}</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all"
                        style={{ width: index === 0 ? "100%" : index === 1 ? "75%" : index === 2 ? "45%" : "0%" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link to="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-secondary rounded-lg hover:bg-white/90 transition-all font-medium">
                Go to Dashboard
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Free Resources */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-4">Free Resources</h2>
            <p className="text-xl text-muted-foreground">Start learning today with our free downloadable guides</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-border group cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-secondary mb-2">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                    <Download className="w-4 h-4" />
                    <span>Download Free</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-4">Choose Your Plan</h2>
            <p className="text-xl text-muted-foreground">Flexible pricing options for every learning goal</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 shadow-lg border-2 transition-all ${
                  plan.highlighted
                    ? "border-primary bg-gradient-to-br from-primary/5 to-purple-500/5 scale-105"
                    : "border-border bg-white hover:border-primary/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white rounded-full text-sm mb-4">
                    <Zap className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-secondary mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-secondary">₹{plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    plan.highlighted
                      ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                      : "bg-secondary text-white hover:bg-secondary/90"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/pricing" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              See detailed pricing comparison
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Got questions? We have answers</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/20 transition-colors"
                >
                  <span className="font-semibold text-secondary">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary via-purple-900 to-secondary -z-10" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1683064325134-3acfdef9c6d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920')] opacity-10 bg-cover bg-center -z-10" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white mb-6">
            <Globe className="w-4 h-4" />
            <span>Join students from 50+ countries</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Start Your Data Science Journey Today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of learners building successful careers in Data Science and AI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/courses" className="px-8 py-4 bg-white text-secondary rounded-lg hover:bg-white/90 transition-all shadow-xl font-medium flex items-center justify-center gap-2">
              Explore Courses
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all shadow-xl font-medium">
              Enroll Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
