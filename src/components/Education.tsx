import React from "react";

export default function Education() {
  const education = [
    {
      degree: "Bachelor of Science in Software Engineering",
      institution: "National School of Business Management",
      period: "2023 - 2024",
      description:
        "Focused on software development, data structures, algorithms, and system design.",
    },
    {
      degree: "Microcontroller and Robotics | Arduino",
      institution: "Ceylon German Technical Training Institute (CGTTI)",
      period: "Nov 2022 - Apr 2023",
      description:
        "Skilled in Arduino programming, sensor interfacing, motor control, and building autonomous and remote-controlled robotic systems through practical, project-based learning.",
    },
    {
      degree: "Bachelor of Information Technology",
      institution: "University of Colombo School of Computing",
      period: "2022 - 2023",
      description:
        "Focused on software development, data structures, algorithms, and system design.",
    },
    {
      degree: "G.C.E. Advanced Level",
      institution: "Physical Science Stream",
      period: "2019",
      description:
        "Combined Mathematics, Physics & Chemistry with grades S, S, C",
    },
  ];

  return (
    <section className="py-20 px-8 section-gradient" id="education">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 mt-8">
          <span className="gradient-text">Education</span>
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-pink-500 to-purple-600"></div>

          <div className="space-y-12">
            {education.map((edu, index) => (
              <div
                key={index}
                className={`relative flex ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-purple-500 rounded-full -ml-2 ring-4 ring-purple-900"></div>

                <div
                  className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"} pl-20 md:pl-0`}
                >
                  <div className="glass-card p-6 hover:bg-white/10 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 cursor-default">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {edu.degree}
                    </h3>
                    <p className="text-purple-400 mb-2">{edu.institution}</p>
                    <p className="text-sm text-gray-400 mb-4">{edu.period}</p>
                    <p className="text-gray-300">{edu.description}</p>
                  </div>
                </div>

                <div className="hidden md:block w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
