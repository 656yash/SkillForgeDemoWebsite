import { Link } from "react-router";
import { Check, Zap, HelpCircle, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { trackPricingPageView, trackPlanSelected } from "../lib/analyticsService";

export function Pricing() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  useEffect(() => {
    trackPricingPageView();
  }, []);

  const pricingPlans = [
    {
      name: "Starter",
      monthlyPrice: "999",
      annualPrice: "9,990",
      features: [
        "Access to 5 beginner courses",
        "Basic projects",
        "Course completion certificates",
        "Community forum access",
        "Email support",
        "Mobile app access"
      ],
      notIncluded: [
        "Advanced courses",
        "Mentor sessions",
        "Placement assistance",
        "Interview prep"
      ],
      highlighted: false,
      cta: "Start Learning"
    },
    {
      name: "Professional",
      monthlyPrice: "4,999",
      annualPrice: "49,990",
      features: [
        "Access to all 300+ courses",
        "20+ industry projects",
        "Professional certificates",
        "1-on-1 mentor sessions (4/month)",
        "Resume review & interview prep",
        "Priority support",
        "Career counseling",
        "Job referrals to hiring partners",
        "Exclusive webinars",
        "Project review by experts"
      ],
      notIncluded: [
        "Unlimited mentor sessions",
        "Dedicated career coach"
      ],
      highlighted: true,
      cta: "Get Professional"
    },
    {
      name: "Career Accelerator",
      monthlyPrice: "9,999",
      annualPrice: "99,990",
      features: [
        "Everything in Professional",
        "Unlimited mentor sessions",
        "Dedicated career coach",
        "Guaranteed placement support",
        "Mock interviews with FAANG experts",
        "LinkedIn profile optimization",
        "Lifetime course access",
        "Direct company introductions",
        "Salary negotiation support",
        "Personal brand building",
        "1-year job security assistance"
      ],
      notIncluded: [],
      highlighted: false,
      cta: "Accelerate Your Career"
    }
  ];

  const faqs = [
    {
      question: "Can I switch plans later?",
      answer: "Yes! You can upgrade or downgrade your plan at any time. When upgrading, you'll only pay the prorated difference."
    },
    {
      question: "Is there a refund policy?",
      answer: "We offer a 14-day money-back guarantee on all plans. If you're not satisfied, we'll refund your payment in full."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and popular digital wallets."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes! College students get 20% off on all plans. Just verify your student email to unlock the discount."
    },
    {
      question: "Can I share my account?",
      answer: "Accounts are for individual use only. We monitor for account sharing and may suspend shared accounts."
    }
  ];

  const getPrice = (plan: any) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice;
  };

  const getSavings = () => {
    return billingCycle === "annual" ? "Save 17%" : "";
  };

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-secondary to-purple-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12">
            Invest in your future with flexible pricing options designed for every learning goal
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-2">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-secondary"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-3 rounded-lg font-medium transition-all relative ${
                billingCycle === "annual"
                  ? "bg-white text-secondary"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Annual
              {billingCycle === "annual" && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                  Save 17%
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 -mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 shadow-xl border-2 transition-all ${
                  plan.highlighted
                    ? "border-primary bg-gradient-to-br from-primary/5 to-purple-500/5 scale-105 relative"
                    : "border-border bg-white hover:border-primary/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold shadow-lg">
                    <Zap className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                )}

                <h3 className="text-2xl font-bold text-secondary mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-secondary">₹{getPrice(plan)}</span>
                  <span className="text-muted-foreground">/{billingCycle === "monthly" ? "month" : "year"}</span>
                  {billingCycle === "annual" && (
                    <div className="text-sm text-green-600 font-medium mt-1">
                      Save ₹{(parseInt(plan.monthlyPrice) * 12 - parseInt(plan.annualPrice)).toLocaleString()}
                    </div>
                  )}
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
                  {plan.notIncluded.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 opacity-40">
                      <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">✕</span>
                      </div>
                      <span className="text-muted-foreground line-through">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-4 rounded-lg font-medium transition-all ${
                    plan.highlighted
                      ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                      : "bg-secondary text-white hover:bg-secondary/90"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl p-12 shadow-xl border border-border">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-4">Enterprise Solutions</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Custom training programs for your organization with dedicated support and analytics
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Unlimited user licenses",
                    "Custom learning paths",
                    "Dedicated account manager",
                    "Advanced analytics dashboard",
                    "API access",
                    "SSO integration"
                  ].map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="px-8 py-4 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-all font-medium">
                  Contact Sales
                </button>
              </div>
              <div className="bg-gradient-to-br from-secondary to-purple-900 rounded-xl p-8 text-white">
                <div className="space-y-6">
                  <div>
                    <div className="text-sm text-white/70 mb-1">Companies Trained</div>
                    <div className="text-4xl font-bold">500+</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Corporate Learners</div>
                    <div className="text-4xl font-bold">50,000+</div>
                  </div>
                  <div>
                    <div className="text-sm text-white/70 mb-1">Avg Skill Improvement</div>
                    <div className="text-4xl font-bold">85%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-muted-foreground">Everything you need to know about pricing</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-border">
                <div className="flex items-start gap-4">
                  <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-secondary mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Link to="/login" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
              Contact our support team
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-secondary to-purple-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Career?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join 25,000+ students who are already learning with SkillForge Academy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="px-8 py-4 bg-white text-secondary rounded-lg hover:bg-white/90 transition-all font-medium shadow-xl">
              Start Free Trial
            </Link>
            <Link to="/courses" className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-lg hover:bg-white/20 transition-all font-medium">
              Explore Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
