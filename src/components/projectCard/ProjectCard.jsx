import React, { useState } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaTimes,
  FaServer,
  FaCode,
} from "react-icons/fa";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { TbApi } from "react-icons/tb";
import {
  SiReact,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiStripe,
  SiJsonwebtokens,
  SiJavascript,
} from "react-icons/si";

// ---------------- DYNAMIC TECH ICON HELPER ----------------
const getTechDetails = (techName) => {
  const t = techName.toLowerCase();
  if (t.includes("react")) return { icon: SiReact, color: "text-[#61DAFB]" };
  if (t.includes("tailwind"))
    return { icon: SiTailwindcss, color: "text-[#06B6D4]" };
  if (t.includes("node")) return { icon: SiNodedotjs, color: "text-[#339933]" };
  if (t.includes("express"))
    return { icon: SiExpress, color: "text-gray-500 dark:text-gray-300" };
  if (t.includes("mongo")) return { icon: SiMongodb, color: "text-[#47A248]" };
  if (t.includes("firebase"))
    return { icon: SiFirebase, color: "text-[#FFCA28]" };
  if (t.includes("stripe")) return { icon: SiStripe, color: "text-[#008CDD]" };
  if (t.includes("jwt"))
    return { icon: SiJsonwebtokens, color: "text-[#FF0000]" };
  if (t.includes("api")) return { icon: TbApi, color: "text-purple-500" };
  return { icon: SiJavascript, color: "text-yellow-400" };
};

const ProjectCard = ({ data, theme }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDark = theme === "dark";

  // ---------------- THEME CLASSES (Premium Glassmorphism) ----------------
  const cardBg = isDark
    ? "bg-[#18181b]/80 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
    : "bg-white/80 border-white/60 shadow-[0_8px_30px_rgba(0,0,0,0.06)]";
  const modalBg = isDark ? "bg-[#09090b]" : "bg-[#f5f5f7]";
  const textMain = isDark ? "text-white" : "text-gray-900";
  const textMuted = isDark ? "text-gray-400" : "text-gray-500";

  const badgeBg = isDark
    ? "bg-white/5 border border-white/10 text-gray-300 hover:border-purple-500/50"
    : "bg-gray-50 border border-gray-200 text-gray-700 hover:border-purple-500/50";

  const iconBtnStyle = isDark
    ? "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
    : "bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100 hover:shadow-[0_0_15px_rgba(0,0,0,0.05)]";

  // ---------------- DATA DESTRUCTURING ----------------
  const {
    title,
    category,
    shortDescription,
    longDescription,
    techStack = [],
    challengesFaced = [],
    futureOptimizations = [],
    liveLink,
    clientRepo,
    serverRepo,
    image,
  } = data || {};

  return (
    <>
      {/* ===================== PROFESSIONAL PROJECT CARD ===================== */}
      <div
        className={`group flex flex-col rounded-[2.5rem] overflow-hidden backdrop-blur-2xl border transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${cardBg}`}
      >
        {/* Image Section */}
        <div
          className="relative w-full h-56 sm:h-64 p-3 sm:p-4 pb-0 overflow-hidden z-10 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-inner bg-gray-200 dark:bg-[#2c2c2e]">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
              {category}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-6 sm:p-8 z-10">
          <h3
            className={`text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight transition-colors duration-300 group-hover:text-purple-500 ${textMain}`}
          >
            {title}
          </h3>

          <p
            className={`text-sm leading-relaxed mb-6 flex-1 line-clamp-2 ${textMuted}`}
          >
            {shortDescription}
          </p>

          {/* Tech Badges with Dynamic Icons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {techStack.slice(0, 3).map((tech, i) => {
              const { icon: TechIcon, color } = getTechDetails(tech);
              return (
                <span
                  key={i}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-[11px] sm:text-xs font-bold rounded-xl transition-all duration-300 ${badgeBg}`}
                >
                  <TechIcon className={color} size={14} />
                  {tech}
                </span>
              );
            })}
            {techStack.length > 3 && (
              <span
                className={`flex items-center justify-center px-3 py-1.5 text-[11px] sm:text-xs font-bold rounded-xl ${badgeBg}`}
              >
                +{techStack.length - 3} more
              </span>
            )}
          </div>

          {/* BOTTOM ACTION BUTTONS (The Layout You Liked) */}
          <div className="flex items-center gap-3 mt-auto pt-2">
            {/* Primary Explore Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-sm shadow-[0_10px_20px_rgba(168,85,247,0.2)] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(168,85,247,0.4)] active:scale-95 group/btn"
            >
              <span>Explore Details</span>
              <FiArrowRight
                size={16}
                className="transform transition-transform group-hover/btn:translate-x-1"
              />
            </button>

            {/* GitHub Square Button */}
            {clientRepo && (
              <a
                href={clientRepo}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center w-[52px] h-[52px] rounded-2xl border transition-all duration-300 active:scale-95 ${iconBtnStyle}`}
                title="View Source Code"
              >
                <FaGithub size={22} />
              </a>
            )}

            {/* Live Link Square Button */}
            <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-[52px] h-[52px] rounded-2xl border transition-all duration-300 active:scale-95 ${iconBtnStyle}`}
              title="Live Project"
            >
              <FaExternalLinkAlt size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* ===================== PROJECT DETAILS MODAL ===================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 backdrop-blur-xl bg-black/60 transition-opacity">
          <div
            className="absolute inset-0"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div
            className={`relative w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] border border-white/20 shadow-2xl overflow-hidden flex flex-col transform transition-all animate-fade-in-up ${modalBg}`}
          >
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 z-50 w-11 h-11 bg-black/50 backdrop-blur-xl border border-white/20 text-white rounded-full flex items-center justify-center hover:scale-110 hover:bg-red-500 transition-all shadow-lg"
            >
              <FaTimes size={18} />
            </button>

            <div className="overflow-y-auto w-full h-full custom-scrollbar">
              <div className="w-full h-64 sm:h-80 lg:h-96 relative">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <div className="absolute bottom-8 left-6 sm:left-10 z-10">
                  <span className="px-4 py-1.5 bg-purple-500 text-white text-xs font-bold uppercase tracking-wider rounded-full mb-4 inline-block shadow-lg">
                    {category}
                  </span>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter">
                    {title}
                  </h2>
                </div>
              </div>

              <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-10">
                  <section>
                    <h3
                      className={`text-2xl font-black mb-4 tracking-tight ${textMain}`}
                    >
                      Overview
                    </h3>
                    <p className={`text-base leading-relaxed ${textMuted}`}>
                      {longDescription}
                    </p>
                  </section>

                  <section>
                    <h3
                      className={`text-2xl font-black mb-4 tracking-tight ${textMain}`}
                    >
                      Challenges Faced
                    </h3>
                    <div className="grid gap-3">
                      {challengesFaced.map((challenge, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-3 p-4 rounded-2xl border ${isDark ? "bg-white/5 border-white/5" : "bg-gray-50 border-gray-100"}`}
                        >
                          <FiCheckCircle
                            size={20}
                            className="text-purple-500 flex-shrink-0 mt-0.5"
                          />
                          <span className={`text-sm font-medium ${textMain}`}>
                            {challenge}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <h3
                      className={`text-2xl font-black mb-4 tracking-tight ${textMain}`}
                    >
                      Future Optimizations
                    </h3>
                    <ul className="space-y-4 p-2">
                      {futureOptimizations.map((opt, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-3 text-sm font-medium ${textMuted}`}
                        >
                          <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                <div className="space-y-8">
                  <section
                    className={`p-6 sm:p-8 rounded-[2rem] border ${isDark ? "bg-[#18181b] border-white/5" : "bg-white border-gray-200 shadow-xl shadow-gray-200/50"}`}
                  >
                    <h3 className={`text-xl font-black mb-6 ${textMain}`}>
                      Technologies
                    </h3>
                    <div className="flex flex-col gap-3">
                      {techStack.map((tech, i) => {
                        const { icon: TechIcon, color } = getTechDetails(tech);
                        return (
                          <div
                            key={i}
                            className={`flex items-center gap-3 p-3 rounded-2xl border ${isDark ? "bg-black/50 border-white/5" : "bg-gray-50 border-gray-100"}`}
                          >
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white/10 dark:bg-white/5 shadow-sm ${color}`}
                            >
                              <TechIcon size={20} />
                            </div>
                            <span className={`text-sm font-bold ${textMain}`}>
                              {tech}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </section>

                  <section className="space-y-4">
                    <a
                      href={liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold text-[15px] transition-all duration-300 hover:shadow-[0_10px_20px_rgba(168,85,247,0.3)] hover:-translate-y-1"
                    >
                      <FaExternalLinkAlt /> Live Preview
                    </a>

                    {clientRepo && (
                      <a
                        href={clientRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl border font-bold text-[15px] transition-all duration-300 hover:-translate-y-1 ${isDark ? "border-white/10 bg-white/5 text-white hover:bg-white/10" : "border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-50"}`}
                      >
                        <FaGithub size={18} /> Frontend Repo
                      </a>
                    )}

                    {serverRepo && (
                      <a
                        href={serverRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl border font-bold text-[15px] transition-all duration-300 hover:-translate-y-1 ${isDark ? "border-white/10 bg-white/5 text-white hover:bg-white/10" : "border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-50"}`}
                      >
                        <FaServer size={18} /> Backend Repo
                      </a>
                    )}
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
