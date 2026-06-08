import { Link, Outlet, useLocation } from "react-router";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-secondary">SkillForge Academy</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                to="/courses"
                className={`transition-colors ${isActive('/courses') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
              >
                Courses
              </Link>
              <Link
                to="/learning-paths"
                className={`transition-colors ${isActive('/learning-paths') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
              >
                Learning Paths
              </Link>
              <Link
                to="/pricing"
                className={`transition-colors ${isActive('/pricing') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
              >
                Pricing
              </Link>
              <Link
                to="/dashboard"
                className={`transition-colors ${isActive('/dashboard') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
              >
                Dashboard
              </Link>
              <Link
                to="/login"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all"
              >
                Start Learning
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                <Link
                  to="/courses"
                  className={`transition-colors ${isActive('/courses') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Courses
                </Link>
                <Link
                  to="/learning-paths"
                  className={`transition-colors ${isActive('/learning-paths') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Learning Paths
                </Link>
                <Link
                  to="/pricing"
                  className={`transition-colors ${isActive('/pricing') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  to="/dashboard"
                  className={`transition-colors ${isActive('/dashboard') ? 'text-primary font-semibold' : 'text-foreground hover:text-primary'}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/login"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Start Learning
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-semibold">SkillForge Academy</span>
              </div>
              <p className="text-white/70 mb-6">
                Empowering the next generation of data scientists, AI engineers, and analytics professionals.
              </p>
              <div className="flex gap-4">
                {["Twitter", "LinkedIn", "YouTube", "Instagram"].map((social, index) => (
                  <div key={index} className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-primary transition-all cursor-pointer">
                    <span className="text-xs">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Courses</h4>
              <ul className="space-y-2 text-white/70">
                <li className="hover:text-white transition-colors cursor-pointer">Data Science</li>
                <li className="hover:text-white transition-colors cursor-pointer">Machine Learning</li>
                <li className="hover:text-white transition-colors cursor-pointer">AI Engineering</li>
                <li className="hover:text-white transition-colors cursor-pointer">Data Analytics</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Career Tracks</h4>
              <ul className="space-y-2 text-white/70">
                <li className="hover:text-white transition-colors cursor-pointer">Data Analyst</li>
                <li className="hover:text-white transition-colors cursor-pointer">Data Scientist</li>
                <li className="hover:text-white transition-colors cursor-pointer">AI Engineer</li>
                <li className="hover:text-white transition-colors cursor-pointer">Data Engineer</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-white/70">
                <li className="hover:text-white transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-white transition-colors cursor-pointer">Contact</li>
                <li className="hover:text-white transition-colors cursor-pointer">Careers</li>
                <li className="hover:text-white transition-colors cursor-pointer">Blog</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/70 text-sm">
              &copy; 2026 SkillForge Academy. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/70">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
