import { Link } from "react-router";
import { BarChart3, Brain, Sparkles, Database, Clock, TrendingUp, Check, ArrowRight, Briefcase } from "lucide-react";

export function LearningPaths() {
  const learningPaths = [
    {
      id: 1,
      title: "Data Analyst",
      icon: BarChart3,
      skills: ["Excel", "SQL", "Power BI", "Python", "Statistics"],
      duration: "6 months",
      salary: "₹4-8 LPA",
      color: "from-blue-500 to-cyan-500",
      description: "Master data analysis and visualization to help businesses make data-driven decisions.",
      courses: [
        "Excel for Data Analysis",
        "SQL Fundamentals",
        "Power BI Mastery",
        "Python for Analytics",
        "Statistics & Probability"
      ],
      outcomes: [
        "Analyze complex datasets",
        "Create interactive dashboards",
        "Perform statistical analysis",
        "Communicate insights effectively"
      ],
      jobRoles: ["Data Analyst", "Business Analyst", "Analytics Consultant"]
    },
    {
      id: 2,
      title: "Data Scientist",
      icon: Brain,
      skills: ["Python", "Machine Learning", "Deep Learning", "Statistics", "Big Data"],
      duration: "9 months",
      salary: "₹8-15 LPA",
      color: "from-purple-500 to-pink-500",
      description: "Build predictive models and extract insights from complex data using advanced ML techniques.",
      courses: [
        "Python for Data Science",
        "Machine Learning A-Z",
        "Deep Learning Specialization",
        "Big Data Analytics",
        "Advanced Statistics"
      ],
      outcomes: [
        "Build ML models from scratch",
        "Deploy production-ready solutions",
        "Handle big data pipelines",
        "Solve complex business problems"
      ],
      jobRoles: ["Data Scientist", "ML Engineer", "Research Scientist"]
    },
    {
      id: 3,
      title: "AI Engineer",
      icon: Sparkles,
      skills: ["Python", "TensorFlow", "PyTorch", "NLP", "Computer Vision"],
      duration: "10 months",
      salary: "₹10-20 LPA",
      color: "from-orange-500 to-red-500",
      description: "Develop cutting-edge AI applications using state-of-the-art deep learning frameworks.",
      courses: [
        "Generative AI Fundamentals",
        "Natural Language Processing",
        "Computer Vision",
        "TensorFlow & PyTorch",
        "AI Ethics & Deployment"
      ],
      outcomes: [
        "Build AI-powered applications",
        "Work with LLMs and transformers",
        "Create computer vision systems",
        "Deploy scalable AI solutions"
      ],
      jobRoles: ["AI Engineer", "NLP Engineer", "Computer Vision Engineer"]
    },
    {
      id: 4,
      title: "Data Engineer",
      icon: Database,
      skills: ["SQL", "Python", "Spark", "AWS", "ETL Pipelines"],
      duration: "8 months",
      salary: "₹6-12 LPA",
      color: "from-green-500 to-teal-500",
      description: "Design and maintain data infrastructure that powers analytics and ML at scale.",
      courses: [
        "Data Engineering with AWS",
        "Apache Spark",
        "ETL Pipeline Development",
        "Database Design",
        "Cloud Data Warehousing"
      ],
      outcomes: [
        "Build scalable data pipelines",
        "Design data warehouses",
        "Optimize query performance",
        "Manage cloud infrastructure"
      ],
      jobRoles: ["Data Engineer", "Cloud Data Engineer", "ETL Developer"]
    }
  ];

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary to-purple-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Career Path</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Structured learning journeys designed to take you from beginner to job-ready professional
          </p>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {learningPaths.map((path, index) => {
            const Icon = path.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={path.id}
                className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}
              >
                {/* Content */}
                <div className={`space-y-6 ${!isEven ? "lg:order-2" : ""}`}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${path.color} rounded-2xl flex items-center justify-center`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  <h2 className="text-3xl font-bold text-secondary">{path.title}</h2>
                  <p className="text-lg text-muted-foreground">{path.description}</p>

                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <span className="font-medium">{path.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500" />
                      <span className="font-semibold text-green-600">{path.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      <span className="font-medium">{path.courses.length} courses</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-secondary mb-3">Skills You'll Master:</h3>
                    <div className="flex flex-wrap gap-2">
                      {path.skills.map((skill, idx) => (
                        <span key={idx} className="px-4 py-2 bg-muted text-foreground rounded-lg border border-border">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-secondary mb-3">Career Outcomes:</h3>
                    <div className="space-y-2">
                      {path.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-muted-foreground">{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-secondary mb-3">Job Roles:</h3>
                    <div className="flex flex-wrap gap-2">
                      {path.jobRoles.map((role, idx) => (
                        <span key={idx} className="px-4 py-2 bg-accent text-primary rounded-lg font-medium">
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    to="/courses"
                    className={`inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${path.color} text-white rounded-lg hover:opacity-90 transition-all shadow-lg font-medium`}
                  >
                    Start This Path
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>

                {/* Course List */}
                <div className={`bg-white rounded-2xl p-8 shadow-xl border border-border ${!isEven ? "lg:order-1" : ""}`}>
                  <h3 className="text-xl font-semibold text-secondary mb-6">Curriculum Overview</h3>
                  <div className="space-y-4">
                    {path.courses.map((course, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg border border-border hover:border-primary transition-colors">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-semibold">{idx + 1}</span>
                        </div>
                        <span className="text-foreground font-medium">{course}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-accent rounded-lg">
                    <div className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground">
                        Includes hands-on projects, mentorship, and placement support
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary mb-4">Not Sure Which Path to Choose?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Our career counselors can help you pick the right learning path based on your goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all font-medium shadow-lg shadow-primary/20">
              Get Free Career Counseling
            </Link>
            <Link to="/courses" className="px-8 py-4 bg-white border-2 border-secondary text-secondary rounded-lg hover:bg-secondary hover:text-white transition-all font-medium">
              Explore All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
