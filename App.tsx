// Skills array moved from constants.tsx
const SKILLS = [
  {
    name: "Python",
    icon: <img src="/images/python.png" alt="Python" style={{ width: 64, height: 64 }} />,
    category: "Language",
    level: 97
  },
  {
    name: "PostgreSQL",
    icon: <img src="/images/postgresql.png" alt="PostgreSQL" style={{ width: 64, height: 64 }} />,
    category: "Backend",
    level: 80
  },
  {
    name: "FastAPI",
    icon: <img src="/images/fastapi.png" alt="FastAPI" style={{ width: 64, height: 64 }} />,
    category: "Backend",
    level: 95
  },
  {
    name: "GitHub",
    icon: <img src="/images/github.png" alt="GitHub" style={{ width: 64, height: 64 }} />,
    category: "Cloud",
    level: 90
  },
  {
    name: "Gemini",
    icon: <img src="/images/gemini.png" alt="Gemini" style={{ width: 64, height: 64 }} />,
    category: "AI/ML",
    level: 80
  },
  {
    name: "SQL",
    icon: <img src="/images/mysql.png" alt="MySQL" style={{ width: 64, height: 64 }} />,
    category: "Backend",
    level: 80
  },
  {
    name: "MongoDB",
    icon: <img src="/images/mongodb.png" alt="MongoDB" style={{ width: 64, height: 64 }} />,
    category: "Backend",
    level: 82
  },
  {
    name: "HuggingFace",
    icon: <img src="/images/huggingface.png" alt="Hugging Face" style={{ width: 64, height: 60 }} />,
    category: "AI/ML",
    level: 78
  },
  {
    name: "React",
    icon: <img src="/images/react.png" alt="React" style={{ width: 64, height: 64 }} />,
    category: "Frontend",
    level: 95
  }
];

import React, { useState, useEffect, useRef } from 'react';
import ProfileCard from './ProfileCard';
import emailjs from 'emailjs-com';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Terminal, 
  Cpu, 
  Layers, 
  Trophy, 
  Award, 
  ChevronRight, 
  Send, 
  User, 
  Sparkles,
  Menu,
  X,
  Code
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
// import removed: constants.tsx no longer exists, all data is now in App.tsx

// --- Utility Components ---

// Fixed SectionHeading prop types by making children optional to resolve TS errors when passing children via JSX content
const SectionHeading = ({ children, subtitle }: { children?: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-bold font-heading mb-4 text-gradient"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-slate-400 max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#internship-experience' },
      { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 glass border-b' : 'py-6 bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold font-heading tracking-tighter"
          >
            VGA<span className="text-blue-500">.</span>
          </motion.div>
          <img src="/images/vivek.png" alt="Profile" className="w-8 h-8 rounded-full object-cover border-2 border-blue-500" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const [activeTitle, setActiveTitle] = useState(0);
  const titles = ["AI Engineer", "Full Stack Developer", "GenAI Builder", "Hackathon Winner"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTitle((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-mesh">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-12">
          {/* Left: Name, titles, etc. */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold font-heading mb-6 tracking-tight">
                VIVEK GOUD ADULA
              </h1>
              <div className="h-12 md:h-16 mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTitle}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-3xl md:text-5xl font-light text-slate-300"
                  >
                    {titles[activeTitle]}
                  </motion.div>
                </AnimatePresence>
              </div>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl md:mx-0 mx-auto mb-10 leading-relaxed">
                I build intelligent systems that solve real-world problems. Specialized in merging modern web technologies with cutting-edge Artificial Intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#work" className="px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all transform hover:scale-105">
                  View My Work
                </a>
                <button className="px-8 py-4 glass text-white font-bold rounded-xl hover:bg-white/10 transition-all transform hover:scale-105 flex items-center gap-2 justify-center">
                  Download Resume
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16 flex justify-center md:justify-start gap-8"
            >
              <a href="https://github.com/VivekGoudAdula" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Github size={24} /></a>
              <a href="https://www.linkedin.com/in/vivekgoudadula/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={24} /></a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors"><Terminal size={24} /></a>
            </motion.div>
          </div>
          {/* Right: ProfileCard */}
          <div className="flex-1 flex justify-center md:justify-end w-full">
            <ProfileCard showUserInfo enableMobileTilt />
          </div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const stats = [
    { label: "Hackathons Won", value: "5+" },
    { label: "Projects Built", value: "20+" },
    { label: "Tech Stacks", value: "10+" },
    { label: "CGPA", value: "9.5" }
  ];

  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-opacity" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative glass rounded-3xl p-2 w-full max-w-[650px] h-auto bg-black flex items-center justify-center"
          >
            <img src="/images/story.png" alt="Vivek Goud Adula" className="rounded-2xl object-contain w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 bg-black" />
          </motion.div>
        </div>

        <div>
          <SectionHeading>The Story</SectionHeading>
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed text-justify">
            <p>
              My journey into tech started with simple curiosity wanting to understand how things work behind the screen. That curiosity turned into <span className="underline decoration-blue-500 underline-offset-4">building projects</span>, learning by doing, and solving real problems.
            </p>
            <p>
              I enjoy fast-paced environments like hackathons because they push you to think clearly, adapt quickly, and actually ship. They’ve taught me that <span className="underline decoration-blue-500 underline-offset-4">execution</span> matters just as much as ideas.
            </p>
            <p>
              I’ve worked with a range of tools and technologies not an expert in all, but I know how to use them effectively and <span className="underline decoration-blue-500 underline-offset-4">pick up new ones</span> when needed.
            </p>
            <p>
              Whether it’s backend, frontend, or system design, my focus is on <span className="underline decoration-blue-500 underline-offset-4">building reliable</span>, scalable solutions with good user experience, including <span className="underline decoration-blue-500 underline-offset-4">AI-driven automation</span> and intelligent workflows.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold font-heading text-white mb-1">{stat.value}</div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillsSection = () => {
  // Auto-scrolling skill belt
  // True seamless loop: duplicate DOM, not just array
  return (
    <section id="skills" className="py-24 bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Crafting solutions with a modern toolbelt.">Tools & Technologies</SectionHeading>
        <div className="relative w-full overflow-hidden">
          <div
            className="flex gap-12 animate-skill-belt items-center"
            style={{
              minWidth: `calc(${SKILLS.length * 2} * 120px)`,
              animation: 'skill-belt-scroll 20s linear infinite',
              height: '140px',
            }}
          >
            {/* Seamless loop: duplicate DOM, not just array */}
            {SKILLS.map((skill, idx) => (
              <motion.div
                key={skill.name + idx + 'a'}
                whileHover={{ scale: 1.18 }}
                className="flex flex-col items-center justify-center"
                style={{ minWidth: 120 }}
              >
                {typeof skill.icon === 'string' && skill.icon.startsWith('/images/') ? (
                  <img src={skill.icon} alt={skill.name + ' logo'} className="h-20 w-20 object-contain" />
                ) : (
                  <span className="text-6xl">{skill.icon}</span>
                )}
                <span className="font-semibold text-slate-100 mt-2 text-lg">{skill.name}</span>
              </motion.div>
            ))}
            {SKILLS.map((skill, idx) => (
              <motion.div
                key={skill.name + idx + 'b'}
                whileHover={{ scale: 1.18 }}
                className="flex flex-col items-center justify-center"
                style={{ minWidth: 120 }}
              >
                {typeof skill.icon === 'string' && skill.icon.startsWith('/images/') ? (
                  <img src={skill.icon} alt={skill.name + ' logo'} className="h-20 w-20 object-contain" />
                ) : (
                  <span className="text-6xl">{skill.icon}</span>
                )}
                <span className="font-semibold text-slate-100 mt-2 text-lg">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Add keyframes for skill-belt-scroll */}
        <style>{`
          @keyframes skill-belt-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  // Internship experiences for ExperienceSection
  const internships = [
    {
      duration: "May 2025 – August 2025",
      role: "Artificial Intelligence Intern [Hybrid]",
      company: "Viswam.AI, Swecha Foundation, IIIT-H",
      logo: "/images/viswamai.png",
      points: [
        "Developed Streamlit-based AI applications integrating Hugging Face models for interactive Q&A.",
        "Built RAG - Retrieval-Augmented Generation chatbots for generating accurate AI-powered summaries.",
        "Implemented LLM integration, tokenization, and prompt handling for domain-specific queries."
      ],
      skills: ["Python", "Streamlit", "Hugging Face", "RAG", "LLM"]
    },
    {
      duration: "May 2025 – July 2025",
      role: "Artificial Intelligence Intern [Hybrid]",
      company: "GENAI Lakes, T-HUB",
      logo: "/images/genailakes.png",
      points: [
        "Developed AI-based NEET & JEE Mock Testing Platform (Crack Orbit) using React, Node.js, and PostgreSQL.",
        "Built backend for Face Recognition Attendance System with Python (FastAPI) and PostgreSQL.",
        "Integrated Gemini API for AI-powered resume parsing in ATS module, storing structured data in PostgreSQL.",
        "Implemented Job Description matching system to connect parsed resumes with recruiter postings.",
        "Collaborated in full-stack development, API integration, and database design for live platforms."
      ],
      skills: ["React", "Node.js", "PostgreSQL", "FastAPI", "Gemini API"]
    },
    {
      duration: "June 2024 – August 2024",
      role: "AIML Research, Designing, Digital Marketing [Offline]",
      company: "Garuda3D",
      logo: "/images/garuda3d.png",
      points: [
        "Researched AI and ML for 3D print failure detection by AI.",
        "Created professional designs using Canva for Garuda 3D's products and services.",
        "Contributed to digital marketing efforts, creating content like Instagram posts, Google AdSense templates."
      ],
      skills: ["AI/ML Research", "Canva", "Digital Marketing"]
    },
    {
      duration: "May 2024",
      role: "Python development [Online]",
      company: "Cognifyz Technologies",
      logo: "/images/cognifyz.png",
      points: [
        "Crafted a Python-based automation script that reduced manual data entry time by 15 hours per week, improving data accuracy and reporting capabilities."
      ],
      skills: ["Python", "Automation"]
    }
  ];

  return (
    <section id="internship-experience" className="py-24 max-w-7xl mx-auto px-6">
      <SectionHeading subtitle="Where my skills met real-world challenges.">Internship Experience</SectionHeading>
      <div className="relative pl-8 md:pl-0">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 md:-translate-x-px" />
        <div className="space-y-24">
          {internships.map((exp, idx) => (
            <div key={exp.company + exp.duration} className={`relative flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
              <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-black md:-translate-x-2 z-10" />
              <div className="w-full md:w-5/12 ml-10 md:ml-0">
                <motion.div 
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass p-8 rounded-3xl hover:border-blue-500/30 transition-all group"
                >
                  <div className="flex items-center mb-2 justify-between">
                    <span className="text-blue-400 text-sm font-bold block">{exp.duration}</span>
                    {exp.logo && (
                      exp.company === "GENAI Lakes, T-HUB" ? (
                        <img src={exp.logo} alt={exp.company + ' logo'} className="h-28 w-28 object-contain rounded" />
                      ) : (
                        <img src={exp.logo} alt={exp.company + ' logo'} className="h-20 w-20 object-contain rounded" />
                      )
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                  <div className="mb-6">
                    <h4 className="text-slate-400 font-medium">{exp.company}</h4>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {exp.points.map((p, i) => (
                      <li key={i} className="text-slate-400 text-sm flex gap-2">
                        <span className="text-blue-500">•</span> {p}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full text-xs font-bold text-blue-900 bg-blue-200 border border-blue-400 shadow-sm"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
              <div className="hidden md:block w-2/12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WorkSection = () => {
  // Real projects data
  const projects = [
    {
      title: "AI-Based Pre-Interview Preparation System",
      duration: "May 2025 – July 2025",
      description: [
        "Engineered a personalized interview preparation tool where users upload their resume and job description, and the system generates tailored preparation topics using GenAI models.",
        "Developed AI-generated study content and structured module-wise quizzes that guide users through role-specific interview readiness.",
        "Integrated resume parsing, JD analysis, topic generation, and quiz modules into one cohesive pipeline, enhancing the FastJob99 platform with an intelligent pre-interview preparation layer."
      ],
      tags: ["GenAI","Python", "React", "Gemini", "Resume Parsing"],
      imageUrl: "/images/jobprep.png"
    },
    {
      title: "AI-Powered Applicant Tracking System",
      duration: "May 2025 – July 2025",
      description: [
        "Built an AI-driven resume analysis pipeline that extracts key information from uploaded resumes and stores structured data in the database using FastAPI and Python.",
        "Implemented job description (JD) handling where recruiters can upload JDs, which are then processed and linked with AI-generated candidate matching results.",
        "Designed a matching module that identifies the best-fit candidates for each JD and integrated the entire solution with a Gradio-based user interface for quick testing and demos."
      ],
      tags: ["FastAPI", "Python", "Gradio", "ATS"],
      imageUrl: "/images/ats.png"
    },
    {
      title: "A holistic design and collaboration for accident rescue app",
      duration: "October 2024 – November 2024",
      description: [
        "Designed an integrated system for accident response, using real-time tracking and smartphone sensors to detect accidents and alert emergency services.",
        "Collaborated on a platform that facilitates coordination among emergency responders, optimizing response times and resource allocation for improved post-accident care."
      ],
      tags: ["Accident Response", "IoT", "Emergency"],
      imageUrl: "/images/rescue.png"
    },
    {
      title: "Energy consumption prediction using LSTM and RNN",
      duration: "October 2024 – November 2024",
      description: [
        "Developed an energy consumption prediction model using LSTM and RNN, enhancing forecasting accuracy based on historical data.",
        "Optimized data processing techniques to improve model efficiency and reliability for energy prediction."
      ],
      tags: ["LSTM", "RNN"],
      imageUrl: "/images/energy.png"
    },
    {
      title: "Student performance prediction using linear regression",
      duration: "October 2024 – November 2024",
      description: [
        "Developed a model using linear regression to predict student performance based on factors like attendance, assignments, and prior grades.",
        "Analyzed academic data to identify key predictors of student success and improved model accuracy using performance metrics like MSE and R-squared."
      ],
      tags: ["Linear Regression", "Student Success", "Analytics"],
      imageUrl: "/images/studperf.png"
    }
  ];

  return (
    <section id="projects" className="py-24 bg-black/40">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading subtitle="Proof of concept. Proof of impact.">Projects</SectionHeading>
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, idx) => (
            <motion.div 
              key={project.title + idx}
              whileHover={{ y: -10 }}
              className="group relative glass rounded-2xl overflow-hidden max-w-xl w-full mx-auto"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                />
              </div>
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-400/10 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                <span className="text-xs text-slate-400 font-semibold mb-1 block">{project.duration}</span>
                <ul className="mb-4 list-disc list-inside text-slate-400 space-y-1 text-xs">
                  {project.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 glass rounded-lg text-xs font-bold hover:bg-white/10 transition-all">
                    View Case Study
                  </button>
                  <a href="#" className="p-2 glass rounded-lg hover:bg-white/10 transition-all">
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AchievementsSection = () => {
  // Real achievements with images and optional LinkedIn links
  const achievements = [
    {
      category: "Hackathon",
      title: "Best Hack in Open Innovation",
      organization: "BuildWith by HackPrix, CodeforChange, Starknet Foundation",
      description: "Won Best Hack in Open Innovation in BuildWith organized by HackPrix, CodeforChange, Starknet Foundation.",
      imageUrl: "/images/buildwith.png",
      linkedin: "https://www.linkedin.com/posts/vivekgoudadula_hackprix-buildwith-teamnexus-activity-7398609163876204545-v2S2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE2CVP4BEwgpK4twh-XrF8L2GJUF3fycnhA"
    },
    {
      category: "Hackathon",
      title: "2nd Runner-up in DATANYX (MedTech)",
      organization: "Muffakham Jah College of Engineering and Technology, AWS, SMC",
      description: "2nd Runner-up in DATANYX for the Best Project in MedTech Domain organized by Muffakham Jah College of Engineering and Technology, AWS, SMC.",
      imageUrl: "/images/datanyx.png",
      linkedin: "https://www.linkedin.com/posts/vivekgoudadula_datanyx2025-medtech-teamnexus-activity-7403310295915470848-yhQD?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE2CVP4BEwgpK4twh-XrF8L2GJUF3fycnhA"
    },
    {
      category: "Hackathon",
      title: "1st Prize in Agentic AI Hackathon",
      organization: "AI Innovators Club, Aurora deemed University",
      description: "Won 1st Prize in Agentic AI Hackathon organized by AI Innovators Club, Aurora deemed University.",
      imageUrl: "/images/agenticai.jpg",
      linkedin: "https://www.linkedin.com/posts/vivekgoudadula_ai-artificialintelligence-edtech-activity-7361395698623254528-FfbE?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE2CVP4BEwgpK4twh-XrF8L2GJUF3fycnhA"
    },
    {
      category: "Hackathon",
      title: "1st Prize in Mini Hackathon: Code Battle",
      organization: "Game Development Club, Aurora deemed University",
      description: "Won 1st Prize in Mini Hackathon: Code Battle organized by Game Development Club, Aurora deemed University.",
      imageUrl: "/images/codebattle.png",
      linkedin: "https://www.linkedin.com/posts/vivekgoudadula_hackathon-codebattle-ai-activity-7375490337114443777-NCe5?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE2CVP4BEwgpK4twh-XrF8L2GJUF3fycnhA"
    },
    {
      category: "Leadership",
      title: "Best Club – CodeVerse Club",
      organization: "CodeVerse Club, Aurora deemed University",
      description: "Recognized for consistent contributions, technical excellence, and leadership within the club.",
      imageUrl: "/images/codeverse.png",
      linkedin: "https://www.linkedin.com/posts/vivekgoudadula_auroradeemeduniversity-buildathon2025-avishkruthi2025-activity-7392738886868844544-CU4A?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE2CVP4BEwgpK4twh-XrF8L2GJUF3fycnhA"
    },
    {
      category: "Academic",
      title: "Certificate of Academic Excellence",
      organization: "Aurora deemed University",
      description: "Secured 1st rank in the Freshman year of B. Tech Computer Science and Engineering (AIML) Program for the Academic year 2023-2024.",
      imageUrl: "/images/academic.png",
      linkedin: "https://www.linkedin.com/posts/vivekgoudadula_academicexcellence-btech-aiml-activity-7261613756034568192-09qG?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE2CVP4BEwgpK4twh-XrF8L2GJUF3fycnhA"
    },
    {
      category: "Certification",
      title: "Generative AI Certification",
      organization: "Quality Thought Info Systems",
      description: "One of 23 students to clear the GenAI assessment out of 124. Completed a 40-hour hands-on workshop in LLMs, RAG, LangChain, and GenAI app development.",
      imageUrl: "/images/genaiworkshop.png",
      linkedin: "https://www.linkedin.com/posts/vivekgoudadula_generativeai-ai-langchain-activity-7402735476144701440-aah7?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE2CVP4BEwgpK4twh-XrF8L2GJUF3fycnhA"
    },
    {
      category: "Publication",
      title: "ICASEM 2024 Paper Publication",
      organization: "Advances in Science and technology",
      description: "Published a paper titled 'Unlocking the Power of Matrix Multiplication in Image Processing'.",
      imageUrl: "/images/icasem.png",
      linkedin: "https://drive.google.com/file/d/1rqyiSfwQNNFzbptSpU4u0AqCpxhfujoK/view"
    }
  ];

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <SectionHeading subtitle="Recognition for excellence in building and leading.">Hall of Fame</SectionHeading>
      {/* Auto-scrolling horizontally, duplicate achievements for seamless loop */}
      <div className="relative w-full overflow-hidden pb-2">
        <div
          className="flex space-x-8 min-w-max animate-hall-of-fame group"
          style={{
            animation: 'hall-of-fame-scroll 60s linear infinite',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'paused';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.animationPlayState = 'running';
          }}
        >
          {[...achievements, ...achievements].map((ach, idx) => (
            <div
              key={ach.title + idx}
              className="relative min-w-[400px] max-w-[440px] h-[420px] rounded-2xl shadow-md overflow-hidden border border-yellow-500/20 bg-white/5"
            >
              <img src={ach.imageUrl} alt={ach.title} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                <div className="flex items-center gap-2 mb-2">
                  {ach.category === 'Hackathon' && <Trophy size={24} className="text-yellow-400" />}
                  {ach.category === 'Academic' && <Award size={24} className="text-yellow-400" />}
                  {ach.category === 'Publication' && <Layers size={24} className="text-yellow-400" />}
                  {ach.category === 'Leadership' && <Cpu size={24} className="text-yellow-400" />}
                  {ach.category === 'Certification' && <Award size={24} className="text-yellow-400" />}
                  <span className="text-sm text-white font-bold drop-shadow">{ach.title}</span>
                </div>
                <p className="text-xs text-slate-200 mb-1 leading-tight drop-shadow">{ach.organization}</p>
                <p className="text-xs text-slate-300 leading-tight drop-shadow">{ach.description}</p>
                {ach.linkedin && (
                  <a href={ach.linkedin} target="_blank" rel="noopener noreferrer" className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700 transition-colors">
                    {ach.linkedin.includes('linkedin.com') ? <Linkedin size={18} /> : <Code size={18} />}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes hall-of-fame-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  );
};

const ContactSection = () => {

  const [formState, setFormState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  // Use environment variables for EmailJS credentials
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_USER_ID = import.meta.env.VITE_EMAILJS_USER_ID;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      },
      EMAILJS_USER_ID
    )
      .then(() => {
        setFormState('sent');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setFormState('error');
      });
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-black/40">
      <div className="max-w-7xl mx-auto px-2 sm:px-6">
        <div className="glass p-4 sm:p-8 md:p-20 rounded-3xl sm:rounded-[3rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-600/10 to-transparent pointer-events-none" />
          <div className="flex flex-col gap-10 md:grid md:grid-cols-2 md:gap-16 relative z-10">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading mb-4 sm:mb-6 tracking-tighter">Let's build something <span className="text-blue-500 italic">impactful</span>.</h2>
              <p className="text-slate-400 text-base sm:text-lg mb-8 sm:mb-12">
                Have a project in mind? Or just want to say hi? I'm always open to discussing new opportunities and bold ideas.
              </p>
              <div className="space-y-4 sm:space-y-6">
                <a href="mailto:adulavivekgoud@gmail.com" className="flex items-center gap-3 sm:gap-4 text-slate-300 hover:text-white transition-colors group">
                  <div className="p-2 sm:p-3 glass rounded-full group-hover:bg-blue-500/20 transition-all"><Mail size={20} /></div>
                  <span className="truncate">adulavivekgoud@gmail.com</span>
                </a>
                <a href="https://www.linkedin.com/in/vivekgoudadula/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 text-slate-300 hover:text-white transition-colors group">
                  <div className="p-2 sm:p-3 glass rounded-full group-hover:bg-blue-500/20 transition-all"><Linkedin size={20} /></div>
                  <span className="truncate">linkedin.com/in/vivekgoudadula</span>
                </a>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-3 sm:gap-4">
                <input
                  required
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 glass rounded-2xl outline-none focus:border-blue-500/50 transition-all"
                />
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 sm:px-6 py-3 sm:py-4 glass rounded-2xl outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 glass rounded-2xl outline-none focus:border-blue-500/50 transition-all resize-none"
              />
              <button
                type="submit"
                disabled={formState === 'sending'}
                className="w-full py-3 sm:py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-all active:scale-95 disabled:opacity-50"
              >
                {formState === 'idle' && <>Send Message <ChevronRight size={18} /></>}
                {formState === 'sending' && "Processing..."}
                {formState === 'sent' && "Message Sent! ✨"}
                {formState === 'error' && "Failed to send. Try again."}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- AI Chat Feature ---

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: "Hi! I'm Vivek's AI assistant. Ask me anything about his skills or projects!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      // Mock portfolio context for AI
      const context = `
        Candidate: Vivek Goud Adula
        Role: AI & Full-Stack Developer
        Projects: ${PROJECTS.map(p => p.title).join(', ')}
        Skills: ${SKILLS.map(s => s.name).join(', ')}
        Experience: ${EXPERIENCES.map(e => e.company).join(', ')}
      `;

      // Initialize Gemini API client with apiKey from process.env
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // Call generateContent with model name and prompt as per SDK guidelines
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are an assistant for Vivek Goud Adula. 
        Context: ${context}.
        User asked: ${userMsg}.
        Provide a concise, professional answer (under 50 words).`,
      });

      // Directly access .text property from response as per latest SDK guidelines
      setMessages(prev => [...prev, { role: 'bot', text: response.text || "Sorry, I'm having trouble thinking right now." }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: "I'm offline for a moment, but Vivek is usually very responsive!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 md:w-96 glass rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col h-[450px]"
          >
            <div className="p-4 bg-white/5 border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <Sparkles size={16} />
                </div>
                <div>
                  <div className="text-xs font-bold">Ask My Portfolio</div>
                  <div className="text-[10px] text-green-400">Online</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white"><X size={18} /></button>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${m.role === 'user' ? 'bg-blue-600 text-white' : 'glass'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="glass px-4 py-2 rounded-2xl text-sm animate-pulse">Thinking...</div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white/5 border-t border-white/10 flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="What is Vivek's tech stack?"
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm outline-none focus:border-blue-500/50"
              />
              <button onClick={handleSend} className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition-colors">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all"
      >
        {isOpen ? <Code /> : <Sparkles />}
      </motion.button>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen relative selection:bg-blue-500/30">
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-[70] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main>
        <Hero />
        <About />
        <SkillsSection />
        <ExperienceSection />
        <WorkSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      <footer className="py-12 border-t border-white/5 bg-black">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold font-heading">VGA<span className="text-blue-500">.</span></div>
          <div className="text-slate-500 text-sm">© 2024 Vivek Goud Adula. Built with React & GenAI.</div>
          <div className="flex gap-6">
            <a href="https://github.com/VivekGoudAdula" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="https://www.linkedin.com/in/vivekgoudadula/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="mailto:adulavivekgoud@gmail.com" className="text-slate-400 hover:text-white transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </footer>

      <AIChat />
    </div>
  );
}
