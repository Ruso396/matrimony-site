import React from 'react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: 1,
      title: 'Register',
      description: 'Begin by creating an account on our platform. Fill in your basic information and preferences to get started on your journey.',
      time: 'TIMING: 2-5 PM',
      color: 'from-teal-500 to-teal-600'
    },
    {
      step: 2,
      title: 'Find Your Match',
      description: 'Use our smart algorithm to discover compatible matches. Browse profiles that align with your preferences and interests.',
      time: 'TIMING: 5-7 PM',
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      step: 3,
      title: 'Send Interest',
      description: 'Express interest in profiles you like and start meaningful conversations to get to know each other better.',
      time: 'TIMING: 7-8 PM',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      step: 4,
      title: 'Get Profile Information',
      description: 'Exchange detailed information about background, family, and future plans to understand compatibility.',
      time: 'TIMING: 7-8 PM',
      color: 'from-blue-500 to-blue-600'
    },
    {
      step: 5,
      title: 'Start Meetups',
      description: 'Plan face-to-face meetings in a safe environment to deepen your connection and understand each other better.',
      time: 'TIMING: 2-5 PM',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      step: 6,
      title: 'Getting Marriage',
      description: 'Take your relationship to the next level. Our platform provides resources and guidance for your wedding journey.',
      time: 'TIMING: 2-5 PM',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Finding your perfect match is easier than ever. Follow these simple steps to begin your journey to lifelong happiness.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-300 via-cyan-300 to-pink-300 transform -translate-x-1/2"></div>

          <div className="space-y-16">
            {steps.map((item, index) => (
              <div key={index} className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                {/* Content Card */}
                <div className="flex-1" style={{textAlign: index % 2 === 1 ? 'left' : 'right'}}>
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 border border-gray-100">
                    <div className="inline-block bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 text-sm font-semibold px-4 py-1 rounded-full mb-3">
                      {item.time}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                {/* Step Circle */}
                <div className="relative z-10 flex-shrink-0">
                  <div className={`w-20 h-20 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg hover:scale-125 transition-all duration-500 border-4 border-white`}>
                    {item.step}
                  </div>
                  {/* Decorative circles */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full animate-ping opacity-20`}></div>
                </div>

                {/* Spacer for desktop */}
                <div className="flex-1 hidden md:block"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
