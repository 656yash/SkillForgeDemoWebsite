import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
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
  Users,
  LogOut
} from "lucide-react";
import { onAuthChange, logoutUser, getUserProfile, UserProfile } from "../lib/firebase";

export function Dashboard() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (currentUser) => {
      if (currentUser) {
        // Fetch user profile from Firestore
        const profile = await getUserProfile(currentUser.uid);
        setUserProfile(profile);
        setIsLoading(false);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (err) {
      console.error("[v0] Dashboard: Logout error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Unable to load your profile</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Courses Completed",
      value: userProfile.coursesCompleted.toString(),
      icon: BookOpen,
      color: "from-blue-400 to-blue-600",
      change: "+0 this month"
    },
    {
      label: "Learning Hours",
      value: userProfile.learningHours.toString(),
      icon: Clock,
      color: "from-green-400 to-green-600",
      change: "+0 this week"
    },
    {
      label: "Certifications",
      value: userProfile.certifications.toString(),
      icon: Award,
      color: "from-orange-400 to-orange-600",
      change: "+0 this month"
    },
    {
      label: "Skill Progress",
      value: `${userProfile.skillProgress}%`,
      icon: TrendingUp,
      color: "from-purple-400 to-purple-600",
      change: "+0% this month"
    }
  ];

  const currentCourses = [
    {
      id: 3,
      title: "Machine Learning A-Z",
      progress: 0,
      nextLesson: "Introduction to ML",
      timeLeft: "0 hours",
      thumbnail: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    }
  ];

  const completedCourses: any[] = [];

  const achievements = [
    { title: "Getting Started", description: "Account created", icon: Flame, color: "text-orange-500" }
  ];

  const learningPath = [
    { name: "Getting Started", status: "completed", progress: 100 },
    { name: "Fundamentals", status: "in-progress", progress: userProfile.skillProgress },
    { name: "Intermediate", status: "locked", progress: 0 },
    { name: "Advanced", status: "locked", progress: 0 },
    { name: "Capstone Project", status: "locked", progress: 0 }
  ];

  const upcomingSessions: any[] = [];

  return (
    <div className="min-h-screen bg-muted/30 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-2">Welcome back, {userProfile.displayName}! 👋</h1>
            <p className="text-muted-foreground">Here's your learning progress and what's next</p>
            <p className="text-xs text-muted-foreground mt-2">Logged in as: {userProfile.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-600 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
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
                <h2 className="text-xl font-semibold text-secondary">Your Learning Path</h2>
                <span className="text-sm text-primary font-medium">{userProfile.skillProgress}% Complete</span>
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
            {upcomingSessions.length > 0 && (
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
            )}

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
