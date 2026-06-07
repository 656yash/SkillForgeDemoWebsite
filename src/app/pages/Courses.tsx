import { useState } from "react";
import { Link } from "react-router";
import { Star, Clock, Users, GraduationCap, Search, Filter } from "lucide-react";

export function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Data Science", "Machine Learning", "AI Engineering", "Analytics", "Data Engineering"];

  const allCourses = [
    {
      id: 1,
      title: "Data Science Bootcamp",
      instructor: "Dr. Sarah Johnson",
      duration: "12 weeks",
      rating: 4.8,
      students: 8420,
      price: "₹7,999",
      category: "Data Science",
      level: "Beginner",
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
      category: "Analytics",
      level: "Intermediate",
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
      category: "Machine Learning",
      level: "Intermediate",
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
      category: "AI Engineering",
      level: "Advanced",
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
      category: "Analytics",
      level: "Beginner",
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
      category: "Data Engineering",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    },
    {
      id: 7,
      title: "Python for Data Science",
      instructor: "Lisa Anderson",
      duration: "10 weeks",
      rating: 4.9,
      students: 11200,
      price: "₹6,499",
      category: "Data Science",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    },
    {
      id: 8,
      title: "Deep Learning Specialization",
      instructor: "Dr. James Wilson",
      duration: "20 weeks",
      rating: 4.8,
      students: 6780,
      price: "₹12,999",
      category: "Machine Learning",
      level: "Advanced",
      image: "https://images.unsplash.com/photo-1644088379091-d574269d422f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    },
    {
      id: 9,
      title: "Tableau Fundamentals",
      instructor: "Maria Garcia",
      duration: "7 weeks",
      rating: 4.7,
      students: 5430,
      price: "₹4,999",
      category: "Analytics",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600"
    }
  ];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary to-purple-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Courses</h1>
          <p className="text-xl text-white/90 mb-8">300+ industry-ready courses to accelerate your career</p>

          {/* Search Bar */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white text-foreground border-0 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Course Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Category Filters */}
          <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 text-muted-foreground flex-shrink-0">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filter:</span>
            </div>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing {filteredCourses.length} {filteredCourses.length === 1 ? 'course' : 'courses'}
            </p>
          </div>

          {/* Course Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border group hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-primary">
                    {course.price}
                  </div>
                  <div className="absolute top-4 left-4 bg-secondary/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                    {course.level}
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="inline-block px-3 py-1 bg-accent text-primary text-xs font-semibold rounded-full">
                    {course.category}
                  </div>
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

          {filteredCourses.length === 0 && (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground">No courses found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
