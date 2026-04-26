import { useEffect, useState, useRef } from "react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaSun,
  FaMoon,
  FaReact,
  FaNodeJs,
  FaJava,
  FaPython,
  FaGlobe,
  FaAndroid,
  FaGraduationCap,
  FaSchool,
  FaHeart,
  FaFontAwesome,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { HiMenuAlt3 } from "react-icons/hi";
import {
  FiMail,
  FiSend,
  FiCode,
  FiLayout,
  FiServer,
  FiDownload,
  FiBriefcase,
  FiMapPin,
  FiCamera,
  FiBookOpen,
  FiHeadphones,
  FiMonitor,
  FiDatabase,
  FiSettings,
  FiTerminal,
} from "react-icons/fi";
import { TbBrandNextjs, TbBrandStripe, TbApi } from "react-icons/tb";
import {
  SiMongodb,
  SiExpress,
  SiTailwindcss,
  SiJavascript,
  SiFirebase,
  SiGit,
  SiNpm,
  SiNetlify,
  SiVercel,
  SiJsonwebtokens,
} from "react-icons/si";
import { MdDirectionsBike } from "react-icons/md";
import ProjectCard from "./components/projectCard/ProjectCard";
import { DiChrome } from "react-icons/di";

// Helper to get skill icons, descriptions, and perfectly matched theme colors
const getSkillInfo = (techName) => {
  const t = techName.toLowerCase();
  if (t.includes("react"))
    return {
      icon: FaReact,
      color: "text-[#61DAFB]",
      bg: "bg-[#61DAFB]/10",
      desc: "UI Library",
    };
  if (t.includes("next"))
    return {
      icon: TbBrandNextjs,
      color: "dark:text-black",
      bg: "dark:bg-white/10 bg-black/5",
      desc: "Framework",
    };
  if (t.includes("tailwind"))
    return {
      icon: SiTailwindcss,
      color: "text-[#06B6D4]",
      bg: "bg-[#06B6D4]/10",
      desc: "CSS Utility",
    };
  if (t.includes("javascript"))
    return {
      icon: SiJavascript,
      color: "text-[#F7DF1E]",
      bg: "bg-[#F7DF1E]/10",
      desc: "Language",
    };
  if (t.includes("node"))
    return {
      icon: FaNodeJs,
      color: "text-[#339933]",
      bg: "bg-[#339933]/10",
      desc: "JS Runtime",
    };
  if (t.includes("express"))
    return {
      icon: SiExpress,
      color: "dark:text-gray-300 text-gray-700",
      bg: "bg-gray-500/10",
      desc: "Server API",
    };
  if (t.includes("mongo"))
    return {
      icon: SiMongodb,
      color: "text-[#47A248]",
      bg: "bg-[#47A248]/10",
      desc: "NoSQL DB",
    };
  if (t.includes("firebase"))
    return {
      icon: SiFirebase,
      color: "text-[#FFCA28]",
      bg: "bg-[#FFCA28]/10",
      desc: "BaaS Platform",
    };
  if (t.includes("python"))
    return {
      icon: FaPython,
      color: "text-[#3776AB]",
      bg: "bg-[#3776AB]/10",
      desc: "Language",
    };
  if (t.includes("git"))
    return {
      icon: SiGit,
      color: "text-[#F05032]",
      bg: "bg-[#F05032]/10",
      desc: "Version Control",
    };
  if (t.includes("npm"))
    return {
      icon: SiNpm,
      color: "text-[#CB3837]",
      bg: "bg-[#CB3837]/10",
      desc: "Package Manager",
    };
  if (t.includes("vercel"))
    return {
      icon: SiVercel,
      color: "text-black",
      bg: "dark:bg-white/10 bg-black/5",
      desc: "Deployment",
    };
  if (t.includes("netlify"))
    return {
      icon: SiNetlify,
      color: "text-[#00C7B7]",
      bg: "bg-[#00C7B7]/10",
      desc: "Deployment",
    };
  if (t.includes("JSON Web Token") || t.includes("jwt"))
    return {
      icon: SiJsonwebtokens,
      color: "text-[#FF0000]",
      bg: "bg-[#FF0000]/10",
      desc: "Authentication",
    };
  if (t.includes("stripe"))
    return {
      icon: TbBrandStripe,
      color: "text-[#008CDD]",
      bg: "bg-[#008CDD]/10",
      desc: "Payment Gateway",
    };
  if (t.includes("java"))
    return {
      icon: FaJava,
      color: "text-[#007396]",
      bg: "bg-[#007396]/10",
      desc: "Language",
    };
  if (t.includes("vs code") || t.includes("vscode"))
    return {
      isImage: true,
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      bg: "bg-blue-500/10",
      desc: "Code Editor",
    };
  if (t.includes("DaisyUI") || t.includes("daisyui"))
    return {
      isImage: true,
      src: "https://i.ibb.co.com/23xvCKWH/daisyui.png",
      bg: "bg-blue-500/10",
      desc: "UI Component Library",
    };
  if (t.includes("FontAwesome") || t.includes("fontawesome"))
    return {
      icon: FaFontAwesome,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      desc: "UI Component Library",
    };

  return {
    icon: FiCode,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    desc: "Technology",
  }; // Fallback
};

// Project tab icons mapping
const projectTabIcons = {
  Websites: FaGlobe,
  "Android Apps": FaAndroid,
  "NPM Packages": SiNpm,
  Python: FaPython,
  "Chrome Extensions": DiChrome,
};

function App() {
  const [projects, setProjects] = useState([]);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );

  // Tab States
  const [activeSkillTab, setActiveSkillTab] = useState("Frontend");
  const [activeProjectTab, setActiveProjectTab] = useState("Websites");

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    localStorage.setItem("theme", theme);
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");

    fetch("/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    alert("Message sent successfully! Check console for data.");
    console.log("Contact Data:", Object.fromEntries(formData.entries()));
    e.target.reset();
  };

  // Organized Skill Data with Tab Icons
  const skillCategories = [
    {
      name: "Frontend",
      icon: FiMonitor,
      skills: [
        "React.js",
        "Next.js",
        "Tailwind CSS",
        "JavaScript",
        "DaisyUI",
        "FontAwesome",
      ],
    },
    {
      name: "Backend",
      icon: FiDatabase,
      skills: [
        "Node.js",
        "Express.js",
        "MongoDB",
        "Firebase",
        "JSON Web Token",
      ],
    },
    {
      name: "Tools",
      icon: FiSettings,
      skills: [
        "Git",
        "VS Code",
        "NPM",
        "Netlify",
        "Vercel",
        "Stripe Integration",
      ],
    },
    { name: "Languages", icon: FiTerminal, skills: ["Python", "C", "Java"] },
  ];

  const projectCategories = [
    "Websites",
    "Android Apps",
    "NPM Packages",
    "Python",
    "Chrome Extensions",
  ];

  // Centralized Theme Variables
  const isDark = theme === "dark";
  const bgMain = isDark ? "bg-[#09090b]" : "bg-[#f1f5f9]";
  const textMain = isDark ? "text-white" : "text-slate-900";
  const textMuted = isDark ? "text-gray-400" : "text-slate-600";

  // Premium Glass Effect for Cards
  const cardGlass = isDark
    ? "bg-[#18181b]/90 backdrop-blur-2xl border border-white/5 shadow-2xl"
    : "bg-white/95 backdrop-blur-2xl border border-slate-200 shadow-xl shadow-slate-200/50";

  // Smooth Input Fields
  const inputStyle = isDark
    ? "bg-[#27272a]/50 border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:bg-[#27272a]"
    : "bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 focus:bg-white";

  // Tab Button Styling
  const tabButtonStyle = (isActive) => `
        flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all whitespace-nowrap
        ${
          isActive
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
            : `text-slate-500 hover:text-slate-900 dark:hover:text-white ${isDark ? "hover:bg-white/5" : " hover:bg-gray-400 hover:text-slate-900 border border-slate-200 shadow-sm"}`
        }
    `;

  return (
    <div className={`min-h-screen font-sans ${bgMain} ${textMain}`}>
      {/* Ambient Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-[150px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="flex flex-col lg:flex-row relative z-10 max-w-[1650px] mx-auto no-scrollbar">
        {/* ================= LEFT SIDEBAR ================= */}
        <div className="lg:w-[380px] xl:w-[440px] p-4 lg:p-6 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center">
          <div
            className={`w-full max-h-full overflow-y-auto rounded-[2.5rem] p-8 flex flex-col justify-between transition-all duration-300 custom-scrollbar ${cardGlass}`}
          >
            {/* Profile Image & Name */}
            <div className="flex flex-col items-center mb-4 pt-4">
              {/* Realistic Glowing Border Image */}
              <div className="relative w-48 h-48 mb-6 group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-blue-500 rounded-[2rem] blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div
                  className={`relative w-full h-full rounded-[1.8rem] overflow-hidden border-[4px] z-10 ${isDark ? "border-[#18181b]" : "border-white"}`}
                >
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src="https://avatars.githubusercontent.com/u/157139419?v=4"
                    alt="Jahidul Islam Jihad"
                  />
                </div>
                <div
                  className={`absolute bottom-2 right-2 w-6 h-6 rounded-full bg-green-500 border-4 z-20 ${isDark ? "border-[#18181b]" : "border-white"}`}
                  title="Available for work"
                ></div>
              </div>

              <h1 className="text-3xl font-black tracking-tight text-center mb-1">
                Jahidul Islam Jihad
              </h1>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 font-extrabold text-lg mb-6">
                Full-Stack Web Developer
              </p>

              {/* Restored Social Icons */}
              <div className="flex gap-4 justify-center w-full mb-6">
                {[
                  { icon: FaFacebook, color: "text-[#1877F2]", link: "https://facebook.com/jahidul.islam.941620" },
                  {
                    icon: FaGithub,
                    color: isDark ? "text-white" : "text-black",
                    link: "https://github.com/jahidul2004",
                  },
                  { icon: FaLinkedin, color: "text-[#0A66C2]", link: "https://linkedin.com/in/islam-jahidul-jihad" },
                  {
                    icon: FaSquareXTwitter,
                    color: isDark ? "text-white" : "text-black",
                    link: "https://x.com/JJihad77597",
                  },
                ].map((Social, idx) => (
                  <a
                    key={idx}
                    href={Social.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 shadow-sm ${isDark ? "bg-white/5 hover:bg-white/10" : "bg-slate-100 hover:bg-slate-200"} ${Social.color}`}
                  >
                    <Social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Beautiful Contact Info Cards */}
            {/* <div className="space-y-2 w-full mb-4">
              <div
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${isDark ? "bg-white/5 border border-white/5" : "bg-slate-50 border border-slate-200"}`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl ${isDark ? "bg-purple-500/20 text-purple-400" : "bg-purple-100 text-purple-600"}`}
                >
                  <FiMail size={20} />
                </div>
                <a
                  href="mailto:islamjahiduljihad@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  <div>
                    <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">
                      Email Me
                    </p>
                    <p className="text-sm font-extrabold truncate">
                      islamjahiduljihad@gmail.com
                    </p>
                  </div>
                </a>
              </div>

              <div
                className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${isDark ? "bg-white/5 border border-white/5" : "bg-slate-50 border border-slate-200"}`}
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-xl ${isDark ? "bg-blue-500/20 text-blue-400" : "bg-blue-100 text-blue-600"}`}
                >
                  <FiMapPin size={20} />
                </div>
                <div>
                  <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">
                    Location
                  </p>
                  <p className="text-sm font-extrabold">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div> */}

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 w-full mt-auto">
              <a
                href="https://jahiduljihad.netlify.app/resume/jahidulsResume.pdf"
                download
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-extrabold text-[15px] flex justify-center gap-2 shadow-[0_10px_20px_rgba(168,85,247,0.2)] hover:shadow-lg transition-all hover:-translate-y-0.5 active:scale-95"
              >
                <FiDownload size={18} /> Download Resume
              </a>
              <a
                href="#contact"
                className={`w-full py-4 rounded-2xl border font-extrabold text-[15px] flex justify-center gap-2 transition-all hover:-translate-y-0.5 active:scale-95 ${isDark ? "border-white/10 bg-white/5 hover:bg-white/10 text-white" : "border-slate-300 bg-transparent hover:bg-slate-50 text-slate-900"}`}
              >
                <FiBriefcase size={18} /> Hire Me
              </a>
            </div>
          </div>
        </div>

        {/* ================= RIGHT SCROLLABLE CONTENT ================= */}
        <div className="flex-1 px-4 sm:px-6 lg:px-10 xl:px-16 pb-12">
          {/* STICKY NAVBAR */}
          <div className="sticky top-4 z-[100] mb-12 pt-4 lg:pt-6">
            <div
              className={`w-full max-w-5xl mx-auto rounded-full px-6 py-4 flex items-center justify-between transition-all duration-500 shadow-lg ${cardGlass}`}
            >
              <a
                href="#home"
                className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 tracking-tighter"
              >
                JIHAD
              </a>

              <div className="hidden lg:flex gap-1 bg-slate-100 dark:bg-white/5 p-1.5 rounded-full">
                {["Home", "Expertise", "Projects", "Education", "Contact"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className={`px-5 py-2.5 rounded-full text-[13px] font-bold uppercase tracking-wide transition-all ${isDark ? "text-gray-300 hover:text-white hover:bg-white/10" : "text-slate-600 hover:text-purple-600 hover:bg-white"}`}
                    >
                      {item}
                    </a>
                  ),
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={toggleTheme}
                  className={`p-3.5 rounded-full transition-all shadow-sm ${isDark ? "bg-white/10 text-yellow-400 hover:bg-white/20" : "bg-white text-gray-600 border border-slate-200 hover:bg-slate-50"}`}
                >
                  {isDark ? <FaSun size={18} /> : <FaMoon size={18} />}
                </button>
                <div className="dropdown dropdown-end lg:hidden">
                  <label
                    tabIndex={0}
                    className={`btn btn-ghost btn-circle ${isDark ? "bg-white/5 text-white" : "bg-white text-black border border-slate-200"}`}
                  >
                    <HiMenuAlt3 size={24} />
                  </label>
                  <ul
                    tabIndex={0}
                    className={`menu dropdown-content mt-4 z-[1] p-5 shadow-2xl rounded-3xl w-64 gap-2 border ${cardGlass} ${isDark ? "border-white/10" : "border-slate-100"}`}
                  >
                    {[
                      "Home",
                      "Expertise",
                      "Projects",
                      "Education",
                      "Contact",
                    ].map((item) => (
                      <li key={item}>
                        <a
                          href={`#${item.toLowerCase()}`}
                          className="font-extrabold text-base py-2"
                        >
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* HERO SECTION */}
          <div id="home" className="mb-32 mt-12 text-center lg:text-left">
            <div
              className={`inline-block mb-8 px-6 py-2.5 rounded-full border text-sm font-bold tracking-widest uppercase ${isDark ? "bg-purple-500/10 border-purple-500/20 text-purple-300" : "bg-purple-50 border-purple-200 text-purple-700 shadow-sm"}`}
            >
              🚀 Welcome to my digital space
            </div>
            <h1 className="text-5xl sm:text-6xl xl:text-[6.5rem] font-black leading-[1.05] tracking-tighter mb-8">
              Engineering Digital
              <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500">
                Excellence.
              </span>
            </h1>
            <p
              className={`text-lg sm:text-xl lg:text-2xl max-w-3xl leading-relaxed font-medium mx-auto lg:mx-0 ${textMuted}`}
            >
              I am a dedicated MERN Stack Developer, crafting highly scalable
              applications, beautiful interfaces, and robust backend
              architectures.
            </p>
          </div>

          {/* EXPERTISE SECTION (Fixed Colors & Perfect Tabbar) */}
          <div id="expertise" className="mb-32 scroll-mt-28">
            <h2 className="text-4xl sm:text-5xl font-black mb-12 flex items-center gap-4 tracking-tighter">
              <FiCode className="text-purple-500" /> My{" "}
              <span className="text-purple-500">Expertise</span>
            </h2>

            {/* Tab Bar with Icons */}
            <div
              className={`flex flex-wrap gap-3 mb-12 p-2.5 rounded-[1.5rem] custom-scrollbar overflow-x-auto`}
            >
              {skillCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.name}
                    onClick={() => setActiveSkillTab(category.name)}
                    className={tabButtonStyle(activeSkillTab === category.name)}
                  >
                    <Icon size={18} /> {category.name}
                  </button>
                );
              })}
            </div>

            {/* Advanced Tech Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {skillCategories
                .find((c) => c.name === activeSkillTab)
                ?.skills.map((skillName, i) => {
                  const {
                    icon: SkillIcon,
                    color,
                    bg,
                    desc,
                    isImage,
                    src,
                  } = getSkillInfo(skillName);
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-5 p-6 rounded-[2rem] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${cardGlass}`}
                    >
                      <div
                        className={`w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner ${bg}`}
                      >
                        {isImage ? (
                          <img src={src} alt={skillName} className="w-9 h-9" />
                        ) : (
                          <SkillIcon size={32} className={color} />
                        )}
                      </div>
                      <div>
                        <h4 className="font-black text-xl mb-1">{skillName}</h4>
                        <p
                          className={`text-xs font-bold uppercase tracking-widest ${textMuted}`}
                        >
                          {desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* FEATURED PROJECTS SECTION */}
          <div id="projects" className="mb-32 scroll-mt-28">
            <h2 className="text-4xl sm:text-5xl font-black mb-12 flex items-center gap-4 tracking-tighter">
              <FiLayout className="text-blue-500" /> Featured{" "}
              <span className="text-blue-500">Projects</span>
            </h2>

            <div
              className={`flex flex-wrap gap-3 mb-12 p-2.5 rounded-[1.5rem] custom-scrollbar overflow-x-auto`}
            >
              {projectCategories.map((tab) => {
                const Icon = projectTabIcons[tab];
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveProjectTab(tab)}
                    className={tabButtonStyle(activeProjectTab === tab)}
                  >
                    {Icon && <Icon size={18} />} {tab}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-10">
              {projects
                .filter((p) => p.category === activeProjectTab)
                .map((project) => (
                  <ProjectCard key={project?.id} data={project} theme={theme} />
                ))}

              {/* No Project Card Placeholder */}
              {projects.filter((p) => p.category === activeProjectTab)
                .length === 0 && (
                <div
                  className={`flex flex-col items-center justify-center text-center p-16 col-span-1 xl:col-span-2 rounded-[2.5rem] border border-dashed transition-all ${isDark ? "bg-white/5 border-white/20" : "bg-slate-50 border-slate-300"}`}
                >
                  <div className="w-24 h-24 flex items-center justify-center rounded-[2rem] bg-purple-500/10 text-purple-500 mb-6 border border-purple-500/20 shadow-inner">
                    <FiCode size={48} />
                  </div>
                  <h3 className="text-3xl font-black mb-3">
                    No {activeProjectTab} Uploaded
                  </h3>
                  <p className={`text-lg font-medium max-w-md ${textMuted}`}>
                    Currently crafting amazing projects in this category. They
                    will be showcased here very soon!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* EDUCATION SECTION (Icons Fixed for Mobile) */}
          <div id="education" className="mb-32 scroll-mt-28">
            <h2 className="text-4xl sm:text-5xl font-black mb-16 flex items-center gap-4 tracking-tighter">
              <FaGraduationCap className="text-pink-500" /> Academic{" "}
              <span className="text-pink-500">History</span>
            </h2>

            <div className="space-y-8 relative">
              {/* Vertical Line */}
              <div className="absolute left-[39px] sm:left-[49px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-purple-500 to-blue-500 opacity-30 pointer-events-none hidden xs:block"></div>

              {/* Edu Card 1 */}
              <div
                className={`relative flex flex-col sm:flex-row gap-6 sm:gap-8 p-8 md:p-10 rounded-[2.5rem] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${cardGlass}`}
              >
                <div className="w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center rounded-[1.5rem] sm:rounded-[2rem] bg-purple-500/10 text-purple-500 border border-purple-500/20 shadow-inner relative z-10">
                  <FaGraduationCap className="text-2xl sm:text-4xl" />
                </div>
                <div className="flex-1">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${isDark ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-700"} mb-4 inline-block`}
                  >
                    2022 - Present
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mb-3 tracking-tight">
                    Diploma in Computer Science
                  </h3>
                  <h4
                    className={`text-lg sm:text-xl font-bold mb-6 flex items-center gap-2 ${textMuted}`}
                  >
                    <FaSchool className="text-slate-400" /> Shyamoli Ideal
                    Polytechnic Institute
                  </h4>
                  <div
                    className={`inline-flex items-center gap-4 px-6 py-3 rounded-2xl ${isDark ? "bg-black/40 border border-white/5" : "bg-slate-100 border border-slate-200"}`}
                  >
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                      CGPA
                    </p>
                    <p className="text-2xl font-black text-purple-500">
                      3.95<span className="text-base text-slate-500">/4</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Edu Card 2 */}
              <div
                className={`relative flex flex-col sm:flex-row gap-6 sm:gap-8 p-8 md:p-10 rounded-[2.5rem] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${cardGlass}`}
              >
                <div className="w-14 h-14 sm:w-20 sm:h-20 flex-shrink-0 flex items-center justify-center rounded-[1.5rem] sm:rounded-[2rem] bg-blue-500/10 text-blue-500 border border-blue-500/20 shadow-inner relative z-10">
                  <FaSchool className="text-2xl sm:text-4xl" />
                </div>
                <div className="flex-1">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${isDark ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700"} mb-4 inline-block`}
                  >
                    Passed in 2022
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black mb-3 tracking-tight">
                    Secondary School Certificate
                  </h3>
                  <h4
                    className={`text-lg sm:text-xl font-bold mb-6 flex items-center gap-2 ${textMuted}`}
                  >
                    <FaSchool className="text-slate-400" /> Sreerayerchar S.I.M
                    High School
                  </h4>
                  <div
                    className={`inline-flex items-center gap-4 px-6 py-3 rounded-2xl ${isDark ? "bg-black/40 border border-white/5" : "bg-slate-100 border border-slate-200"}`}
                  >
                    <p className="text-sm font-bold uppercase tracking-widest text-gray-500">
                      GPA
                    </p>
                    <p className="text-2xl font-black text-blue-500">
                      4.72<span className="text-base text-slate-500">/5</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HOBBIES & INTERESTS (Upgraded Cards & No weird borders) */}
          <div className="mb-32">
            <h2 className="text-4xl sm:text-5xl font-black mb-12 flex items-center gap-4 tracking-tighter">
              <FaHeart className="text-red-500" /> Things I{" "}
              <span className="text-red-500">Enjoy</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: "Traveling",
                  desc: "Exploring nature & new places to refresh my mind.",
                  icon: FiCamera,
                  color: "text-orange-500",
                  bg: "bg-orange-500/10",
                },
                {
                  name: "Cycling",
                  desc: "My go-to outdoor recreation for physical fitness.",
                  icon: MdDirectionsBike,
                  color: "text-green-500",
                  bg: "bg-green-500/10",
                },
                {
                  name: "Music",
                  desc: "Listening to low-beat music while deep coding.",
                  icon: FiHeadphones,
                  color: "text-purple-500",
                  bg: "bg-purple-500/10",
                },
                {
                  name: "Reading",
                  desc: "Diving into Sci-Fi & technology related books.",
                  icon: FiBookOpen,
                  color: "text-blue-500",
                  bg: "bg-blue-500/10",
                },
              ].map((hobby, i) => (
                <div
                  key={i}
                  className={`p-8 rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${cardGlass}`}
                >
                  {/* Clean Glowing Icon Wrapper - No thick dark border */}
                  <div
                    className={`w-20 h-20 rounded-[1.8rem] flex items-center justify-center mb-6 shadow-inner ${hobby.bg} ${hobby.color}`}
                  >
                    <hobby.icon size={36} />
                  </div>
                  <h3 className="font-black text-2xl mb-3">{hobby.name}</h3>
                  <p
                    className={`text-sm font-medium leading-relaxed ${textMuted}`}
                  >
                    {hobby.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* UPGRADED CONTACT AREA */}
          <div id="contact" className="mb-20 scroll-mt-28">
            <div
              className={`p-8 sm:p-12 md:p-16 rounded-[3rem] transition-all duration-300 ${cardGlass}`}
            >
              <div className="flex flex-col xl:flex-row gap-12 xl:gap-20">
                <div className="flex-1">
                  <div
                    className={`inline-block mb-6 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest ${isDark ? "bg-blue-500/10 text-blue-400" : "bg-blue-100 text-blue-700"}`}
                  >
                    Get in Touch
                  </div>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 tracking-tighter">
                    Let's Build Something <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                      Incredible.
                    </span>
                  </h2>
                  <p
                    className={`text-lg mb-12 leading-relaxed font-medium ${textMuted}`}
                  >
                    Have an exciting project idea, a position open, or just want
                    to discuss web development? I'm currently available for work
                    and would love to hear from you.
                  </p>

                  <div className="space-y-5">
                    <div
                      className={`flex items-center gap-6 p-6 rounded-[2rem] transition-all ${isDark ? "bg-black/40 border border-white/5" : "bg-slate-50 border border-slate-200"}`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shadow-inner">
                        <FiMail size={24} />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1">
                          Email Address
                        </p>
                        <p className="font-black text-lg truncate">
                          islamjahiduljihad@gmail.com
                        </p>
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-6 p-6 rounded-[2rem] transition-all ${isDark ? "bg-black/40 border border-white/5" : "bg-slate-50 border border-slate-200"}`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 text-orange-500 flex items-center justify-center shadow-inner">
                        <FiMapPin size={24} />
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-gray-500 uppercase tracking-widest mb-1">
                          Location
                        </p>
                        <p className="font-black text-lg truncate">
                          Dhaka, Bangladesh
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 xl:max-w-xl">
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 gap-5">
                      <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        required
                        className={`w-full px-6 py-5 rounded-2xl border outline-none font-bold text-sm transition-all shadow-inner ${inputStyle}`}
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        required
                        className={`w-full px-6 py-5 rounded-2xl border outline-none font-bold text-sm transition-all shadow-inner ${inputStyle}`}
                      />
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        required
                        className={`w-full px-6 py-5 rounded-2xl border outline-none font-bold text-sm transition-all shadow-inner ${inputStyle}`}
                      />
                    </div>
                    <textarea
                      name="message"
                      placeholder="Describe your project or message..."
                      rows="6"
                      required
                      className={`w-full px-6 py-5 rounded-3xl border outline-none font-bold text-sm transition-all resize-none shadow-inner ${inputStyle}`}
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full py-5 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(168,85,247,0.3)] transition-all hover:shadow-[0_15px_40px_rgba(168,85,247,0.4)] hover:-translate-y-1 active:scale-95"
                    >
                      Send Message <FiSend size={20} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* BEAUTIFUL COPYRIGHT SECTION */}
          <div
            className={`w-full text-center py-8 rounded-[2rem] border ${isDark ? "bg-white/5 border-white/5" : "bg-white border-slate-200 shadow-sm"}`}
          >
            <p
              className={`text-base font-bold flex items-center justify-center gap-2 ${textMuted}`}
            >
              &copy; {new Date().getFullYear()}{" "}
              <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                Jahidul Islam Jihad
              </span>
              .
            </p>
            <p className={`text-sm mt-2 font-semibold ${textMuted}`}>
              Crafted with passion using{" "}
              <FaReact className="inline text-blue-400 text-lg mx-1" /> React &{" "}
              <SiTailwindcss className="inline text-cyan-400 text-lg mx-1" />{" "}
              Tailwind.
            </p>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar CSS */}
      <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.4); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.7); }
            `}</style>
    </div>
  );
}

export default App;
