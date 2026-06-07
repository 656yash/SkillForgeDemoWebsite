import { Link } from "react-router";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  PlayCircle,
  CheckCircle,
  Calendar,
  Target,
  BarChart3,
  Trophy,
  Flame,
  Users
} from "lucide-react";

export function Dashboard() {
  const stats = [
    {
      label: "Courses Completed",
      value: "8",
      icon: BookOpen,
      color: "from-blue-400 to-blue-600",
      change: "+2 this month"
    },
    {
      label: "Learning Hours",
      value: "127",
      icon: Clock,
      color: "from-green-400 to-green-600",
      change: "+18 this week"
    },
    {
      label: "Certifications",
      value: "5",
      icon: Award,
      color: "from-orange-400 to-orange-600",
      change: "+1 this month"
    },
    {
      label: "Skill Progress",
      value: "82%",
      icon: TrendingUp,
      color: "from-purple-400 to-purple-600",
      change: "+12% this month"
    }
  ];

  const currentCourses = [
    {
      id: 3,
      title: "Machine Learning A-Z",
      progress: 65,
      nextLesson: "Random Forest Algorithms",
      timeLeft: "2.5 hours",
      thumbnail: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
    {
      id: 4,
      title: "Generative AI Fundamentals",
      progress: 30,
      nextLesson: "Introduction to Transformers",
      timeLeft: "1.5 hours",
      thumbnail: "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    }
  ];

  const completedCourses = [
    { title: "Python for Data Science", completedDate: "May 15, 2026", rating: 5 },
    { title: "SQL Fundamentals", completedDate: "May 1, 2026", rating: 5 },
    { title: "Statistics & Probability", completedDate: "April 20, 2026", rating: 4 }
  ];

  const achievements = [
    { title: "Fast Learner", description: "Completed 5 courses in one month", icon: Flame, color: "text-orange-500" },
    { title: "Perfect Score", description: "Scored 100% on 3 assessments", icon: Trophy, color: "text-yellow-500" },
    { title: "Consistent", description: "30-day learning streak", icon: Calendar, color: "text-green-500" },
    { title: "Community Star", description: "Helped 10+ students", icon: Users, color: "text-blue-500" }
  ];

  const learningPath = [
    { name: "Python Fundamentals", status: "completed", progress: 100 },
    { name: "Statistics & Probability", status: "completed", progress: 100 },
    { name: "Machine Learning", status: "in-progress", progress: 65 },
    { name: "Deep Learning", status: "locked", progress: 0 },
    { name: "Capstone Project", status: "locked", progress: 0 }
  ];

  const upcomingSessions = [
    { title: "1-on-1 Mentor Session", instructor: "Dr. Sarah Johnson", date: "June 10, 2026", time: "3:00 PM" },
    { title: "ML Project Review", instructor: "Prof. David Kumar", date: "June 12, 2026", time: "5:00 PM" }
  ];

  return (
    <div className="min-h-screen bg-muted/30 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary mb-2">Welcome back, Alex! 👋</h1>
          <p className="text-muted-foreground">Here's your learning progress and what's next</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-border">
                <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
                <div className="text-3xl font-bold text-secondary mb-1">{stat.value}</div>
                <div className="text-xs text-green-600 font-medium">{stat.change}</div>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Courses */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-border">
              <h2 className="text-xl font-semibold text-secondary mb-6">Continue Learning</h2>
              <div className="space-y-4">
                {currentCourses.map((course) => (
                  <div key={course.id} className="border border-border rounded-xl p-4 hover:border-primary transition-colors">
                    <div className="flex gap-4">
                      <img src={course.thumbnail} alt={course.title} className="w-24 h-24 rounded-lg object-cover" />
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-semibold text-secondary mb-1">{course.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <PlayCircle className="w-4 h-4" />
                              <span>Next: {course.nextLesson}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.timeLeft}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold text-secondary">{course.progress}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-purple-600 rounded-full transition-all"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <Link
                          to={`/courses/${course.id}`}
                          className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all text-sm font-medium"
                        >
                          Continue Course
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Path */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-border">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-secondary">Data Scientist Path</h2>
                <span className="text-sm text-primary font-medium">82% Complete</span>
              </div>
              <div className="space-y-4">
                {learningPath.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.status === "completed"
                        ? "bg-green-500"
                        : step.status === "in-progress"
                        ? "bg-primary"
                        : "bg-muted"
                    }`}>
                      {step.status === "completed" ? (
                        <CheckCircle className="w-5 h-5 text-white" />
                      ) : step.status === "in-progress" ? (
                        <Target className="w-5 h-5 text-white" />
                      ) : (
                        <span className="text-muted-foreground text-sm">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className={`font-medium ${step.status === "locked" ? "text-muted-foreground" : "text-secondary"}`}>
                          {step.name}
                        </span>
                        {step.status === "in-progress" && (
                          <span className="text-sm text-primary font-medium">{step.progress}%</span>
                        )}
                      </div>
                      {step.status === "in-progress" && (
                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${step.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completed Courses */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-border">
              <h2 className="text-xl font-semibold text-secondary mb-6">Completed Courses</h2>
              <div className="space-y-3">
                {completedCourses.map((course, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-secondary">{course.title}</div>
                        <div className="text-sm text-muted-foreground">{course.completedDate}</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(course.rating)].map((_, i) => (
                        <Award key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Achievements */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-border">
              <h2 className="text-xl font-semibold text-secondary mb-6">Achievements</h2>
              <div className="space-y-4">
                {achievements.map((achievement, index) => {
                  const Icon = achievement.icon;
                  return (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-5 h-5 ${achievement.color}`} />
                      </div>
                      <div>
                        <div className="font-medium text-secondary">{achievement.title}</div>
                        <div className="text-sm text-muted-foreground">{achievement.description}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Upcoming Sessions */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-border">
              <h2 className="text-xl font-semibold text-secondary mb-6">Upcoming Sessions</h2>
              <div className="space-y-4">
                {upcomingSessions.map((session, index) => (
                  <div key={index} className="p-4 bg-accent rounded-lg border border-primary/20">
                    <div className="font-medium text-secondary mb-1">{session.title}</div>
                    <div className="text-sm text-muted-foreground mb-2">{session.instructor}</div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{session.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all text-sm font-medium">
                Schedule New Session
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-primary to-purple-600 rounded-xl p-6 text-white">
              <h3 className="font-semibold mb-4">Ready for the next step?</h3>
              <p className="text-sm text-white/90 mb-6">
                You're making great progress! Keep up the momentum.
              </p>
              <Link to="/courses" className="block w-full px-4 py-3 bg-white text-primary rounded-lg hover:bg-white/90 transition-all text-sm font-medium text-center">
                Explore More Courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
