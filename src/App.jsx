import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  ExternalLink, 
  Mail, 
  Github, 
  Linkedin, 
  ChevronRight, 
  Award, 
  BookOpen, 
  Briefcase, 
  Users, 
  Dribbble, 
  Menu, 
  X,
  Download,
  Sun,
  Moon
} from 'lucide-react';
import { content } from './data/content';

const getAssetPath = (path) => {
  if (path.startsWith('http') || path.startsWith('#')) return path;
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${cleanPath}`;
};

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Publications', href: '#publications' },
    { name: 'Projects', href: '#projects' },
    { name: 'Coursework', href: '#coursework' },
    { name: 'Extracurriculars', href: '#extracurriculars' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || mobileMenu ? 'bg-[#1a365df2] backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="container flex justify-between items-center">
        <a href="#" className="font-serif text-2xl font-bold text-white tracking-tight">
          {content.name.split(' ')[0]}<span className="text-accent">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium hover:text-accent transition-colors text-indigo-100"
            >
              {link.name}
            </a>
          ))}
          
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full hover:bg-white/10 text-indigo-100 hover:text-accent transition-colors border-0 cursor-pointer"
            aria-label="Toggle Theme"
            style={{ background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <a href="#contact" className="btn btn-sm" style={{ padding: '0.5rem 1.2rem', fontSize: '0.875rem' }}>
            Contact
          </a>
        </div>

        {/* Mobile Toggle & Theme Switcher */}
        <div className="flex items-center gap-2 md:hidden">
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-full text-primary border-0 cursor-pointer"
            aria-label="Toggle Theme"
            style={{ background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button className="text-primary border-0" style={{ background: 'transparent' }} onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#152a4a] border-b border-white/10"
          >
            <div className="container py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-lg font-medium text-white"
                  onClick={() => setMobileMenu(false)}
                >
                  {link.name}
                </a>
              ))}
              <a href="#contact" className="btn" onClick={() => setMobileMenu(false)}>Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeader = ({ title, subtitle }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="title-lg text-white"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-20 h-1 bg-accent mt-4"></div>
  </div>
);

const App = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });

  useEffect(() => {
    if (theme === 'blue') {
      document.documentElement.classList.add('theme-blue');
    } else {
      document.documentElement.classList.remove('theme-blue');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'blue' : 'light');
  };

  return (
    <div className="min-h-screen">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-20 bg-bg-main">
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">Welcome to my portfolio</span>
            <h1 className="title-xl text-white">{content.name}</h1>
            <p className="text-lg mb-8 leading-relaxed text-indigo-100">
              {content.role}. Passionate about industrial engineering, human-centered design, and creating measurable community impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="btn">View Projects</a>
              <a href="#contact" className="btn btn-outline">Get in Touch</a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-primary/10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white/10">
              <img 
                src={getAssetPath("/assets/images/Profile_actual.jpeg")} 
                alt={content.name}
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-2xl hidden lg:block border border-white/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center text-accent">
                  <Award size={24} />
                </div>
                <div>
                  <p className="text-sm text-indigo-200">Quality Engineering</p>
                  <p className="font-bold text-white">Intern at FluidPowerAI</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-bg-alt">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
            <div className="md:col-span-7">
              <SectionHeader title={content.about.title} />
              <div className="space-y-8 text-lg text-indigo-100">
                <p className="text-white font-medium text-xl leading-relaxed">
                  {content.about.description}
                </p>
                {content.about.details.map((detail, i) => (
                  <p key={i} className="leading-loose">{detail}</p>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-5 pt-12 md:pt-24">
              <div className="grid grid-cols-1 gap-6">
                {[
                  { label: 'Industrial Engineering', icon: <Briefcase size={20} />, delay: 0.1, link: '#projects' },
                  { label: 'Systems Thinking', icon: <BookOpen size={20} />, delay: 0.2, link: '#coursework' },
                  { label: 'STEM Outreach', icon: <Users size={20} />, delay: 0.3, link: '#publications' },
                  { label: 'Leadership', icon: <Award size={20} />, delay: 0.4, link: '#extracurriculars' }
                ].map((item, i) => (
                  <motion.a 
                    key={i}
                    href={item.link}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: item.delay }}
                    whileHover={{ scale: 1.02 }}
                    className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center gap-6 hover:border-accent hover:shadow-2xl transition-all cursor-pointer group no-underline"
                  >
                    <div className="w-14 h-14 bg-bg-main rounded-xl shadow-inner flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-500">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white text-lg transition-colors group-hover:text-accent">{item.label}</h4>
                      <p className="text-xs text-indigo-200 uppercase tracking-widest mt-1">Core Competency</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="bg-bg-main">
        <div className="container">
          <SectionHeader title="Publications & Papers" subtitle="Educational outreach materials and research investigating STEM accessibility." />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {content.publications.map((pub, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent mb-2 block">{pub.type}</span>
                  <h3 className="title-md text-white">{pub.title}</h3>
                  <p className="text-indigo-100 mb-6">{pub.description}</p>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {pub.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                  </div>
                </div>
                <div className="flex gap-4">
                  {pub.pdf && pub.pdf !== '#' ? (
                    <a href={getAssetPath(pub.pdf)} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline flex items-center gap-2">
                      <FileText size={16} /> View PDF
                    </a>
                  ) : pub.link ? (
                    <a href={pub.link} target="_blank" rel="noopener noreferrer" className="btn btn-sm flex items-center gap-2">
                      <ExternalLink size={16} /> View Publication
                    </a>
                  ) : (
                    <button className="btn btn-sm btn-outline flex items-center gap-2 opacity-50 cursor-not-allowed" style={{ pointerEvents: 'none' }} disabled>
                      <FileText size={16} /> PDF Coming Soon
                    </button>
                  )}
                  {pub.title.includes("Maya") && pub.pdf && pub.pdf !== '#' && (
                    <a href={getAssetPath(pub.pdf)} download className="btn btn-sm flex items-center gap-2">
                      <Download size={16} /> Download
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="bg-bg-alt">
        <div className="container">
          <SectionHeader title="Key Projects" />
          <div className="space-y-24">
            {content.projects.map((project, i) => (
              <div key={i} className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                <div className="flex-1">
                  <div className="relative group">
                    <img src={getAssetPath(project.image)} alt={project.title} className="rounded-2xl shadow-2xl w-full aspect-video object-cover" />
                  </div>
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <span className="text-accent font-semibold">{project.company} | {project.period}</span>
                    <h3 className="title-lg text-white mt-2">{project.title}</h3>
                  </div>
                  <p className="text-lg text-indigo-100">{project.description}</p>
                  <ul className="space-y-3">
                    {project.points.map((point, j) => (
                      <li key={j} className="flex gap-3 text-indigo-200">
                        <ChevronRight className="shrink-0 text-accent" size={20} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  {project.email && (
                    <div className="pt-2">
                      <a href={project.email} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline flex items-center gap-2 inline-flex">
                        <ExternalLink size={16} /> Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coursework */}
      <section id="coursework" className="bg-bg-main">
        <div className="container">
          <SectionHeader title="Academic Coursework" subtitle="Rigorous curriculum with a focus on engineering, advanced mathematics, and social sciences." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h4 className="font-serif text-xl text-white mb-6 border-b border-accent/20 pb-2">Advanced Placement</h4>
              <ul className="space-y-4">
                {content.coursework.ap.map((course, i) => (
                   <li key={i}>
                      <p className="font-bold text-sm text-indigo-50">{course.name}</p>
                      <p className="text-xs text-indigo-200">{course.description}</p>
                   </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h4 className="font-serif text-xl text-white mb-6 border-b border-accent/20 pb-2">Honors Courses</h4>
              <ul className="space-y-3">
                {content.coursework.honors.map((course, i) => (
                   <li key={i} className="text-sm flex items-center gap-2 text-indigo-100">
                     <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                     {course}
                   </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10">
              <h4 className="font-serif text-xl text-white mb-6 border-b border-accent/20 pb-2">College & UCSD</h4>
              <ul className="space-y-3">
                {content.coursework.college.map((course, i) => (
                   <li key={i} className="text-sm flex items-center gap-2 text-indigo-100">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-300"></div>
                     {course}
                   </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Extracurriculars */}
      <section id="extracurriculars" className="bg-bg-alt">
        <div className="container">
          <SectionHeader title="Extracurricular Activities" subtitle="Leadership and skill development through sports, arts, and community service." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.extracurriculars.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-bg-main rounded-2xl overflow-hidden border border-white/10 group shadow-lg"
              >
                <div className="h-48 overflow-hidden relative">
                  <img src={getAssetPath(item.image)} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="text-accent text-xs font-bold uppercase tracking-wider">{item.role}</span>
                  <h3 className="title-md text-white mt-1 mb-3">{item.title}</h3>
                  <p className="text-sm text-indigo-100 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="contact" className="bg-bg-main text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="container">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="title-lg text-white mb-6">Skills & Competencies</h2>
              <p className="text-indigo-100 text-lg mb-8">
                A combination of technical proficiency in quality engineering and strong leadership capabilities developed through diverse experiences.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {content.skills.map((skillGroup, i) => (
                  <div key={i}>
                    <h4 className="text-accent font-bold uppercase tracking-widest text-xs mb-4">{skillGroup.category}</h4>
                    <ul className="space-y-2">
                      {skillGroup.items.map(skill => (
                        <li key={skill} className="flex items-center gap-2 text-indigo-50">
                          <ChevronRight size={14} className="text-accent" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full max-w-md bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
               <div className="text-center">
                  <h3 className="title-md text-white mb-2">Ready to collaborate?</h3>
                  <p className="text-indigo-100 mb-8">I'm always open to discussing engineering projects or outreach opportunities.</p>
                  <a href={`mailto:${content.contact.email}`} className="btn w-full justify-center">
                    <Mail size={18} /> Send an Email
                  </a>
                  <div className="flex justify-center gap-6 mt-8">
                    <a href={content.contact.github} className="text-indigo-100 hover:text-white transition-colors"><Github /></a>
                    <a href={content.contact.linkedin} className="text-indigo-100 hover:text-white transition-colors"><Linkedin /></a>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-main py-12 border-t border-white/10">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-indigo-200 text-sm">
            © {new Date().getFullYear()} {content.name}. Built with React & Vite.
          </p>
          <div className="flex gap-8">
            <a href="#about" className="text-sm font-medium text-indigo-100 hover:text-accent">About</a>
            <a href="#projects" className="text-sm font-medium text-indigo-100 hover:text-accent">Projects</a>
            <a href="#contact" className="text-sm font-medium text-indigo-100 hover:text-accent">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
