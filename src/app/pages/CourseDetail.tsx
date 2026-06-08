import { useParams, Link } from "react-router";
import {
  Star,
  Clock,
  Users,
  GraduationCap,
  Award,
  BookOpen,
  Video,
  FileText,
  Download,
  Check,
  ChevronRight,
  PlayCircle,
  TrendingUp,
  Globe
} from "lucide-react";

export function CourseDetail() {
  const { id } = useParams();

  const courseData: Record<string, any> = {
    "1": {
      title: "Data Science Bootcamp",
      instructor: "Dr. Sarah Johnson",
      instructorBio: "PhD in Data Science from MIT, 15+ years of industry experience at Google and Amazon",
      instructorImage: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
      duration: "12 weeks",
      rating: 4.8,
      students: 8420,
      price: "₹7,999",
      category: "Data Science",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1200",
      description: "Master the fundamentals of Data Science with hands-on projects and real-world applications. This comprehensive bootcamp covers everything from Python programming to machine learning algorithms.",
      learningOutcomes: [
        "Build end-to-end data science projects",
        "Master Python, NumPy, Pandas, and Matplotlib",
        "Understand statistical analysis and hypothesis testing",
        "Apply machine learning algorithms to real datasets",
        "Create data visualizations and dashboards",
        "Deploy models in production environments"
      ],
      curriculum: [
        {
          module: "Module 1: Python Fundamentals",
          lessons: ["Python Basics", "Data Structures", "Functions & Modules", "OOP Concepts"],
          duration: "2 weeks"
        },
        {
          module: "Module 2: Data Analysis",
          lessons: ["NumPy Arrays", "Pandas DataFrames", "Data Cleaning", "Exploratory Data Analysis"],
          duration: "2 weeks"
        },
        {
          module: "Module 3: Data Visualization",
          lessons: ["Matplotlib", "Seaborn", "Plotly", "Interactive Dashboards"],
          duration: "2 weeks"
        },
        {
          module: "Module 4: Statistics",
          lessons: ["Probability", "Hypothesis Testing", "Regression Analysis", "ANOVA"],
          duration: "2 weeks"
        },
        {
          module: "Module 5: Machine Learning",
          lessons: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Feature Engineering"],
          duration: "3 weeks"
        },
        {
          module: "Module 6: Capstone Project",
          lessons: ["Project Planning", "Implementation", "Presentation", "Deployment"],
          duration: "1 week"
        }
      ]
    }
  };

  const course = courseData[id || "1"] || courseData["1"];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-purple-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                {course.category} · {course.level}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold">{course.title}</h1>
              <p className="text-xl text-white/90">{course.description}</p>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-white/70">({course.students.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5" />
                  <span>English</span>
                </div>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <img src={course.instructorImage} alt={course.instructor} className="w-16 h-16 rounded-full object-cover border-2 border-white" />
                <div>
                  <div className="font-semibold">Created by {course.instructor}</div>
                  <div className="text-sm text-white/70">{course.instructorBio}</div>
                </div>
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl p-6 shadow-2xl sticky top-24">
                <div className="relative h-48 mb-6 rounded-xl overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-secondary mb-1">{course.price}</div>
                    <div className="text-sm text-muted-foreground">One-time payment</div>
                  </div>

                  <Link
                    to="/signup"
                    className="w-full py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium shadow-lg shadow-primary/20 flex items-center justify-center"
                  >
                    Enroll Now
                  </Link>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <div className="flex items-center gap-3 text-sm">
                      <Video className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">42 hours of video content</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">15 downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Award className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Users className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">Lifetime community access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary mb-8">What You'll Learn</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {course.learningOutcomes.map((outcome: string, index: number) => (
              <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg border border-border">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-muted-foreground">{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-secondary">Course Curriculum</h2>
            <div className="text-muted-foreground">
              {course.curriculum.length} modules · {course.duration}
            </div>
          </div>

          <div className="space-y-4">
            {course.curriculum.map((module: any, index: number) => (
              <div key={index} className="bg-white border border-border rounded-xl overflow-hidden">
                <div className="p-6 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary text-lg">{module.module}</h3>
                        <div className="text-sm text-muted-foreground">{module.lessons.length} lessons · {module.duration}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
                <div className="px-6 py-4 space-y-2">
                  {module.lessons.map((lesson: string, lessonIndex: number) => (
                    <div key={lessonIndex} className="flex items-center gap-3 text-sm text-muted-foreground py-2">
                      <PlayCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{lesson}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-secondary mb-8">About the Instructor</h2>
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-start gap-6">
              <img src={course.instructorImage} alt={course.instructor} className="w-24 h-24 rounded-full object-cover" />
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-secondary mb-2">{course.instructor}</h3>
                <p className="text-muted-foreground mb-4">{course.instructorBio}</p>
                <div className="flex gap-8">
                  <div>
                    <div className="text-2xl font-bold text-primary">4.8</div>
                    <div className="text-sm text-muted-foreground">Instructor Rating</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">25,000+</div>
                    <div className="text-sm text-muted-foreground">Students Taught</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Courses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-purple-600 rounded-3xl p-12 text-center text-white">
          <TrendingUp className="w-16 h-16 mx-auto mb-6 text-white/90" />
          <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl text-white/90 mb-8">Join {course.students.toLocaleString()} students already enrolled in this course</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signup"
              className="px-8 py-4 bg-white text-primary rounded-lg hover:bg-white/90 transition-all font-medium shadow-xl"
            >
              Enroll Now - {course.price}
            </Link>
            <Link to="/courses" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-lg hover:bg-white/20 transition-all font-medium">
              Explore More Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
