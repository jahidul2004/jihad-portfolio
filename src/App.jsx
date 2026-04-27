import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaSun,
  FaMoon,
  FaReact,
  FaGlobe,
  FaAndroid,
  FaGraduationCap,
  FaSchool,
  FaHeart,
  FaPython,
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
  FiMessageSquare,
  FiX,
} from "react-icons/fi";
import { SiNpm, SiTailwindcss } from "react-icons/si";
import { MdDirectionsBike } from "react-icons/md";
import ProjectCard from "./components/projectCard/ProjectCard";
import { DiChrome } from "react-icons/di";
import Swal from "sweetalert2";
import ReCAPTCHA from "react-google-recaptcha";
import { AiFillAlert } from "react-icons/ai";
import { RiSparklingLine } from "react-icons/ri";

// =======================================================
// 1. STRUCTURED JSON DATA FOR SKILLS (Direct PNG/SVG Links)
// =======================================================
const skillCategoriesData = [
  {
    name: "Frontend",
    icon: FiMonitor,
    skills: [
      {
        name: "React.js",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        bg: "bg-[#61DAFB]/10",
        desc: "UI Library",
        invertDark: false,
      },
      {
        name: "Next.js",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
        bg: "bg-black/5 dark:bg-white/10",
        desc: "Framework",
        invertDark: true,
      },
      {
        name: "Tailwind CSS",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        bg: "bg-[#06B6D4]/10",
        desc: "CSS Utility",
        invertDark: false,
      },
      {
        name: "JavaScript",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        bg: "bg-[#F7DF1E]/10",
        desc: "Language",
        invertDark: false,
      },
      {
        name: "DaisyUI",
        src: "https://raw.githubusercontent.com/saadeghi/daisyui-images/master/images/daisyui-logo/favicon-192.png",
        bg: "bg-[#5A0EF8]/10",
        desc: "UI Component Library",
        invertDark: false,
      },
      {
        name: "FontAwesome",
        src: "https://img.icons8.com/color/48/font-awesome.png",
        bg: "bg-blue-500/10",
        desc: "Icons Library",
        invertDark: false,
      },
    ],
  },
  {
    name: "Backend",
    icon: FiDatabase,
    skills: [
      {
        name: "Node.js",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
        bg: "bg-[#339933]/10",
        desc: "JS Runtime",
        invertDark: false,
      },
      {
        name: "Express.js",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
        bg: "bg-gray-500/10",
        desc: "Server API",
        invertDark: true,
      },
      {
        name: "MongoDB",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
        bg: "bg-[#47A248]/10",
        desc: "NoSQL DB",
        invertDark: false,
      },
      {
        name: "Firebase",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg",
        bg: "bg-[#FFCA28]/10",
        desc: "BaaS Platform",
        invertDark: false,
      },
      {
        name: "JSON Web Token",
        src: "https://img.icons8.com/color/48/json-web-token.png",
        bg: "bg-[#FF0000]/10",
        desc: "Authentication",
        invertDark: false,
      },
    ],
  },
  {
    name: "Tools",
    icon: FiSettings,
    skills: [
      {
        name: "Git",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        bg: "bg-[#F05032]/10",
        desc: "Version Control",
        invertDark: false,
      },
      {
        name: "VS Code",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
        bg: "bg-blue-500/10",
        desc: "Code Editor",
        invertDark: false,
      },
      {
        name: "NPM",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg",
        bg: "bg-[#CB3837]/10",
        desc: "Package Manager",
        invertDark: false,
      },
      {
        name: "Netlify",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/netlify/netlify-original.svg",
        bg: "bg-[#00C7B7]/10",
        desc: "Deployment",
        invertDark: false,
      },
      {
        name: "Vercel",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg",
        bg: "bg-black/5 dark:bg-white/10",
        desc: "Deployment",
        invertDark: true,
      },
      {
        name: "Stripe Integration",
        src: "https://img.icons8.com/color/48/stripe.png",
        bg: "bg-[#008CDD]/10",
        desc: "Payment Gateway",
        invertDark: false,
      },
    ],
  },
  {
    name: "Languages",
    icon: FiTerminal,
    skills: [
      {
        name: "Python",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        bg: "bg-[#3776AB]/10",
        desc: "Language",
        invertDark: false,
      },
      {
        name: "C",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg",
        bg: "bg-blue-500/10",
        desc: "Language",
        invertDark: false,
      },
      {
        name: "Java",
        src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        bg: "bg-[#007396]/10",
        desc: "Language",
        invertDark: false,
      },
    ],
  },
];

// Project tab icons mapping
const projectTabIcons = {
  Websites: FaGlobe,
  "Android Apps": FaAndroid,
  "NPM Packages": SiNpm,
  Python: FaPython, // Can use text or image, matching user's original logic
  "Chrome Extensions": DiChrome,
};

function App() {
  const [isMobile] = useState(window.innerWidth < 1024);
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const [projects, setProjects] = useState([]);
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "dark",
  );

  // Tab States
  const [activeSkillTab, setActiveSkillTab] = useState("Frontend");
  const [activeProjectTab, setActiveProjectTab] = useState("Websites");

  // =======================================================
  // AI ASSISTANT "SU" STATES
  // =======================================================
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: "su",
      text: "Hi there! I am Su, Jihad's AI Assistant. How can I help you today?",
    },
  ]);
  const [isAiTyping, setIsAiTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat automatically
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isAiTyping]);

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

    // 🚫 captcha check
    if (!captchaValue) {
      alert("Please verify you are not a robot!");
      return;
    }

    const form = e.target;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    // 🔥 SweetAlert2 Premium Theme Configuration (Forced Android Rounded Style)
    const swalConfig = {
      buttonsStyling: false,
      customClass: {
        popup:
          "bg-white dark:bg-[#18181b] !rounded-[2.5rem] border border-gray-200 dark:border-white/10 shadow-2xl font-sans pb-2",
        title:
          "text-2xl sm:text-[28px] font-black text-gray-900 dark:text-white tracking-tighter mt-4",
        htmlContainer:
          "text-gray-600 dark:text-gray-400 font-medium text-[15px] sm:text-base !m-0 !px-4 sm:!px-8",
        confirmButton:
          "bg-gradient-to-r from-purple-500 to-blue-500 text-white font-extrabold text-[15px] rounded-2xl px-10 py-3.5 shadow-[0_10px_20px_rgba(168,85,247,0.2)] hover:shadow-lg transition-all active:scale-95 mt-4",
        cancelButton:
          "bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 font-extrabold text-[14px] rounded-2xl px-8 py-3.5 hover:bg-gray-200 dark:hover:bg-white/20 transition-all active:scale-95 mt-4 ml-0 sm:ml-4",
      },
    };

    // 🔥 send main email
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        data,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .then(() => {
        console.log("Main email sent");

        // Success Popup
        Swal.fire({
          ...swalConfig,
          icon: "success",
          title: "Message Sent!",
          text: "Your message has been sent successfully. I'll get back to you shortly!",
          confirmButtonText: "Awesome!",
          timer: 4000,
          timerProgressBar: true,
        });

        form.reset();
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);

        // ❌ Error Popup with Side-by-Side Premium Cards
        Swal.fire({
          ...swalConfig,
          icon: "error",
          title: "Oops! Delivery Failed",
          html: `
            <p class="mb-6 mt-2 text-sm sm:text-base">The server seems to be busy. But don't let that stop us from connecting! Reach me directly:</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left font-sans">
                
                <a href="https://wa.me/+8801XXXXXXXXX" target="_blank" class="flex items-center gap-4 p-4 rounded-[1.8rem] bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/10 group no-underline">
                    <div class="w-12 h-12 rounded-2xl bg-green-500 text-white flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 414.4c-33.1 0-65.5-8.9-94-25.8l-6.7-4-69.8 18.3L72 334.1l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.7 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
                    </div>
                    <div class="overflow-hidden w-full">
                        <p class="text-[10px] font-black text-green-700 dark:text-green-400 uppercase tracking-widest mb-0.5 m-0">Chat Instantly</p>
                        <p class="font-black text-[15px] text-gray-900 dark:text-white m-0 leading-none truncate">WhatsApp</p>
                    </div>
                </a>

                <a href="mailto:islamjahiduljihad@gmail.com" class="flex items-center gap-4 p-4 rounded-[1.8rem] bg-blue-50 dark:bg-[#0066CC]/10 border border-blue-200 dark:border-[#0066CC]/20 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0066CC]/10 group no-underline">
                    <div class="w-12 h-12 rounded-2xl bg-[#0066CC] text-white flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    </div>
                    <div class="overflow-hidden w-full">
                        <p class="text-[10px] font-black text-blue-700 dark:text-[#0066CC] uppercase tracking-widest mb-0.5 m-0">Direct Message</p>
                        <p class="font-black text-[15px] text-gray-900 dark:text-white m-0 leading-none truncate">Email Me</p>
                    </div>
                </a>
                
            </div>
          `,
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: "I'll try again later",
        });
      });

    // 🔁 Auto-reply (Silent background task)
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID,
        data,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
      .catch((err) => console.log("Auto-reply background failed:", err));
  };

  // =======================================================
  // AI ASSISTANT "SU" - FORM SUBMIT HANDLER
  // =======================================================
  const handleChatSubmit = async (e) => {
    e.preventDefault();

    const message = e.target.chatMessage.value;
    if (!message.trim()) return;

    // Add user message instantly
    setChatMessages((prev) => [...prev, { sender: "user", text: message }]);

    e.target.reset();
    setIsAiTyping(true);

    try {
      const res = await fetch("https://su-server.vercel.app/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      // 🔥 Fetch automatically catch block-e error pathay na, tai eita check kora joruri
      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const data = await res.json();

      // Check data structure
      if (data && data.reply) {
        setChatMessages((prev) => [
          ...prev,
          { sender: "su", text: data.reply },
        ]);
      } else {
        throw new Error("Invalid response format from backend");
      }
    } catch (error) {
      console.error("Chatbot Connection Error:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "su",
          text: "Oops! Connection failed 😓 Ensure your backend is running.",
        },
      ]);
    } finally {
      setIsAiTyping(false);
    }
  };
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
                  {
                    icon: FaFacebook,
                    color: "text-[#1877F2]",
                    link: "https://facebook.com/jahidul.islam.941620",
                  },
                  {
                    icon: FaGithub,
                    color: isDark ? "text-white" : "text-black",
                    link: "https://github.com/jahidul2004",
                  },
                  {
                    icon: FaLinkedin,
                    color: "text-[#0A66C2]",
                    link: "https://linkedin.com/in/islam-jahidul-jihad",
                  },
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

          {/* EXPERTISE SECTION (JSON mapped icons) */}
          <div id="expertise" className="mb-32 scroll-mt-28">
            <h2 className="text-4xl sm:text-5xl font-black mb-12 flex items-center gap-4 tracking-tighter">
              <FiCode className="text-purple-500" /> My{" "}
              <span className="text-purple-500">Expertise</span>
            </h2>

            {/* Tab Bar with Icons */}
            <div
              className={`flex flex-wrap gap-3 mb-12 p-2.5 rounded-[1.5rem] custom-scrollbar overflow-x-auto ${isDark ? "bg-white/5" : "bg-slate-100"}`}
            >
              {skillCategoriesData.map((category) => {
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

            {/* Advanced Tech Cards mapped from JSON Array */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {skillCategoriesData
                .find((c) => c.name === activeSkillTab)
                ?.skills.map((skill, i) => {
                  return (
                    <div
                      key={i}
                      className={`flex items-center gap-5 p-6 rounded-[2rem] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${cardGlass}`}
                    >
                      <div
                        className={`w-16 h-16 flex items-center justify-center rounded-2xl shadow-inner ${skill.bg}`}
                      >
                        <img
                          src={skill.src}
                          alt={skill.name}
                          className={`w-9 h-9 object-contain ${isDark && skill.invertDark ? "invert opacity-90" : ""}`}
                        />
                      </div>
                      <div>
                        <h4 className="font-black text-xl mb-1">
                          {skill.name}
                        </h4>
                        <p
                          className={`text-xs font-bold uppercase tracking-widest ${textMuted}`}
                        >
                          {skill.desc}
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
              className={`flex flex-wrap gap-3 mb-12 p-2.5 rounded-[1.5rem] custom-scrollbar overflow-x-auto ${isDark ? "bg-white/5" : "bg-slate-100"}`}
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
                      className={`flex flex-col md:flex-row text-center md:text-left items-center gap-6 p-6 rounded-[2rem] transition-all ${isDark ? "bg-black/40 border border-white/5" : "bg-slate-50 border border-slate-200"}`}
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
                      className={`flex flex-col md:flex-row text-center md:text-left items-center gap-6 p-6 rounded-[2rem] transition-all ${isDark ? "bg-black/40 border border-white/5" : "bg-slate-50 border border-slate-200"}`}
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
                    <div
                      style={{
                        transform: isMobile ? "scale(0.9)" : "scale(1)",
                      }}
                    >
                      <ReCAPTCHA
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                        onChange={handleCaptchaChange}
                      />
                    </div>
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

      {/* ======================================================= */}
      {/* 🤖 AI ASSISTANT "SU" CHATBOT UI */}
      {/* ======================================================= */}
      <div className="fixed bottom-6 right-6 z-[150] flex flex-col items-end">
        {isChatOpen && (
          <div
            className={`mb-4 w-[calc(100vw-3rem)] sm:w-[380px] h-[500px] max-h-[75vh] flex flex-col rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-300 origin-bottom-right ${isDark ? "bg-[#18181b]/95 backdrop-blur-3xl border border-white/10" : "bg-white/95 backdrop-blur-3xl border border-gray-200"}`}
          >
            {/* Chatbot Header */}
            <div
              className={`flex items-center justify-between p-4 sm:p-5 border-b ${isDark ? "border-white/10 bg-black/20" : "border-gray-200 bg-gray-50/50"}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-[2px] shadow-md">
                  <div
                    className={`w-full h-full rounded-full flex items-center justify-center ${isDark ? "bg-[#18181b]" : "bg-white"}`}
                  >
                    <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500 text-sm">
                      Su
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-[15px] leading-tight">
                    Su - AI Assistant
                  </h3>
                  <p className="text-[11px] font-bold text-green-500 flex items-center gap-1.5 tracking-wide uppercase">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>{" "}
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className={`p-2.5 rounded-full transition-all ${isDark ? "bg-white/10 hover:bg-red-500 hover:text-white" : "bg-gray-200 hover:bg-red-500 hover:text-white"}`}
              >
                <FiX size={18} />
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar flex flex-col gap-4">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-2xl text-[14px] font-medium leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-br-sm shadow-md"
                        : `${isDark ? "bg-white/10 text-gray-200" : "bg-gray-100 text-gray-800"} rounded-bl-sm border ${isDark ? "border-white/5" : "border-gray-200"}`
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isAiTyping && (
                <div className="flex w-full justify-start">
                  <div
                    className={`p-4 rounded-2xl rounded-bl-sm flex items-center gap-1.5 ${isDark ? "bg-white/10" : "bg-gray-100"}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></span>
                    <span
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                    <span
                      className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Area */}
            <form
              onSubmit={handleChatSubmit}
              className={`p-4 border-t ${isDark ? "border-white/10 bg-black/20" : "border-gray-200 bg-gray-50/50"}`}
            >
              <div className="flex items-center relative">
                <input
                  type="text"
                  name="chatMessage"
                  placeholder="Ask Su anything..."
                  autoComplete="off"
                  className={`w-full rounded-full pl-5 pr-14 py-3.5 text-sm font-semibold outline-none transition-all shadow-inner ${isDark ? "bg-[#27272a]/80 border-white/10 text-white placeholder-gray-500" : "bg-white border-gray-300 text-gray-900 placeholder-gray-400 border"}`}
                />
                <button
                  type="submit"
                  className="absolute right-1.5 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-lg"
                >
                  <FiSend size={16} className="ml-0.5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* AI Floating Trigger Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white flex items-center justify-center shadow-[0_10px_30px_rgba(168,85,247,0.5)] hover:scale-110 active:scale-95 transition-all relative group"
        >
          {/* Outer Ping Glow */}
          <div className="absolute inset-0 rounded-full bg-purple-500 animate-ping opacity-40"></div>
          {isChatOpen ? (
            <FiX size={30} className="relative z-10" />
          ) : (
            <RiSparklingLine size={30} className="relative z-10" />
          )}
        </button>
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
