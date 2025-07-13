import { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import ProjectCard from "./components/projectCard/ProjectCard";

function App() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("/projects.json")
            .then((res) => res.json())
            .then((data) => setProjects(data));
    }, []);

    const links = (
        <>
            <li>
                <a href="#">Home</a>
            </li>
            <li>
                <a href="#">About</a>
            </li>
            <li>
                <a href="#">Projects</a>
            </li>
            <li>
                <a href="#">Education</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 bg-[#0f0f0f] text-white min-h-screen">
            {/* Left Fixed Section */}
            <div className="sticky md:top-0 h-auto md:h-screen flex items-center justify-center p-4 md:p-0 bg-gradient-to-b from-[#bc31d1] to-[#ff9f07] transition-all duration-500 ease-in-out">
                <div className="w-full sm:w-[80%] h-auto md:h-[80%] bg-white/10 backdrop-blur-md rounded-3xl flex flex-col gap-6 items-center justify-between py-8 px-6 shadow-xl transition-transform duration-700 hover:scale-[1.01] my-8">
                    <div className="w-full sm:w-[80%] min-h-[250px] bg-white rounded-xl overflow-hidden shadow-md">
                        <img
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            src="https://jahiduljihad.netlify.app/assets/heroImg-K2kdoPjM.png"
                            alt=""
                        />
                    </div>
                    <div className="text-center">
                        <h1 className="text-2xl font-extrabold">
                            Jahidul Islam Jihad
                        </h1>
                        <h3 className="font-semibold">
                            Full-Stack Web Developer
                        </h3>
                        <p className="font-medium text-gray-200">
                            Dhaka, Bangladesh
                        </p>
                        <div className="flex items-center justify-center my-4 gap-4 text-white/80 transition-colors duration-300">
                            <FaFacebook
                                size={28}
                                className="hover:text-[#1877F2] cursor-pointer"
                            />
                            <FaGithub
                                size={28}
                                className="hover:text-gray-400 cursor-pointer"
                            />
                            <FaLinkedin
                                size={28}
                                className="hover:text-[#0A66C2] cursor-pointer"
                            />
                            <FaSquareXTwitter
                                size={28}
                                className="hover:text-[#1DA1F2] cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Scrollable Right Section */}
            <div className="h-auto md:h-screen overflow-y-auto col-span-1 md:col-span-2 px-4 sm:px-6 md:px-10 py-8 bg-[#f9f9f9] text-black transition-all duration-500 ease-in-out">
                {/* navigation */}
                <div className="bg-gradient-to-r from-[#bc31d1] to-[#ff9f07] p-4 mb-4 rounded-xl sticky top-0 z-50">
                    <div className="navbar bg-white/90 backdrop-blur-md shadow-md rounded-xl px-4">
                        {/* Logo / Title */}
                        <div className="flex-1">
                            <a className="text-xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                Jahidul
                            </a>
                        </div>

                        {/* Mobile Dropdown */}
                        <div className="flex-none lg:hidden">
                            <div className="dropdown dropdown-end">
                                <label
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-white rounded-box w-52 text-black font-medium"
                                >
                                    {links}
                                </ul>
                            </div>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex">
                            <ul className="menu menu-horizontal px-1 text-black font-medium">
                                {links}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Intro Section */}
                <div className="mb-12">
                    <h1 className="mt-8 text-4xl sm:text-5xl lg:text-[6rem] font-extrabold leading-10 md:leading-22">
                        Full Stack Web{" "}
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient bg-[length:300%_300%]">
                            Developer
                        </span>
                    </h1>
                    <p className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed">
                        Hello! I am Jahidul Islam Jihad, a passionate Frontend
                        Web Developer with a strong enthusiasm for crafting
                        seamless digital experiences. My expertise lies in
                        building web applications, mobile applications, and
                        interactive user interfaces that are both functional and
                        visually appealing.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 my-12">
                    {[
                        {
                            num: "2+",
                            label: "Years Development",
                            bg: "bg-[#fcefee]",
                        },
                        {
                            num: "2+",
                            label: "Ongoing Projects",
                            bg: "bg-[#e5f6fd]",
                        },
                        {
                            num: "12+",
                            label: "Projects Completed",
                            bg: "bg-[#fef9e6]",
                        },
                        {
                            num: "5+",
                            label: "Happy Clients",
                            bg: "bg-[#eaeaff]",
                        },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className={`text-center rounded-xl p-6 ${item.bg} shadow-md hover:shadow-xl transition duration-300`}
                        >
                            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                                {item.num}
                            </h1>
                            <p className="mt-4 text-base sm:text-lg font-medium text-gray-800">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Recent Projects */}
                <div className="mb-20">
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-8">
                        Recent{" "}
                        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                            Projects
                        </span>
                    </h1>
                    <div className="flex flex-col gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project?.id} data={project} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
