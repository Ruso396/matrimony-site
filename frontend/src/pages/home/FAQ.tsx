import React, { useState } from "react";
import faqImage from "../../components/assets/faq.png"; // 👉 replace with your own illustration

const categories = [
  {
    title: "Getting Started",
    faqs: [
      {
        q: "How do I register on Royal Delight Matrimony?",
        a: "Click the 'Register Now' button on the homepage and fill in your basic details such as name, email, phone number, and preferences. Once submitted, your profile will be created instantly.",
      },
      {
        q: "Can I view profiles without registering?",
        a: "You can browse a few sample profiles, but to view full biodata and contact details, registration is required.",
      },
      {
        q: "How can I edit my profile after registration?",
        a: "Go to your Dashboard → Profile → Edit Profile. You can update personal info, preferences, and profile pictures anytime.",
      },
      {
        q: "Is verification mandatory?",
        a: "We recommend verifying your phone and email for better trust and to get priority visibility.",
      },
      {
        q: "Can I hide my profile temporarily?",
        a: "Yes, you can hide your profile from search results using the ‘Hide Profile’ option in account settings.",
      },
    ],
  },
  {
    title: "Viewing Profiles",
    faqs: [
      {
        q: "Can I see all profiles after I register?",
        a: "Yes, once registered, you can explore and view other members' profiles that match your preferences.",
      },
      {
        q: "Will my profile be visible to everyone?",
        a: "Your profile visibility depends on your privacy settings. You can choose to show or hide contact details.",
      },
      {
        q: "Are all profiles verified?",
        a: "We manually verify each profile and photo to ensure authenticity. Verified profiles have a ‘Verified’ badge.",
      },
      {
        q: "How do I shortlist or save profiles I like?",
        a: "Click the heart ❤️ or ‘Add to Shortlist’ button on the profile card. You can view them later in your dashboard.",
      },
    ],
  },
  {
    title: "Payments & Subscription",
    faqs: [
      {
        q: "Is Royal Delight Matrimony free to use?",
        a: "Basic registration is free. However, to view contact details and send interest messages, you’ll need a premium plan.",
      },
      {
        q: "What payment options are available?",
        a: "We support UPI, credit/debit cards, and net banking. Payments are secured and processed instantly.",
      },
      {
        q: "If I pay, can I access all profiles?",
        a: "Yes, premium members get unlimited access to verified profiles and full contact details.",
      },
      {
        q: "Will my subscription auto-renew?",
        a: "No, subscriptions do not auto-renew. You can renew manually when your plan expires.",
      },
      {
        q: "Can I get a refund if I cancel early?",
        a: "Refunds are not provided once a premium plan is activated, as full access is granted instantly.",
      },
    ],
  },
  {
    title: "Profile & Account",
    faqs: [
      {
        q: "Can I delete my profile anytime?",
        a: "Yes. You can delete your account from the 'Settings' page under the 'Account' section.",
      },
      {
        q: "Can I upload more than one photo?",
        a: "Of course! You can upload multiple pictures, but we recommend clear and formal photos for better visibility.",
      },
      {
        q: "How can I ensure my profile gets more visibility?",
        a: "Complete your profile 100%, add a profile photo, and be active. Verified and complete profiles are shown first.",
      },
      {
        q: "How can I change my password?",
        a: "Go to Settings → Security → Change Password. Enter your current and new passwords to update.",
      },
      {
        q: "Can I recover my account if I forget my password?",
        a: "Yes, click on ‘Forgot Password’ on the login page and follow the email verification steps.",
      },
    ],
  },
  {
    title: "Support & Help",
    faqs: [
      {
        q: "How do I contact customer support?",
        a: "You can email us at support@royaldelightmatrimony.com or use the Live Chat on the Contact page.",
      },
      {
        q: "What are your support hours?",
        a: "Our support team is available 9:00 AM – 9:00 PM, Monday to Sunday.",
      },
      {
        q: "Can I report fake or inappropriate profiles?",
        a: "Yes. Use the ‘Report Profile’ option on any user’s profile page. Our team will review and take action.",
      },
    ],
  },
];

export default function FaqPage() {
  const [activeCategory, setActiveCategory] = useState("Getting Started");

  return (
    <div className="min-h-screen bg-white mt-4 sm:mt-8 overflow-x-hidden">
      {/* ===== Header Section ===== */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 py-8 sm:py-12 bg-[#f9fafb] border-b">
        <div className="max-w-xl text-center lg:text-left order-2 lg:order-1 mt-4 lg:mt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            Royal Delight FAQ
          </h1>
          <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 px-1 sm:px-0">
            If you’re new to Royal Delight or want to understand our features better,
            this guide will help you learn more about how our matrimony platform works.
          </p>
          <p className="text-gray-500 text-sm sm:text-base px-1 sm:px-0">
            Already have an account? Visit your{" "}
            <a href="#" className="text-pink-600 underline">
              Profile Dashboard
            </a>{" "}
            for detailed info.
          </p>
        </div>

        {/* Image Section */}
        <div className="order-1 lg:order-2 flex justify-center w-full lg:w-auto">
          <img
            src={faqImage}
            alt="FAQ Illustration"
            className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] object-contain animate-[fadeIn_1s_ease-in-out]"
          />
        </div>
      </section>

      {/* ===== FAQ Content Section ===== */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 sm:gap-8 py-8 sm:py-12 px-4 sm:px-6">
        {/* Sidebar */}
        <aside className="md:w-1/4 border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 pr-0 md:pr-4">
          <ul className="flex flex-col gap-3 sm:gap-4">
            {categories.map((cat) => (
              <li
                key={cat.title}
                onClick={() => setActiveCategory(cat.title)}
                className={`cursor-pointer text-sm sm:text-base font-medium transition-all ${
                  activeCategory === cat.title
                    ? "text-pink-600 border-l-4 border-pink-500 pl-2 bg-pink-50 rounded-md"
                    : "text-gray-700 hover:text-pink-500"
                }`}
              >
                {cat.title}
              </li>
            ))}
          </ul>
        </aside>

        {/* FAQ Answers */}
        <div className="md:w-3/4 bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-800">
            {activeCategory}
          </h2>
          <div className="space-y-4 sm:space-y-6">
            {categories
              .find((cat) => cat.title === activeCategory)
              ?.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-gray-100 pb-3 sm:pb-4 hover:bg-pink-50/40 transition-all rounded-md p-2 sm:p-3"
                >
                  <h3 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                    {faq.a}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
