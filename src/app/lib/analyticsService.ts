import { analytics, logAnalyticsEvent } from './firebase';

// Reusable analytics tracking utilities

// Page tracking
export function trackPageView(pageName: string, pageLocation?: string) {
  logAnalyticsEvent('page_view', {
    page_title: pageName,
    page_location: pageLocation || window.location.href,
    timestamp: new Date().toISOString(),
  });
}

// Course tracking
export function trackCourseView(courseId: string, courseName: string, category?: string) {
  logAnalyticsEvent('course_view', {
    course_id: courseId,
    course_name: courseName,
    category: category || 'uncategorized',
    timestamp: new Date().toISOString(),
  });
}

export function trackCourseClick(courseId: string, courseName: string) {
  logAnalyticsEvent('course_click', {
    course_id: courseId,
    course_name: courseName,
    timestamp: new Date().toISOString(),
  });
}

export function trackCourseEnrollment(courseId: string, courseName: string, price?: number) {
  logAnalyticsEvent('course_enrolled', {
    course_id: courseId,
    course_name: courseName,
    price: price || 0,
    timestamp: new Date().toISOString(),
  });
}

export function trackCourseCompletion(courseId: string, courseName: string, timeSpentMinutes?: number) {
  logAnalyticsEvent('course_completed', {
    course_id: courseId,
    course_name: courseName,
    time_spent_minutes: timeSpentMinutes || 0,
    timestamp: new Date().toISOString(),
  });
}

// Pricing page tracking
export function trackPricingPageView() {
  logAnalyticsEvent('pricing_view', {
    timestamp: new Date().toISOString(),
  });
}

export function trackPlanSelected(planName: string, price: number) {
  logAnalyticsEvent('plan_selected', {
    plan_name: planName,
    price: price,
    timestamp: new Date().toISOString(),
  });
}

// Checkout tracking
export function trackCheckoutStarted(courseId: string, courseName: string, amount: number) {
  logAnalyticsEvent('checkout_started', {
    course_id: courseId,
    course_name: courseName,
    amount: amount,
    timestamp: new Date().toISOString(),
  });
}

export function trackCheckoutCompleted(courseId: string, courseName: string, amount: number, transactionId?: string) {
  logAnalyticsEvent('checkout_completed', {
    course_id: courseId,
    course_name: courseName,
    amount: amount,
    transaction_id: transactionId || 'mock_transaction',
    timestamp: new Date().toISOString(),
  });
}

// Authentication tracking
export function trackSignupComplete(method: string, email?: string) {
  logAnalyticsEvent('signup_complete', {
    method: method, // 'email', 'google', etc.
    email_provided: !!email,
    timestamp: new Date().toISOString(),
  });
}

export function trackLoginSuccess(method: string) {
  logAnalyticsEvent('login_success', {
    method: method,
    timestamp: new Date().toISOString(),
  });
}

// Newsletter tracking
export function trackNewsletterSignup(email?: string) {
  logAnalyticsEvent('newsletter_signup', {
    email_provided: !!email,
    timestamp: new Date().toISOString(),
  });
}

// Contact form tracking
export function trackContactSubmission(subject?: string) {
  logAnalyticsEvent('contact_submission', {
    subject: subject || 'general',
    timestamp: new Date().toISOString(),
  });
}

// Learning tracking
export function trackLessonCompleted(courseId: string, lessonId: string, lessonTitle: string) {
  logAnalyticsEvent('lesson_completed', {
    course_id: courseId,
    lesson_id: lessonId,
    lesson_title: lessonTitle,
    timestamp: new Date().toISOString(),
  });
}

export function trackLearningSession(courseId: string, durationMinutes: number) {
  logAnalyticsEvent('learning_session', {
    course_id: courseId,
    duration_minutes: durationMinutes,
    timestamp: new Date().toISOString(),
  });
}

// User engagement tracking
export function trackUserEngagement(eventName: string, eventData?: Record<string, any>) {
  logAnalyticsEvent('user_engagement', {
    event_name: eventName,
    ...eventData,
    timestamp: new Date().toISOString(),
  });
}

// Error tracking (for debugging)
export function trackError(errorName: string, errorMessage: string, context?: string) {
  logAnalyticsEvent('error_occurred', {
    error_name: errorName,
    error_message: errorMessage,
    context: context || 'general',
    timestamp: new Date().toISOString(),
  });
}
