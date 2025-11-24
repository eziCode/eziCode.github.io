import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Github, Linkedin, Download, Briefcase, Code, MessageSquare } from "lucide-react";
import { useState, useEffect } from "react";
import ContactForm from "@/components/contact_form";

const projects = [
  {
    title: "YouTube Creator Assistant",
    period: "Nov 2025 - Nov 2025",
    bullets: [
      "Built a full-stack platform that streamlines a creator's entire workflow, from tracking analytics and managing comments to generating Shorts, scripts, and thumbnails with AI",
      "Integrated Google and OpenAI APIs into a React + Express + MongoDB stack to automate video editing, content ideation, and audience engagement—all from one unified dashboard",
      "Features include analytics tracking, AI-powered comment responses, automated video trimming with ffmpeg, and thumbnail generation using Hugging Face models",
    ],
    technologies: ["React.js", "MongoDB", "Google Cloud Platform (GCP)", "Express", "OpenAI API", "ffmpeg"],
    githubLink: "https://github.com/eziCode/youtube-creator-assistant",
    demoLink: "https://www.engageaiatl.tech/",
  },
  {
    title: "Localite",
    period: "May 2025 - Aug 2025",
    bullets: [
      "Created a location-aware mobile app that personalizes event discovery using smart filtering by age, interests, and proximity",
      "Designed a scalable full-stack architecture with React Native, Expo, and Supabase (Auth, Edge Functions, Postgres) to power real-time event ranking",
      "Implemented secure group sharing, efficient pagination, profile customization with image cropping, and deep linking for authentication flows",
    ],
    technologies: ["JavaScript", "Supabase", "React Native", "Expo", "PostgreSQL"],
    githubLink: "https://github.com/eziCode/Localite",
  },
  {
    title: "John Deere Tractor Remaining Life ML Model",
    period: "Jul 2025 - Jul 2025",
    bullets: [
      "Developed a machine learning model predicting the remaining useful life for John Deere tractors using XGBoost regression",
      "Integrated the model into a custom web dashboard, equivalent to John Deere's Operations Center",
      "Created synthetic sensor data that models realistic seasonal usage patterns and weather conditions",
      "Implemented comprehensive feature engineering including lag features, rolling statistics, and exponentially weighted moving averages",
      "Achieved R² score of 0.93 and MAE of 403 hours on validation data",
    ],
    technologies: ["Python", "XGBoost", "Machine Learning", "Pandas", "Scikit-learn"],
    githubLink: "https://github.com/eziCode/John-Deere-Tractor-Remaining-Life-ML-Model",
  },
  {
    title: "Amazon Alexa Skill: Medical Tracker",
    period: "May 2024 - Aug 2024",
    bullets: [
      "Built and deployed an Alexa Skill with 5+ custom intents (log events, log medications, and retrieve by date/period)",
      "Integrated with AWS DynamoDB for persistent storage and SES for automated email delivery of medical records",
      "Enables users to log medical activities and medications via voice commands and retrieve history by specific dates or time periods",
      "Implemented secure email fetching using Alexa Profile API and robust error handling",
    ],
    technologies: ["Amazon Web Services (AWS)", "JavaScript", "DynamoDB", "SES", "Alexa Skills Kit"],
    githubLink: "https://github.com/eziCode/Medical-Activity-Tracker",
  },
  {
    title: "Wolfram Summer Research Program 2024",
    period: "Jun 2024 - Jul 2024",
    bullets: [
      "Developed a recursive backtracking algorithm to generate the largest possible grid where each cell is a letter and every row and column forms a valid English word",
      "Earned Featured Contributor recognition for a computational essay with over 6,000 views",
      "The algorithm efficiently explores the solution space using constraint satisfaction and word validation techniques to maximize grid density",
    ],
    technologies: ["Wolfram Language", "Algorithms", "Backtracking", "Computational Linguistics"],
    demoLink: "https://community.wolfram.com/groups/-/m/t/3214394",
  },
];

const experiences = [
  {
    type: "work",
    title: "Research Assistant",
    company: "PAIR Lab",
    location: "Atlanta, Georgia, United States · On-site",
    period: "Nov 2025 - Present · 1 mo",
    description: "Built a computer vision pipeline that automatically segments and clusters objects in complex scenes using SAM, DINOv2, and depth estimation.",
    technologies: ["Python", "Computer Vision", "SAM", "DINOv2"],
  },
  {
    type: "work",
    title: "Software Engineer Intern",
    company: "Cravr",
    location: "Atlanta, Georgia, United States · Hybrid",
    period: "Oct 2025 - Present · 2 mos",
    description: "Created interactive mini-games to support users during moments of binge-eating cravings, boosting the app to 10,000+ downloads and 2.5K+ paid subscribers.",
    technologies: ["Swift"],
  },
  {
    type: "work",
    title: "Data Analyst Intern",
    company: "PowerWorld Corporation",
    location: "Champaign, Illinois, United States · On-site",
    period: "May 2024 - Aug 2025 · 1 yr 4 mos",
    description: "Designed and built a scalable SQL database to store power system data for major electric utilities; migrated ~100M records using Python and integrated a Natural Language to SQL interface to enable intuitive querying. Revamped technical documentation by adding command examples, significantly improving usability, and reducing onboarding time for new users.",
    technologies: ["Python", "C++", "SQL"],
  },
  {
    type: "work",
    title: "Lead Programmer",
    company: "FRC Team 4096",
    location: "Champaign, Illinois, United States · On-site",
    period: "Dec 2023 - May 2025 · 1 yr 6 mos",
    description: "Led a team of 3 coders in programming and operating competitive robots, while overhauling onboarding documentation to streamline training for new students. Mentored younger students in Python programming, guiding both robotics projects and individual coding initiatives. Operated robot in high-pressure competitions, leading team to record performances during international competition.",
    technologies: ["Python"],
  },
  {
    type: "work",
    title: "Soccer Referee",
    company: "U.S. Soccer Federation",
    location: "Champaign, Illinois, United States",
    period: "Mar 2022 - Aug 2025 · 3 yrs 6 mos",
    description: "Officiated competitive adult league, Youth Soccer Midwest conference, and regional Illinois tournaments.",
    technologies: [],
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("experience");
  const [showContact, setShowContact] = useState(false);
  const [tabContentKey, setTabContentKey] = useState(0);

  useEffect(() => {
    if (showContact) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showContact]);

  const handleTabChange = (tab) => {
    setTabContentKey(prev => prev + 1);
    setActiveTab(tab);
  };

  const tabs = [
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Code },
    { id: "contact", label: "Contact Me", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen w-full bg-dark-bg text-white flex flex-col relative overflow-hidden">
      {/* Animated background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-3xl animate-glow-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-purple/5 rounded-full blur-3xl animate-glow-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/3 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Header with name and resume button */}
      <header className="relative z-10 pt-8 pb-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-blue bg-clip-text text-transparent animate-gradient-x">
              Ezra Akresh
            </h1>
            <p className="text-gray-400 text-lg">Software Developer • Designer • Problem Solver</p>
            <p className="text-gray-500 text-sm mt-1">Georgia Institute of Technology</p>
          </div>
          <a href="/ezra_akresh_resume.pdf" download>
            <Button
              className="bg-dark-elevated border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-glow-cyan-sm transition-optimized px-6 py-2"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </a>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`
                    relative px-6 py-4 font-medium text-sm transition-all duration-300
                    flex items-center gap-2 rounded-t-lg
                    ${isActive 
                      ? "text-neon-cyan bg-dark-surface/30 backdrop-blur-sm border-t border-x border-neon-cyan/20" 
                      : "text-gray-500 hover:text-gray-300 hover:bg-dark-surface/10"
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-purple"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <main className="flex-1 relative z-10 max-w-7xl mx-auto w-full px-4 py-8">
        {/* Experience Tab */}
        {activeTab === "experience" && (
          <div key={`experience-${tabContentKey}`} className="animate-fade-in-up">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                Experience
              </h2>
              <p className="text-gray-400">My professional journey and education</p>
            </div>

            <div className="space-y-6">
              {experiences.map((exp, idx) => (
                <Card
                  key={idx}
                  className="glass-strong border-gray-800/50 hover:border-neon-cyan/30 transition-optimized group"
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">{exp.title}</h3>
                        <p className="text-neon-cyan font-medium">{exp.company}</p>
                        <p className="text-gray-400 text-sm">{exp.location}</p>
                      </div>
                      <span className="text-gray-400 text-sm whitespace-nowrap">{exp.period}</span>
                    </div>
                    <p className="text-gray-300 mb-4 leading-relaxed">{exp.description}</p>
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIdx) => (
                          <span
                            key={techIdx}
                            className="px-3 py-1 text-xs rounded-full bg-dark-elevated border border-neon-purple/20 text-neon-purple"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div key={`projects-${tabContentKey}`} className="animate-fade-in-up">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <p className="text-gray-400">A collection of my work and contributions</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {projects.map((project, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <Card
                    key={idx}
                    className={`glass-strong border-gray-800/50 transition-optimized group overflow-hidden ${
                      isEven 
                        ? "hover:border-neon-cyan/50 hover:shadow-glow-cyan-sm" 
                        : "hover:border-neon-purple/50 hover:shadow-glow-purple-sm"
                    }`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <CardContent className="p-6 flex flex-col">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                        <div>
                          <h3 className={`text-2xl font-semibold mb-2 text-white transition-colors ${
                            isEven ? "group-hover:text-neon-cyan" : "group-hover:text-neon-purple"
                          }`}>
                            {project.title}
                          </h3>
                          {project.period && (
                            <p className="text-gray-400 text-sm">{project.period}</p>
                          )}
                        </div>
                      </div>
                      {project.bullets && (
                        <ul className="space-y-2 mb-6">
                          {project.bullets.map((bullet, bulletIdx) => (
                            <li key={bulletIdx} className="text-gray-300 text-base leading-relaxed flex items-start">
                              <span className={`mr-3 mt-1.5 flex-shrink-0 ${
                                isEven ? "text-neon-cyan" : "text-neon-purple"
                              }`}>▸</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, techIdx) => (
                            <span
                              key={techIdx}
                              className={`px-3 py-1 text-xs rounded-full bg-dark-elevated border ${
                                isEven 
                                  ? "border-neon-cyan/20 text-neon-cyan" 
                                  : "border-neon-purple/20 text-neon-purple"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-auto flex gap-3">
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button className="w-full bg-dark-elevated border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-glow-cyan-sm transition-optimized">
                              View on GitHub
                            </Button>
                          </a>
                        )}
                        {project.demoLink && (
                          <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1"
                          >
                            <Button className="w-full bg-dark-elevated border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple hover:shadow-glow-purple-sm transition-optimized">
                              View Demo
                            </Button>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Contact Tab */}
        {activeTab === "contact" && (
          <div key={`contact-${tabContentKey}`} className="animate-fade-in-up">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <p className="text-gray-400">Let's build something together.</p>
            </div>

            <div className="max-w-3xl mx-auto">
              {/* Contact Methods */}
              <Card className="glass-strong border-gray-800/50 mb-6">
                <CardContent className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <a
                      href="mailto:ezraakresh@gatech.edu"
                      className="group flex flex-col items-center p-6 rounded-xl bg-dark-elevated border border-gray-800/50 hover:border-neon-cyan/50 hover:shadow-glow-cyan-sm transition-optimized"
                    >
                      <div className="p-3 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 mb-4 group-hover:bg-neon-cyan/20 group-hover:border-neon-cyan/50 transition-colors">
                        <Mail className="h-6 w-6 text-neon-cyan" />
                      </div>
                      <span className="text-white font-semibold mb-2 text-lg">Email</span>
                      <span className="text-neon-cyan font-mono text-sm text-center group-hover:text-neon-cyan transition-colors bg-neon-cyan/5 px-3 py-1.5 rounded-md border border-neon-cyan/20 group-hover:border-neon-cyan/40 group-hover:bg-neon-cyan/10">
                        ezraakresh@gatech.edu
                      </span>
                    </a>
                    <a
                      href="https://github.com/eziCode"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center p-6 rounded-xl bg-dark-elevated border border-gray-800/50 hover:border-neon-purple/50 hover:shadow-glow-purple-sm transition-optimized"
                    >
                      <div className="p-3 rounded-full bg-neon-purple/10 border border-neon-purple/30 mb-4 group-hover:bg-neon-purple/20 group-hover:border-neon-purple/50 transition-colors">
                        <Github className="h-6 w-6 text-neon-purple" />
                      </div>
                      <span className="text-white font-semibold mb-2 text-lg">GitHub</span>
                      <span className="text-neon-purple font-mono text-sm text-center group-hover:text-neon-purple transition-colors bg-neon-purple/5 px-3 py-1.5 rounded-md border border-neon-purple/20 group-hover:border-neon-purple/40 group-hover:bg-neon-purple/10">
                        @eziCode
                      </span>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/ezra-akresh-638358314/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col items-center p-6 rounded-xl bg-dark-elevated border border-gray-800/50 hover:border-neon-cyan/50 hover:shadow-glow-cyan-sm transition-optimized"
                    >
                      <div className="p-3 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 mb-4 group-hover:bg-neon-cyan/20 group-hover:border-neon-cyan/50 transition-colors">
                        <Linkedin className="h-6 w-6 text-neon-cyan" />
                      </div>
                      <span className="text-white font-semibold mb-2 text-lg">LinkedIn</span>
                      <span className="text-neon-cyan font-medium text-sm text-center bg-gradient-to-r from-neon-cyan/20 to-neon-purple/20 px-3 py-1.5 rounded-md border border-neon-cyan/20 group-hover:border-neon-cyan/40 group-hover:from-neon-cyan/30 group-hover:to-neon-purple/30">
                        Connect with me
                      </span>
                    </a>
                  </div>
                  <div className="text-center">
                    <Button
                      className="bg-dark-elevated border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple hover:shadow-glow-purple-sm transition-optimized px-8 py-3"
                      onClick={() => setShowContact(true)}
                    >
                      Send a Message
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Skills Section */}
              <Card className="glass-strong border-gray-800/50">
                <CardContent className="p-8">
                  <h3 className="text-xl font-semibold mb-6 text-center bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                    Skills & Tools
                  </h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {["JavaScript", "SQL", "Kotlin", "Python", "Swift", "C++"].map((skill, index) => (
                      <span
                        key={skill}
                        className="px-4 py-2 rounded-full bg-dark-elevated border border-neon-cyan/20 text-neon-cyan text-sm font-medium hover:border-neon-cyan/50 hover:shadow-glow-cyan-sm transition-optimized"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      {/* Contact Form Modal */}
      {showContact && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up"
          onClick={() => setShowContact(false)}
        >
          <div
            className="glass-strong rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-800/50 animate-slide-in-right"
            onClick={(e) => e.stopPropagation()}
          >
            <ContactForm onClose={() => setShowContact(false)} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 text-center text-sm text-gray-500 py-6 border-t border-gray-800/50 bg-dark-surface/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          © {new Date().getFullYear()} Ezra Akresh. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
